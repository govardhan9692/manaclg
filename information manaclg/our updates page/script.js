// Define an array of project objects containing image source and project name
const projects = [
    
    {
        projectName: 'Mana Clg (Official)',
        href: 'https://chat.whatsapp.com/DI3ZmtGHHltLqVschN5RJN',
        imgSrc: "./assests/manaclg.png",
    },

    {
        projectName: 'AI The Future',
        href: 'https://chat.whatsapp.com/JJIz1K484cI5DuU9S6HabN',
        imgSrc: "./assests/1.png",
    }
    ,
    {
        projectName: 'We Must Know About This',
        href: 'https://chat.whatsapp.com/E1mEyQ9avi0Hak29BNNOQp',
        imgSrc: "./assests/12.png",
    }
    ,
    {
        projectName: 'Future Tech',
        href: 'https://chat.whatsapp.com/C0keMHru0Tc3o8C9Py0WEQ',
        imgSrc: "./assests/6.png",
    }
    ,
    {
        projectName: 'Money Financial Education',
        href: 'https://chat.whatsapp.com/IeXCxPjZsqfI7bfZ3eZH48',
        imgSrc: "./assests/money.jpg",
    }
    ,
    {
        projectName: 'Entrepreneurship',
        href: 'https://chat.whatsapp.com/FFCWYl1jAB1GRhaSOPnHmW',
        imgSrc: "./assests/5.png",
    }
    ,
    {
        projectName: 'Job Preparation',
        href: 'https://chat.whatsapp.com/BBpzl7nj326CvIRf4kThNh',
        imgSrc: "./assests/job.png",
    },
    
    {
        projectName: 'Explore the World',
        href: 'https://chat.whatsapp.com/DDMMTpnoeaL7P1AtabV5UR',
        imgSrc: "./assests/4.png",
    }
    ,
    {
        projectName: 'Science and Philosophy',
        href: 'https://chat.whatsapp.com/IIcYdEBPIOt5oZnvpMYP5t',
        imgSrc: "./assests/11.png",
    }
    ,
    {
        projectName: 'Books for Life',
        href: 'https://chat.whatsapp.com/GGTRukExCWdGapXKSjB1y3',
        imgSrc: "./assests/2.png",
    }
    ,
    {
        projectName: 'Health and Biology',
        href: 'https://chat.whatsapp.com/KhsKQEFEVYKCul8yREbwUC',
        imgSrc: "./assests/7.png",
    }
    ,
    {
        projectName: 'Must Watch Movies',
        href: 'https://chat.whatsapp.com/HTsirnx2PX5G0GcwPEejrY',
        imgSrc: "./assests/9.png",
    }
    ,
    ,
    {
        projectName: 'Must Watch Anime',
        href: 'https://chat.whatsapp.com/JJEmiNprzT0BxHYWMDBl9n',
        imgSrc: "./assests/8.png",
    }
    ,
    {
        projectName: 'Must Watch Web series',
        href: 'https://chat.whatsapp.com/H606JRIQZvW43rxUt9IClu',
        imgSrc: "./assests/10.png",
    }

    ,
    {
        projectName: 'dream team gaming',
        href: 'https://chat.whatsapp.com/CYHViLTiGrfHtARbtt6jVX',
        imgSrc: "./assests/3.png",
    }
    ,
    {
        projectName: 'dream team studios',
        href: 'https://chat.whatsapp.com/GUVBVa7RdylJ3mcfprbRe3',
        imgSrc: "./assests/dts.jpg",
        
    },
    {
        projectName: 'dream team enterainment',
        href: 'https://chat.whatsapp.com/BTwGoFGpNtZKRpw6SO6m8Q',
        imgSrc: "./assests/dte.png",
        
    }
];

// Get the container element
const container = document.getElementById('container');

// Loop through the projects array and dynamically create HTML elements
projects.forEach((project, index) => {
    // Create the projects-container div
    const projectContainer = document.createElement('div');
    projectContainer.classList.add('projects-container');

    // Create the image box
    const imgBox = document.createElement('div');
    imgBox.classList.add('img-box');

    // Create the anchor tag
    const anchor = document.createElement('a');
    anchor.href = project.href;

    // Create the image element
    const img = document.createElement('img');
    img.src = project.imgSrc;
    // img.alt = project.projectName;

    // Append the image to the anchor and image box
    anchor.appendChild(img);
    imgBox.appendChild(anchor);

    // Create the paragraph tag for project name
    const projectName = document.createElement('p');
    projectName.textContent = project.projectName;

    // Append the image box and project name paragraph to the project container
    projectContainer.appendChild(imgBox);
    projectContainer.appendChild(projectName);

    // Append the project container to the main container
    container.appendChild(projectContainer);
});