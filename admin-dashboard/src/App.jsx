import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import MainNavBar from './components/MainNavBar.jsx';
import SideNavMenu from './components/SideNavMenu.jsx';
import Main from './components/Main.jsx';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {menuOpen: false};
  }

  handleTouchMenu() {
    this.setState({menuOpen: !this.state.menuOpen});
  }

  handleClose() {
    this.setState({menuOpen: false});
  }

  toggleMenu(open) {
    this.setState({menuOpen: open});
  }

  render() {
    return (

      <div className="App">
        <MuiThemeProvider>
          <MainNavBar
            handleTouchMenu = { this.handleTouchMenu.bind(this) }
          />
          <SideNavMenu
            open = {this.state.menuOpen}
            handleClose = {this.handleClose.bind(this)}
            toggleMenu = { this.toggleMenu.bind(this) }
          />
          <Main/>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default App;
