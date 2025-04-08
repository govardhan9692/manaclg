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
const auth = firebase.auth();
const db = firebase.firestore();

// Initialize Supabase client
const supabaseClient = supabase.createClient(
    'https://nhccpcnqmanxfgusgzji.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5oY2NwY25xbWFueGZndXNnemppIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk5NDk0NzIsImV4cCI6MjA1NTUyNTQ3Mn0.QcQss8RwDQ-Q0-hOfRQM2M4LgdBZS2bbRGNmYTiJvaM'
);

// DOM elements
const adminHeader = document.getElementById('adminHeader');
const loginSection = document.getElementById('loginSection');
const updateSection = document.getElementById('updateSection');
const updateForm = document.getElementById('updateForm');
const imageInput = document.getElementById('updateImage');
const pdfInput = document.getElementById('updatePDF');
const imagePreview = document.getElementById('imagePreview');
const pdfPreview = document.getElementById('pdfPreview');
const submitBtn = document.getElementById('submitBtn');
const cancelBtn = document.getElementById('cancelBtn');
const updatesList = document.querySelector('.updates-container');
const updatesLoading = document.getElementById('updatesLoading');
const refreshUpdatesBtn = document.getElementById('refreshUpdates');
const themeToggleBtn = document.getElementById('themeToggle');
const logoutBtn = document.getElementById('logoutBtn');

// Theme handling
function initTheme() {
    const currentTheme = localStorage.getItem('adminTheme') || 'light';
    if (currentTheme === 'dark') {
        document.body.setAttribute('data-theme', 'dark');
        themeToggleBtn.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        document.body.removeAttribute('data-theme');
        themeToggleBtn.innerHTML = '<i class="fas fa-moon"></i>';
    }
}

if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
        if (document.body.getAttribute('data-theme') === 'dark') {
            document.body.removeAttribute('data-theme');
            localStorage.setItem('adminTheme', 'light');
            themeToggleBtn.innerHTML = '<i class="fas fa-moon"></i>';
        } else {
            document.body.setAttribute('data-theme', 'dark');
            localStorage.setItem('adminTheme', 'dark');
            themeToggleBtn.innerHTML = '<i class="fas fa-sun"></i>';
        }
    });
}

// Handle login form submission
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('adminEmail').value;
        const password = document.getElementById('adminPassword').value;
        
        try {
            loginForm.querySelector('button').disabled = true;
            loginForm.querySelector('button').innerHTML = '<i class="fas fa-spinner fa-spin"></i> Logging in...';
            
            await auth.signInWithEmailAndPassword(email, password);
        } catch (error) {
            showAlert('error', `Login failed: ${error.message}`);
            loginForm.querySelector('button').disabled = false;
            loginForm.querySelector('button').innerHTML = '<i class="fas fa-sign-in-alt"></i> Login';
        }
    });
}

// Check auth state
auth.onAuthStateChanged((user) => {
    if (user) {
        loginSection.style.display = 'none';
        adminHeader.style.display = 'flex';
        updateSection.style.display = 'block';
        initTheme();
        loadUpdates();
    } else {
        loginSection.style.display = 'block';
        adminHeader.style.display = 'none';
        updateSection.style.display = 'none';
    }
});

// Logout functionality
if (logoutBtn) {
    logoutBtn.addEventListener('click', async () => {
        try {
            // Clean up listener before logging out
            if (updatesListener) {
                updatesListener();
                updatesListener = null;
            }
            await auth.signOut();
        } catch (error) {
            showAlert('error', `Logout failed: ${error.message}`);
        }
    });
}

// Show alert message
function showAlert(type, message) {
    const alertEl = document.createElement('div');
    alertEl.className = `alert alert-${type === 'error' ? 'danger' : 'success'}`;
    alertEl.textContent = message;
    
    // Insert at the top of the update section
    const firstChild = updateSection.firstChild;
    updateSection.insertBefore(alertEl, firstChild);
    
    // Remove after 5 seconds
    setTimeout(() => {
        alertEl.remove();
    }, 5000);
}

// Store the snapshot listener
let updatesListener = null;

