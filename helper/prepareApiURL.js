/* eslint-disable require-jsdoc */
function prepareApiURL(author, title, topic, language, currentPage) {
  return encodeURI(
      'https://gutendex.com/books?' +
    ((author || title) && `search=${author && author + ' '}${title}`) +
    (topic && `&topic=${topic}`) +
    (language && `&languages=${language}`) +
    `&page=${currentPage}`,
  );
}

export default prepareApiURL;
