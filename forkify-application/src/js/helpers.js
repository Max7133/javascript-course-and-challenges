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

export const getJSON = async function (url) {
  try {
    // Making an AJAX request to an API
    const res = await Promise.race([fetch(url), timeout(TIMEOUT_SEC)]); // 2 Promises url & timeout - whoever wins 1st (faster)
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
