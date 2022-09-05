import {useEffect, useState} from "react";
import AdminAllUsers from "./AdminAllUsers";
import AdminNewUser from './AdminNewUser'
import '../../assets/css/admin.css'
import '../../assets/css/stylesheet.css'
import axiosInstance from '../../axiosInstance.js'
import { useNavigate } from "react-router-dom";



export default function Admin(){

    const [tab,setTab]=useState("allUsersTab")
    let navigate=useNavigate()

    useEffect( () => {
        localStorage.getItem('accessToken')==='' && navigate('/login')
    })



    return(
        <>
            <div className="tabsContainer">
                <div className="tabsBar">
                    <button className={tab === 'allUsersTab' ? "tab  active-tab" : "tab"} id="allUsersTab" onClick={()=>setTab('allUsersTab')}>Χρήστες</button>
                    <button className={tab === 'newUserTab' ? "tab  active-tab" : "tab"} id="newUserTab" onClick={()=>setTab('newUserTab')}>Νέος χρήστης</button>
                </div>
                <div className="tabsContent">

                    {tab === 'allUsersTab' ?
                        <div
                            className={tab === 'allUsersTab' ? "content  active-content" : "content"}
                        >
                            <AdminAllUsers/>
                        </div>
                        :
                        <div
                            className={tab === 'newUserTab' ? "content active-content" : "content"}
                        >
                            <AdminNewUser/>
                        </div>
                    }


                </div>


            </div>


        </>
    )
}