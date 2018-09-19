console.log("ES6 File");

class Book{
    constructor(title, author, isbn){
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }

}
// Class User Interface to
// manage all UI actions
class UI{
    addBookToList(book){
        const table = document.getElementById("book-table");
        //Create a row to insert a new book
        const row = document.createElement('tr');
        //Insert Columns
        row.innerHTML =`
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="delete">X</td>
        `;
        table.appendChild(row);

    }
    showAlert(message, className){
    const div = document.createElement('div');
    div.className = `alert ${className}`;
    div.innerText = message;

    //Get Parent to insert alert node
    const container = document.querySelector('.container');
    const form = document.querySelector('#book-form');
    container.insertBefore(div, form);

    //Delete Alert after 3 secs
    setTimeout(function(){
        document.querySelector(".alert").remove();
    }, 3000)
    }
    deleteBook(target){
        if(target.className==='delete'){
            target.parentElement.parentElement.remove();
        }
    }
    clearFields(){
        document.getElementById("title").value="";
        document.getElementById("author").value="";
        document.getElementById("isbn").value="";
    }
}

class Store{
    static getBooks() {
        let books;
        if(localStorage.getItem('books') === null) {
          books = [];
        } else {
          books = JSON.parse(localStorage.getItem('books'));
        }
    
        return books;
      }
    
      static displayBooks() {
        const books = Store.getBooks();
    
        books.forEach(function(book){
          const ui  = new UI;
    
          // Add book to UI
          ui.addBookToList(book);
        });
      }
    
      static addBook(book) {
        const books = Store.getBooks();
    
        books.push(book);
    
        localStorage.setItem('books', JSON.stringify(books));
      }
    
      static removeBook(isbn) {
        const books = Store.getBooks();
    
        books.forEach(function(book, index){
         if(book.isbn === isbn) {
          books.splice(index, 1);
         }
        });
    
        localStorage.setItem('books', JSON.stringify(books));
      }
}
// Event Handlers for All Events
//
//1. Submit
//2. Delete
//
//Create Event Listeneer for submit
//
const bookForm = document.getElementById("book-form");

bookForm.addEventListener('submit', handlerUI);

window.addEventListener("load", reload);

function handlerUI(e){
//Get Values from HTML form
const title = document.getElementById("title").value;
const author = document.getElementById("author").value;
const isbn = document.getElementById("isbn").value;

//Instantiate Object Book
const book = new Book(title, author, isbn);
console.log(book);

//Instantiate UI
const ui = new UI();

if(title===""|| author===""||isbn===""){
    ui.showAlert("Please insert information!", "error");
}else{
//Add book to HTML Book table
ui.addBookToList(book);
ui.clearFields();
//Add book to LocaStorage
Store.addBook(book);
}
//Clear Fields from HTML form
e.preventDefault();
}
///////////////////////////Create Event Listener for Delete Book///////////////////////////
document.getElementById("book-table").addEventListener('click', function(e){
    // console.log("click");
    ui = new UI();
    ui.deleteBook(e.target);
    Store.getBooks(); 
    Store.removeBook(e.target.parentElement.previousElementSibling.innerText);
    ui.showAlert("Book Removed Succesfully!!", "success");
    e.preventDefault();
});
////Function to display books of localstorage to table
function reload(){
    Store.displayBooks();
}