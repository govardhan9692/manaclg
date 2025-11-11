const fullScreenBtn = document.querySelector('.full-screen div:last-child');
const closeBtn = document.createElement('button');
closeBtn.classList.add('close-btn');
closeBtn.innerHTML = '&times;';
const fullScreenMode = document.createElement('div');
fullScreenMode.classList.add('full-screen-mode');
const iframeElement = document.querySelector('iframe');
const iframeParent = iframeElement.parentNode;

fullScreenBtn.addEventListener('click', () => {
    document.body.appendChild(fullScreenMode);
    fullScreenMode.appendChild(iframeElement);
    fullScreenMode.appendChild(closeBtn);
    fullScreenMode.style.display = 'block';
});

closeBtn.addEventListener('click', () => {
    fullScreenMode.style.display = 'none';
    iframeParent.appendChild(iframeElement);
    fullScreenMode.remove();
});

function handleIframeLoad() {
    const iframe = document.getElementById('notesFrame');
    const loadingMessage = document.getElementById('loadingMessage');
    iframe.onload = function () {
        loadingMessage.style.display = 'none';
        notesFrame.style.display = 'block';
    };
}

document.addEventListener('DOMContentLoaded', handleIframeLoad);

function showNotes(url) {
    const notesFrame = document.getElementById('notesFrame');
    const loadingMessage = document.getElementById('loadingMessage');
    loadingMessage.style.display = 'block';
    notesFrame.style.display = 'none';
    notesFrame.src = url;
    notesFrame.addEventListener('load', () => {
        loadingMessage.style.display = 'none';
        notesFrame.style.display = 'block';
    });
}