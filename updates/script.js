// -------------------------Dark mode and light mode---------------------
let mode = document.getElementById("mode");
let mode2 = document.getElementById("mode2");
// const frame = document.getElementById("frame").contentWindow;

mode.onclick = function() {
    // document.body.classList.toggle("dark-mode");
    if (mode.classList.contains("bxs-moon")) {
        document.body.classList.add("dark-mode");
        mode.classList.remove("bxs-moon");
        mode.classList.add("bxs-sun");
        localStorage.setItem("theme", "dark");
        // frame.postMessage({ type: "darkMode" }, "*");
    } else {
        document.body.classList.remove("dark-mode");
        mode.classList.remove("bxs-sun");
        mode.classList.add("bxs-moon");
        localStorage.setItem("theme", "light");
        // frame.postMessage({ type: "lightMode" }, "*");
    }
}

mode2.onclick = function() {
    // document.body.classList.toggle("dark-mode");
    if (mode2.classList.contains("bxs-moon")) {
        document.body.classList.add("dark-mode");
        mode2.classList.remove("bxs-moon");
        mode2.classList.add("bxs-sun");
        localStorage.setItem("theme", "dark");
        // frame.postMessage({ type: "darkMode" }, "*");
    } else {
        document.body.classList.remove("dark-mode");
        mode2.classList.remove("bxs-sun");
        mode2.classList.add("bxs-moon");
        localStorage.setItem("theme", "light");
        // frame.postMessage({ type: "lightMode" }, "*");
    }
}

window.onload = function() {
    var checkTheme = localStorage.getItem("theme");
    if (checkTheme === "dark") {
        document.body.classList.add("dark-mode");
        mode.classList.remove("bxs-moon");
        mode.classList.add("bxs-sun");
        mode2.classList.remove("bxs-moon");
        mode2.classList.add("bxs-sun");
        // frame.postMessage({ type: "darkMode" }, "*");
    } else {
        document.body.classList.remove("dark-mode");
        mode.classList.remove("bxs-sun");
        mode.classList.add("bxs-moon");
        mode2.classList.remove("bxs-sun");
        mode2.classList.add("bxs-moon");
        // frame.postMessage({ type: "lightMode" }, "*");
    }
}
// -------------------------Dark mode and light mode---------------------





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
