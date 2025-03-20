import React, { useEffect, useState } from 'react';
import humidity from './assets/humidity.png';
import windspeed from './assets/windspeed.png';
import drizzle from './assets/drizzle.png';
import mist from './assets/mist.png';
import clouds from './assets/clouds-37009_1280 (3).png';
import rainy from './assets/rainy.png';
import sunny from './assets/sunny.png';
import '../src/App.css';

const App = () => {
  let [city, setCity] = useState('');
  let [submit, setSubmit] = useState('');
  let [weatherData, setWeatherData] = useState({
    name: '',
    sys: { country: '' },
    weather: [{ main: 'nodata' }],
    main: { temp: 0, humidity: 0 },
    wind: { speed: 0 },
  });

  let handle = (e) => setCity(e.target.value);

  let getit = (e) => {
    e.preventDefault();
    setSubmit(city);
    setCity('');
  };

  useEffect(() => {
    if (submit) {
      let apikey = `ea4deb934b7fbf5045c6c3cef4428af4`;
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${submit}&appid=${apikey}&units=metric`)
        .then((response) => response.json())
        .then((data) => {
          if (data.cod === 200) {
            setWeatherData(data);
          } else {
            alert('City not found');
          }
        })
        .catch(() => alert('Error fetching weather data'));
    }
  }, [submit]);

  let getWeatherImage = (condition) => {
    switch (condition) {
      case 'Drizzle': return drizzle;
      case 'Mist': return mist;
      case 'Rain': return rainy;
      case 'Clear': return sunny;
      case 'Clouds': return clouds;
      default: return mist;
    }
  };

  return (
    <div style={{fontFamily:"cursive"}} className="container rounded-3 d-flex flex-column align-items-center justify-content-center min-vh-100">
      <div className="card p-4 shadow-lg w-100" style={{ maxWidth: '500px' }}>
        <form onSubmit={getit} className="mb-3">
          <label className="form-label text-success">ENTER CITY NAME</label>
          <input value={city} onChange={handle} className="form-control" type="text" placeholder="Enter city..." />
        </form>
        {weatherData && (
          <div className="text-center">
            <img src={getWeatherImage(weatherData.weather[0].main)} alt="weather" className="img-fluid" style={{ maxWidth: '100px' }} />
            <h5 className="text-primary mt-2">{weatherData.name}, {weatherData.sys.country}</h5>
            <p className="text-muted">{weatherData.weather[0].main}</p>
            <h3 className="fw-bold">{Math.round(weatherData.main.temp)}°C</h3>
            <div className="row mt-3">
              <div className="col-6 d-flex flex-column align-items-center">
                <img src={windspeed} alt="wind speed" style={{ maxWidth: '50px' }} />
                <p className="mt-1 mb-0 text-danger">Wind Speed</p>
                <p className="fw-bold">{weatherData.wind.speed} km/h</p>
              </div>
              <div className="col-6 d-flex flex-column align-items-center mt-2">
                <img src={humidity} alt="humidity" style={{ maxWidth: '50px' }} />
                <p className="mt-1 mb-0 text-danger">Humidity</p>
                <p className="fw-bold">{weatherData.main.humidity}%</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;