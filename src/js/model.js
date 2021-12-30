import { async } from 'regenerator-runtime';
import { API_URL, RES_PER_PAGE } from './config.js';
import { getJSON } from './helper.js';

export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    resultsPerPage: RES_PER_PAGE,
    page: 1,
  },
};

export const loadRecipe = async function (id) {
  //loadRecipe async funciton. async function returns a promise
  try {
    const data = await getJSON(`${API_URL}/${id}`);

    const { recipe } = data.data; // Web api'den gelen veri destruct ediliyor.
    //gelen veri yukarda tanımlanan boş state objesine ekleniyor.
    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceURL: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };

    // console.log(state.recipe);
  } catch (err) {
    console.error(`${err} ***`);
    throw err;
  }
};

export const loadSearchResult = async function (query) {
  try {
    state.search.query = query;

    const data = await getJSON(`${API_URL}?search=${query}`); //API name kontrol et?? `${API_URL}?search=${query}`)

    state.search.results = data.data.recipes.map(rec => {
      return {
        id: rec.id,
        title: rec.title,
        publisher: rec.publisher,
        image: rec.image_url,
      };
    });
    //console.log(state.search.results);
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const getSearchResultsPage = function (page = state.search.page) {
  state.search.page = page;

  const start = (page - 1) * state.search.resultsPerPage; //pagination'nın 10 arlı olarak ayrılmasını sağlayacak ilk değişken
  const end = page * state.search.resultsPerPage; //pagination'nın 10 arlı olarak ayrılmasını sağlayacak 2. değişken

  return state.search.results.slice(start, end); //result array'nin hangi başlangıç ve sonla kesilmesi gerektiğini belirtir.
};

export const updateServings = function (newServing) {
  state.recipe.ingredients.forEach(ing => {
    ing.quantity = (ing.quantity * newServing) / state.recipe.servings; // tarifin kaç kişilik olduğuna tarifteki miktarlar günncelleniyor, örneğin 2 kişilik tarif miktarı 4 kişi için güncelleniyor
  });
  state.recipe.servings = newServing;
  // tarifin kaç kişilik olduğu güncelleniyor
};
