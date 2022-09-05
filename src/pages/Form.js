import React, {useState} from 'react';
import {formValidation} from '../formValidation'
require ('../assets/css/formStyle.css')


const Option=(props)=>{
    return(
        <>
            <tr>
                <th>{props.reason}</th>
                <td><input type="radio" name="deferralId" className="radio-button" value={props.reason} required/></td>
            </tr>
        </>
    )
}

const UserInput=(props)=>{

    return(
        <>
            <tr>
                <th> {props.extField}</th>
                <td><input className="textInput" type="text" name={props.intField}  title={props.title} required/></td>
            </tr>
        </>
    )
}




export default function Form(){
    //File visual approval
    const crossMark= '✘'
    const checkMark= '✔'
    const [isUploaded, setIsUploaded]= useState(false)

        return(
        <>
            <form id="form" onSubmit={formValidation} method="POST" action="http://localhost:8080/api/v1/form/addForm" encType="multipart/form-data">
                <div className="grid">
                    <div className="grid-item">
                        <table className="table">
                            <caption className="table-header">Στοιχεία Πολίτη</caption>
                            <tbody>
                            <UserInput extField={'Ονοματεπώνυμο'} intField={'fullname'} title='Π.χ. Πέτρος Παύλος Δημητρίου'/>
                            <UserInput extField={'Email'} intField={'email'} title='Π.χ. mymail@gmail.com.gr'/>
                            <UserInput extField={'Τηλέφωνο'} intField={'phoneNumber'} title="Π.χ: 69ΧΧΧΧΧΧΧΧ, 2XXXXXXXXX" />
                            <tr>
                                <th>Ημερομηνία γεννήσεως</th>
                                <td><input  type="date" name="DOB" id="DOB" max="2003-12-31" required/></td>
                            </tr>
                            <UserInput extField={'Αριθμός ταυτότητας'} intField={'idNumber'}/>
                            <UserInput extField={'Στρατολογικός αριθμός'} intField={'militaryNumber'} title="Π.χ: 123/1../1234" />
                            </tbody>
                        </table>
                    </div>

                    <div className="grid-item">
                        <table className="table">
                            <caption className="table-header">Λόγος αναβολής:</caption>
                            <tbody>
                            <Option reason={'Σπουδές'}/>
                            <Option reason={'Πρόβλημα υγείας'}/>
                            <Option reason={'Πατέρας δύο ζώντων τεκνών'}/>
                            <Option reason={'Αδελφός που υπηρετεί'}/>
                            <Option reason={'Κάτοικος εξωτερικού'}/>
                            </tbody>
                        </table>
                    </div>


                    <div className="grid-item">
                        <table className="table" >
                            <caption className="table-header" >Έγγραφο<br/><p style={{fontSize:13, marginTop:'5px', marginBottom:'5px'}}>(PDF)</p></caption>
                            <tbody>
                            <tr>
                                <th>
                                <input type="file" name="document" id="document" accept=".pdf"
                                           onChange={(_this)=>{
                                               if (!_this.value) {
                                               setIsUploaded(true)
                                                }}
                                           } required/>
                                </th>
                                <td >{isUploaded?checkMark:crossMark}</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>

                <div className="grid-item">
                    <input type="reset" className="form-buttons" value="Επαναφορά" onClick={()=>{setIsUploaded(false)}}/>
                    <input type="submit" className="form-buttons" value="Υποβολή φόρμας"  />
                </div>
            </div>
            </form>
        </>
    )
}