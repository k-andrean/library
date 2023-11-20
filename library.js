const myLibrary = [];
const displayButton = document.querySelector('.display-book'); 
const cardContainer = document.querySelector('.card-container');
const dialog = document.getElementById('book-dialog');
const showButton = document.querySelector('.add-book');
const confirmButton = document.querySelector('.confirm-book');
const bookNameInput = document.getElementById('book-name');
const bookAuthorInput = document.getElementById('book-author');
const bookPagesInput = document.getElementById('book-pages');
const radioButtons = document.querySelectorAll('input[name="answer"]');


// function Book(title, author, pages, read){

//         this.title = title;
//         this.author = author;
//         this.pages = pages;
//         this.read = read;

//         this.info = function(){
//             return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read ? 'read' : 'not read'}`;
//         }
// }

class Book{
    constructor(title, author, pages, read){
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }

    info(){
        return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read ? 'read' : 'not read'}`;
        
    }

}


function addBookToLibrary(bookObject) {
    myLibrary.push(bookObject);
}


const book1 = new Book('The Catcher in the Rye', 'J.D. Salinger', 224, true);
const book2 = new Book('To Kill a Mockingbird', 'Harper Lee', 281, false);

addBookToLibrary(book1);
addBookToLibrary(book2);


function cardSetup (book, index){

    const card = document.createElement('div');
    card.classList.add(`card-${index}`); // adding class for card element to refer later for processing
    card.style.cssText = 'padding : 1rem; background-color: white; border: 2px solid black; text-align: center;'

    const title = document.createElement('h2');
    title.textContent = book.title; // setting up book title for card title content
    title.style.cssText = 'text-align: center; margin-bottom: 1rem;'

    const para = document.createElement('p');
    para.textContent = book.info(); // displaying book info for paragraph content
    para.style.fontSize = '14px';

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete Button';
    deleteButton.style.cssText = 'min-width: 50px; min-height: 30px; border-radius: 6px; margin-top: 1rem; padding: 0.5rem; font-size: 12px; color:black;'
    deleteButton.dataset.index = index; // setting index attribute for button to refer later for processing

    const toggleReadButton = document.createElement('button');
    toggleReadButton.textContent = `${book.read ? 'Read' : 'Not Read'}`;
    toggleReadButton.style.cssText = 'min-width: 50px; min-height: 30px; border-radius: 6px; margin-top: 1rem; margin-left: 1rem; padding: 0.5rem; font-size: 12px; color:black;'
    toggleReadButton.dataset.index = index; // setting index attribute for button to refer later for processing


    return {card, title, para, deleteButton, toggleReadButton}; // return card element for setup and process inside main function display
}


function handleDeleteClick(event) {
    const currentIndex = event.target.dataset.index;
    myLibrary.splice(currentIndex, 1);

    cardContainer.textContent = ''; // empty card container before reassigning current card to display in card container
    displayBooks(myLibrary);
}



function handleToggleReadClick(event) {
    const currentIndex = event.target.dataset.index;
    const updateBook = myLibrary[currentIndex];
    updateBook.read = !updateBook.read;
    
    const currentCard = document.querySelector(`.card-${currentIndex}`);
    const currentPara = currentCard.querySelector('p');
    currentPara.textContent = updateBook.info();
    
    event.target.textContent = `${updateBook.read ? 'Read' : 'Not Read'}`;
}


function displayBooks(bookArray) {
    bookArray.forEach((book, index) => {

        const {card, title, para, deleteButton, toggleReadButton} = cardSetup(book, index);

        deleteButton.addEventListener('click', (event) => handleDeleteClick(event));
        toggleReadButton.addEventListener('click', (event) => handleToggleReadClick(event));

        card.appendChild(title);
        card.appendChild(para);
        card.appendChild(deleteButton);
        card.appendChild(toggleReadButton);

        cardContainer.appendChild(card);
    });
}

displayButton.addEventListener('click', function() {
    cardContainer.textContent = '';
    displayBooks(myLibrary);
});



showButton.addEventListener('click', ()=>{
    dialog.showModal(); // show dialog modal box when button clicked
})



function createUpdateBook(title, author, pages, read){
    
    
    const newBook = new Book(title, author, pages, read);
    addBookToLibrary(newBook);

    cardContainer.textContent = ''; // empty card container before reassigning current card to display in card container
    displayBooks(myLibrary);

}


confirmButton.addEventListener('click', (event) => {

    event.preventDefault(); // prevent dialog form submitting

    const bookName = bookNameInput.value;
    const bookAuthor = bookAuthorInput.value;
    const bookPages = bookPagesInput.value;

    let selectedValue = Array.from(radioButtons).find((radioButton) => radioButton.checked); // find which value radio button is clicked
    
    if (selectedValue) {
        selectedValue = selectedValue.value; // set up and assign radio value returned to variable for processing
    }

    createUpdateBook(bookName, bookAuthor, bookPages, selectedValue); // create new book item based on form data submitted

    dialog.close(); // close dialog box after finishing processing form

});