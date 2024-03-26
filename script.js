document.addEventListener('DOMContentLoaded', function() {
    loadNotes();
});


    document.getElementById('addKeyButton').addEventListener('click', function() {
        const container = document.getElementById('keynotesContainer');
        const newKeyInput = document.createElement('input');
        newKeyInput.setAttribute('type', 'text');
        newKeyInput.classList.add('underline-input');
        container.appendChild(newKeyInput);
    });

document.getElementById('saveButton').addEventListener('click', function() {
    const title = document.getElementById('noteTitle').value;
    const keyInputs = document.querySelectorAll('#keynotesContainer input');
    const notes = keyInputs.length ? Array.from(keyInputs).map(input => input.value) : [];
    const note = { title, notes, date: new Date().toISOString() };

    // Simpan catatan ke localStorage
    const notesFromStorage = JSON.parse(localStorage.getItem('notes')) || [];
    notesFromStorage.unshift(note); // Tambahkan catatan baru ke awal array
    localStorage.setItem('notes', JSON.stringify(notesFromStorage));

    displayNotes(); // Memperbarui tampilan
});

function displayNotes() {
    const display = document.getElementById('notesDisplay');
    const notesFromStorage = JSON.parse(localStorage.getItem('notes')) || [];
    display.innerHTML = ''; // Bersihkan tampilan saat ini

    notesFromStorage.forEach(note => {
        const noteDiv = document.createElement('div');
        noteDiv.classList.add('note');
        const date = new Date(note.date);
        const dayOfWeek = date.getDay();
        const colors = ['#007bff', '#28a745', '#ffc107', '#fd7e14', '#dc3545', '#6f42c1', '#e83e8c'];
        noteDiv.style.borderColor = colors[dayOfWeek];

        noteDiv.innerHTML = `<div class="note-title">${note.title.toUpperCase()}</div>
                             <div class="note-date">${date.toISOString().slice(0, 10)}</div>`;

        note.notes.forEach(text => {
            const keyDiv = document.createElement('div');
            keyDiv.classList.add('note-key');
            keyDiv.textContent = `# ${text}`;
            const link = document.createElement('a');
            link.setAttribute('href', `https://www.google.com/search?q=${encodeURIComponent(text)}`);
            link.setAttribute('target', '_blank');
            link.classList.add('note-link');
            link.textContent = "search on Google";
            noteDiv.appendChild(keyDiv);
            noteDiv.appendChild(link);
        });

        display.appendChild(noteDiv);
    });
}

function loadNotes() {
    displayNotes(); // Tampilkan catatan saat halaman dimuat
}
