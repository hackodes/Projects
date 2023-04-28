var savedIndex = -1; // Starting value
var quotes = [
  // QuoteBank
  {
    quote:
      "All human knowledge thus begins with intuitions, proceeds thence to concepts, and ends with ideas.",
    author: "Immanuel Kant",
  },

  {
    quote:
      "A great part of courage is the courage of having done the thing before.",
    author: "Ralph Waldo Emerson",
  },

  {
    quote:
      "Almost always, the creative dedicated minority has made the world better.",
    author: "Martin Luther King",
  },

  {
    quote:
      "Being convinced one knows the whole story is the surest way to fail.",
    author: "Philip Crosby",
  },

  {
    quote:
      "When introduced at the wrong time or place, good logic may be the worst enemy of good teaching.",
    author: "George Polya",
  },

  {
    quote: "Do what you can, with what you have, where you are.",
    author: "Theodore Roosevelt",
  },

  {
    quote: "A person who never made a mistake never tried anything new.",
    author: "Albert Einstein",
  },

  {
    quote:
      "Walking with a friend in the dark is better than walking alone in the light.",
    author: "Helen Keller",
  },

  {
    quote: "Defeat is not bitter unless you swallow it.",
    author: "Joe Clark",
  },

  {
    quote: "Peace comes from within. Do not seek it without.",
    author: "Muhammad Ali",
  },
];

window.onload = init;
function init() {
  newQuote();
}

function newQuote() {
  console.log("New Quote");
  var randomIndex = Math.floor(Math.random() * quotes.length);
  while (savedIndex == randomIndex) {
    // If the index is the same as last time, then randomise again
    var randomIndex = Math.floor(Math.random() * quotes.length);
  }
  savedIndex = randomIndex;
  document.getElementById("text").innerText = quotes[randomIndex].quote;
  document.getElementById("author").innerText =
    "- " + quotes[randomIndex].author;

  var quoteURL =
    "https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=%22";
  var quoteFormat = quotes[randomIndex].quote.replace(/ /g, "%20");
  quoteURL = quoteURL + quoteFormat;
  var authorFormat = quotes[randomIndex].author.replace(/ /g, "%20");
  quoteURL = quoteURL + "%22 - " + authorFormat;
  document.getElementById("tweet-quote").href = quoteURL;
}
