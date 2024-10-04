// Fetch stored events from localStorage
let events = JSON.parse(localStorage.getItem('events')) || [];

// Function to display events (used in View and Delete page)
function displayEvents() {
    const eventsList = document.getElementById('events-list');
    if (eventsList) {
        eventsList.innerHTML = ''; // Clear list
        events.forEach(event => {
            const li = document.createElement('li');
            li.textContent = `${event.name} - ${event.date} at ${event.time}`;
            eventsList.appendChild(li);
        });
    }
}

// Create Event
const createForm = document.getElementById('create-event-form');
if (createForm) {
    createForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('event-name').value;
        const date = document.getElementById('event-date').value;
        const time = document.getElementById('event-time').value;

        // Add new event to array
        events.push({ name, date, time });
        localStorage.setItem('events', JSON.stringify(events)); // Save to localStorage

        alert('Event Created Successfully');
        this.reset(); // Clear form
    });
}

// Update Event
const updateForm = document.getElementById('update-event-form');
if (updateForm) {
    updateForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const oldName = document.getElementById('old-event-name').value;
        const newName = document.getElementById('new-event-name').value;
        const newDate = document.getElementById('new-event-date').value;
        const newTime = document.getElementById('new-event-time').value;

        // Find and update event
        const event = events.find(event => event.name === oldName);
        if (event) {
            if (newName) event.name = newName;
            if (newDate) event.date = newDate;
            if (newTime) event.time = newTime;
            localStorage.setItem('events', JSON.stringify(events)); // Save updated events
            alert('Event Updated Successfully');
        } else {
            alert('Event not found!');
        }
        this.reset();
    });
}

// Delete Event
const deleteForm = document.getElementById('delete-event-form');
if (deleteForm) {
    deleteForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const deleteName = document.getElementById('delete-event-name').value;

        // Filter out the event to delete
        const updatedEvents = events.filter(event => event.name !== deleteName);
        if (events.length !== updatedEvents.length) {
            events = updatedEvents;
            localStorage.setItem('events', JSON.stringify(events)); // Save updated events
            alert('Event Deleted Successfully');
        } else {
            alert('Event not found!');
        }
        this.reset();
    });
}

// Initialize events display on View page
displayEvents();
