import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import reducer, {initialState} from "./reducer";
import {StateProvider} from "./StateProvider";
import {BrowserRouter,Routes,Switch,Route} from "react-router-dom";
import { CookiesProvider } from 'react-cookie';


ReactDOM.render(
  <React.StrictMode>
    <StateProvider initialState={initialState} reducer={reducer}>
    <BrowserRouter>
    <CookiesProvider>
    <App />
    </CookiesProvider>
    </BrowserRouter>
    </StateProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