// Load existing updates with real-time listener
async function loadUpdates() {
    updatesLoading.style.display = 'flex';
    updatesList.innerHTML = '';
    
    // If we already have a listener, unsubscribe
    if (updatesListener) {
        updatesListener();
    }
    
    try {
        // Set up real-time listener
        updatesListener = db.collection('updates')
            .orderBy('timestamp', 'desc')
            .onSnapshot((snapshot) => {
                updatesLoading.style.display = 'none';
                updatesList.innerHTML = '';
                
                if (snapshot.empty) {
                    updatesList.innerHTML = '<p class="no-updates">No updates found. Create your first update above.</p>';
                    return;
                }

                snapshot.forEach((doc) => {
                    const update = doc.data();
                    const updateElement = createUpdateElement(doc.id, update);
                    updatesList.appendChild(updateElement);
                });
            }, (error) => {
                updatesLoading.style.display = 'none';
                showAlert('error', `Error loading updates: ${error.message}`);
            });
    } catch (error) {
        updatesLoading.style.display = 'none';
        showAlert('error', `Error setting up updates listener: ${error.message}`);
    }
}

// Create an update element
function createUpdateElement(id, update) {
    const div = document.createElement('div');
    div.className = 'admin-update';
    
    const date = update.timestamp ? new Date(update.timestamp.seconds * 1000).toLocaleDateString() : 'No date';
    
    div.innerHTML = `
        <h4>${update.title}</h4>
        <div class="admin-update-meta">
            <span>Category: ${update.category.replace(/-/g, ' ')}</span>
            <span>${date}</span>
        </div>
        <span class="update-badge">${update.category.replace(/-/g, ' ')}</span>
        <p>${update.content.substring(0, 120)}${update.content.length > 120 ? '...' : ''}</p>
        
        ${update.imageUrl ? 
            `<div class="preview-media">
                <i class="fas fa-image"></i>
                <span>Image attached</span>
            </div>` : ''
        }
        ${update.pdfUrl ? 
            `<div class="preview-media">
                <i class="fas fa-file-pdf"></i>
                <span>PDF attached</span>
            </div>` : ''
        }
        <div class="update-actions">
            <button onclick="editUpdate('${id}')"><i class="fas fa-edit"></i> Edit</button>
            <button onclick="deleteUpdate('${id}')"><i class="fas fa-trash-alt"></i> Delete</button>
        </div>
    `;
    return div;
}

// Refresh updates
if (refreshUpdatesBtn) {
    refreshUpdatesBtn.addEventListener('click', loadUpdates);
}

// Handle file inputs
imageInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        imagePreview.innerHTML = `
            <div class="preview-media">
                <img src="${URL.createObjectURL(file)}" alt="Preview">
                <span>${file.name}</span>
            </div>
        `;
    } else {
        imagePreview.innerHTML = '';
    }
});

pdfInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        pdfPreview.innerHTML = `
            <div class="preview-media">
                <i class="fas fa-file-pdf"></i>
                <span>${file.name}</span>
            </div>
        `;
    } else {
        pdfPreview.innerHTML = '';
    }
});

// Edit update
window.editUpdate = async (id) => {
    const doc = await db.collection('updates').doc(id).get();
    const update = doc.data();
    
    document.getElementById('updateId').value = id;
    document.getElementById('updateTitle').value = update.title;
    document.getElementById('updateCategory').value = update.category;
    document.getElementById('updateContent').value = update.content;
    
    if (update.imageUrl) {
        imagePreview.innerHTML = `
            <div class="preview-media">
                <img src="${update.imageUrl}" alt="Preview">
                <span>Current image</span>
            </div>
        `;
    } else {
        imagePreview.innerHTML = '';
    }
    
    if (update.pdfUrl) {
        pdfPreview.innerHTML = `
            <div class="preview-media">
                <i class="fas fa-file-pdf"></i>
                <span>Current PDF</span>
            </div>
        `;
    } else {
        pdfPreview.innerHTML = '';
    }
    
    submitBtn.innerHTML = '<i class="fas fa-save"></i> Update';
    cancelBtn.style.display = 'inline-flex';
    
    // Scroll to form
    updateForm.scrollIntoView({ behavior: 'smooth' });
};

