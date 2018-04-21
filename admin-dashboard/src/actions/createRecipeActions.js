import axios from 'axios'
import api from '../support/api'

const API = {
  host: 'http://localhost:8000/api',
};

export default {
  getIngredientSuggestions(search, callback) {
    api.get(API.host+'/ingredients/suggest?q='+search)
    .then(response => {
      callback(true, response);
    })
    .catch(e => {
       // catch errors.
       callback(false, e);
    })
  },

  createRecipe(data, callback) {
    //'name', 'serving_size', 'cuisine', 'meal_type', 'recipe_ingredients'
    if (!data.name) {console.log("Must have name"); return;}
    if (!data.serving_size) {console.log("Must have serving_size"); return;}
    if (!data.cuisine) {console.log("Must have cuisine"); return;}
    if (!data.meal_type) {console.log("Must have meal_type"); return;}
    if (!data.recipe_ingredients) {console.log("Must have recipe_ingredients"); return;}
    if (data.recipe_ingredients.length < 1) {console.log("Must have at least one ingredient"); return;}
    for (var i = 0; i < data.recipe_ingredients.length; i++) {
      var rec_ing = data.recipe_ingredients[i];
      if (!rec_ing.quantity) {console.log("Recipe ingredient must have quantity"); return;}
      if (!rec_ing.unit) {console.log("Recipe ingredient must have unit"); return;}
      if (!rec_ing.ingredient) {console.log("Recipe ingredient must have ingredient"); return;}
    }
    api.post(API.host+'/recipe/create', data)
    .then(response => {
      callback(true, response);
    })
    .catch(e => {
       // catch errors.
       callback(false, e);
    })
  }
}