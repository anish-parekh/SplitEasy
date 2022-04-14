import React from 'react';
import ReactDOM from 'react-dom';
// import "./styles.css";
import Login from "./Login.js";
import Home from "./Home.js";
import { useStateValue } from './StateProvider';
import {BrowserRouter as Router,Routes,Switch,Route} from "react-router-dom";
import Activity from "./Activity.js";
import Dashboard from "./Dashboard.js";
import Temp from "./Temp";

function App() {
  const [{user},dispatch] = useStateValue();
  return (
    <div className="App">
    {
      !user 
      ? (
          <Login />
      ) 
      : (
         <Home name={user.displayName} profile={user?.photoURL}/>
      ) 
    }
    </div>
  );
}

export default App;