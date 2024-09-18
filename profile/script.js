// Get form and static profile elements
const profileForm = document.getElementById('profileForm');
const staticProfile = document.getElementById('staticProfile');
const submitBtn = document.getElementById('submitBtn');
const editProfileBtn = document.getElementById('editProfileBtn');

// Get form field elements
const nameInput = document.getElementById('name');
const phoneInput = document.getElementById('phone');
const emailInput = document.getElementById('email');
const studentTypeSelect = document.getElementById('studentType');
const jntukBtechFields = document.getElementById('jntukBtechFields');
const collegeInput = document.getElementById('college');
const branchInput = document.getElementById('branch');
const graduationYearInput = document.getElementById('graduationYear');

// Get error message elements
const nameError = document.getElementById('nameError');
const phoneError = document.getElementById('phoneError');
const emailError = document.getElementById('emailError');
const studentTypeError = document.getElementById('studentTypeError');
const collegeError = document.getElementById('collegeError');
const branchError = document.getElementById('branchError');
const graduationYearError = document.getElementById('graduationYearError');
const submitError = document.getElementById('submitError');

// Get static profile display elements
const displayName = document.getElementById('displayName');
const displayPhone = document.getElementById('displayPhone');
const displayEmail = document.getElementById('displayEmail');
const jntukBtechInfo = document.getElementById('jntukBtechInfo');
const displayCollege = document.getElementById('displayCollege');
const displayBranch = document.getElementById('displayBranch');
const displayGraduationYear = document.getElementById('displayGraduationYear');

// Get profile picture elements
const profilePic = document.getElementById('profilePic');
const picOptions = document.getElementById('picOptions');
const previewProfilePic = document.getElementById('previewProfilePic');
const profilePicPreview = document.getElementById('profilePicPreview');

// Function to show/hide Jntuk Btech fields
function toggleJntukBtechFields() {
  if (studentTypeSelect.value === 'jntukBtech') {
    jntukBtechFields.classList.remove('hidden');
  } else {
    jntukBtechFields.classList.add('hidden');
    clearJntukBtechFields();
  }
}

// Function to clear Jntuk Btech fields
function clearJntukBtechFields() {
  collegeInput.value = '';
  branchInput.value = '';
  graduationYearInput.value = '';
  collegeError.textContent = '';
  branchError.textContent = '';
  graduationYearError.textContent = '';
}

// Function to validate form fields
function validateForm() {
  let isValid = true;

  // Validate name
  if (nameInput.value.trim() === '') {
    nameError.textContent = 'Name is required';
    isValid = false;
  } else {
    nameError.textContent = '';
  }

  // Validate phone number
  if (phoneInput.value.trim() === '') {
    phoneError.textContent = 'Phone number is required';
    isValid = false;
  } else if (!/^\d{10}$/.test(phoneInput.value.trim())) {
    phoneError.textContent = 'Invalid phone number';
    isValid = false;
  } else {
    phoneError.textContent = '';
  }

  // Validate email
  if (emailInput.value.trim() === '') {
    emailError.textContent = 'Email is required';
    isValid = false;
  } else if (!/\S+@\S+\.\S+/.test(emailInput.value.trim())) {
    emailError.textContent = 'Invalid email address';
    isValid = false;
  } else {
    emailError.textContent = '';
  }

  // Validate student type
  if (studentTypeSelect.value === '') {
    studentTypeError.textContent = 'Student type is required';
    isValid = false;
  } else {
    studentTypeError.textContent = '';
  }

  // Validate Jntuk Btech fields if applicable
  if (studentTypeSelect.value === 'jntukBtech') {
    if (collegeInput.value.trim() === '') {
      collegeError.textContent = 'College name is required';
      isValid = false;
    } else {
      collegeError.textContent = '';
    }

    if (branchInput.value.trim() === '') {
      branchError.textContent = 'Branch is required';
      isValid = false;
    } else {
      branchError.textContent = '';
    }

    if (graduationYearInput.value === '') {
      graduationYearError.textContent = 'Graduation year is required';
      isValid = false;
    } else if (graduationYearInput.value < 2020 || graduationYearInput.value > 2030) {
      graduationYearError.textContent = 'Graduation year must be between 2020 and 2030';
      isValid = false;
    } else {
      graduationYearError.textContent = '';
    }
  }

  return isValid;
}

