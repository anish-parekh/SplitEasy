import React from "react";
import "./Home.css";
import {Avatar} from "@material-ui/core";
import { useStateValue } from './StateProvider';
import Login from "./Login.js";
import { Link,useNavigate } from "react-router-dom";
import {BrowserRouter as Router,Routes,Switch,Route} from "react-router-dom";
import Footer from "./Footer.js"

function Home(props)
{
    const [{},dispatch] = useStateValue();
    // const navigate = useNavigate();
    // function logout(){
    //    return (
    // <Router>
    //     <Routes>
    //         <Route path="/" element={<Login/>}/>
    //     </Routes>
    //  </Router>
    //    )

    // };
    return (
       <> 
        <div className="home">
            <div className="spliteasy__logo__name">

            </div>
            <div className="home__header">
                <h1>Welcome to SplitEasy</h1>  
            </div>
            <div className="account_dropdown_button">
                <button class="btn btn-light dropdown-toggle bg-transparent" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <Avatar src={props.profile} className="user__avatar"/>{props.name}
                </button>
                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <a className="dropdown-item" >Account Settings</a>
                    
                    <a className="dropdown-item" >Log out</a>
                    {/* <Link to="/Login" >Log out</Link>
                    <a className="dropdown-item" onClick={logout}>Log out</a> */}
                </div>
            </div>
            
            
        </div>
        <div className="for__flex">

            <div className="flexbox__item home__body1">
                {/* <h1>IN</h1> */}
            </div>

            <div className="flexbox__item home__body2">
                {/* <h1>IN</h1>
                <h1>IN</h1> */}
            </div>

            <div className="flexbox__item home__body3">
                {/* <h1>IN</h1> */}
            </div>

        </div>

        <Footer />
        </>
    );
}

export default Home;