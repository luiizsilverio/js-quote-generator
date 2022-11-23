import { ENV } from "./config.js";
import { localQuotes } from "./quotes.js";

const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];
let viewedQuotes = 0;

// Show Loading
function loading(show) {
  loader.hidden = !show;
  quoteContainer.hidden = show;
}

// Get quotes from API
async function getQuotesFromAPI(limit) {
  const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
  const apiUrl = `${ENV.API_URL}?category=${ENV.API_CATEGORY}&limit=${limit}`;

  loading(true);

  try {
    // const response = await fetch(proxyUrl + apiUrl, {
      const response = await fetch(apiUrl, {
      headers: { 'X-Api-Key': ENV.API_KEY },
      // contentType: 'application/json',
    });

    apiQuotes = await response.json();
    console.log(`Carregou mais ${limit} citações da API`)

    apiQuotes.forEach(item => {
      localQuotes.push({
        text: item.quote,
        author: item.author,
      });
    });

    loading(false);
  }
  catch (err) {
    console.log('** Erro ao carregar as citações da API', err);
  }

  newQuote();
}

// Show new quote
function newQuote() {
  // Pick a random quote from api-ninja
  const quote = localQuotes[Math.floor(Math.random() * localQuotes.length)];

  authorText.textContent = quote.author || "Desconhecido";
  quoteText.textContent = quote.text;

  // Check quote length to determine styling
  if (quote.text.length > 50) {
    quoteText.classList.add('long-quote');
  } else {
    quoteText.classList.remove('long-quote');
  }

  viewedQuotes ++;

  // A cada 50 citações, carrega mais 50 da API
  if (viewedQuotes % 10 === 0) {
    getQuotesFromAPI(10);
  }
}

// Tweet Quote
function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;

  window.open(twitterUrl, '_blank');
}


// Event listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

// On Load
getQuotesFromAPI(10);
