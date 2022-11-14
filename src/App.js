import './App.css';
import React from 'react'
import Home from './components/Home'
import Staff from './components/staff/Staff'
import Rider from './components/rider/Rider'
import Grab from './components/staff/components/Grab'
import FoodPanda from './components/staff/components/FoodPanda'
import Jollibee from './components/staff/components/Jollibee'
import OpenDoor from './components/staff/components/OpenDoor'
import Doors from './components/rider/components/Doors'

import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
function App() {
  return (
    <div className="App">
       <Router>
          <Routes>
          <Route
                path="/"
                element={ <Home /> }
              />
              <Route
                path="/staff"
                element={ <Staff /> }
              />
               <Route 
                path='/grab'
                element={ <Grab /> }/>
                <Route 
                path='/foodpanda'
                element={ <FoodPanda /> }/>
                <Route 
                path='/jollibee'
                element={ <Jollibee /> }/>
                <Route 
                path='/grab/opendoor'
                element={ <OpenDoor />} />
                 <Route 
                path='/foodpanda/opendoor'
                element={ <OpenDoor />} />
                 <Route 
                path='/jollibee/opendoor'
                element={ <OpenDoor />} />
              <Route 
                path='/rider'
                element={ <Rider /> }/>
                 <Route 
                path='/rider/doors'
                element={ <Doors /> }/>
                
          </Routes>
        </Router>
    </div>
  );
}

export default App;
