import React from 'react';
import TextField from 'material-ui/TextField';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import AutoComplete from 'material-ui/AutoComplete';
import RaisedButton from 'material-ui/RaisedButton';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

import createRecipeActions from '../actions/createRecipeActions.js';

const Units = [
  "gallon",
  "quart",
  "pint",
  "cup",
  "fluid_ounce",
  "tablespoon",
  "teaspoon",

  "pound",
  "ounce",
  "gram",
  "kilo_gram"
]

export default class CreateRecipeScreen extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
                    'recipe_name': "",
                    'serving_size': 4,
                    'cuisine': "italian",
                    'meal_type': "dinner",
                    'ingredients':{},
                    'ingredient_suggestions':[],
                    'ing_search_text':"",
                    'selected_ingredient':{},
                    'selected_quantity':0,
                    'unit_search_text':"",
                    'selected_unit':"",
                  };

  }

  fieldUpdate(event, newValue) {
    this.setState({'recipe_name': newValue});
  }

  servingSizeUpdate(event, index, value) {
    this.setState({'serving_size': value});
  }

  cuisineUpdate(event, index, value) {
    this.setState({'cuisine': value});
  }

  mealTypeUpdate(event, index, value) {
    this.setState({'meal_type': value});
  }

  addIngredient() {
    var timestamp = (new Date()).getTime();
    let ing = {
                ingredient:this.state.selected_ingredient,
                unit:this.state.selected_unit,
                quantity:this.state.quantity
              }
    this.state.ingredients['ingredient-' + timestamp ] = ing;
    this.setState({ 
                    ingredients : this.state.ingredients,
                    selected_ingredient: {},
                    ing_search_text:"",
                    selected_unit: "",
                    unit_search_text:"",
                    selected_quantity:0
                  });
  }

  handleUpdateInput(searchText) {
    var self = this;

    createRecipeActions.getIngredientSuggestions(searchText, function(success, suggestions){ 
      console.log(suggestions);
      if (success) {
        self.setState({ingredient_suggestions:suggestions.data});
      }
    });

    this.setState({
      ing_search_text: searchText,
    });
  }

  selectIngredient(chosenRequest, index) {
    if (index == -1) {
      if (this.state.ingredient_suggestions.length > 0) {
        let ing = this.state.ingredient_suggestions[0];
        this.setState({ 
          ing_search_text: ing.long_desc,
          selected_ingredient: ing
        });
      } else {
        this.setState({ 
          ing_search_text: ""
        });
      }
    } else {
      let ing = this.state.ingredient_suggestions[index];
      this.setState({ 
        selected_ingredient: ing
      });
    }
  }

  onFieldChange(event, newValue) {
    this.setState({ quantity:newValue })
  }

  selectUnit(chosen, index) {
    this.setState({selected_unit:this.state.unit_search_text})
  }

  createRecipe() {
    var ingredients = [];
    for(var key in this.state.ingredients) { 
      var ing = this.state.ingredients[key];
      ing.ingredient = ing.ingredient.id;
      ingredients.push(ing); 
    }
    var data = {
      name: this.state.recipe_name,
      serving_size: this.state.serving_size,
      cuisine: this.state.cuisine,
      meal_type: this.state.meal_type,
      recipe_ingredients: ingredients
    }
    createRecipeActions.createRecipe(data, function(success, suggestions){ 
      if (success) {
         this.setState({
                    'recipe_name': "",
                    'serving_size': 4,
                    'cuisine': "italian",
                    'meal_type': "dinner",
                    'ingredients':{},
                    'ingredient_suggestions':[],
                    'ing_search_text':"",
                    'selected_ingredient':{},
                    'selected_quantity':0,
                    'unit_search_text':"",
                    'selected_unit':"",
                  });
      }
    });
  }

  render() {
    return (
      <div>
        <TextField
          hintText="Recipe Name"
          onChange={this.fieldUpdate.bind(this)}
        /><br />
        <DropDownMenu 
          name="serving-size"
          value={this.state.serving_size} 
          onChange={this.servingSizeUpdate.bind(this)}
        >
          <MenuItem value={1} primaryText="1" />
          <MenuItem value={2} primaryText="2" />
          <MenuItem value={3} primaryText="3" />
          <MenuItem value={4} primaryText="4" />
          <MenuItem value={5} primaryText="5" />
          <MenuItem value={6} primaryText="6" />
          <MenuItem value={7} primaryText="7" />
          <MenuItem value={8} primaryText="8" />
          <MenuItem value={9} primaryText="9" />
          <MenuItem value={10} primaryText="10" />
        </DropDownMenu>
        <DropDownMenu
          value={this.state.cuisine} 
          onChange={this.cuisineUpdate.bind(this)}
        >
          <MenuItem value={"italian"} primaryText="Italian" />
          <MenuItem value={"seafood"} primaryText="Seafood" />
          <MenuItem value={"american"} primaryText="American" />
          <MenuItem value={"french"} primaryText="French" />
        </DropDownMenu>
        <DropDownMenu
          value={this.state.meal_type} 
          onChange={this.mealTypeUpdate.bind(this)}
        >
          <MenuItem value={"dinner"} primaryText="Dinner" />
          <MenuItem value={"breakfast"} primaryText="Breakfast" />
          <MenuItem value={"lunch"} primaryText="Lunch" />
          <MenuItem value={"side"} primaryText="Side" />
        </DropDownMenu><br />
        <h2>Ingredients</h2>
          <Table
            selectable={false}
          >
            <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
              <TableRow>
                <TableHeaderColumn>Ingredient</TableHeaderColumn>
                <TableHeaderColumn>Quantity</TableHeaderColumn>
                <TableHeaderColumn>Unit</TableHeaderColumn>
                <TableHeaderColumn></TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody
              displayRowCheckbox={false}
            >
              {
                Object.keys(this.state.ingredients).map(function(key) {
                  return  <TableRow>
                            <TableRowColumn>{this.state.ingredients[key].ingredient.long_desc}</TableRowColumn>
                            <TableRowColumn>{this.state.ingredients[key].quantity}</TableRowColumn>
                            <TableRowColumn>{this.state.ingredients[key].unit}</TableRowColumn>
                          </TableRow>
                }.bind(this))
              }
              <TableRow>
                <TableRowColumn>
                  <AutoComplete
                    hintText="Search Ingredient"
                    searchText={this.state.ing_search_text}
                    filter={AutoComplete.noFilter}
                    onUpdateInput={this.handleUpdateInput.bind(this)}
                    onNewRequest={this.selectIngredient.bind(this)}
                    dataSource={this.state.ingredient_suggestions.map(value => value.long_desc)}
                    openOnFocus={true}
                  />
                </TableRowColumn>
                <TableRowColumn>
                  <TextField
                    hintText="Quantity"
                    onChange={this.onFieldChange.bind(this)}
                  />
                </TableRowColumn>
                <TableRowColumn>
                  <AutoComplete
                    hintText="Unit"
                    searchText={this.state.unit_search_text}
                    filter={AutoComplete.caseInsensitiveFilter}
                    onUpdateInput={(searchText)=>{this.setState({unit_search_text:searchText})}}
                    onNewRequest={this.selectUnit.bind(this)}
                    dataSource={Units}
                    openOnFocus={true}
                  />
                </TableRowColumn>
                <TableRowColumn>
                  <RaisedButton label="Add Ingredient" primary={true} onClick={this.addIngredient.bind(this)} />
                </TableRowColumn>
              </TableRow>
            </TableBody>
          </Table>
          <RaisedButton label="Create Recipe" primary={true} onClick={this.createRecipe.bind(this)} />
      </div>
    );
  }
}