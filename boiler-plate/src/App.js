import React from 'react';
import './App.css';
import {BrowserRouter as Router} from 'react-router-dom';
import Nav from './Components/Navigation';
import Container from './Components/Container';
import {Provider} from 'react-redux';
import store from './store';

const App = () => {
  return (
    <Provider store = {store}>
    <Router>
      <Nav/>
      <Container/>
    </Router>
    </Provider>
  );
}

export default App;
