// App.js
import React from 'react';
import Papa from 'papaparse';
import { useState } from "react";
import './App.css'
import axios from 'axios';

function App() {
  const [parsedData, setParsedData] = useState([]);
  const [values, setValues] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  
  const [defaultGrid, setDefaultGrid] = useState([...Array(9)].map((_, index) => ({
    id: index,
  })));
  
  
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
        const limitedMovies = sortedValues.slice(0, 9);
        fetchMovieData(limitedMovies);
      
      },
    });
  };

  const fetchMovieData = async (movies) => {
    try {
      const results = await Promise.all(
        movies.map(async (movie) => {
          const response = await axios.get(
            'https://api.themoviedb.org/3/search/movie',
            {
              params: {
                api_key: 'f5e5ddde467f9c62c3e1e2ec09ec2e85',
                query: movie[1], // Assuming movie[1] contains the movie title
              },
            }
          );
          return response.data.results[0];
        })
      );
      console.log(results);
      setSearchResults(results);
    } catch (error) {
      console.error('Error fetching movie data:', error);
    }
  };

  
  return (
    <div className="app">
      <div className="side-bar">
        <h1>Letterboxd topsters!</h1>
        <input
          type="file"
          name="file"
          accept=".csv"
          style={{ display: 'block', margin: '10px auto' }}
          onChange={changeHandler}
        />
      </div>
      <div className="collage-grid-container">
        <div className="collage-grid">
          {searchResults.length > 0 ? (
            searchResults.map((result) => (
              <div key={result.id} className="grid-item">
                {result.poster_path ? (
                  <img
                    src={`https://image.tmdb.org/t/p/w500${result.poster_path}`}
                    alt={result.title}
                  />
                ) : (
                  <p>No poster available</p>
                )}
              </div>
            ))
          ) : (
            defaultGrid.map((item) => (
              <div key={item.id} className="grid-item">
                <p>{item.title}</p>
              </div>
            ))
          )}
        </div>
      </div>
      <div className="bottom">
        <button className="log-in">Place holder button</button>
      </div>
    </div>
  );
}


export default App;
