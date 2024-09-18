const mainVideo = document.querySelector('#main-Video');
const buttons = document.querySelectorAll('.button-container button');

function playVideo(videoId) {
    const videoUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
    mainVideo.src = videoUrl;
    updateButtonIcons(videoId);
}

function updateButtonIcons(currentVideoId) {
    buttons.forEach(button => {
        const buttonVideoId = button.getAttribute('onclick').match(/playVideo\('(.+)'\)/)[1];
        const icon = button.querySelector('.material-symbols-outlined');
        if (!icon) {
            const iconElement = document.createElement('span');
            iconElement.className = 'material-symbols-outlined';
            button.insertAdjacentElement('afterbegin', iconElement);
            icon = button.querySelector('.material-symbols-outlined');
        }
        if (buttonVideoId === currentVideoId) {
            icon.textContent = 'pause';
        } else {
            icon.textContent = 'play_arrow';
        }
    });
}

// Add icons to existing buttons
buttons.forEach(button => {
    const iconElement = document.createElement('span');
    iconElement.className = 'material-symbols-outlined';
    iconElement.textContent = 'play_arrow';
    button.insertAdjacentElement('afterbegin', iconElement);
});



const summaryText = document.getElementById('summary-text');

function playVideo(videoId) {
  const videoUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
  mainVideo.src = videoUrl;
  updateButtonIcons(videoId);

  // Get the clicked button
  const clickedButton = event.target;

  // Check if the clicked button has a parent <details> element
  const parentDetails = clickedButton.closest('details');

  let summaryTextContent = '';

  // If the parent <details> element exists
  if (parentDetails) {
      // Get the summary text from the <summary> element
      const summaryText = parentDetails.querySelector('summary').textContent;
      const buttonText = clickedButton.textContent.replace(/Pause|play_arrow/gi, '').trim();
      summaryTextContent = `Lecture On: ${summaryText} - ${buttonText}`;
  } else {
      // If there is no parent <details> element, display only the button text
      const buttonText = clickedButton.textContent.replace(/Pause|play_arrow/gi, '').trim();
      summaryTextContent = `Lecture On: ${buttonText}`;
  }

  // Update the summary text element with the new content
  document.getElementById('summary-text').innerHTML = summaryTextContent;
}
const header = document.querySelector('.header');
const mainContent = document.querySelector('.main-content');
let prevScrollPos = window.pageYOffset;

mainContent.addEventListener('scroll', function() {
  const currentScrollPos = mainContent.scrollTop;

  if (prevScrollPos > currentScrollPos) {
    // Scrolling up, show the header
    header.style.top = '0';
  } else {
    // Scrolling down, hide the header
    header.style.top = `-${header.offsetHeight}px`;
  }

  prevScrollPos = currentScrollPos;
});


