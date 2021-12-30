import View from './view.js';
import icons from 'url:../../img/icons.svg';

const nextPaginationBtn = function (curr, ic) {
  return ` <button data-goto="${
    curr + 1
  }" class="btn--inline pagination__btn--next">
  <span>${curr + 1}</span>
  <svg class="search__icon">
    <use href="${ic}#icon-arrow-right"></use>
  </svg>
</button>`;
};

const prevPaginationBtn = function (curr, ic) {
  return `<button data-goto="${
    curr - 1
  }" class="btn--inline pagination__btn--prev">
        <svg class="search__icon">
          <use href="${ic}#icon-arrow-left"></use>
        </svg>
        <span>${curr - 1}</span>
      </button>
       `;
};

class PaginationView extends View {
  _parentEl = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentEl.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline'); // up to DOM tree-hangi class'ı yakalarsa event i aktif ediyor.
      if (!btn) return;

      const goToPage = +btn.dataset.goto;
      // console.log(goToPage);
      handler(goToPage);
    });
  }
  _generateMarkup() {
    const curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage // array'de kaç tarif olduğunu hesaplar(length) / kaçarlı sayfalara bölünmesi gerektiğine böler. çıkan sonucu kaç sayfa olduğudur
    );
    //page 1 and there are other pages
    if (curPage === 1 && numPages > 1) {
      return nextPaginationBtn(curPage, icons);
    }

    //last pages
    if (curPage === numPages && numPages > 1) {
      return prevPaginationBtn(curPage, icons);
    }
    //other pages
    if (curPage < numPages) {
      const prev = prevPaginationBtn(curPage, icons);
      //const next = nextPaginationBtn(curPage, icons);
      const merged = prev.concat(nextPaginationBtn(curPage, icons));

      return merged;
    }

    //page 1 and there are no other pages

    return '';
  }
}

export default new PaginationView();
