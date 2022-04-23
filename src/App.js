import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
// import "./styles.css";
import Login from "./Login.js";
import Home from "./Home.js";
import { useStateValue } from './StateProvider';
import {BrowserRouter as Router,Routes,Switch,Route} from "react-router-dom";
import Activity from "./Activity.js";
import Dashboard from "./Dashboard.js";
import Temp from "./Temp";
import { useCookies } from 'react-cookie';



function App() {
  const [{user},dispatch] = useStateValue();
  const [cookies, setCookie] = useCookies(['Name']);
  
  // useEffect(()=> {
  //   setCookie('Name',user.displayName, {path: '/'});
  // },[user])

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