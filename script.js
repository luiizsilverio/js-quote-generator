import { ENV } from "./config.js";

let apiQuotes = [];

// Get quotes from API
async function getQuotes() {
  const apiUrl = `${ENV.API_URL}?category=${ENV.API_CATEGORY}&limit=${ENV.API_LIMIT}`;


  try {
    const response = await fetch(apiUrl, {
      headers: { 'X-Api-Key': ENV.API_KEY },
      // contentType: 'application/json',
    });

    apiQuotes = await response.json();

    newQuote();
    console.log(apiQuotes);
  }
  catch (err) {
    console.log(err);
  }
}

// Show new quote
function newQuote() {

}

// On Load
getQuotes();
