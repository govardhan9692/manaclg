// -------------------------Dark mode and light mode---------------------
let mode = document.getElementById("mode");
let mode2 = document.getElementById("mode2");

// Enhanced theme toggle function that ensures all elements update properly
function setTheme(isDark) {
    if (isDark) {
        document.body.classList.add("dark-mode");
        // Update both theme icons
        if (mode) {
            mode.classList.remove("bxs-moon");
            mode.classList.add("bxs-sun");
        }
        if (mode2) {
            mode2.classList.remove("bxs-moon");
            mode2.classList.add("bxs-sun");
        }
        localStorage.setItem("theme", "dark");
    } else {
        document.body.classList.remove("dark-mode");
        // Update both theme icons
        if (mode) {
            mode.classList.remove("bxs-sun");
            mode.classList.add("bxs-moon");
        }
        if (mode2) {
            mode2.classList.remove("bxs-sun");
            mode2.classList.add("bxs-moon");
        }
        localStorage.setItem("theme", "light");
    }
    
    // Force update details page elements if they exist
    const detailsPage = document.querySelector('.update-details');
    if (detailsPage) {
        detailsPage.style.backgroundColor = getComputedStyle(document.documentElement).getPropertyValue('--update-bg');
        detailsPage.style.color = getComputedStyle(document.documentElement).getPropertyValue('--update-text');
    }
}

// Update click handlers to use the new function
if (mode) {
    mode.onclick = function() {
        const isDark = mode.classList.contains("bxs-moon");
        setTheme(isDark);
    }
}

if (mode2) {
    mode2.onclick = function() {
        const isDark = mode2.classList.contains("bxs-moon");
        setTheme(isDark);
    }
}

// Apply theme on page load and handle delayed DOM elements
function applyThemeOnLoad() {
    const checkTheme = localStorage.getItem("theme");
    setTheme(checkTheme === "dark");
    
    // Set up a mutation observer to catch dynamically loaded elements
    const observer = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
            if (mutation.addedNodes.length) {
                const detailsPage = document.querySelector('.update-details');
                if (detailsPage) {
                    // Re-apply theme to ensure details page gets updated
                    setTheme(document.body.classList.contains("dark-mode"));
                }
            }
        });
    });
    
    // Start observing the document body for changes
    observer.observe(document.body, { childList: true, subtree: true });
}

// Replace the original window.onload function
window.addEventListener('DOMContentLoaded', applyThemeOnLoad);

// -------------------------Dark mode and light mode---------------------

// Add these functions at the top of the file
window.openSidebar = function() {
    const sideBar = document.getElementById("sidebar");
    if (sideBar) {
        sideBar.style.display = 'flex';
    }
};

window.closeSidebar = function() {
    const sideBar = document.getElementById("sidebar");
    if (sideBar) {
        sideBar.style.display = 'none';
    }
};

// Enable menu button functionality globally
window.openSidebar = function() {
    const sideBar = document.getElementById("sidebar");
    if (sideBar) {
        sideBar.style.display = 'flex';
    }
}

window.closeSidebar = function() {
    const sideBar = document.getElementById("sidebar");
    if (sideBar) {
        sideBar.style.display = 'none';
    }
}

// ------------------------------Pre loader----------------------------


// window.addEventListener("load", function() {
//     const preloader = document.getElementById("preloader");
//     setTimeout(function() {
//         preloader.style.display = "none";
//     }, 1000); // Hide preloader after 3 seconds (3000 milliseconds)
// });


// ------------------------------Pre loader----------------------------

// ----------------------------left side bar
const leftSidebar = document.getElementById('options-container');

function toggleLeftSidebar() {
    leftSidebar.classList.toggle('collapsed');

}




//----------------------- menu bar  open & close functionaliy----------------------



let sideBar = document.getElementById("sidebar");

function openSidebar(){
    sideBar.style.display = 'flex';
}
function closeSidebar(){
    sideBar.style.display = 'none';
}

// ----------------------------------------------------------

//----------------------- Options (home, Updates ,level up ,Profile) apperience on click ----------------------

// var optionsContainer = document.getElementById("options-container");

// function handleClick(e) {
//     let options = document.querySelectorAll(".left-sidebar-icon");
//     for (option of options) {
//         if (option.classList.contains("stay")) {
//             option.classList.remove("stay");
//         }
//     }

//     if (e.target.tagName == "SPAN" || e.target.tagName == "I") {
//         let i = e.target.parentElement;
//         i.classList.add("stay");
//     } else if (e.target.classList.contains("left-sidebar-icon")) {
//         let i = e.target;
//         i.classList.add("stay");
//     }
// }

// optionsContainer.addEventListener("click", handleClick);
