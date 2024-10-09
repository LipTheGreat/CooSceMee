// For handling participant's form submission
document.getElementById('participant-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const participantName = document.getElementById('name').value;
    const selectedSlots = document.querySelectorAll('.selected');
    
    const availableTimes = Array.from(selectedSlots).map(slot => slot.textContent);
    
    // Prepare data to send to the server
    const availabilityData = {
        name: participantName,
        times: availableTimes
    };

    // Send data to the server
    fetch('http://localhost:3000/api/availability', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(availabilityData)
    })
    .then(response => {
        if (response.ok) {
            alert(`${participantName}, your availability has been submitted:\n${availableTimes.join(', ')}`);
            // Clear selections
            selectedSlots.forEach(slot => slot.classList.remove('selected'));
            document.getElementById('name').value = ''; // Clear name input
        } else {
            alert('Error submitting availability. Please try again.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
});
