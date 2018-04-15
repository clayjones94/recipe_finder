import React from 'react';
import RecipesScreen from '../screens/RecipesScreen.jsx'
import IngredientsScreen from '../screens/IngredientsScreen.jsx'
import CreateRecipeScreen from '../screens/CreateRecipeScreen.jsx'
import { Switch, Route } from 'react-router-dom'

export default class Main extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <main>
        <Switch>
          <Route exact path='/' component={RecipesScreen}/>
          <Route path='/recipes/new' component={CreateRecipeScreen}/>
          <Route path='/recipes' component={RecipesScreen}/>
          <Route path='/ingredients' component={IngredientsScreen}/>
        </Switch>
      </main>
    );
  }
}