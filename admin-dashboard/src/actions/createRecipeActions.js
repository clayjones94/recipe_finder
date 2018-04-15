import axios from 'axios'
import api from '../support/api'

const API = {
  host: 'http://localhost:8000/api',
};

export default {
  getIngredientSuggestions(search, callback) {
    api.get(API.host+'/ingredients/suggest', {
       'q': search
    })
    .then(response => {
      callback(true, response);
    })
    .catch(e => {
       // catch errors.
       callback(false, e);
    })
  }
}