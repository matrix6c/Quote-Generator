const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const quoteAuthor = document.getElementById('author');
const twitterButton = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');


let apiQuotes = [];

//show loading
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

//Hide loading
function complete() {
    quoteContainer.hidden = false;
    loader.hidden = true;
}

//Show new quote
function newQuote(){
    loading();
    // Pick a random quote from apiQuotes
    const quote = apiQuotes[ Math.floor(Math.random() * apiQuotes.length)];
    console.log(quote);

    //Check if authur field is blank and replace it with "unknown"
    if(!quote.author){
        quoteAuthor.textContent = '-' + ' ' + 'Unknown'
    }else{
        quoteAuthor.textContent = '-' + ' ' + quote.author
    }

    //Check quote lenght to determine styling
    if(quote.text.length > 50){
        quoteText.classList.add('long-quote')
    }else{
        quoteText.classList.remove('long-quote')
    }
    //set Quote, hide loader
    quoteText.textContent = quote.text  
    complete()
}

// Getting and showing new Quotes from local source
// function newQuote(){
//     //picking random Quote from localQuotes
//     const quote = localQuotes[Math.floor(Math.random() * localQuotes.length)]
//     console.log(quote);
// }


// Getting Quotes from API
async function getQuotes() {
    loading()
    const apiUrl = 'https://type.fit/api/quotes';
    try{
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
    }catch(error){
        // catch error
    }
}

//Tweet quote
function tweetQuote(){
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} ${quoteAuthor.textContent}`;
    window.open(twitterUrl, '_blank');
}

// Event listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterButton.addEventListener('click', tweetQuote);

// On load
getQuotes();
// newQuote();