import React from "react";
import ReactDOM from 'react-dom';
import "./Login.css";
import {Button} from "@material-ui/core";
import {auth,provider} from "./firebase";
import { useStateValue } from './StateProvider';
import { actionTypes } from './reducer';
import GoogleIcon from '@material-ui/icons';

function Login() {
    const [{},dispatch] = useStateValue();
  const signIn = () => {
        auth.signInWithPopup(provider)
            .then((result) => {
                dispatch({
                    type: actionTypes.SET_USER,
                    user: result.user             /** extracting the username from the details given by signing in through google */
                })
            })
            .catch((error) => alert(error.message));      
    };
    
  return (
    <div className='login'>
        <div className='login__container'>
            <img
                src="https://i.ibb.co/w6mBN3s/Split-Easy-logo.jpg"
                alt="No Image Found!"
            />

            <div className='login__text'>
                {/* <h4>Sign in to SplitEasy</h4>  */}
            </div>

            <Button onClick={signIn}>
                <img src="https://www.freepnglogos.com/uploads/google-logo-png/google-logo-icon-png-transparent-background-osteopathy-16.png" height="50px"/>
            </Button>

            {/* <button type="button" class="btn btn-info" onClick={signIn}>
                Sign in with Google
            </button> */}
        </div>
    </div>
  );
}

export default Login;