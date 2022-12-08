/* eslint-disable require-jsdoc */
import '../style/global.scss';

const advancedSearchForm = document.querySelector('#advancedSearchForm');

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

  const author = document.querySelector('#author').value;
  const title = document.querySelector('#title').value;
  const topic = document.querySelector('#topic').value;
  const language = document.querySelector('#language').value;

  const url = prepareApiURL(author, title, topic, language);

  const bookList = await fetch(url)
      .then((res) => res.json())
      .catch((error) => console.log(error));
});

