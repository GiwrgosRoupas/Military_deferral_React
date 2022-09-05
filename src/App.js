import React, {useMemo, useState} from 'react';
import Login from "./pages/Login";
import Form from "./pages/Form";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Officer from "./pages/Officer";
import Secretary from "./pages/Secretary";
import Header from "./Header";
import {UserContext} from "./UserContext";
import Admin from "./pages/admin/Admin";
import axios from "axios";

function App() {
    const [user, setUser]= useState("")
    const providerValue =useMemo(()=>({user, setUser}), [user, setUser])


  return(
      <>
          <BrowserRouter >
              <UserContext.Provider value={providerValue}>
                  <Header/>
                  <Routes>
                      <Route path='/admin' element={<Admin/>}/>
                      <Route  path='/login' element={<Login/>}/>
                      <Route  path='/form' element={<Form/>}/>
                      <Route path='/secretary' element={<Secretary/>}/>
                      <Route path='/officer' element={<Officer/>}/>
                  </Routes>
              </UserContext.Provider>
          </BrowserRouter>
      </>
  )
}

export default App;