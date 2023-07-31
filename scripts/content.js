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

function getCurrentSelect() {
  if (window.getSelection) {
    selectionObj = window.getSelection();
    selectedText = selectionObj.toString();


    return {
      selectText: selectedText
    };
  }
}

window.onload = function () {
  document.body.addEventListener('mouseup', function () {
    console.log('onmouseup');
    const { selectText } = getCurrentSelect(); // this one will give the parent element of the selected text
    // parentElement.style.color = 'red'; // we change one of the properties of the parent element
    // console.log(getCurrentSelect());

    if (selectText){
        let newQuote = document.createElement('blockquote');
        newQuote.classList.add('gmail_quote');
        // add style
        newQuote.style.margin = '0px 0px 0px 0.8ex';
        newQuote.style.borderLeft = '1px solid rgb(204, 204, 204)';
        newQuote.style.paddingLeft = '1ex';

        newQuote.textContent = selectText;
        let targetElement = document.getElementById(':8u');
        if (targetElement) {
          targetElement.appendChild(newQuote);


        }
    }

  });
};