// Function to handle form submission
function handleSubmit(event) {
  event.preventDefault();

  if (validateForm()) {
    const formData = {
      name: nameInput.value.trim(),
      phone: phoneInput.value.trim(),
      email: emailInput.value.trim(),
      studentType: studentTypeSelect.value,
      profilePicture: previewProfilePic.src,
    };

    if (studentTypeSelect.value === 'jntukBtech') {
      formData.college = collegeInput.value.trim();
      formData.branch = branchInput.value.trim();
      formData.graduationYear = graduationYearInput.value;
    }

    sendDataToGoogleSheet(formData);
    localStorage.setItem('profileData', JSON.stringify(formData));
    showStaticProfile();
  }
}



// Function to render profile picture options
function renderProfilePictures() {
  picOptions.innerHTML = '';

  const numImagesPerRow = 5;
  const numTotalImages = 32;
  const numImagesToShow = numImagesPerRow * 2;
  const numRemainingImages = numTotalImages - numImagesToShow;

  const imageContainer = document.createElement('div');
  imageContainer.classList.add('image-container');

  for (let i = 1; i <= numTotalImages; i++) {
    const picElement = document.createElement('img');
    picElement.src = `images/${i}.jpeg`;
    picElement.alt = 'Profile Picture';
    picElement.addEventListener('click', () => {
      previewProfilePic.src = picElement.src;
      profilePicPreview.classList.remove('hidden');
    });
    imageContainer.appendChild(picElement);

    if (i % numImagesPerRow === 0 || i === numTotalImages) {
      picOptions.appendChild(imageContainer);
      imageContainer.classList.add('scrollable');
      imageContainer.style.width = `${numImagesPerRow * 100}px`;
    }
  }
}

// Function to show static profile
function showStaticProfile() {
  const profileData = JSON.parse(localStorage.getItem('profileData'));

  if (profileData) {
    displayName.textContent = profileData.name;
    displayPhone.textContent = profileData.phone;
    displayEmail.textContent = profileData.email;
    profilePic.src = profileData.profilePicture;

    if (profileData.studentType === 'jntukBtech') {
      jntukBtechInfo.classList.remove('hidden');
      displayCollege.textContent = profileData.college;
      displayBranch.textContent = profileData.branch;
      displayGraduationYear.textContent = profileData.graduationYear;
    } else {
      jntukBtechInfo.classList.add('hidden');
    }

    profileForm.classList.add('hidden');
    staticProfile.classList.remove('hidden');
  }
}

    // Function to send data to Google Sheet
function sendDataToGoogleSheet(formData) {
  const scriptURL = 'https://script.google.com/macros/s/AKfycbz42I8kEp9wRMpCakdprwF-mQmXvAkihIjZMdkUQMi4ywLBNaFY8p7KMCKjDFNE6HLR/exec';
  const form = new FormData();

  for (const [key, value] of Object.entries(formData)) {
    form.append(key, value);
  }

  fetch(scriptURL, { method: 'POST', body: form })
    .then(response => {
      console.log('Success!', response);
      // You can handle success response here if needed
    })
    .catch(error => {
      console.error('Error!', error.message);
      // You can handle error response here if needed
    });
}

// Function to populate form fields with saved data
function populateFormFields() {
  const profileData = JSON.parse(localStorage.getItem('profileData'));

  if (profileData) {
    nameInput.value = profileData.name;
    phoneInput.value = profileData.phone;
    emailInput.value = profileData.email;
    studentTypeSelect.value = profileData.studentType;
    previewProfilePic.src = profileData.profilePicture;
    profilePicPreview.classList.remove('hidden');

    if (profileData.studentType === 'jntukBtech') {
      jntukBtechFields.classList.remove('hidden');
      collegeInput.value = profileData.college;
      branchInput.value = profileData.branch;
      graduationYearInput.value = profileData.graduationYear;
    }

    toggleJntukBtechFields();
  }
}

// Event listeners
studentTypeSelect.addEventListener('change', toggleJntukBtechFields);
submitBtn.addEventListener('click', handleSubmit);
editProfileBtn.addEventListener('click', () => {
  staticProfile.classList.add('hidden');
  profileForm.classList.remove('hidden');
  populateFormFields();
});

// Check if profile data exists in local storage on page load
const profileData = JSON.parse(localStorage.getItem('profileData'));

if (profileData) {
  showStaticProfile();
} else {
  profileForm.classList.remove('hidden');
  renderProfilePictures();
}

document.addEventListener('DOMContentLoaded', function() {
  renderProfilePictures();
});


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

// Get the projects section element
const projectsSection = document.getElementById('projects');

// Remove the 'hidden' class from the projects section
projectsSection.classList.remove('hidden');

