import React from 'react';
import logo from './logo.svg';
import './App.css';
import Store, { StoreProvider } from './store/index.js'
import MainContainer from './MainContainer'
import OtherContainer from './OtherContainer';

const store = new Store()

function App() {
  return (
    <StoreProvider store={store} >
      <MainContainer />
      <OtherContainer/>
    </ StoreProvider >
  );
}

export default App;
