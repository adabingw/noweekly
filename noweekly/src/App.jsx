/* eslint-disable no-unused-vars */
import './App.css'
import Thing from './Thing.jsx'
import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate
} from 'react-router-dom';
import { useEffect, useState } from 'react';
import Select from './Select.jsx'

function App() {

  const navigate = useNavigate()
  useEffect(() => {
      navigate('/select')
      // let attributes = localStorage.getItem('noweekly')
      // if (attributes == undefined) {
      //     console.log("no noweekly data stored")
      //     navigate('/select')
      // } else {
      //     console.log("noweekly data: ", attributes)
      //     navigate('/thing')
      // }
  }, [])

  return (
    <>
      <p className="read-the-docs">
        noweekly!
      </p>
        <Routes>
          <Route exact path="/" element={<Select />} />
          <Route exact path="/select" element={<Select />} />
          <Route exact path="/thing" element={<Thing />} />
        </Routes>
    </>
  )
}

export default App
