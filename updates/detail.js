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

// Use a real-time listener for update details
let updateListener = null;

// Load update details with real-time updates
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
        // Set up a real-time listener for the update
        updateListener = db.collection('updates').doc(updateId).onSnapshot((doc) => {
            if (!doc.exists) {
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

            const update = doc.data();
            document.title = `${update.title} - ManaClg Updates`;
            
            // Log the update data for debugging
            console.log("Update data:", update);
            
            // Format date if timestamp exists
            const date = update.timestamp 
                ? new Date(update.timestamp.seconds * 1000).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })
                : 'No date';

            // Process content to properly format paragraphs
            const formattedContent = update.content
                .replace(/\n{2,}/g, '</p><p>') 
                .replace(/\n/g, '<br>') 
                .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
                
            // Check if image and PDF URLs exist
            const hasImage = update.imageUrl && update.imageUrl.trim() !== '';
            const hasPDF = update.pdfUrl && update.pdfUrl.trim() !== '';
            
            console.log("Has image:", hasImage, update.imageUrl);
            console.log("Has PDF:", hasPDF, update.pdfUrl);

            updateDetailsContainer.innerHTML = `
                <div class="details-header">
                    <h1 class="details-title">${update.title}</h1>
                    <div class="details-meta">
                        <div class="details-category">${update.category.replace(/-/g, ' ')}</div>
                        <div class="details-date">${date}</div>
                    </div>
                </div>
                
                <div class="details-content-wrapper">
                    <div class="details-content">
                        <p>${formattedContent}</p>
                    </div>
                </div>
                
                ${(hasImage || hasPDF) ? `
                <div class="details-attachments">
                    <h3 class="attachments-title">Attachments</h3>
                    <div class="details-attachments-grid">
                        ${hasImage ? `
                            <div class="details-attachment-item">
                                <h4 class="attachment-subtitle">Image</h4>
                                <div class="details-image" id="detailsImage">
                                    <img src="${update.imageUrl}" alt="${update.title}" 
                                         onclick="openImageModal('${update.imageUrl}')"
                                         onerror="handleImageError(this)">
                                    <div class="image-overlay">
                                        <span class="image-view-text">View full image</span>
                                    </div>
                                </div>
                            </div>
                        ` : ''}
                        
                        ${hasPDF ? `
                            <div class="details-attachment-item">
                                <h4 class="attachment-subtitle">Document</h4>
                                <div class="pdf-frame-container">
                                    <iframe src="${update.pdfUrl}" 
                                            class="pdf-frame"
                                            title="PDF Document" 
                                            allowfullscreen
                                            onload="checkPdfLoaded(this)"
                                            onerror="handlePdfError(this)">
                                    </iframe>
                                </div>
                            </div>
                        ` : ''}
                    </div>
                </div>
                ` : ''}
            `;

            // Check if PDF can load - removed forced fallback so that the iframe is always displayed
            if (hasPDF) {
                /* Removed fallback display logic
                setTimeout(() => {
                    const pdfFrame = document.getElementById('pdfFrame');
                    const pdfFallback = document.getElementById('pdfFallback');
                    
                    if (pdfFrame && pdfFallback) {
                        pdfFrame.style.display = 'none';
                        pdfFallback.style.display = 'flex';
                    }
                }, 500);
                */
            }

            // Make sure image modal works: bind click event on the image container
            setTimeout(() => {
                const detailsImageContainer = document.querySelector('.details-image');
                if (detailsImageContainer) {
                    detailsImageContainer.addEventListener('click', function() {
                        const img = this.querySelector('img');
                        if(img && img.src) {
                            openImageModal(img.src);
                        }
                    });
                }
            }, 500);
        });
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

// Clean up listener when navigating away from page
window.addEventListener('beforeunload', () => {
    if (updateListener) {
        updateListener();
    }
});

// Track PDF clicks and provide fallback
window.trackPdfClick = (pdfUrl) => {
    console.log("PDF clicked:", pdfUrl);
    
    // If PDF fails to open, provide alternative actions
    setTimeout(() => {
        const confirmDownload = confirm("If the PDF didn't open correctly, would you like to download it directly?");
        if (confirmDownload) {
            const a = document.createElement('a');
            a.href = pdfUrl;
            a.download = pdfUrl.split('/').pop() || 'document.pdf';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        }
    }, 3000);
    
    return true;
};

