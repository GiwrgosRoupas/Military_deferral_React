import React, {useEffect, useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {useContext} from 'react'
import {UserContext} from "../UserContext";
import { Navigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faUser} from "@fortawesome/free-solid-svg-icons"
import {faKey} from '@fortawesome/free-solid-svg-icons'
import {axios} from '../axiosInstance.js'
require('../assets/css/stylesheet.css')
require('../assets/css/loginStyle.css')
import ("../assets/images/army-icon-8659-Windows.ico")
const qs = require('qs');





export default function Login() {
    const {user,setUser}= useContext(UserContext)
    useEffect(()=>{
        setUser(localStorage.getItem('accessToken'))
    })


    let navigate= useNavigate()
    const [wrongPasswordMsg, setWrongPasswordMsg] = useState(false)
    const [serverErrorMsg, setServerErrorMsg] = useState(false)
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [role, setRole] = useState("")


    const loginAuth = (e) => {
        e.preventDefault()
        fetch('http://localhost:8080/login', {
            method: 'POST',
            headers: { 'Username': username,
                'Password': password}
        }).then((response)=>response.json())
            .then((response) => {
                console.log(response)
                setRole(response.role)
                setUser(response.accessToken)
                localStorage.setItem('accessToken', response.accessToken)
                localStorage.setItem('refreshToken', response.refreshToken)
                console.log(localStorage.getItem('accessToken'))
            })
            .catch((error) => (error.status === 401) ?
                setWrongPasswordMsg(true) : setServerErrorMsg(true))

    }

    useEffect(() => {
        if (role ==='ROLE_OFFICER'){
            return navigate("/officer");
        }else if (role ==='ROLE_SECRETARY'){
            return navigate("/secretary")
        }else if (role==='ROLE_ADMIN'){
            return navigate("/admin")
        }
    }, [role]);



    return(
        <>

            <div className="login">
                <form method="POST"  onSubmit={ loginAuth} >
                    <img className="soldiersIcon" src={require("../assets/images/army-icon-8659-Windows.ico")}  alt="blah"/>
                    <div className="textField" >
                        <FontAwesomeIcon icon={faUser} className="icon"/>
                        <input autoFocus name="username" type="text" required placeholder="Username" value={username} onChange={(e)=>setUsername(e.target.value)}/>
                    </div>
                    <div className="textField">
                        <FontAwesomeIcon icon={faKey} className="icon"/>
                        <input name="password" type="password" placeholder="Password" required value={password} onChange={(e)=>setPassword(e.target.value)}/>
                    </div>
                    { wrongPasswordMsg ? <div className="errorMsg"> Λάθος διαπιστευτήρια εισόδου!</div>: <div></div>}
                    { serverErrorMsg ? <div className="errorMsg"> Πρόβλημα επικοινωνίας με τον server.<br/>Δοκιμάστε αργότερα!</div>: <div></div>}
                    <input  name="submit" id="submit" type="submit" value="Login" /><br/>
                    <nav><Link to='/form' className="civilians_login" >Είσοδος για πολίτες</Link></nav>
                </form>
            </div>
            <div className="skip_login">
            </div>
        </>
    )
}