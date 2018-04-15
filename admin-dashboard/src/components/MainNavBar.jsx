import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';

export default class MainNavBar extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <AppBar
        title="Title"
        onLeftIconButtonClick = { this.props.handleTouchMenu }
      />
    );
  }
}