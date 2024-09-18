
document.addEventListener('DOMContentLoaded', function () {



    const menuIcon = document.getElementById("menu-icon");
    const navBox = document.getElementById("navBox");
    const body = document.body;

    function toggleMenu() {
        menuIcon.classList.toggle("open");
        navBox.style.right = navBox.style.right === "0px" ? "-500px" : "0px";
    }

    // Close menu when clicking outside of it
    body.addEventListener('click', function (e) {
        if (!navBox.contains(e.target) && !menuIcon.contains(e.target)) {
            closeMenu();
        }
    });

        // Smooth scrolling for navigation links and close menu after clicking a link
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
        // Close the menu after navigating
        closeMenu();
    });
});



    // Prevent menu from closing when clicking inside the menu
    navBox.addEventListener('click', function (e) {
        e.stopPropagation();
    });

    function closeMenu() {
        menuIcon.classList.remove("open");
        navBox.style.right = "-500px";
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Add animation to benefits
    const benefits = document.querySelectorAll('.benefit');
    const animateBenefits = () => {
        benefits.forEach((benefit, index) => {
            const benefitPosition = benefit.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;

            if (benefitPosition < screenPosition) {
                setTimeout(() => {
                    benefit.classList.add('animate');
                }, index * 100);
            }
        });
    };

    window.addEventListener('scroll', animateBenefits);

    // Handle form submission
    const registerForm = document.getElementById('registerForm');
    registerForm.addEventListener('submit', function (e) {
        e.preventDefault();
        alert('Thank you for registering! We will contact you soon.');
        registerForm.reset();
    });

    // Make menu icon clickable
    menuIcon.addEventListener('click', toggleMenu);
});


/* Add this to your existing JavaScript */
const sections = document.querySelectorAll('section');

const animateSections = () => {
    sections.forEach(section => {
        const sectionPosition = section.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        if (sectionPosition < screenPosition) {
            section.classList.add('animate');
        }
    });
};

window.addEventListener('scroll', animateSections);

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Section animations
// FAQ Toggle
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
        item.classList.toggle('active');
    });
});

// Handle form submission
const registerForm = document.getElementById('registerForm');
registerForm.addEventListener('submit', function (e) {
    e.preventDefault();
    
    const formData = new FormData(registerForm);
    const scriptURL = 'https://script.google.com/macros/s/AKfycbzmvsbPgRj6VthxgzyPnPc36BCeCt4qBycbiQ_OzdzM-bjlyu5-prMcdMVNZ_Hli2hzGQ/exec';

    // Show loading message
    const loadingMessage = document.createElement('div');
    loadingMessage.textContent = 'Redirecting to payment page...';
    loadingMessage.style.cssText = 'position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); background: rgba(0,0,0,0.8); color: white; padding: 20px; border-radius: 10px; z-index: 9999;';
    document.body.appendChild(loadingMessage);

    // Immediately store form data and redirect
    localStorage.setItem('studentName', formData.get('fullName'));
    localStorage.setItem('studentEmail', formData.get('email'));
    localStorage.setItem('studentPhone', formData.get('phone'));
    
    // Redirect to payment page
    window.location.href = 'payment.html';

    // Send form data in the background
    fetch(scriptURL, { method: 'POST', body: formData })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok.');
            }
        })
        .catch(error => {
            console.error('Error!', error.message);
            // You might want to log this error or handle it in some way
        });
});
// Scroll animations
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.scroll-animate, .scroll-animate-left, .scroll-animate-right');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (elementPosition < screenPosition) {
            element.classList.add('animate');
        }
    });
};

window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);
// Countdown timer
function updateCountdown() {
    const now = new Date();
    const end = new Date(now.getFullYear(), 7, 5, 23, 59, 59); // Adjusted to August 5th
    const diff = end - now;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    const countdownText = document.getElementById('countdown-text');
    countdownText.textContent = `${days}D:${hours.toString().padStart(2, '0')}H:${minutes.toString().padStart(2, '0')}M:${seconds.toString().padStart(2, '0')}S`;

    if (diff < 0) {
        clearInterval(countdownInterval); // Stop the countdown when time is up
        countdownText.textContent = "Registration Closed";
    }
}

const countdownInterval = setInterval(updateCountdown, 1000);
