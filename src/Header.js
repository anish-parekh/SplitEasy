import React from 'react'
import "./Header.css";
import {Avatar} from "@material-ui/core";
import {Link, Navigate} from "react-router-dom";

function Header(props) {
    // function logOut() {
    //     return (
    //     <Navigate to={`/login`} />
    //     );
    // }
    return (
        <div className="header">
            <div className="home__header">
                <img src="/images/SplitEasy_logo_cropped.jpeg" />
            </div>
            <div className="account_dropdown_button">
                <button class="btn btn-light dropdown-toggle bg-transparent" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <Avatar src={props.profile} className="user__avatar"/>{props.name}
                </button>
                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <a className="dropdown-item" >Account Settings</a>
                    <Link to={`/`}>Log out</Link>
                    {/* <Link to="/Login" >Log out</Link>
                    <a className="dropdown-item" onClick={null_user}>Log out</a> */}
                </div>
            </div>
        </div>
    )
}

export default Header;