// Contains a couple of Functions that are reused over and over in the Project
import { async } from 'regenerator-runtime';
import { TIMEOUT_SEC } from './config.js';

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`)); // after timeout(10) has passed, this Promise is gonna Reject it with this Error Message
    }, s * 1000);
  });
};

// GET request
export const getJSON = async function (url) {
  try {
    // Making an AJAX request to an API
    const fetchPro = fetch(url);
    const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]); // 2 Promises url & timeout - whoever wins 1st (faster)
    // Converting result to JSON
    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message} (${res.status})`);
    return data; // this 'data' is going to be the Resolved Value of the Promise that the getJSON Function returns.
  } catch (err) {
    // Re-throwing the Error
    // Taking the Error Object that I already have and throw this New Error.
    // Now with this, the Promise that's being returned from getJSON will Reject (from model.js)
    // then I will be able to handle the Error there in model.js
    throw err;
  }
};

// POST request
export const sendJSON = async function (url, uploadData) {
  try {
    // Passing in an Object of some Options
    // Headers are some snippets of text, which are like info about the Request itself
    // with 'Content-Type': 'application/json', I tell the API that the Data I will send is going to be in the JSON format.
    // only then this API can correctly accept that Data and create a new recipe in the Database
    // The Payload of the Request, the data that I want to send, which is called the body and it should be in JSON
    const fetchPro = fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(uploadData),
    });

    const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]); // 2 Promises url & timeout - whoever wins 1st (faster)
    // Converting result to JSON
    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message} (${res.status})`);
    return data; // this 'data' is going to be the Resolved Value of the Promise that the getJSON Function returns.
  } catch (err) {
    // Re-throwing the Error
    throw err;
  }
};
