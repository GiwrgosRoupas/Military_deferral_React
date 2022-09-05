import React, {useContext} from "react";
import {Link, useNavigate, useLocation} from "react-router-dom";
import logo from "./assets/images/logo_full.png";
import './assets/css/stylesheet.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignOutAlt} from "@fortawesome/free-solid-svg-icons";
import {UserContext} from "./UserContext";





export default function Header(){

    let navigate=useNavigate()
    const location=useLocation()
    const {user,setUser}= useContext(UserContext)



    const logout=()=>{
        setUser('')
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
        navigate('/login')
    }

    return(
        <>
            <div>
            <header>
                <div className="logo" >
                    <Link to="/login">
                        <img src={logo} alt="logo" height="120px"/>
                    </Link>
                </div>
                <div className="logout">
                    <Link to="/login">
                        {(location.pathname!=="/login" && location.pathname!=="/form") &&
                        <FontAwesomeIcon className="logoutIcon" icon={faSignOutAlt} color="white" onClick={logout} />
                        }
                    </Link>
                </div>
            </header>
            </div>
        </>)
}