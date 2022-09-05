import {useContext} from "react";
import {UserContext} from "../../UserContext";
import axiosInstance from '../../axiosInstance'

export default function  AdminNewUser(){
    const {user, setUser}= useContext(UserContext)
    const createNewUser =(form)=> {
        form.preventDefault()

        axiosInstance('/api/v1/admin/addUser' ,{
            method: 'POST',
            data: new FormData(form.target)
        }).then((r)=>r.status===201? alert("Επιτυχής καταχώρηση χρήστη!") : null)
            .catch((e)=>alert("Ο χρήστης υπάρχει ήδη!"))


    }

    return(
        <>
            <form method="post" onSubmit={createNewUser}>
            <div className="new_user">
                <input className="new_user_field" id="username" name="username" type="text" placeholder="Username"
                       required/><br/>
                    <input className="new_user_field" id="password" name="password" type="password"
                           placeholder="Password" required/><br/>
                        <select className="new_user_select" name="role" required>
                            <option name="role" value="" disabled selected hidden>Ρόλος</option>
                            <option name="role" value="ROLE_SECRETARY"> Γραμματεία</option>
                            <option name="role" value="ROLE_OFFICER"> Αξιωματικός</option>
                        </select><br/>
                        <button type="submit" id="new_user_submit_button" className="new_user_select" >Υποβολή</button>
            </div>
            </form>
        </>
    )
}