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

// DOM elements
const updateList = document.getElementById('updateList');
const searchInput = document.getElementById('searchInput');
const noResults = document.getElementById('noResults');

// Load all updates
let allUpdates = [];

// Use real-time listener instead of one-time fetch
let unsubscribe = null; // Store the listener to unsubscribe later if needed

// Function to load updates with real-time listener
function loadUpdates() {
    // Display loading indicator first
    updateList.innerHTML = '<div class="loading-indicator"><i class="fa-solid fa-spinner fa-spin"></i><span>Loading updates...</span></div>';
    
    // If we already have a listener, unsubscribe first
    if (unsubscribe) {
        unsubscribe();
    }
    
    // Set up real-time listener
    unsubscribe = db.collection('updates')
        .orderBy('timestamp', 'desc')
        .onSnapshot((snapshot) => {
            // Handle real-time updates
            allUpdates = snapshot.docs.map(doc => {
                return { id: doc.id, ...doc.data() };
            });
            
            // Display updates using our existing function
            displayUpdates(allUpdates);
            
            // If we have a search term, filter the results
            const searchTerm = searchInput.value.toLowerCase().trim();
            if (searchTerm) {
                const filteredUpdates = filterUpdates(searchTerm);
                displayUpdates(filteredUpdates);
            }
            
            // If we have a filter applied, apply it
            const activeFilter = document.querySelector('.filter-content a.active');
            if (activeFilter && activeFilter.getAttribute('data-filter') !== 'all') {
                const filterValue = activeFilter.getAttribute('data-filter');
                const filteredUpdates = allUpdates.filter(update => {
                    return update.category === filterValue;
                });
                displayUpdates(filteredUpdates);
            }
        }, (error) => {
            console.error("Error loading updates:", error);
            updateList.innerHTML = `<div class="error">Error loading updates. Please try again later.</div>`;
        });
}

// Helper function to filter updates by search term
function filterUpdates(searchTerm) {
    return allUpdates.filter(update => {
        return (
            update.title.toLowerCase().includes(searchTerm) ||
            update.content.toLowerCase().includes(searchTerm) ||
            update.category.toLowerCase().includes(searchTerm)
        );
    });
}

// Function to display updates as cards
function displayUpdates(updates) {
    updateList.innerHTML = '';
    
    if (updates.length === 0) {
        noResults.style.display = 'block';
        return;
    }
    
    noResults.style.display = 'none';
    
    updates.forEach(update => {
        const card = document.createElement('div');
        card.className = 'update-card';
        
        // Format the date if timestamp exists
        const date = update.timestamp 
            ? new Date(update.timestamp.seconds * 1000).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long', 
                day: 'numeric'
              }) 
            : 'No date';
            
        // Check if attachments exist
        const hasImage = update.imageUrl && update.imageUrl.trim() !== '';
        const hasPDF = update.pdfUrl && update.pdfUrl.trim() !== '';
        
        card.innerHTML = `
            <div class="card-content">
                <div class="card-header">
                    <div class="card-header-left">
                        <h2 class="card-title">${update.title}</h2>
                        <div class="card-meta">
                            <span class="card-category">${update.category.replace(/-/g, ' ')}</span>
                        </div>
                    </div>
                    <span class="card-date"><i class="far fa-calendar"></i> ${date}</span>
                </div>
                <div class="card-text">${update.content.substring(0, 200)}${update.content.length > 200 ? '...' : ''}</div>
                <div class="card-actions">
                    <div class="card-attachments">
                        ${hasImage ? 
                            `<div class="attachment-indicator image-indicator" onclick="previewImage('${update.imageUrl}', event)">
                                <i class="fas fa-image"></i> View Image
                             </div>` : ''}
                        ${hasPDF ? 
                            `<div class="attachment-indicator pdf-indicator" onclick="previewPDF('${update.pdfUrl}', event)">
                                <i class="fas fa-file-pdf"></i> View PDF
                             </div>` : ''}
                    </div>
                </div>
            </div>
        `;
        
        // Make entire card clickable to navigate to details
        card.addEventListener('click', (e) => {
            // Don't navigate if clicking on an attachment indicator
            if (!e.target.closest('.attachment-indicator')) {
                window.location.href = `detail.html?id=${update.id}`;
            }
        });
        
        updateList.appendChild(card);
    });
}

