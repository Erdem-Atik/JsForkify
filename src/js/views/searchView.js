class SearchView {
  _parentEl = document.querySelector('.search');

  getQuery() {
    const query = this._parentEl.querySelector('.search__field').value; // search parent class'ından search_field child class seçiyoruz
    this._clearInput();
    return query;
  }
  _clearInput() {
    this._parentEl.querySelector('.search__field').value = '';
  }
  addHandleSearch(handler) {
    this._parentEl.addEventListener('submit', function (e) {
      e.preventDefault();
      handler();
    });
  }
}

export default new SearchView();
