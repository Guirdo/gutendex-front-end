/* eslint-disable require-jsdoc */
import '../../style/global.scss';
import BookDataBase from '../../store/book';

const addNewBookForm = document.querySelector('#addNewBookForm');
const bookDataBase = new BookDataBase();

let title;
let author;
let copyright;
let language;
let topic;
let bookshelf;
let readOnlineLink;
let epubLink;

function isFormValid() {
  if (!title) {
    return false;
  } else if (!author) {
    return false;
  } else if (!topic) {
    return false;
  } else if (!bookshelf) {
    return false;
  } else if (!readOnlineLink) {
    return false;
  } else if (!epubLink) {
    return false;
  }

  return true;
}

addNewBookForm.addEventListener('submit', (event) => {
  event.preventDefault();

  title = document.querySelector('#title').value;
  author = document.querySelector('#author').value;
  copyright = document.querySelector('input[name="copyright"]:checked').value;
  language = document.querySelector('#language').value;
  topic = document.querySelector('#topic').value;
  bookshelf = document.querySelector('#bookshelf').value;
  readOnlineLink = document.querySelector('#readOnlineLink').value;
  epubLink = document.querySelector('#epubLink').value;

  if (isFormValid()) {
    bookDataBase.addBook({
      title,
      authors: [{name: author}],
      copyright,
      languages: [language],
      subjects: [topic],
      bookshelves: [bookshelf],
      formats: {
        'text/html': readOnlineLink,
        'application/epub+zip': epubLink,
      },
      download_count: 0,
    });

    location.href = '/';
  } else {
    alert('Please, enter all the fields correctly');
  }
});
