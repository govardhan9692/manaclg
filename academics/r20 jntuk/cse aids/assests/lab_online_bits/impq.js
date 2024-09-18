const mainVideo = document.querySelector('#main-Video');
const buttons = document.querySelectorAll('.button-container button');
let fullScreenBtn = document.querySelector('.full-screen div');

// Create fullscreen mode elements
const fullScreenMode = document.createElement('div');
fullScreenMode.classList.add('full-screen-mode');
const closeBtn = document.createElement('button');
closeBtn.classList.add('close-btn');
closeBtn.innerHTML = '&times;';
fullScreenMode.appendChild(closeBtn);




const summaryText = document.getElementById('summary-text');


function playVideo(videoId) {
    const fullScreenDiv = document.querySelector('.full-screen');

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

    if (videoId.includes("https://drive.google.com/file/d/")) {
        const NotesUrl = videoId;
        mainVideo.src = NotesUrl;
        updateButtonIcons(videoId);

        // Create the .full-screen div if it doesn't exist
        if (!fullScreenDiv) {
            createFullScreenDiv();
        }
    } else {
     
        const videoUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
        mainVideo.src = videoUrl;
        updateButtonIcons(videoId);
        if (fullScreenDiv) {
            fullScreenDiv.remove();
            
        }
    }

}

function createFullScreenDiv() {
    const fullScreenDiv = document.createElement('div');
    fullScreenDiv.classList.add('full-screen');

    const iconDiv = document.createElement('div');
    const icon = document.createElement('i');
    icon.classList.add('fa-solid', 'fa-maximize');
    iconDiv.appendChild(icon);
    fullScreenDiv.appendChild(iconDiv);

    const videoPlayer = document.getElementById('video_player');
    videoPlayer.appendChild(fullScreenDiv);

    fullScreenBtn = fullScreenDiv.querySelector('div');
    fullScreenBtn.addEventListener('click', () => {
        const iframeElement = document.createElement('iframe');
        iframeElement.src = mainVideo.src;
        iframeElement.width = '100%';
        iframeElement.height = '100%';
        iframeElement.frameBorder = '0';
        fullScreenMode.appendChild(iframeElement);
        document.body.appendChild(fullScreenMode);
        fullScreenMode.style.display = 'block';
    });
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

// Close fullscreen mode
closeBtn.addEventListener('click', () => {
    fullScreenMode.style.display = 'none';
    fullScreenMode.removeChild(fullScreenMode.querySelector('iframe'));
});









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


