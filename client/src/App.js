import React from 'react';
import './App.css';
import Main from './views/Main';
import New from './views/New';
import Detail from './views/Detail';
import { Router } from '@reach/router';
import Update from './views/Update';

function App() {
  return (
    <div className="App">
      <h1>Pet Shelter</h1>
      <Router>
        <Main path="/" />
        <New path="pets/new" />
        <Detail path="pets/:id" />
        <Update path="pets/:id/edit" />
      </Router>
    </div>
  );
}

export default App;
