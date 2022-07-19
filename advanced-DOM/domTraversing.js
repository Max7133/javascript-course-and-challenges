'use strict';

////////////////////////////////////////////   D O M   T R A V E R S I N G   ////////////////////////////////////////////
// DOM TRAVERSING - is basically walking through the DOM, which means that we can select an Element based on ANOTHER Element
// Sometimes wee need to select Elements, Relative to a certain other Element, for example, a Direct Child or a Direct Parent Element.
// Sometimes we don't even know the structure of the DOM at runtime, in all these cases, we need Dom Traversing.

// Selecting 'h1' Element
const h1 = document.querySelector('h1');

//// Going Downwards: Child, selecting Child Elements with querySelector, because it also works on Elements, not only on the Document.
// querySelectorAll because there are 2 Elements with this className
// This would work no matter how DEEP these child Elements would be inside of the 'h1' Element
console.log(h1.querySelectorAll('.highlight')); // NodeList(2) [span.highlight, span.highlight] This selects all the Elements with the 'highlight' Class that are Children of the 'h1' Element
// If there were OTHER '.highlight' Elements, on the Page, they would NOT GET SELECTED, because they would NOT BE CHILDREN of the 'h1' Element

//// For getting Direct Children
console.log(h1.childNodes); // NodeList(9) [text, comment, text, span.highlight, text, br, text, span.highlight, text]
// We get these Elements in the Console, because Nodes can be ANYTHING, so they can be Texts, Elements even Comments

// This gives an HTMLCollection - is a Live Collection, so it's Updated, here I get the 3 Elements that are inside of the 'h1' (Only Works With Dirrect Children)
console.log(h1.children); // HTMLCollection(3) [span.highlight, br, span.highlight]

// This gives First Element Child and sets the color to 'white' on the Page
h1.firstElementChild.style.color = 'white';

// This gives Last Element Child and sets the color to 'black' on the Page
h1.lastElementChild.style.color = 'black';

//// Going Upwards: Parents
console.log(h1.parentNode); // <div class="header__title">...</div>

// Usually the one we are interested in, but in this case, it's the same, because this Element is also a Node in this case.
console.log(h1.parentElement); // <div class="header__title">...</div>

// Most of the time we need a Parent Element, which is NOT a Direct Parent (we might need to find a Parent Element no matte how far away it is in the DOM TREE) for that we have the Closest Method.
// On the page, we have multiple Headers (multiple Elements with a Class of Header), but I only want to find the one that is a Parent Element of 'h1'
// closest() receives a Query String just like querySelector/querySelectorAll
h1.closest('.header').style.background = 'var(--gradient-secondary)'; // I set it to a CSS Variable (OFficial Name: Custom Properties)
// It selected the closest Header to the 'h1' Element (the closest Parent Element) that has this Class '.header' and applied the Style to that Element. (Gonna use often for Event Delegation)

// If this Selector -> ('h1') MATCHES the Element on which we're calling closest(), then that's actually the Element that's gonna be Returned.
// I call this on the 'h1' Element, so if I look for the Closest 'h1', then that's gonna be EXACTLY THE ELEMENT ITSELF.
h1.closest('h1').style.background = 'var(--gradient-primary)';
// We can think of closest() as basically being the OPPOSITE of querySelector(),
// so BOTH receive a Query String as an Input, BUT querySelector() finds Children, no matter HOW DEEP in the DOM Tree, while the closest() finds Parents, and also no matter how far up in the DOM TREE.

//// Going Sideways: Siblings
// We can only access Direct Siblings (only the previous and the next one)
console.log(h1.previousElementSibling); // null (because in the HTML there is NOTHING THERE)
console.log(h1.nextElementSibling); // <h4>some text...</h4>
// Same Methods Properties for Nodes
console.log(h1.previousSibling); // #text
console.log(h1.nextSibling); // # text

// Trick for getting ALL Siblings (not just the Previous and the Next one)
// The trick is moving up to the Parent Element and then read ALL the Children from there.
// Getting ALL Siblings (will also include itself)
console.log(h1.parentElement.children); // HTMLCollection(4) [h1, h4, button.btn--text.btn--scroll-to, img.header__img]

//// Just For Fun
// Upper HTMLCollection(4) is NOT an Array, but it is still an ITERABLE that we can Spread into an Array
//[...h1.parentElement.children];
// And then I can LOOP OVER that Array and do something, like using the forEach Method
console.log([...h1.parentElement.children]);
const htmlLoop = [...h1.parentElement.children].forEach(function (el) {
  // Changing Style to ALL the Siblings, but NOT the Element itself.
  if (el !== h1) el.style.transform = 'scale(0.5)'; // all the other 3 Siblings on the page are now 50% smaller.
});
