import View from './view.js';
import icons from 'url:../../img/icons.svg';

class ResultView extends View {
  _parentEl = document.querySelector('.results');
  _errorMessage = 'no recipe found for your quires ';
  _message;

  _generateMarkup() {
    //resultView child class'ın metodu
    const id = window.location.hash.slice(1);
    return this._data.map(this._generateMarkupPreview).join('');
  }

  _generateMarkupPreview(result) {
    const id = window.location.hash.slice(1);

    return ` <li class="preview">    
    <a class="preview__link ${
      //sayfa değişmiyorsa aynı class ı tekrar kullanıyor.
      result.id === id ? 'preview__link--active' : ''
    }" href="#${result.id}">
      <figure class="preview__fig">
        <img src="${result.image}" alt="${result.title}" />
      </figure>
      <div class="preview__data">
        <h4 class="preview__title">${result.title} ...</h4>
        <p class="preview__publisher">${result.publisher}</p>
      </div>
    </a>
   </li>`;
  }
}

export default new ResultView();
