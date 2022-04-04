import React from 'react';
import ReactDOM from 'react-dom';
// import "./styles.css";
import Login from "./Login.js";
import Home from "./Home.js";
import { useStateValue } from './StateProvider';

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
        <Home name={user.displayName}/> 
      ) 
    }
    </div>
  );
}

export default App;