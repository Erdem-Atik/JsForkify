import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultView from './views/resultView.js';
import paginationView from './views/paginationView.js';
// import icons from '../img/icon.svg'; // parcel 1

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import View from './views/view.js';

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// if (module.hot) {
//   module.hot.accept();
// }

///////////////////////////////////////

const controlRecipe = async function () {
  try {
    const id = window.location.hash.slice(1); // returns URL's after # symbol
    console.log(id);

    if (!id) return;
    recipeView.renderSpinner(); // async fonksiyon değil
    // 0) update results view to mark selected search result
    s;
    resultView.update(model.getSearchResultsPage());

    //1) loading recipe

    await model.loadRecipe(id); // ??? bir daha izle!! bu fonksiyonun döneceği promise den kaçınmak için promise'den anlamlı sonuç çıkarıoyruz.
    const { recipe } = model.state; // web API den gelen data recipe olarak   destruct edilir.

    //2)rendering recipe
    console.log(model.state.recipe);
    recipeView.render(model.state.recipe); // export edilen recipeView class yeni tipte obje üretilir
  } catch (err) {
    // recipeView.renderError(); // error handling yapacağız.
  }
};

const controlSearchResults = async function () {
  try {
    resultView.renderSpinner();
    //1 get search query
    const query = searchView.getQuery();
    if (!query) return; //guard clause
    // 2 load search result
    await model.loadSearchResult(query); // bir şey getirmediğimiz sonucu bir değişkene tanımlamıyoruz

    console.log(model.state.search.results); // yukardaki promise'ın sonucu burada
    //3 render results
    resultView.render(model.getSearchResultsPage(3));
    //render initial pagination
    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};

const controlPagination = function (goToPage) {
  //render new result
  resultView.render(model.getSearchResultsPage(goToPage));
  //render new pagination button
  paginationView.render(model.state.search); // bir daha bak!
};

const controlServings = function (newServing) {
  // update the recipe serving
  model.updateServings(newServing);
  // update the recipe view regarding how many person

  recipeView.update(model.state.recipe);
};

const init = function () {
  // ??? publisher subscriber pattern
  recipeView.addHandleRender(controlRecipe); // controlRecipe fonksiyonu addHandleRender fonksiyonunun argümanı oldu!
  recipeView.addHandlerUpdateServings(controlServings);
  searchView.addHandleSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
};

init();
