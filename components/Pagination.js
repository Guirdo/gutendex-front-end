/* eslint-disable require-jsdoc */
export default function Pagination(currentPage, totalPages) {
  return (`
    <div class="pagination">
      <button
        id="previous"
        class="pagination__button"
      >
        <- Previous
      </button>

      <div>${currentPage} of ${totalPages}</div>

      <button
        id="next"
        class="pagination__button"
      >
        Next ->
      </button>
    </div>
  `);
}
