/* eslint-disable require-jsdoc */
class BookDataBase {
  constructor() {
    this.books = JSON.parse(localStorage.getItem('books')) || [];
  }

  addBook(book) {
    this.books.push(book);
    localStorage.setItem('books', JSON.stringify(this.books));
  }
}

export default BookDataBase;
