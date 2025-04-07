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

// Function to load updates
async function loadUpdates() {
    try {
        const snapshot = await db.collection('updates')
            .orderBy('timestamp', 'desc')
            .get();
        
        allUpdates = snapshot.docs.map(doc => {
            return { id: doc.id, ...doc.data() };
        });
        
        displayUpdates(allUpdates);
    } catch (error) {
        console.error("Error loading updates:", error);
        updateList.innerHTML = `<div class="error">Error loading updates. Please try again later.</div>`;
    }
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
        const date = update.timestamp ? new Date(update.timestamp.seconds * 1000).toLocaleDateString() : 'No date';
        
        card.innerHTML = `
            <div class="card-content">
                <div class="card-title">${update.title}</div>
                <div class="card-category">${update.category.replace(/-/g, ' ')}</div>
                <div class="card-text">${update.content.substring(0, 150)}${update.content.length > 150 ? '...' : ''}</div>
                <div class="card-meta">
                    <span class="card-date">${date}</span>
                </div>
                <div class="card-actions">
                    <a href="detail.html?id=${update.id}" class="view-details-btn">
                        View Details <i class="fas fa-arrow-right"></i>
                    </a>
                    <div class="card-attachments">
                        ${update.imageUrl ? 
                            `<button class="attachment-btn image-btn" onclick="previewImage('${update.imageUrl}', event)">
                                <i class="fa-solid fa-image"></i>
                             </button>` : ''}
                        ${update.pdfUrl ? 
                            `<button class="attachment-btn pdf-btn" onclick="previewPDF('${update.pdfUrl}', event)">
                                <i class="fa-solid fa-file-pdf"></i>
                             </button>` : ''}
                    </div>
                </div>
            </div>
        `;
        
        updateList.appendChild(card);
    });
}

// Function to preview image in modal
window.previewImage = (imageUrl, event) => {
    event.preventDefault();
    event.stopPropagation();
    
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const closeBtn = document.querySelector('.close-modal');
    
    modalImage.src = imageUrl;
    modal.style.display = 'block';
    
    // Prevent scrolling when modal is open
    document.body.style.overflow = 'hidden';
};

// Function to preview PDF in new window
window.previewPDF = (pdfUrl, event) => {
    event.preventDefault();
    event.stopPropagation();
    
    window.open(pdfUrl, '_blank');
};

// Search functionality
searchInput.addEventListener('input', () => {
    const searchTerm = searchInput.value.toLowerCase().trim();
    
    if (!searchTerm) {
        displayUpdates(allUpdates);
        return;
    }
    
    const filteredUpdates = allUpdates.filter(update => {
        return (
            update.title.toLowerCase().includes(searchTerm) ||
            update.content.toLowerCase().includes(searchTerm) ||
            update.category.toLowerCase().includes(searchTerm)
        );
    });
    
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
