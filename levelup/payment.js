document.addEventListener('DOMContentLoaded', function() {
    const submitTransaction = document.getElementById('submitTransaction');
    const transactionIdInput = document.getElementById('transactionId');

    // Function to format the current date and time
    function formatDateTime(date) {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
        const year = date.getFullYear();
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');
        return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
    }

    submitTransaction.addEventListener('click', function() {
        const transactionId = transactionIdInput.value.trim();
        if (transactionId === '') {
            alert('Please enter the transaction ID.');
            return;
        }

        const studentName = localStorage.getItem('studentName');
        const studentEmail = localStorage.getItem('studentEmail');
        const studentPhone = localStorage.getItem('studentPhone');

        // Get the current date and time
        const currentTime = new Date();
        const formattedTime = formatDateTime(currentTime);

        const formData = new FormData();
        formData.append('fullName', studentName);
        formData.append('email', studentEmail);
        formData.append('phone', studentPhone);
        formData.append('transactionId', transactionId);

        // Append the current date and time
        formData.append('submissionTime', formattedTime);

        const scriptURL = 'https://script.google.com/macros/s/AKfycbzmvsbPgRj6VthxgzyPnPc36BCeCt4qBycbiQ_OzdzM-bjlyu5-prMcdMVNZ_Hli2hzGQ/exec';

        fetch(scriptURL, { method: 'POST', body: formData })
            .then(response => {
                if (response.ok) {
                    alert('Transaction ID submitted successfully! Please send the payment screenshot to 9849834102 on WhatsApp for verification. Your login credentials will be sent to your email once verified.');
                    transactionIdInput.value = '';
                } else {
                    throw new Error('Network response was not ok.');
                }
            })
            .catch(error => {
                console.error('Error!', error.message);
                alert('There was an error submitting your transaction ID. Please try again later.');
            });
    });
});
