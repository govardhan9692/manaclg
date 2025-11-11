let quote = document.getElementById("quote");
let author = document.getElementById("author");
const api_url = "https://api.quotable.io/random";

async function getQuote(url) {
  const response = await fetch(url);
  var data = await response.json();
  console.log(data);

  quote.innerHTML = `"${data.content}"`;
  author.innerHTML = `..${data.author}`;
}

getQuote(api_url);

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