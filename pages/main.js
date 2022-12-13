/* eslint-disable require-jsdoc */
import '../style/global.scss';
import BookCard from '../components/BookCard';
import Pagination from '../components/Pagination';

const advancedSearchForm = document.querySelector('#advancedSearchForm');
const bookList = document.querySelector('#bookList');

let author;
let title;
let topic;
let language;
let totalBooks;
let previousPage;
let currentPage;
let nextPage;

function prepareApiURL() {
  return encodeURI(
      'https://gutendex.com/books?' +
    ((author || title) && `search=${author && author + ' '}${title}`) +
    (topic && `&topic=${topic}`) +
    (language && `&languages=${language}`) +
    `&page=${currentPage}`,
  );
}

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

async function renderResults() {
  const url = prepareApiURL();

  bookList.innerHTML = '<h3>Wait a second...</h3>';

  return await fetch(url)
      .then(async (res) => await res.json())
      .then(async ({count, previous, next, results}) => {
        totalBooks = count;
        previousPage = previous;
        nextPage = next;
        bookList.innerHTML = await results.map((book) => BookCard({
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
      })
      .catch((error) => console.log(error));
}

advancedSearchForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  currentPage = 1;

  author = document.querySelector('#author').value;
  title = document.querySelector('#title').value;
  topic = document.querySelector('#topic').value;
  language = document.querySelector('#language').value;

  renderResults()
      .then(()=> renderPagination());
});