// Function to preview image in modal - with improved error handling
window.previewImage = (imageUrl, event) => {
    if (event) {
        event.preventDefault();
        event.stopPropagation();
    }
    
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    
    if (!modal || !modalImage) {
        console.error("Modal elements not found");
        return;
    }
    
    console.log("Preview image:", imageUrl);
    
    // Show loading state
    modalImage.src = '';
    modal.style.display = 'block';
    modalImage.style.opacity = '0';
    
    // Handle image loading
    modalImage.onload = function() {
        modalImage.style.opacity = '1';
        console.log("Modal image loaded successfully");
    };
    
    modalImage.onerror = function() {
        console.error("Failed to load image in modal:", imageUrl);
        modalImage.src = "../assets/image-error.png"; // Fallback image
        modalImage.style.opacity = "1";
    };
    
    // Set the image source after attaching event handlers
    modalImage.src = imageUrl;
    
    // Prevent scrolling when modal is open
    document.body.style.overflow = 'hidden';
};

// Function to preview PDF in new window
window.previewPDF = (pdfUrl, event) => {
    event.preventDefault();
    event.stopPropagation();
    
    window.open(pdfUrl, '_blank');
};

// Search functionality - refactored for better integration with real-time updates
searchInput.addEventListener('input', () => {
    const searchTerm = searchInput.value.toLowerCase().trim();
    
    if (!searchTerm) {
        displayUpdates(allUpdates);
        return;
    }
    
    const filteredUpdates = filterUpdates(searchTerm);
    displayUpdates(filteredUpdates);
});

// Enhanced filter functionality
document.querySelectorAll('.filter-content a').forEach(filter => {
    filter.addEventListener('click', (e) => {
        e.preventDefault();
        const filterValue = filter.getAttribute('data-filter');
        const filterText = filter.textContent;
        const filterBtn = document.querySelector('.filter-btn');
        
        // Update active class
        document.querySelectorAll('.filter-content a').forEach(item => {
            item.classList.remove('active');
        });
        filter.classList.add('active');
        
        // Update button text
        filterBtn.innerHTML = `Filter: ${filterText} <i class="fa-solid fa-chevron-down"></i>`;
        
        if (filterValue === 'all') {
            displayUpdates(allUpdates);
        } else {
            const filteredUpdates = allUpdates.filter(update => {
                return update.category === filterValue;
            });
            
            displayUpdates(filteredUpdates);
        }
        
        // Close filter dropdown
        document.querySelector('.filter-content').style.display = 'none';
    });
});

// Toggle filter dropdown with animation
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const content = btn.nextElementSibling;
        if (content.style.display === 'block') {
            content.style.display = 'none';
            btn.classList.remove('open');
        } else {
            content.style.display = 'block';
            content.classList.add('show');
            btn.classList.add('open');
        }
    });
});

// Close filter dropdown when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.matches('.filter-btn') && !e.target.closest('.filter-btn')) {
        document.querySelectorAll('.filter-content').forEach(content => {
            content.style.display = 'none';
        });
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('open');
        });
    }
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadUpdates();
    
    // Set "All" as the default active filter
    document.querySelector('[data-filter="all"]').classList.add('active');
});

// Enhanced modal image preview
const imageModal = document.getElementById('imageModal');
const modalImage = document.getElementById('modalImage');
const closeModalBtn = document.querySelector('.close-modal');

// Close modal when clicking on close button
closeModalBtn.addEventListener('click', () => {
    imageModal.style.display = 'none';
    document.body.style.overflow = ''; // Restore scrolling
});

// Close modal when clicking outside the image
imageModal.addEventListener('click', (e) => {
    if (e.target === imageModal) {
        imageModal.style.display = 'none';
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

// Ensure we clean up when the page unloads
window.addEventListener('beforeunload', () => {
    if (unsubscribe) {
        unsubscribe();
    }
});
