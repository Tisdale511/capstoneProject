import React from 'react';
import logo from './logo.svg';
import './App.css';
import Store, { StoreProvider } from './store/index.js'
import MainContainer from './MainContainer'
import Header from './Header';

const store = new Store()

function App() {
  return (
    <StoreProvider store={store} >
      <Header />
      <MainContainer />
    </ StoreProvider >
  );
}

export default App;
