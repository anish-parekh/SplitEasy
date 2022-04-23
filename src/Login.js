import React, {useEffect} from "react";
import ReactDOM from 'react-dom';
import "./Login.css";
import Home from "./Home.js";
import {Button} from "@material-ui/core";
import {auth,provider} from "./firebase";
import { useStateValue } from './StateProvider';
import { actionTypes } from './reducer';
import GoogleIcon from '@material-ui/icons';
import { useCookies } from 'react-cookie';

function Login() {
    const [{},dispatch] = useStateValue();
    const [{user},Dispatch] = useStateValue(); // temply added 
    const [cookies, setCookie] = useCookies(['Name']);

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

    // useEffect(()=> {     // temply added 
    //     setCookie('Name',user.displayName, {path: '/'});
    //   },[user])

  return (
    <div className='login'>
        <div className='login__container'>
            <img
                src="/images/SplitEasy_logo.jpeg"
                alt="No Image Found!"
            />

            <div className='login__text'>
                {/* <h4>Sign in to SplitEasy</h4>  */}
            </div>

            <Button onClick={signIn}>
                <img src="https://www.freepnglogos.com/uploads/google-logo-png/google-logo-icon-png-transparent-background-osteopathy-16.png" height="50px"/>
            </Button>
            {/* {cookies.Name && <Home name={cookies.Name} profile={user?.photoURL}/>} */}
            {/* <button type="button" class="btn btn-info" onClick={signIn}>
                Sign in with Google
            </button> */}
        </div>
    </div>
  );
}

export default Login;