// Delete update
window.deleteUpdate = async (id) => {
    if (confirm('Are you sure you want to delete this update? This action cannot be undone.')) {
        try {
            await db.collection('updates').doc(id).delete();
            showAlert('success', 'Update deleted successfully!');
            loadUpdates();
        } catch (error) {
            showAlert('error', `Error deleting update: ${error.message}`);
        }
    }
};

// Cancel edit
cancelBtn.addEventListener('click', () => {
    resetForm();
});

// Reset form
function resetForm() {
    updateForm.reset();
    document.getElementById('updateId').value = '';
    imagePreview.innerHTML = '';
    pdfPreview.innerHTML = '';
    submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Post Update';
    cancelBtn.style.display = 'none';
}

// Handle update form submission
updateForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const updateId = document.getElementById('updateId').value;
    const title = document.getElementById('updateTitle').value;
    const category = document.getElementById('updateCategory').value;
    const content = document.getElementById('updateContent').value;
    const imageFile = imageInput.files[0];
    const pdfFile = pdfInput.files[0];

    try {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
        
        const updateData = {
            title,
            category,
            content,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        };

        // Keep track of original values when editing
        let originalData = {};
        if (updateId) {
            const doc = await db.collection('updates').doc(updateId).get();
            originalData = doc.data() || {};
        }

        // Handle image upload to Cloudinary
        if (imageFile) {
            const formData = new FormData();
            formData.append('file', imageFile);
            formData.append('upload_preset', 'manaclgupdates');

            console.log("Uploading image:", imageFile.name);
            
            try {
                const response = await fetch(
                    'https://api.cloudinary.com/v1_1/dkg4ghjsh/image/upload',
                    {
                        method: 'POST',
                        body: formData
                    }
                );
                
                if (!response.ok) {
                    throw new Error(`Image upload failed with status: ${response.status}`);
                }
                
                const data = await response.json();
                console.log("Image upload successful:", data.secure_url);
                updateData.imageUrl = data.secure_url;
            } catch (imageError) {
                console.error("Image upload error:", imageError);
                throw new Error(`Image upload failed: ${imageError.message}`);
            }
        } else if (!imageFile && updateId) {
            // When editing, keep the original image URL if no new image is selected
            if (originalData.imageUrl) {
                updateData.imageUrl = originalData.imageUrl;
            }
        }

        // Handle PDF upload to Supabase
        if (pdfFile) {
            const fileName = `${Date.now()}-${pdfFile.name}`;
            console.log("Uploading PDF:", fileName);
            
            try {
                const { error: uploadError, data: uploadData } = await supabaseClient.storage
                    .from('pdfs')
                    .upload(fileName, pdfFile, {
                        cacheControl: '3600',
                        upsert: false
                    });

                if (uploadError) throw uploadError;

                console.log("PDF upload successful:", fileName);
                
                const { data: { publicUrl } } = supabaseClient.storage
                    .from('pdfs')
                    .getPublicUrl(fileName);

                console.log("PDF public URL:", publicUrl);
                updateData.pdfUrl = publicUrl;
            } catch (pdfError) {
                console.error("PDF upload error:", pdfError);
                throw new Error(`PDF upload failed: ${pdfError.message}`);
            }
        } else if (!pdfFile && updateId) {
            // When editing, keep the original PDF URL if no new PDF is selected
            if (originalData.pdfUrl) {
                updateData.pdfUrl = originalData.pdfUrl;
            }
        }

        console.log("Saving update with data:", updateData);

        // Save to Firebase
        if (updateId) {
            await db.collection('updates').doc(updateId).update(updateData);
            showAlert('success', 'Update modified successfully!');
        } else {
            await db.collection('updates').add(updateData);
            showAlert('success', 'Update posted successfully!');
        }

        resetForm();
        loadUpdates();
    } catch (error) {
        console.error("Form submission error:", error);
        showAlert('error', `Error: ${error.message}`);
    } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = updateId ? 
            '<i class="fas fa-save"></i> Update' : 
            '<i class="fas fa-paper-plane"></i> Post Update';
    }
});

// Initialize theme on page load
document.addEventListener('DOMContentLoaded', initTheme);
