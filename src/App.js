// App.js
import React from 'react';
import Papa from 'papaparse';
import { useState } from "react";
import './App.css'

function App() {
  const [parsedData, setParsedData] = useState([]);
  const [values, setValues] = useState([]);

  
  
  
  
  const changeHandler = (event) => {
    Papa.parse(event.target.files[0],{
      header: true,
      skipEmptyLines: true,
      complete: function (results){
        const valuesArray = []

        results.data.map((d) => {
          valuesArray.push(Object.values(d));
        });

        const sortedValues = valuesArray.sort((a, b) => {
          const dateA = new Date(a[0]);
          const dateB = new Date(b[0]);
          return dateB - dateA;
        });

        setParsedData(results.data);
        setValues(sortedValues);
        console.log(valuesArray)
      },
    });
  };

  
  return (
    <div className="app">
      <div className="side-bar">
        <h1 className='side-item'>Letterboxd topsters!</h1>
        <input
        type="file"
        name="file"
        accept=".csv"
        style={{ display: "block" }}
        className='side-item'
        onChange={changeHandler}
      />
      </div>
      <div className="middle">
        <div className="collage-grid-container">
          <div className="collage-grid">
            <div className="grid-item"></div>
            <div className="grid-item"></div>
            <div className="grid-item"></div>
            <div className="grid-item"></div>
            <div className="grid-item"></div>
            <div className="grid-item"></div>
            <div className="grid-item"></div>
            <div className="grid-item"></div>
            <div className="grid-item"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
