const newNoteButton = document.getElementById("newNote");
const noteForm = document.getElementById("noteForm");

const cancelNote = document.getElementById("cancelNote");
const saveNote = document.getElementById("saveNote");

const noteTitle = document.getElementById("noteTitle");
const noteText = document.getElementById("noteText");

const notesGrid = document.getElementById("notesGrid");


/* Open the form */

newNoteButton.addEventListener("click", function () {
    noteForm.style.display = "block";

    noteTitle.focus();
});


/* Close the form */

cancelNote.addEventListener("click", function () {
    noteForm.style.display = "none";

    noteTitle.value = "";
    noteText.value = "";
});


/* Save the note */

saveNote.addEventListener("click", function () {

    if (noteTitle.value.trim() === "" || noteText.value.trim() === "") {
        alert("Please write a title and a note.");
        return;
    }

    const note = document.createElement("div");

    note.classList.add("note-card");

    note.innerHTML = `
        <span class="note-date">TODAY</span>

        <button class="note-delete">×</button>

        <h3>${noteTitle.value}</h3>

        <p>${noteText.value}</p>
    `;

    notesGrid.appendChild(note);

    /* Delete button */

    note.querySelector(".note-delete").addEventListener("click", function () {
        note.remove();
    });

    /* Clear form */

    noteTitle.value = "";
    noteText.value = "";

    noteForm.style.display = "none";
});