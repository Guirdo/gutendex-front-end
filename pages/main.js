/* eslint-disable new-cap */
/* eslint-disable require-jsdoc */
import '../style/global.scss';
import BookCard from '../components/BookCard';
import Pagination from '../components/Pagination';
import SearchDataBase from '../store/search';
import BookDataBase from '../store/book';
import prepareApiURL from '../helper/prepareApiURL';

const advancedSearchForm = document.querySelector('#advancedSearchForm');
const bookList = document.querySelector('#bookList');
const searchDB = new SearchDataBase();
const bookDB = new BookDataBase();

let author;
let title;
let topic;
let language;
let source;
let totalBooks;
let previousPage;
let currentPage;
let nextPage;

function renderPagination() {
  const totalPages = Math.ceil(totalBooks/32);
  bookList.innerHTML += Pagination(currentPage, totalPages);
  const previousButton = document.querySelector('#previous');
  const nextButton = document.querySelector('#next');

  if (!previousPage) {
    previousButton.disabled = true;
  }

  if (!nextPage) {
    nextButton.disabled = true;
  }

  previousButton.addEventListener('click', () => {
    currentPage -= 1;

    renderResults()
        .then(()=> renderPagination());
  });

  nextButton.addEventListener('click', () => {
    currentPage += 1;

    renderResults()
        .then(()=> renderPagination());
  });
}

async function renderBookList(books) {
  if (totalBooks > 0) {
    bookList.innerHTML = await books.map((book) => BookCard({
      cover: book.formats['image/jpeg'],
      title: book.title,
      authors: book.authors,
      languages: book.languages,
      topics: book.subjects,
      bookshelves: book.bookshelves,
      readOnlineLink: book.formats['text/html'],
      epubDownloadLink: book.formats['application/epub+zip'],
      downloadCount: book.download_count,
    })).join('');
  } else {
    bookList.innerHTML = `<h3>There's no results</h3>`;
  }
}

async function renderResults() {
  bookList.innerHTML = '<h3>Wait a second...</h3>';
  if (source) {
    const url = prepareApiURL(author, title, topic, language, currentPage);
    return await fetch(url)
        .then(async (res) => await res.json())
        .then(async ({count, previous, next, results}) => {
          totalBooks = count;
          previousPage = previous;
          nextPage = next;
          renderBookList(results);
        })
        .catch((error) => console.log(error));
  } else {
    return await bookDB.searchBook(author, title, topic, language)
        .then(({count, previous, next, results}) =>{
          totalBooks = count;
          previousPage = previous;
          nextPage = next;
          console.log(results);
          renderBookList(results);
        })
        .catch((error) => console.log(error));
  }
}

advancedSearchForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  currentPage = 1;

  author = document.querySelector('#author').value;
  title = document.querySelector('#title').value;
  topic = document.querySelector('#topic').value;
  language = document.querySelector('#language').value;
  source = document.querySelector('#source').checked;

  searchDB.addSearch({author, title, topic, language, source});
  renderResults()
      .then(() => renderPagination());
});
