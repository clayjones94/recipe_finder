import React from 'react';
import TextField from 'material-ui/TextField';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import AutoComplete from 'material-ui/AutoComplete';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

import createRecipeActions from '../actions/createRecipeActions.js';

export default class CreateRecipeScreen extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
                    'recipe_name': "",
                    'serving_size': 4,
                    'cuisine': "italian",
                    'meal_type': "dinner",
                    'ingredients':{},
                    'search_text':"",
                  };

    this.ingredientSuggestions = [];
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

  addIngredient(ingredient) {
    var timestamp = (new Date()).getTime();
    this.state.ingredients['ingredient-' + timestamp ] = ingredient;
    this.setState({ ingredients : this.state.ingredients });
  }

  handleUpdateInput(searchText) {
    this.setState({
      searchText: searchText,
    });
    createRecipeActions.getIngredientSuggestions(searchText, function(success, suggestions){
      console.log(suggestions);
    });
  }

  handleNewRequest() {
    this.setState({
      searchText: '',
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
            <TableHeader>
              <TableRow>
                <TableHeaderColumn>Ingredient</TableHeaderColumn>
                <TableHeaderColumn>Quantity</TableHeaderColumn>
                <TableHeaderColumn>Unit</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody
              displayRowCheckbox={false}
            >
              {
                Object.keys(this.state.ingredients).map(function(key) {
                  return  <TableRow>
                            <TableRowColumn>{this.state.ingredients[key].ingredient.name}</TableRowColumn>
                            <TableRowColumn>{this.state.ingredients[key].quantity}</TableRowColumn>
                            <TableRowColumn>{this.state.ingredients[key].unit}</TableRowColumn>
                          </TableRow>
                }.bind(this))
              }
              <TableRow>
                <TableRowColumn>
                  <AutoComplete
                    hintText="Search Ingredient"
                    searchText={this.state.search_text}
                    onUpdateInput={this.handleUpdateInput.bind(this)}
                    onNewRequest={this.handleNewRequest.bind(this)}
                    dataSource={this.ingredientSuggestions}
                    filter={(searchText, key) => (key.indexOf(searchText) !== -1)}
                    openOnFocus={true}
                  />
                </TableRowColumn>
                <TableRowColumn></TableRowColumn>
                <TableRowColumn></TableRowColumn>
              </TableRow>
            </TableBody>
          </Table>
      </div>
    );
  }
}