/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
export default function BookCard(book) {
  return `
    <div class="book-card">
      <figure class="book-card-cover">
        <img 
          class="book-card-cover__image"
          src="${book.cover}" 
          alt="${book.title}}"
        >
      </figure>

      <div class="book-card-info">
        <span class="book-card__title">${book.title}</span>
        <span class="book-card__authors">By ${book.authors.join(', ')}</span>
        <span class="book-card__languages">
          Available in ${book.languages.length} ${book.languages.length === 1 ? 'language' : 'languages'}
        </span>
        <details class="book-card-topics">
          <summary>Topics</summary>
          <ul class="book-card-topics-list">
            ${book.topics.map((topic) => (`
              <li>${topic}</li>
            `)).join('')}
          </ul>
        </details>
        <details class="book-card-bookshelves">
          <summary>Bookshelves</summary>
          <ul class="book-card-bookshelves-list">
            ${book.topics.map((topic) => (`
              <li>${topic}</li>
            `)).join('')}
          </ul>
        </details>
      </div>

      <div class="book-card-read-options">
        <a 
          class="button button--success"
          href="${book.readOnlineLink}"
          target="_blank"
        >
          Read online
        </a>

        <a 
          class="button button--info"
          href="${book.epubDownloadLink}"
          target="_blank"
        >
          EPUB
        </a>

        <span class="book-card__download-count">${book.downloadCount} downloads</span>
      </div>
    </div>
  `;
}
