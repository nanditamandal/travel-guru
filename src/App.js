import React, { createContext, useState } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory,
  useLocation
} from "react-router-dom";
import Header from './Component/Header/Header';
import Home from './Component/Home/Home';
import Booking from './Component/Booking/Booking';
import NotMatch from './Component/NotMatch/NotMatch';
import Hotel from './Component/Hotel/Hotel';
import PrivateRoute from './Component/PrivateRoute/PrivateRoute';
import Login from './Component/Login/Login';
import Map from './Component/Map/Map';

export const UserContext= createContext();

function App() {
  const [logInUser, setLogInUser]=useState({
        
    displayName:'',
    email:'',
    name: false
    
  
  });
  
  return (
    <UserContext.Provider   value={[logInUser, setLogInUser]}>
   <div className="App" >
    <Router>
    <Header></Header>
    <Switch>
        <Route path="/home">
          <Home></Home>
        </Route>
        <Route path="/map">
          <Map></Map>
        </Route>
        <PrivateRoute path="/hotel/:placeName">
           <Hotel></Hotel>
          </PrivateRoute>
        <Route exact path="/">
          <Home></Home>
        </Route>
        
        
        <Route path="/booking/:placeName">
            <Booking></Booking>
          </Route>
         
          <Route  path="/login">
          <Login></Login>
        </Route>
          
          
        <Route path="*">
          <NotMatch></NotMatch>
        </Route>
    </Switch>
  </Router>
  </div>

  </UserContext.Provider>
   
  );
}

export default App;
