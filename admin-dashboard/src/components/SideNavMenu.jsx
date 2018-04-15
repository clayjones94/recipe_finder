import React from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import { Link } from 'react-router-dom'

export default class SideNavMenu extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Drawer
        docked={false}
        width={200}
        open={this.props.open}
        onRequestChange={(open) => this.props.toggleMenu(open)}
      >
        <Link to={'/recipes'}><MenuItem onClick={this.props.handleClose}>Recipes</MenuItem></Link>
        <Link to={'/ingredients'}><MenuItem onClick={this.props.handleClose}>Ingredients</MenuItem></Link>
        <Link to={'/recipes/new'}><MenuItem onClick={this.props.handleClose}>Create Recipe</MenuItem></Link>
      </Drawer>
    );
  }
}