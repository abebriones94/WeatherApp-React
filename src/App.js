import React, { useState } from "react";
import axios from "axios"


// Input box that takes in a value (location), that passes into the URL. This is done by using a state

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");

  const apiKey = process.env.REACT_APP_YOUR_API_KEY;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=${apiKey}`;

  // Connect to API all on a search function
  const searchLocation = (event) => {
    if (event.key === "Enter")
      axios.get(url).then((response) => {
        setData(response.data);
        console.log(response.data);
      });
  };

  return (
    <div className="app">
      <div className="search">
        <input
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          onKeyPress={searchLocation}
          placeholder="Enter a location..."
          type="text"
        />
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            <p>{data.name}</p>
          </div>
          <div className="temp">
            {data.main ? <h1>{data.main.temp.toFixed()}°F</h1> : null}
          </div>
          <div className="description">
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
        </div>

        {data.name != undefined && (
          <div className="bottom">
            <div className="feels">
              {data.main ? (
                <p style={{ fontWeight: "bold", textDecoration: "underline" }}>
                  {data.main.feels_like.toFixed()}°F
                </p>
              ) : null}
              <p>feels like</p>
            </div>
            <div className="humidity">
              {data.main ? (
                <p style={{ fontWeight: "bold", textDecoration: "underline" }}>
                  {data.main.humidity}%
                </p>
              ) : null}
              <p>humidity</p>
            </div>
            <div className="wind">
              {data.wind ? (
                <p style={{ fontWeight: "bold", textDecoration: "underline" }}>
                  {data.wind.speed.toFixed()} mph
                </p>
              ) : null}
              <p>wind speed</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
export default App;
