// Function to log mood
function logMood() {
  const moodInput = document.getElementById('mood');
  const mood = moodInput.value.trim();
  if (mood === '') return; // Don't log empty moods

  // Get current date and time
  const timestamp = new Date().toLocaleString();

  // Create entry object
  const entry = { mood, timestamp };

  // Get existing mood entries from localStorage or initialize empty array
  let moodEntries = JSON.parse(localStorage.getItem('moodEntries')) || [];

  // Add new mood entry to the beginning of the array
  moodEntries.unshift(entry);

  // Store updated mood entries in localStorage
  localStorage.setItem('moodEntries', JSON.stringify(moodEntries));

  // Clear input field
  moodInput.value = '';

  // Update past entries display
  updatePastEntries();
}

// Function to log journal entry
function logJournalEntry() {
  const journalInput = document.getElementById('journal');
  const journalEntry = journalInput.value.trim();
  if (journalEntry === '') return; // Don't log empty journal entries

  // Get current date and time
  const timestamp = new Date().toLocaleString();

  // Create entry object
  const entry = { journalEntry, timestamp };

  // Get existing journal entries from localStorage or initialize empty array
  let journalEntries = JSON.parse(localStorage.getItem('journalEntries')) || [];

  // Add new journal entry to the beginning of the array
  journalEntries.unshift(entry);

  // Store updated journal entries in localStorage
  localStorage.setItem('journalEntries', JSON.stringify(journalEntries));

  // Clear input field
  journalInput.value = '';
}

// Function to update past entries display
function updatePastEntries() {
  const pastEntriesDiv = document.getElementById('entriesContainer'); // Change to entriesContainer
  pastEntriesDiv.innerHTML = ''; // Clear previous entries

  // Get mood entries from localStorage
  const moodEntries = JSON.parse(localStorage.getItem('moodEntries')) || [];

  // Create HTML for each mood entry and append to pastEntriesDiv
  moodEntries.forEach((entry, index) => {
    const entryDiv = document.createElement('div');
    entryDiv.textContent = `${entry.timestamp}: ${entry.mood}`;

    // Add a delete button for each entry
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => deleteMoodEntry(index));
    entryDiv.appendChild(deleteButton);

    pastEntriesDiv.appendChild(entryDiv);
  });
}

// Function to delete a mood entry
function deleteMoodEntry(index) {
  let moodEntries = JSON.parse(localStorage.getItem('moodEntries')) || [];
  moodEntries.splice(index, 1); // Remove the entry at the specified index
  localStorage.setItem('moodEntries', JSON.stringify(moodEntries));
  updatePastEntries(); // Update the display
}

// Call logMood when the log mood button is clicked
document.getElementById('logMoodBtn').addEventListener('click', logMood);

// Call updatePastEntries when the page loads
updatePastEntries();

// Call logJournalEntry when the log journal entry button is clicked
document.getElementById('logJournalBtn').addEventListener('click', logJournalEntry);