// Handle image errors
window.handleImageError = (imgElement) => {
    console.error("Failed to load image:", imgElement.src);
    
    // Find the parent details-image div and add error class
    const imageContainer = imgElement.closest('.details-image');
    if (imageContainer) {
        imageContainer.classList.add('image-error');
        imageContainer.innerHTML = ''; // Clear contents
    }
};

// Handle PDF errors with improved detection
window.handlePdfError = (pdfFrame, fallbackElement) => {
    if (!fallbackElement) {
        fallbackElement = document.getElementById('pdfFallback');
    }
    
    if (pdfFrame) {
        pdfFrame.style.display = 'none';
    }
    
    if (fallbackElement) {
        fallbackElement.style.display = 'flex';
    }
    
    console.error("Failed to load PDF in iframe");
};

// Enhanced image modal functionality
window.openImageModal = (src) => {
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    
    if (!modal || !modalImg) {
        console.error("Modal elements not found");
        return;
    }
    
    console.log("Opening modal with image:", src);
    modal.style.display = "block";
    
    // Add loading indication
    modalImg.style.opacity = "0";
    modalImg.src = src;
    
    // When image loads, fade it in
    modalImg.onload = function() {
        console.log("Image loaded successfully in modal");
        modalImg.style.transition = "opacity 0.3s ease";
        modalImg.style.opacity = "1";
    };
    
    // Handle image load errors
    modalImg.onerror = function() {
        console.error("Failed to load image in modal:", src);
        modalImg.src = "../assets/image-error.png"; // Fallback image
        modalImg.style.opacity = "1";
    };
    
    // Prevent scrolling when modal is open
    document.body.style.overflow = 'hidden';
};

// Add this helper function to check if PDF loaded successfully
window.checkPdfLoaded = function(iframe) {
    // This is just a placeholder - PDFs in iframes are problematic
    // We'll rely on the direct open/download approach as default
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

    // Set up image modal close button
    const closeModalBtn = document.querySelector('.close-modal');
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', () => {
            document.getElementById('imageModal').style.display = 'none';
            document.body.style.overflow = ''; // Restore scrolling
        });
    }

    // Close modal when clicking outside the image
    const imageModal = document.getElementById('imageModal');
    if (imageModal) {
        imageModal.addEventListener('click', function(e) {
            if (e.target === this) {
                this.style.display = 'none';
                document.body.style.overflow = ''; // Restore scrolling
            }
        });
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

// Add PDF viewer functionality
function openPdfViewer(pdfUrl, fileName) {
    // Create modal container
    const modal = document.createElement('div');
    modal.className = 'pdf-modal';
    modal.innerHTML = `
        <div class="pdf-modal-content">
            <div class="pdf-toolbar">
                <div class="pdf-toolbar-title">${fileName}</div>
                <div class="pdf-toolbar-actions">
                    <a href="${pdfUrl}" download="${fileName}" class="download-pdf">
                        <i class="fas fa-download"></i>
                        Download
                    </a>
                    <button class="close-pdf">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
            </div>
            <div class="pdf-container">
                <iframe src="${pdfUrl}" frameborder="0"></iframe>
            </div>
        </div>
    `;

    // Add to body
    document.body.appendChild(modal);
    
    // Show modal
    setTimeout(() => modal.classList.add('active'), 10);

    // Handle close
    const closeBtn = modal.querySelector('.close-pdf');
    closeBtn.onclick = () => {
        modal.classList.remove('active');
        setTimeout(() => modal.remove(), 300);
    };
}

// Add click handler for PDF links
document.addEventListener('click', (e) => {
    const pdfLink = e.target.closest('.details-pdf');
    if (pdfLink) {
        e.preventDefault();
        const pdfUrl = pdfLink.href;
        const fileName = pdfLink.getAttribute('download') || 'document.pdf';
        openPdfViewer(pdfUrl, fileName);
    }
});

// Handle PDF link clicks to open in new page
document.addEventListener('click', function(e) {
    const pdfLink = e.target.closest('.details-pdf');
    if (pdfLink) {
        e.preventDefault();
        
        // Get PDF URL and filename
        const pdfUrl = pdfLink.getAttribute('href');
        const pdfName = pdfLink.querySelector('span').textContent || 'document.pdf';
        
        // Open PDF in new page with parameters
        window.open(`pdf-viewer.html?pdf=${encodeURIComponent(pdfUrl)}&name=${encodeURIComponent(pdfName)}`, '_blank');
    }
});
