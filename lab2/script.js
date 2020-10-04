
const newNote = () => {

    const title = document.getElementById("noteTitle");
    const text = document.getElementById("noteText");
    const date = document.getElementById("noteDate");

    title.value = "";
    text.value = "";
    date.textContent = "";
    location.hash = "";

};

const prepareForEdit = (id) => {

    const note = JSON.parse(localStorage.getItem(id));
    let titleEdit = document.getElementById("noteTitle");
    let textEdit = document.getElementById("noteText");
    let dateValue = document.getElementById("noteDate");

    textEdit.value = note.text;
    titleEdit.value = note.title;
    dateValue.textContent = new Date(note.time).toLocaleString();

    location.hash = id;

};


const saveOrUpdate = () => {

    let title = document.getElementById("noteTitle").value;
    let text = document.getElementById("noteText").value;

    if (title === "") title = "Untitled";

    let date = getDate().toLocaleString();

    let hash = hashCreate();

    let data = {
        title: title,
        text: text,
        time: getDate(),
        id: hash,
    };

    let noteJson = JSON.stringify(data);

    let oldDate = document.getElementById("noteDate").textContent;

    if (oldDate === "") {
        saveNote(noteJson, title, date, hash);
        newNote()
    } else {
        let key = location.hash.substr(1, location.hash.length)
        let note = document.getElementById(key);
    
        localStorage.removeItem(key);
        note.remove();
    
        document.getElementById("noteDate").textContent = "";
        saveOrUpdate();
    }


}



const deleteNote = () => {

    let key = location.hash.substr(1, location.hash.length)
    let note = document.getElementById(key);

    localStorage.removeItem(key);
    note.remove();

    newNote()

}


const saveNote = (data, title, time, id) => {
    
    let notesContainer = document.getElementById("notesList");
    let newNote = document.createElement("div");
    document.getElementById("noteDate").textContent = time;
    newNote.className = "newNote";
    newNote.id = id;
    newNote.innerHTML = `<span>${title}<br>${time}<span>`;
    newNote.addEventListener('click', () => {prepareForEdit(id)})

    location.hash = id;
    localStorage.setItem(id, data);
    notesContainer.prepend(newNote);

}



const getDate = () => {
    
    let now=new Date();
    let hour = now.getHours();
    let min = now.getMinutes();
    let sec = now.getSeconds()
    let year = now.getFullYear();
    let month = now.getMonth();
    let dat = now.getDate();


    let date = new Date(year, month, dat, hour, min, sec);


    return date;
}


const hashCreate = () => {
    let hash = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 10; i++) {
        hash += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return hash;
}


const renderNotes = () => {

    const notes = [];

    for (let i = 0; i < localStorage.length; i++) {
        notes.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
    }

    let notesContainer = document.getElementById("notesList");

    const compareDate = (a, b) => {
        return new Date(a.time) -  new Date(b.time)
    }
    notes.sort(compareDate)

    for (let i = 0; i < notes.length;i++) {

        let noteData = notes[i];
        let newNote = document.createElement("div");

        newNote.className = "newNote";
        newNote.id = noteData.id;
        newNote.innerHTML = `<span>${noteData.title}<br>${new Date(noteData.time).toLocaleString()}<span>`;
        newNote.addEventListener('click', () => {prepareForEdit(noteData.id)})

        notesContainer.prepend(newNote);

    };

    let hash = location.hash;

    if (hash != "") {

        hash = hash.substr(1,hash.length);
        document.getElementById(hash).style.backgroundColor = "yellow";
        previousHash = hash;
        prepareForEdit(hash);
    };

};


let previousHash = "";

const hashChange = () => {

    if (document.getElementById(previousHash)) document.getElementById(previousHash).style.backgroundColor = "#ebecec";

    let id = location.hash.substr(1,location.hash.length);

    if (document.getElementById(id)) {
        document.getElementById(id).style.backgroundColor = "yellow";
        prepareForEdit(id);
    }
    previousHash = id;
}

document.getElementById("addBtn").addEventListener("click", newNote)
document.getElementById("saveBtn").addEventListener("click", saveOrUpdate)
document.getElementById("deleteBtn").addEventListener("click", deleteNote)

window.addEventListener('hashchange', hashChange);
window.addEventListener('load', renderNotes())