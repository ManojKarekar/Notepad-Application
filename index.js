console.log("Welcome to short notepad application:");
showNotes();

let addBtn = document.getElementById("addBtn"); // target the button element click to add the notes.
addBtn.addEventListener('click', btnClick);  // Button element used click event 
function btnClick(e) {
  let addText = document.getElementById("addText");
  // To target the textarea box.
  let notes = localStorage.getItem("notes");
  if (notes == null) {    // notes is empty then return empty array.
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes); // Json parse covert string into Object.
  }
  notesObj.push(addText.value);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  addText.value = "";
  // console.log(notesObj);
  // localStorage.clear();
  showNotes();
}

// show notes:
function showNotes() {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  let html = "";
  notesObj.forEach(function (element, index) {
    html += `
              <div class="noteCard my-2 mx-2 card" style="width: 18rem;">
                      <div class="card-body">
                          <h5 class="card-title">Note ${index + 1}</h5>
                          <p class="card-text"> ${element}</p>
                          <button id="${index}"onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
                      </div>
                  </div>`;
  });
  let notesElm = document.getElementById("notes");
  if (notesObj.length != 0) {  // if notes is empty then add the html.
    notesElm.innerHTML = html;
  } else {
    notesElm.innerHTML = `Nothing to show! Use "Add a Note" section above to add notes.`;
  }
}


// function to delete the notes.
function deleteNote(index) {
  //   console.log("I am deleting", index);

  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }

  notesObj.splice(index, 1); // splice function is delete the item to specific postion.
  localStorage.setItem("notes", JSON.stringify(notesObj));//update the local stroge.
  showNotes();  // call the show notes.
}

// search notes 
let search = document.getElementById('searchText');
search.addEventListener('input', function () { //to get a input in searchbox 
  let inputval = search.value;
  let noteCards = document.getElementsByClassName('noteCard');
  Array.from(noteCards).forEach(function (element) {
    let cardText = element.getElementsByTagName("p")[0].innerText;
    if (cardText.includes(inputval)) {
      element.style.display = "block";
    }
    else {
      element.style.display = "none";
    }
    // console.log(cardTxt);
  })
});
