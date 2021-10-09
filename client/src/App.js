import React from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'

import Home from './pages/Home'
import Form from './pages/Form'

function App() {
  return (
    
    <Router>

      <Route exact path="/">
        <Home/>
      </Route>

      <Route exact path="/form">
        <Form/>
      </Route>

    </Router>

  );
}

export default App;
