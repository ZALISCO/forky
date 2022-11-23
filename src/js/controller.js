// import icons from '../img/icons.svg';//parcel 1

import * as model from './model.js'
import recipeView from './views/recipeView.js'
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import "core-js/stable";

import "regenerator-runtime/runtime"
import { async } from 'regenerator-runtime';


if (module.hot) {

  module.hot.accept();
}
const controlRecipe = async function () {

  try {
    const id = window.location.hash.slice(1)


    if (!id) return;
    recipeView.renderSpinner()
    //loading rec
    await model.loadRecipe(id);
    // const { recipe } = model.state//{recipe}destruct
    //rendering recipe
    recipeView.render(model.state.recipe);
    // controlServings();
  } catch (err) {

    recipeView.renderError();
  }

};
const controleSearchResults = async function () {
  try {
    resultsView.renderSpinner();
    //get searach query
    const query = searchView.getQuery();
    if (!query) return;

    //load search results
    await model.loadSearchResults(query)
    //render results

    // resultsView.render(model.state.search.results)
    resultsView.render(model.getSearchResultsPage());

    //rener initialization  pagination of button
    paginationView.render(model.state.search)
  } catch (err) {

    console.log(err);
  }


}

const paginationControler = function (goToPage) {
  //render results

  // resultsView.render(model.state.search.results)
  resultsView.render(model.getSearchResultsPage(goToPage));

  //rener initialization  pagination of button
  paginationView.render(model.state.search)


}
const controlServings = function (newServings) {
  //updating recipe serving in the state
  model.updateServings(newServings);

  recipeView.render(model.state.recipe);

  recipeView.update(model.state.recipe);

}

//this is the the controlers where te click ,search render and so on happens
const init = function () {
  recipeView.addHandlerRender(controlRecipe);
  recipeView.addHandlerUpdateServings(controlServings);
  searchView.addHandlerSearch(controleSearchResults);
  paginationView.addhandlerClick(paginationControler);

}
init();


