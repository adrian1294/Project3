console.log("app.js");

// Book Constructor
function Book(title, author, isbn){
    this.title=title;
    this.author=author;
    this.isbn=isbn;
}

// User Interface Constructor
function UI(){}
    UI.prototype.addBookToList = function(book){
    //Get Node where to insert the book table
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
    // console.log(row);
    table.appendChild(row);
    document.getElementById("title").value="";
    document.getElementById("author").value="";
    document.getElementById("isbn").value="";
};

UI.prototype.showAlert = function(message, className){
    // create DIV Element
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
};
// Add Delete Book
UI.prototype.deleteBook = function(target){
    if(target.className==='delete'){
        target.parentElement.parentElement.remove();
    }
}
const bookForm = document.getElementById("book-form");

bookForm.addEventListener('submit', handlerUI);

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
    }
    //Clear Fields from HTML form
    // ui.clearFields();

    e.preventDefault();
}

// // Add Clear Field using prototype
// UI.prototype.clearFields = function(){
//     document.getElementById("title").value="";
//     document.getElementById("author").value="";
//     document.getElementById("isbn").value="";
// };


document.getElementById("book-table").addEventListener('click', function(e){
    // console.log("click");

    ui = new UI();
   
    ui.deleteBook(e.target); 
    
    ui.showAlert("Book Removed Succesfully!!", "success");

    e.preventDefault();
});