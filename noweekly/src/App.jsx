/* eslint-disable no-unused-vars */
import './App.css'
import Thing from './Thing.jsx'
import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  usenavigate
} from 'react-router-dom';
import { useEffect, useState } from 'react';
import Select from './Select.jsx'

/**
 * TODO: 
 * * set up routes
 * * useeffect local storage to navigate
 */

function App() {

  useEffect(() => {
      let attributes = localStorage.getItem('noweekly')
      if (attributes == undefined) {
          console.log("no noweekly data stored")
          // usenavigate
          // get database properties to choose
      } else {
          // get data
          // 
      }
  }, [])

  return (
    <>
      <p className="read-the-docs">
        noweekly!
      </p>
      <Router>              
        <Routes>
          <Route exact path="/" element={<Select />} />
          <Route exact path="/select" element={<Select />} />
          <Route exact path="/thing" element={<Thing />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
