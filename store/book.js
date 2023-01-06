/* eslint-disable require-jsdoc */
class BookDataBase {
  constructor() {
    this.books = JSON.parse(localStorage.getItem('books')) || [];
  }

  getBooks() {
    return this.books;
  }

  getDownloadCountAverage() {
    const sum = this.books.map((book) => book.download_count)
        .reduce((total, value)=> total+value, 0);

    return Math.floor(sum / this.books.length);
  }

  addBook(book) {
    this.books.push(book);
    localStorage.setItem('books', JSON.stringify(this.books));
  }

  getTotalBooks() {
    return this.books.length;
  }

  async searchBook(author, title, topic, language) {
    const results = await this.books.filter((book) => {
      const bookAuthor = book.authors[0]['name'].toLowerCase();
      const bookTitle = book.title.toLowerCase();
      const bookSubjects = book.subjects[0].toLowerCase();
      if (bookAuthor.includes(author) && author !== '') {
        return book.languages[0] === language;
      }
      if (bookTitle.includes(title) && title !== '') {
        return book.languages[0] === language;
      }
      if (bookSubjects.includes(topic) && topic !== '') {
        return book.languages[0] === language;
      }
      return false;
    });

    return {
      count: results.length,
      next: null,
      previous: null,
      results,
    };
  }
}

export default BookDataBase;
