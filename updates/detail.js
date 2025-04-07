// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyAT3JSyr_UMX_PUAjWQbrnpjfhrbH7sbGk",
    authDomain: "manaclg-updates.firebaseapp.com",
    projectId: "manaclg-updates",
    storageBucket: "manaclg-updates.firebasestorage.app",
    messagingSenderId: "990994599154",
    appId: "1:990994599154:web:fe12b8a211762809d7146b",
    measurementId: "G-NCEN9TRCQ5"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Function to get URL parameter by name
function getUrlParam(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

// Get update ID from URL
const updateId = getUrlParam('id');
const updateDetailsContainer = document.getElementById('updateDetails');

// Load update details
async function loadUpdateDetails() {
    if (!updateId) {
        updateDetailsContainer.innerHTML = `
            <div class="error-message">
                <h3>Update not found</h3>
                <p>The update you're looking for doesn't exist or has been removed.</p>
                <a href="./index.html" class="back-btn">
                    <i class="fa-solid fa-arrow-left"></i> Back to Updates
                </a>
            </div>
        `;
        return;
    }

    try {
        const doc = await db.collection('updates').doc(updateId).get();
        
        if (!doc.exists) {
            updateDetailsContainer.innerHTML = `
                <div class="error-message">
                    <h3>Update not found</h3>
                    <p>The update you're looking for doesn't exist or has been removed.</p>
                </div>
            `;
            return;
        }

        const update = doc.data();
        document.title = `${update.title} - ManaClg Updates`;
        
        // Format date if timestamp exists
        const date = update.timestamp 
            ? new Date(update.timestamp.seconds * 1000).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })
            : 'No date';

        updateDetailsContainer.innerHTML = `
            <div class="details-header">
                <h1 class="details-title">${update.title}</h1>
                <div class="details-meta">
                    <div class="details-category">${update.category.replace(/-/g, ' ')}</div>
                    <div class="details-date">${date}</div>
                </div>
            </div>
            
            <div class="details-content">
                ${update.content.replace(/\n/g, '<br>')}
            </div>
            
            <div class="details-attachments">
                ${update.imageUrl ? `
                    <h3 class="attachments-title">Images</h3>
                    <div class="details-image">
                        <img src="${update.imageUrl}" alt="${update.title}" onclick="openImageModal(this.src)">
                    </div>
                ` : ''}
                
                ${update.pdfUrl ? `
                    <h3 class="attachments-title">Documents</h3>
                    <a href="${update.pdfUrl}" target="_blank" class="details-pdf">
                        <i class="fa-solid fa-file-pdf"></i>
                        <span>View PDF Document</span>
                    </a>
                ` : ''}
            </div>
        `;
    } catch (error) {
        console.error("Error loading update details:", error);
        updateDetailsContainer.innerHTML = `
            <div class="error-message">
                <h3>Error loading update</h3>
                <p>There was an error loading the update details. Please try again later.</p>
            </div>
        `;
    }
}

// Function to open image in modal
window.openImageModal = (src) => {
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    
    modal.style.display = "block";
    modalImg.src = src;
    
    // Prevent scrolling when modal is open
    document.body.style.overflow = 'hidden';
};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadUpdateDetails();
    
    // Initialize dark mode from localStorage
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
    }
    
    // Set up dark mode toggle
    const modeToggle = document.getElementById('mode');
    const modeToggle2 = document.getElementById('mode2');
    
    function toggleDarkMode() {
        document.body.classList.toggle('dark-mode');
        const isDarkMode = document.body.classList.contains('dark-mode');
        localStorage.setItem('darkMode', isDarkMode);
    }
    
    if (modeToggle) {
        modeToggle.addEventListener('click', toggleDarkMode);
    }
    
    if (modeToggle2) {
        modeToggle2.addEventListener('click', toggleDarkMode);
    }
});

// Close modal when clicking on it
document.getElementById('imageModal').addEventListener('click', function(e) {
    if (e.target === this || e.target.classList.contains('close-modal')) {
        this.style.display = "none";
        document.body.style.overflow = ''; // Restore scrolling
    }
});

// Close modal with ESC key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && imageModal.style.display === 'block') {
        imageModal.style.display = 'none';
        document.body.style.overflow = ''; // Restore scrolling
    }
});

// Toggle left sidebar function
function toggleLeftSidebar() {
    const leftSidebar = document.getElementById('options-container');
    leftSidebar.classList.toggle('active');
}
