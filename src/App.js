import React, { useEffect } from 'react';
// import logo from './logo.svg';
import { Button } from 'reactstrap';
import './App.css';
import Store, { StoreProvider } from './store/index.js'
import MainContainer from './MainContainer'
import Header from './Header';
import api from './services/api';
import { useStore } from './store'

const newStore = new Store()

function App() {

  
  return (
    <StoreProvider store={newStore} >
      <Header />
      <MainContainer />
    </ StoreProvider >
  );
}

export default App;
