import React, {useContext, useEffect, useState} from 'react'
import {useNavigate} from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faCheckSquare, faXmarkSquare} from "@fortawesome/free-solid-svg-icons";
import {UserContext} from "../UserContext";
import axios from '../axiosInstance.js'
require('../assets/css/stylesheet.css')

const TableRow=(props)=>{

    let [comments, setComments] = useState('');
    let [months, setMonths] = useState('');

    function approveForm(props) {
        comments==='' && setComments('-');
        axios.post('/api/v1/form/officer/comments?id='+props.id,{
            comments
        })
            .then(()=>axios.post('/api/v1/form/officer/approveForm?id='+props.id+'&months='+months))
            .then(()=>props.setUpdate(true)).catch((e)=>alert(e))
    }

    function denyForm(props) {
        comments==='' && setComments('-');
        axios.post('/api/v1/form/officer/comments?id='+props.id,{
            comments
        })
            .then(()=>axios.post('/api/v1/form/denyForm?id='+props.id))
            .then(()=>props.setUpdate(true)).catch((e)=>alert(e))
    }

    function officerComments() {
        comments.length!==0 && axios.post('/api/v1/form/officer/comments?id='+props.id)
            .then((r)=>console.log(r +'    ' + comments))
    }

    function showFile(blob){
        var newBlob = new Blob([blob], {type: "application/pdf"})
        if (window.navigator && window.navigator.msSaveOrOpenBlob) {
            window.navigator.msSaveOrOpenBlob(newBlob);
            return;
        }

        const data = window.URL.createObjectURL(newBlob);
        var link = document.createElement('a');
        link.href = data;
        link.download="file.pdf";
        link.click();
        setTimeout(function(){
            window.URL.revokeObjectURL(data);
        }, 100);
    }


    return(
        <>
            <tr>
                <td >{props.id}</td>
                <td>{props.fullname}</td>
                <td><a className="link" onClick={()=>fetch('http://localhost:8080/api/v1/form/getFileById?id='+props.id,
                    {
                        method: 'GET',
                        headers: {
                            Accept: 'application/json',
                            ContentType: 'application/json',
                            'Authorization': 'Bearer ' + props.user
                        }
                    }).then(r => r.blob()).then(showFile)}  target="_blank">{props.fileName}</a></td>
                <td>{props.secretaryComments}</td>
                <td><textarea onChange={(e)=>setComments(e.target.value)}></textarea></td>
                <td><select onChange={(e)=>setMonths(e.target.value)}>
                    <option value="6 μήνες">6 Μήνες</option>
                    <option value="1 χρόνο">1 Χρόνο</option>
                    <option value="2 χρόνια">2 Χρόνια</option>
                    <option value="4 χρόνια">4 Χρόνια</option>
                    <option value="6 χρόνια">6 Χρόνια</option>
                </select></td>

                <td>
                    <button onClick={()=> approveForm(props)} className="decisionButton">
                        <FontAwesomeIcon icon={faCheckSquare} className="decisionIcons" id="approveIcon"/>
                    </button>
                    <button onClick={()=> denyForm(props)} className="decisionButton">
                        <FontAwesomeIcon icon={faXmarkSquare} className="decisionIcons" id="denyIcon"/>
                    </button>
                </td>
            </tr>
        </>
    )
}

export default  function Officer(){

    let navigate=useNavigate()
    const [data, setData]= useState([])
    const [time, setTime]= useState(new Date())
    const [update, setUpdate]= useState(false)

    useEffect(() => {
        localStorage.getItem('accessToken')==='' && navigate('/login')

        axios.get('/api/v1/form/officer/getAllForms')
            .then(json => setData(json.data)).then(()=>setTime(new Date))
            .catch((err)=>{
                navigate('/login')
                alert(err+'\nPlease login first.')
            } );
        //No Authorization header = 403_FORBIDDEN
        //Bad token = 401_UNAUTHORIZED
        setUpdate(false)
    }, [update]);


    return(
<>

        <table className="admin-table">
            <caption className="table-header">Αιτήσεις</caption>
            <tbody>
            <tr>
                <th>ID</th>
                <th>Στοιχεία πολίτη</th>
                <th>Δικαιολογητικά</th>
                <th>Σχόλια γραμματείας</th>
                <th>Σχόλια</th>
                <th>Αναβολή για:</th>
                <th>Έγκριση</th>
            </tr>

            {(data.length===0) ? <tr
                style={{width:'auto', display:'block', textAlign:'center', fontSize:22}}>
                <b>Καμία αίτηση.</b></tr>
                            :
                data.map((data)=>(
                    <TableRow  update={update}
                               setUpdate={setUpdate}
                               id={data.id}
                               fullname={data.fullname}
                               secretaryComments={data.secretaryComments}
                               fileName={data.fileName} user={localStorage.getItem('accessToken')}/>
            ))}
            </tbody>
            <tr style={{display:'flex', border:'1px solid black'}}>
                <p style={{paddingLeft:'20px'}}><b> Σύνολο:{data.length}</b></p>
                <span>    </span>
                <p style={{paddingLeft:'20px'}}><b>Τελευταία ενημέρωση {time.toLocaleString()}</b></p>
            </tr>
        </table>
</>
    )

}