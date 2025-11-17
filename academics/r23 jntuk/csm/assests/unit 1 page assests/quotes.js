let quote = document.getElementById("quote");
let author = document.getElementById("author");
var api_url = "https://dummyjson.com/quotes/random";

async function getQuote(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('API request failed');
    }
    var data = await response.json();
    console.log(data);

    quote.innerHTML = `"${data.quote}"`;
    author.innerHTML = `..${data.author}`;
  } catch (error) {
    console.error("Error fetching quote:", error);
    quote.innerHTML = `"Success is not final, failure is not fatal: it is the courage to continue that counts."`;
    author.innerHTML = `..Winston Churchill`;
  }
}

getQuote(api_url);

// Add event listener for new quote button
const newQuoteBtn = document.getElementById("new-quote");
if (newQuoteBtn) {
  newQuoteBtn.addEventListener("click", function() {
    getQuote(api_url);
  });
}

document.addEventListener("click", (e) => {
  const isDropdownButton = e.target.matches("[data-dropdown-button]");
  if (!isDropdownButton && e.target.closest('[data-dropdown]') != null) return;

  let currentDropdown;
  if (isDropdownButton) {
    currentDropdown = e.target.closest('[data-dropdown]');
    currentDropdown.classList.toggle('active');
  }

  document.querySelectorAll("[data-dropdown].active").forEach((dropdown) => {
    if (dropdown === currentDropdown) return;
    dropdown.classList.remove('active');
  });
});

quote.addEventListener("click", copyQuote);

function copyQuote() {
  const quoteText = `${quote.textContent.trim()} - ${author.textContent.trim()}`;
  if (navigator.clipboard) {
    navigator.clipboard.writeText(quoteText)
      .then(() => {
        alert("Quote Copied! Share the wisdom");
      })
      .catch((err) => {
        console.error("Failed to copy quote: ", err);
      });
  } else {
    console.error("Clipboard API not supported!");
  }
}