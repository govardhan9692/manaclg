const form = document.getElementById('contactForm');

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const formData = new FormData(event.target);
  const formDataObject = Object.fromEntries(formData.entries());

  sendDataToGoogleSheet(formDataObject);

  event.target.reset();
});

function sendDataToGoogleSheet(formData) {
  const scriptURL = 'https://script.google.com/macros/s/AKfycbzyhjS_WYwLX3lztcuVkW-GqB9A4DYAPcHg5ke-rNJB16isaurOtbwaWw0jMpJMUCBKKw/exec';
  const form = new FormData();

  for (const [key, value] of Object.entries(formData)) {
    form.append(key, value);
  }

  fetch(scriptURL, {
    method: 'POST',
    body: form
  })
    .then(response => {
      console.log('Success!', response);
    })
    .catch(error => {
      console.error('Error!', error.message);
    });
}