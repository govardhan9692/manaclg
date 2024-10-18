// Play background music
// window.addEventListener("clcik" , ()=>{
//     document.getElementById("background-music").play();
//   })

// Define team members data
const teamMembers = [
    { name: "Govardhan Rajulapati", role: "Founder & CEO", image: "govardhan.jpg", bio: "As the CEO and founder, Govardhan Rajulapati is responsible for setting the overall strategic direction and vision of the company..." },
    // { name: "Sai Yakkati", role: "Chief Artificial Intelligence Officer", image: "sai.jpeg", bio: "Sai Yakkati, as the Chief Artificial Intelligence Officer, is responsible for leading the company's efforts in leveraging artificial intelligence (AI) and machine learning technologies..." },
    { name: "Srinu Chalamala", role: "Chief Technology Officer", image: "srinu.jpeg", bio: "Srinu Chalamala, as the Chief Technology Officer (CTO), is responsible for overseeing the company's technological direction, development, and innovation..." },
    { name: "Gagan Dileep Vemula", role: "Chief Information Officer", image: "gagan.jpg", bio: "Gagan Dileep Vemula, as the Chief Information Officer (CIO), is responsible for managing the company's information technology (IT) systems and processes..." },
    { name: "Dawood Shaik", role: "Chief Account and Financial Officer", image: "dawood.jpeg", bio: "Dawood Shaik, as the Chief Account and Financial Officer, is responsible for overseeing the company's financial operations and managing its financial resources..." },
    { name: "Rakesh Bodavula", role: "Chief Cyber Officer", image: "rakesh.jpg", bio: "Rakesh Bodavula, as the Chief Cyber Officer, is responsible for overseeing the company's cybersecurity strategy and ensuring the security of its digital assets and infrastructure..." },
    { name: "Mario DT", role: "Chief Advertising & Marketing Officer", image: "mario.jpeg", bio: "Mario DT,  as the Chief Marketing and Advertising Officer (CAMO), oversees the company's overall marketing and advertising efforts..." },
    { name: "Pradeep Vemula", role: " Chief Operating Officer", image: "pradeep.jpg", bio: "Pradeep Vemula, as the Chief Operating Officer (COO), is responsible for overseeing the company's day-to-day operations and ensuring operational efficiency and effectiveness..." },
    { name: "Satish Pamarthi", role: "Brand Ambassador", image: "satish.jpeg", bio: "As a Brand Ambassador, Satish Pamarthi represents the company publicly and promotes its brand, products, and services..." }
];



// Function to create team member cards
function createTeamMemberCard(member) {
    const card = document.createElement('div');
    card.classList.add('team-member');
    card.innerHTML = `
        <div class="circle-spin"></div>
        <img src="images/${member.image}" alt="${member.name}">
        <h3>${member.name}</h3>
        <p><strong>Role:</strong> ${member.role}</p>
        <p>${member.bio}</p>
    `;
    return card;
}

// Function to add team member cards to the page
function renderTeamMembers() {
    const teamSection = document.getElementById('team');
    teamMembers.forEach(member => {
        const card = createTeamMemberCard(member);
        teamSection.appendChild(card);
    });
}

// Call the function to render team members
renderTeamMembers();



// Toggle icon navbar
// let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

// menuIcon.onclick = () => {
//     menuIcon.classList.toggle('bx-x');
//     navbar.classList.toggle('active');
// }

// Scroll sections
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

// window.onscroll = () => {
//     sections.forEach(sec => {
//         let top = window.scrollY;
//         let offset = sec.offsetTop - 100;
//         let height = sec.offsetHeight;
//         let id = sec.getAttribute('id');

//         if (top >= offset && top < offset + height) {
//             navLinks.forEach(links => {
//                 links.classList.remove('active');
//                 document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
//             });
//             sec.classList.add('show-animate');
//         } else {
//             sec.classList.remove('show-animate');
//         }
//     });

//     let header = document.querySelector('header');
//     header.classList.toggle('sticky', window.scrollY > 100);

//     // menuIcon.classList.remove('bx-x');
//     // navbar.classList.remove('active');

//     let footer = document.querySelector('footer');
//     footer.classList.toggle('show-animate', this.innerHeight + this.scrollY >= document.scrollingElement.scrollHeight);
// }