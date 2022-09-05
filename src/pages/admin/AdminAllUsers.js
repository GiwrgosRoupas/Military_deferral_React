import {useNavigate} from "react-router-dom";
import { useEffect, useState} from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import '../../assets/css/admin.css'
import axiosInstance from '../../axiosInstance.js'

export default function AdminAllUsers(){

    const [data, setData]= useState([])
    const [time, setTime]= useState(new Date())
    const [update,setUpdate]= useState(false)
    let navigate=useNavigate()

    useEffect( () => {
        axiosInstance.get('/api/v1/admin/getAllAuthorizedUsers')
            .then(json=>setData(json.data)).then(()=>setTime(new Date))
            .catch((err)=>{
                navigate('/login')
                alert(err+'\nPlease login first.')
            } );
        setUpdate(false)
    }, [update]);

    function deleteUser(username) {
        axiosInstance.post('http://localhost:8080/api/v1/admin/deleteUser?username='+username)
            .then(()=>setUpdate(true))
    }

    return (
        <>
            <TableContainer component={Paper}>
                <Table id="allUsersTable">
                    <TableHead>
                        <TableRow>
                            <TableCell align="left" >ID</TableCell>
                            <TableCell align="left">Username</TableCell>
                            <TableCell align="left">Ρόλος</TableCell>
                            <TableCell align="left">Ημερομηνία δημιουργίας</TableCell>
                            <TableCell align="left">Τελευταία σύνδεση</TableCell>
                            <TableCell align="left"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((data)=>(
                            <TableRow>
                                <TableCell>{data.id}</TableCell>
                                <TableCell>{data.username}</TableCell>
                                <TableCell>{data.role.substring(5)}</TableCell>
                                <TableCell>{data.dateCreated}</TableCell>
                                <TableCell>{data.lastLogin}</TableCell>
                                <TableCell align="left">
                                    <button onClick={()=>{
                                        deleteUser(data.username)
                                        setUpdate(true)
                                }}>Διαγραφή χρήστη</button></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>


            </TableContainer>

        </>
    )
}

















