// retrieve HTML elements
const container = document.getElementById('container');
const myForm = document.getElementById("myForm");
const open_button = document.getElementsByClassName("open-button")[0];
const btn_cancel = document.getElementById("btn_cancel");
const btn_add = document.getElementById("btn_add");

// We will store all books in an array
let library = [];

// constructor for a book
function Book(title, author, pages, read = "Read") {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

// Initialize the page with a couple fan favorites :)
let Olympian = new Book("The Last Olympian", "Rick Riordan", 381, "Read");
let Harry = new Book("Harry Potter", "JK Rowling", 786, "Read");
let DaVinci = new Book("The Da Vinci Code", "Dan Brown", 689, "Not read yet");
library.push(Harry);
library.push(Olympian);
library.push(DaVinci);
render();

// function that adds a book to the library array
function addBookToLibrary() {
    var form_title = document.getElementById("form_title").value;
    var form_author = document.getElementById("form_author").value;
    var form_pages = document.getElementById("form_pages").value;
    var x = document.getElementById("read_status");
    var form_status = x.options[x.selectedIndex].text;

    // form validation
    if (form_title == '' || form_author == '' || form_pages == '') {
        alert ("Make sure to fill out all of the fields!");
    } else if (!Number.isInteger(+form_pages) || +form_pages <= 0){
        alert ("Please enter a positive integer value for the number of pages.")
    } else{
        var book = new Book(form_title, form_author, form_pages, form_status);
        library.push(book);
        render();
    }
}

// function to clear the input fields in the popup form
function clearInputs() {
    document.getElementById("form_title").value = "";
    document.getElementById("form_author").value = "";
    document.getElementById("form_pages").value = "";
}

// function to clear all of the books in the container
function clear() {
    while (container.hasChildNodes()) {
        container.removeChild(container.lastChild);
    }
}

// function that loops through the library array and displays each book as a card
function render() {
    clear();
    for (var i = 0; i < library.length; i++){
        book = library[i];
        var card = document.createElement('div');
        card.className = 'card';
        container.appendChild(card);

        // add a switch button to each card
        var switch_btn = document.createElement('button');
        switch_btn.className = 'switch_btn';
        switch_btn.setAttribute("data-array-index", i);
        card.appendChild(switch_btn);
        switch_btn.addEventListener("click", function(e) {
            var array_index = e.target.getAttribute("data-array-index");
            var m = library[array_index];
            // change the status of the book
            if (m.read == "Read") {
                m.read = "Not read yet"
                render();
            } else {
                m.read = "Read";
                render();
            }
        });

        // add a remove button to each card
        var remove = document.createElement('button');
        remove.className = 'remove';
        remove.setAttribute("data-array-index", i);
        card.appendChild(remove);
        remove.addEventListener("click", function(e) {
            var array_index = e.target.getAttribute("data-array-index");
            // remove the book from the library array
            library.splice(array_index, 1);
            render();
        });

        var info = document.createElement('div');
        info.className = 'info';
        card.appendChild(info);
        var read = "Read";
        if (book.read == read) {
            info.innerHTML += `<p id="first-line">${book.title}</p>
                            <p>by ${book.author}</p>
                            <p>${book.pages} pages</p>
                            <p style="color:green">Read</p>`
        } else {
            info.innerHTML += `<p id="first-line">${book.title}</p>
                            <p>by ${book.author}</p>
                            <p>${book.pages} pages</p>
                            <p style="color:rgb(204, 51, 0)">Not read yet</p>`
        }
    }
}

// function to popup the form
function openForm() {
    myForm.style.display = "block";
}

// function to close the form
function closeForm() {
    myForm.style.display = "none";
}

open_button.addEventListener("click", openForm);
btn_cancel.addEventListener("click", closeForm);

btn_add.addEventListener("click",
function(){
    addBookToLibrary();
    closeForm();
    clearInputs();
});

// Book sorting
const pagesBtn = document.getElementById("sortP");
const titleBtn = document.getElementById("sortT");
const lastNameBtn = document.getElementById("sortL");
const firstNameBtn = document.getElementById("sortF");

const dropDownMenu = document.getElementsByClassName("dropdown-content")[0];

// sort by number of pages
function sortPages(a,b) {
    return a.pages - b.pages;
}

pagesBtn.addEventListener("click", function(){
    library.sort( sortPages );
    render();
});

// sort by book title
function sortTitle(a,b) {
    return a.title.localeCompare(b.title);
}

titleBtn.addEventListener("click", function(){
    library.sort( sortTitle );
    render();
});

// sort by last name of author
function sortLastName(a,b) {
    var a_fullName = a.author.split(' ');
    var a_lastName = a_fullName[a_fullName.length - 1];
    var b_fullName = b.author.split(' ');
    b_lastName = b_fullName[b_fullName.length - 1];

    return a_lastName.localeCompare(b_lastName);
}

lastNameBtn.addEventListener("click", function() {
    library.sort( sortLastName );
    render();
});

// sort by first name of author
function sortFirstName(a,b) {
    var a_fullName = a.author.split(' ');
    var a_firstName = a_fullName[0];
    var b_fullName = b.author.split(' ');
    var b_firstName = b_fullName[0];

    return a_firstName.localeCompare(b_firstName);
}

firstNameBtn.addEventListener("click", function() {
    library.sort( sortFirstName );
    render();
});