
const searchInput = document.getElementById('searchInput');
const updateList = document.getElementById('updateList');
const newUpdates = updateList.getElementsByClassName('new-update');

// Search functionality
searchInput.addEventListener('input', function() {
    const searchTerm = this.value.toLowerCase();
    for (let i = 0; i < newUpdates.length; i++) {
        const updateMessage = newUpdates
[i].getElementsByClassName('update-message')[0].textContent.toLowerCase();
const updateHeading = newUpdates[i].getElementsByClassName('update-heading')[0].textContent.toLowerCase();
const updateDate = newUpdates[i].getElementsByClassName('update-date')[0].textContent.toLowerCase();
if (updateMessage.includes(searchTerm) || updateHeading.includes(searchTerm) || updateDate.includes(searchTerm)) {
newUpdates[i].style.display = 'block';
} else {
newUpdates[i].style.display = 'none';
}
}
});

// Filter by year functionality
const yearFilterDropdown = document.querySelectorAll('.filter-dropdown')[0];
const yearFilterContent = yearFilterDropdown.querySelector('.filter-content');
const yearFilterBtn = yearFilterDropdown.querySelector('.filter-btn');

yearFilterDropdown.addEventListener('click', (event) => {
if (event.target.tagName === 'A') {
    const filterValue = event.target.dataset.filter;
    yearFilterBtn.textContent = `Filter by Year: ${event.target.textContent}`;
    filterUpdates(filterValue, null);
}
});

// Filter by date functionality
const dateFilterDropdown = document.querySelectorAll('.filter-dropdown')[1];
const dateFilterContent = dateFilterDropdown.querySelector('.filter-content');
const dateFilterBtn = dateFilterDropdown.querySelector('.filter-btn');
const dateFilter = dateFilterContent.querySelector('#dateFilter');

dateFilter.addEventListener('change', (event) => {
const selectedDate = event.target.value;
const formattedDate = formatDate(selectedDate);
dateFilterBtn.textContent = `Filter by Date: ${formattedDate}`;
filterUpdates(null, selectedDate);
});

function formatDate(dateString) {
const date = new Date(dateString);
const options = { day: 'numeric', month: 'long', year: 'numeric' };
return date.toLocaleDateString('en-US', options);
}

function filterUpdates(yearFilter, dateFilter) {
const searchTerm = searchInput.value.toLowerCase();

for (let i = 0; i < newUpdates.length; i++) {
    const updateMessage = newUpdates[i].getElementsByClassName('update-message')[0].textContent.toLowerCase();
    const updateHeading = newUpdates[i].getElementsByClassName('update-heading')[0].textContent.toLowerCase();
    const updateDate = newUpdates[i].getElementsByClassName('update-date')[0].textContent.toLowerCase();
    const updateFilters = newUpdates[i].dataset.filter.split(' ');
    const updateDateValue = newUpdates[i].dataset.date;

    const shouldShowUpdate =
        (yearFilter === 'all' || updateFilters.includes(yearFilter)) &&
        (dateFilter === null || updateDateValue === dateFilter) &&
        (searchTerm === '' ||
            updateMessage.includes(searchTerm) ||
            updateHeading.includes(searchTerm) ||
            updateDate.includes(searchTerm));

    newUpdates[i].style.display = shouldShowUpdate ? 'block' : 'none';
}

const noResults = document.getElementById('noResults');
noResults.style.display = newUpdates.length === 0 ? 'block' : 'none';
}
