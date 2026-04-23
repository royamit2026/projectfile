window.addEventListener('DOMContentLoaded', async () => {
    const textarea = document.getElementById('note');
    const saveBtn = document.getElementById('save');

    const savedNote = await window.electronAPI.loadNote();
    textarea.value = savedNote;

    // Manual save
    saveBtn.addEventListener('click', async () => {
        try {
            await window.electronAPI.saveNote(textarea.value);
            alert('Note saved successfully!');
        } catch (err) {
            console.error('Manual save failed:', err);
        }
    });
});

const saveNote = await window.electronAPI.loadNote();
textarea.value = saveNote;
let lastSavedText = textarea.value;

async function autosave(){
    const currentText = textarea.value;
    if (currentText === lastSavedText){
        statusEl.textContent = "No change to save";
    return;
}
try {
    await window.electronAPI.saveNote(currentText);
    lastSavedText = currentText;
    const now = new Date().toLocaleTimeString();
    statusEl.textContent = `Auto-saved at ${now}`;
} catch (err) {
    console.error(`Auto-save failed:`,err);
    statusEl.textContent = `Auto-save error!`;
}
}

let debounceTimer;

textarea.addEventListner('input',()=>{
    statusEl.textContent = 'Changes detected - auto-saving in 5s...';
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(autoSave, 5000);
});
const saveBtn = document.getElementById('save-as');
saveASbtn. addEventListener('click',async ()=>{
    const result = await window.electronAPI.saveAs (textarea.value);
    if (result.success){
        lastSavedText = textarea.value;
        statusEl.textcontent = 'save to : ${result.filepath}';
    }else{
        statusEl.textcontent='save As cancelled.';
    }
});
const saveBtn = document.getElementById('save-as');
saveBtn.addEventListener('click',async()=>{
    const result = await windoww.electronAPI.saveAs(textarea.value);
    if (result.success){
        lastSavedText='save to: $ {result.filepath}';
    }else{
        statusEl.textContent ='save as cancelled.';
    }
});