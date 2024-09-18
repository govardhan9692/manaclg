const scriptURL = 'https://script.google.com/macros/s/AKfycbyq3QN4vk67dD2lp_JLapAbxY5rgcjCKXk4fyrRmZoOFyayhx0rNZJjGqK8CwGrX7FoQw/exec';
let openTime;

function formatDateTime(date) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
}

function formatDuration(durationInSeconds) {
    const hours = Math.floor(durationInSeconds / 3600);
    const minutes = Math.floor((durationInSeconds % 3600) / 60);
    const seconds = durationInSeconds % 60;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

window.addEventListener('load', () => {
    openTime = new Date();
    const formattedOpenTime = formatDateTime(openTime);
    localStorage.setItem('openingTime', formattedOpenTime);
});

window.addEventListener('beforeunload', () => {
    const closeTime = new Date();
    const formattedCloseTime = formatDateTime(closeTime);
    const openingTime = localStorage.getItem('openingTime');
    const durationInSeconds = Math.round((closeTime - openTime) / 1000);
    const formattedDuration = formatDuration(durationInSeconds);

    const profileData = JSON.parse(localStorage.getItem('profileData'));
    const formData = new FormData();

    if (profileData) {
        formData.append('name', profileData.name);
        formData.append('phone', profileData.phone);
        formData.append('email', profileData.email);
        formData.append('studentType', profileData.studentType);
        formData.append('profilePicture', profileData.profilePicture);

        if (profileData.studentType === 'jntukBtech') {
            formData.append('college', profileData.college);
            formData.append('branch', profileData.branch);
            formData.append('graduationYear', profileData.graduationYear);
        }
    }

    formData.append('opening time', openingTime);
    formData.append('closing time', formattedCloseTime);
    formData.append('duration', formattedDuration);

    navigator.sendBeacon(scriptURL, formData);
});
