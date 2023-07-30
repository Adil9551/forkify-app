import View from './View.js';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');

      if (!btn) return;

      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    });
  }

  _generateMarkup() {
    const currPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    // Page 1, and there are other pages
    if (this._data.page === 1 && numPages > 1) {
      return this._nextPageMarkup(currPage);
    }

    // Last page
    if (this._data.page === numPages && numPages > 1) {
      console.log(currPage);
      return this._prevPageMarkup(currPage);
    }

    // Other page
    if (this._data.page < numPages) {
      return this._prevPageMarkup(currPage) + this._nextPageMarkup(currPage);
    }

    return '';
    // Page 1, and there are No other pages
  }

  _prevPageMarkup(page) {
    return `
    <button data-goto="${page - 1}" class="btn--inline pagination__btn--prev">
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span>Page ${page - 1}</span>
    </button>
  `;
  }
  _nextPageMarkup(page) {
    return `
    <button data-goto="${
      page + 1
    }" class="btn--inline pagination__btn--next">     
        <span>Page ${page + 1}</span>
        <svg class="search__icon">
        <use href="${icons}#icon-arrow-right"></use>
    </svg>
    </button>
  `;
  }
}

export default new PaginationView();
