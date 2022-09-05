import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import axiosInstance from '../axiosInstance.js'
import {faCheckSquare, faXmarkSquare} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
//import blob from "https-browserify";
require('../assets/css/stylesheet.css')



const TableRow=(props)=>{

    let [comments, setComments] = useState('');

    function validateForm() {
        comments==='' && setComments('-')
        axiosInstance.post('/api/v1/form/secretary/comments?id='+props.id,{
            comments
        }).then(()=>axiosInstance.post('/api/v1/form/secretary/validateForm?id='+props.id))
            .then(()=>props.setUpdate(true)).catch((e)=>alert(e))
    }


    function denyForm() {
        comments==='' && setComments('-')
        axiosInstance.post('/api/v1/form/secretary/comments?id='+props.id,{
            comments
        }).then(()=> axiosInstance.post('/api/v1/form/denyForm?id='+props.id))
            .then(()=>props.setUpdate(true)).catch((e)=>alert(e))

    }

    function secretaryComments() {
        comments.length!==0 &&
        axiosInstance.post('/api/v1/form/secretary/comments?id='+props.id,{
            comments
        })
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

                <td><a className="link" onClick={()=>
                    fetch('http://localhost:8080/api/v1/form/getFileById?id='+props.id,
                    {
                        method: 'GET',
                        headers: {
                            Accept: 'application/json',
                            ContentType: 'application/json',
                            'Authorization': 'Bearer ' + props.user
                        }
                    }).then((r)=>r.blob()).then(showFile)}  target="_blank">{props.fileName}</a></td>
                <td><textarea onChange={(e)=>setComments(e.target.value)}></textarea></td>
                <td>
                    <button onClick={()=> validateForm()} className="decisionButton">
                        <FontAwesomeIcon icon={faCheckSquare} className="decisionIcons" id="approveIcon"/>
                    </button>
                    <button onClick={()=> denyForm()} className="decisionButton">
                        <FontAwesomeIcon icon={faXmarkSquare} className="decisionIcons" id="denyIcon"/>
                    </button>
                </td>
            </tr>
        </>
    )
}

export default function Secretary(){

    let navigate=useNavigate()
    const [data, setData]= useState([])
    const [time, setTime]= useState(new Date())
    const [update, setUpdate]= useState(false)

    useEffect( () => {
        localStorage.getItem('accessToken')==='' && navigate('/login')

        axiosInstance.get('/api/v1/form/secretary/getAllForms')
            .then(json => setData(json.data)).then(()=>setTime(new Date))
            .catch((err)=>{
                navigate('/login')
                alert(err+'\nPlease login first.')
            } );

        setUpdate(false)
    }, [update]);



    return(
        <>
            <table className="admin-table">
                <caption  className="table-header">Αιτήσεις</caption>
                <tbody>
                <tr>
                    <th className="counterCellHeader">ID</th>
                    <th>Στοιχεία πολίτη</th>
                    <th>Δικαιολογητικά</th>
                    <th>Σχόλια</th>
                    <th>Επικύρωση</th>
                </tr>

                {data.map((data) => (
                    <TableRow  update={update} setUpdate={setUpdate} id={data.id} fullname={data.fullname}
                               fileName={data.fileName} user={localStorage.getItem('accessToken')}/>
                ))}
                {(data.length===0) &&<tr
                    style={{width:'auto', display:'block', textAlign:'center', fontSize:22}}
                >
                    <b>Καμία αίτηση.</b></tr>}

            </tbody>
                <tr style={{display:'flex', border:'1px solid black'}}><p style={{paddingLeft:'20px'}}><b> Σύνολο:{data.length}</b></p>  <span>    </span><p style={{paddingLeft:'20px'}}><b>Τελευταία ενημέρωση {time.toLocaleString()}</b></p></tr>
            </table>


        </>
    )
}