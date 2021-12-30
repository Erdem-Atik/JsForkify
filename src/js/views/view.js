import icons from 'url:../../img/icons.svg';

export default class View {
  // Parent class
  _data; // parametre olarak girilen veri private p roperty olur

  render(data) {
    if (!data || (Array.isArray(data) && data.length === 0))
      // Array.isArray([]) method determines whether the passed value is an Array. ((Array.isArray(data) array mi değil mi && data.length === 0) array'in lengh'i sıfır mı)
      return this.renderError();
    //bu metod çağrıldığında, parametre olarak girilen obje verisi kullanılır. bu
    this._data = data; // parametre olarak girilen obje verisi class'ın property sine dönüştürülür kullanılır

    const markup = this._generateMarkup(); // generatemarkup private metodu çağrılıp gelen html markup değişkenine tanımlanıyor
    this._clear(); // alanı temizliyor
    this._errorMessage = 'sorun';
    this._parentEl.insertAdjacentHTML('afterbegin', markup); //üretilen html yapıştırılıyor
  }

  update(data) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError(); // sağda listelendikten boş quiry olduğunda refresh yaparken hata vermemesi için siliyoruz- empty array olduğu için boş dönüyor

    this._data = data;
    const newMarkup = this._generateMarkup(); // yeni markup la eskiyi kıyaslayacağız. böylece değişmeyecek olan elementler aynı kalacak. şimdiki elementle sayfa yenilendiğindeki html kıyaslanacak

    const newDom = document.createRange().createContextualFragment(newMarkup); //string veriyi DOM node obje verisine dönüştürüyor
    const newElements = Array.from(newDom.querySelectorAll('*')); //nodelist veriyi array'a dönüştürüyor
    const curElements = Array.from(this._parentEl.querySelectorAll('*')); //nodelist veriyi array'a dönüştürüyor

    newElements.forEach((newEl, i) => {
      // özetle yeni nodelist eski nodelist karşılaştırılıyor
      const curEl = curElements[i];
      // console.log(curEl, newEl.isEqualNode(curEl));

      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue.trim() !== ''
      ) {
        //new elemenet'in first child property'sine bakılır; nodevalue= null ise node text elementtir
        console.log('YEEEENİİİİ', newEl.firstChild.nodeValue.trim()); // yeni null olan elementleri gösteriyor
        curEl.textContent = newEl.textContent;
      }
      if (!newEl.isEqualNode(curEl)) {
        Array.from(newEl.attributes).forEach(attr =>
          curEl.setAttribute(attr.name, attr.value)
        );
      }
    });
  }

  _clear() {
    this._parentEl.innerHTML = '';
  }
  renderError(message = this._errorMessage) {
    const markup = `
    <div class="error">
            <div>
              <svg>
                <use href="${icons}#icon-alert-triangle"></use>
              </svg>
            </div>
            <p>${message}</p>
          </div>
    `;
    this._clear();
    this._parentEl.insertAdjacentHTML('afterbegin', markup);
  }

  renderMessage(message = this._message) {
    const markup = `
    <div class="error">
            <div>
              <svg>
                <use href="${icons}#icon-smile-triangle"></use>
              </svg>
            </div>
            <p>${message}</p>
          </div>
    `;
    this._clear();
    this._parentEl.insertAdjacentHTML('afterbegin', markup);
  }

  renderSpinner = function () {
    const markup = `
    <div class="spinner">
            <svg>
              <use href="${icons}#icon-loader"></use>
            </svg>
          </div>
    `;

    this._clear();
    this._parentEl.insertAdjacentHTML('afterbegin', markup);
  };
}
