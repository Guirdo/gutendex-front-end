/* eslint-disable require-jsdoc */
import '../style/global.scss';
import BookCard from '../components/BookCard';

const advancedSearchForm = document.querySelector('#advancedSearchForm');
const bookList = document.querySelector('#bookList');

function prepareApiURL(author, title, topic, language) {
  return encodeURI(
      'https://gutendex.com/books?' +
    ((author || title) && `search=${author && author + ' '}${title}`) +
    (topic && `&topic=${topic}`) +
    (language && `&languages=${language}`),
  );
}

advancedSearchForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  bookList.innerHTML = '<h3>Wait a second...</h3>';

  const author = document.querySelector('#author').value;
  const title = document.querySelector('#title').value;
  const topic = document.querySelector('#topic').value;
  const language = document.querySelector('#language').value;

  const url = prepareApiURL(author, title, topic, language);

  await fetch(url)
      .then(async (res)=> await res.json())
      .then(async ({results}) => {
        bookList.innerHTML = await results.map((book)=> BookCard({
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
});

