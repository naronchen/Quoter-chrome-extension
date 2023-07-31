// const article = document.querySelector("article");

// // `document.querySelector` may return null if the selector doesn't match anything.
// if (article) {
//   const text = article.textContent;
//   const wordMatchRegExp = /[^\s]+/g; // Regular expression
//   const words = text.matchAll(wordMatchRegExp);
//   // matchAll returns an iterator, convert to array to get word count
//   const wordCount = [...words].length;
//   const readingTime = Math.round(wordCount / 200);
//   const badge = document.createElement("p");
//   // Use the same styling as the publish information in an article's header
//   badge.classList.add("color-secondary-text", "type--caption");
//   badge.textContent = `⏱️ ${readingTime} min read`;

//   // Support for API reference docs
//   const heading = article.querySelector("h1");
//   // Support for article docs with date
//   const date = article.querySelector("time")?.parentNode;

//   (date ?? heading).insertAdjacentElement("afterend", badge);
// }

// let selectionObj = null;

let selectedText = '';
let range = null;
let quoteIcon = null;  // Add this line to define quoteIcon globally


function getCurrentSelect() {
  if (window.getSelection) {
    selectionObj = window.getSelection();
    selectedText = selectionObj.toString();
    if (selectionObj.rangeCount) {
      range = selectionObj.getRangeAt(0);
      textNode = range.commonAncestorContainer;
    }
    

    return {
      selectText: selectedText,
      range
    };
  }
}

function createQuoteIcon(range, selectText) {
  if (quoteIcon) {
    quoteIcon.remove();
  }
  quoteIcon = document.createElement('img');
  quoteIcon.src = chrome.runtime.getURL('images/quotes-small.png'); 

  quoteIcon.style.position = 'absolute';
  quoteIcon.style.width = '25px';
  quoteIcon.style.height = '25px';

  const rects = range.getClientRects();
  const lastRect = rects[rects.length - 1];  // Get the last rectangle which corresponds to the last line of the selection

  quoteIcon.style.left = `${lastRect.right}px`; // Use the right property for the end of the selection
  quoteIcon.style.top = `${lastRect.bottom}px`; 

  quoteIcon.style.zIndex = 9999;
  quoteIcon.addEventListener('click', function () {
    // console.log("I got clicked!", selectText)
    appendSelected(selectText)
  });
  document.body.appendChild(quoteIcon);
}

function appendSelected(selectText){
  let newQuote = document.createElement('blockquote');
  newQuote.classList.add('gmail_quote');
  // add style
  newQuote.style.margin = '0px 0px 0px 0.8ex';
  newQuote.style.borderLeft = '1px solid rgb(204, 204, 204)';
  newQuote.style.paddingLeft = '1ex';

  newQuote.innerText = selectText;
  let parentElement = document.querySelector('.aO7');
  if (parentElement){
      let targetElement = parentElement.querySelector('[aria-label="Message Body"]');
      if (targetElement) {
      targetElement.appendChild(newQuote);
    }
  }
}

window.onload = function () {
  document.onselectionchange = function () {
    // console.log('selection change');
    const { selectText, range } = getCurrentSelect(); // this one will give the parent element of the selected text
    // parentElement.style.color = 'red'; // we change one of the properties of the parent element
    // console.log(getCurrentSelect());

    if (selectText){
      createQuoteIcon(range, selectText)
      // quoteIcon.addEventListener('click', function () {
      //   console.log("I got clicked from here!")
      // });
    }

  };

    // Listen for clicks on the document
    document.addEventListener('mousedown', function (e) {
      // Check if quoteIcon exists and if the click was outside of the quoteIcon
      if (quoteIcon && !quoteIcon.contains(e.target)) {
        // console.log("clicked somewhere else")
        quoteIcon.remove(); // Remove the quoteIcon
        quoteIcon = null;   // Set quoteIcon to null
      }
    });

};

