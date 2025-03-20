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

  let handle = (e) => {
    let val = e.target.value;
    setCity(val);
  };

  let getit = (e) => {
    e.preventDefault();
    setSubmit(city);
    setCity('');
  };

  useEffect(() => {
    if (submit) {
      let apikey = `ea4deb934b7fbf5045c6c3cef4428af4`;
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${submit}&appid=${apikey}`)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          if (data.cod == 200) {
            setWeatherData(data);
          } else {
            alert('City not found');
          }
        })
        .catch((error) => console.log('Error: city not found', error));
    }
  }, [submit]);

  let getWeatherImage = (condition) => {
    switch (condition) {
      case 'Drizzle':
        return drizzle;
      case 'Mist':
        return mist;
      case 'Rain':
        return rainy;
      case 'Clear':
        return sunny;
        case 'Clouds':
        return clouds;
      default:
        return mist; 
    }
  };

  return (
    <div style={{ position: 'relative', height: '100vh' ,fontFamily:'cursive'}}>
      
      <div 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `url(${getWeatherImage(weatherData.weather[0].main)})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.5,
          zIndex: -1
        }}
      />
      
      
      <div className="container-fluid d-flex justify-content-center ">
        <div className="row p-3 rounded-3">
          {!weatherData && <p>Loading weather data for {submit}...</p>}
          <div className="col-12">
            <form action="#" method="get" onSubmit={getit}>
              <div className="mb-3">
                <label className="form-label text-success" htmlFor="cityname">
                  ENTER CITY NAME
                </label>
                <input value={city} onChange={handle} className="form-control w-50" type="text" name="cityname" id="cityname" />
              </div>
            </form>
          </div>
          <div className="row">
            <div className="col-12">
              {weatherData && (
                <div className="text-center" style={{ fontFamily: 'cursive' }}>
                  <p className="text-danger" style={{ fontFamily: 'cursive', fontSize: '22px' }}>
                    City <br />
                  </p>
                  <p style={{ fontSize: '25px' }}> {weatherData.name}</p>
                  <p className="text-danger" style={{ fontFamily: 'cursive', fontSize: '22px' }}>
                    Country <br />
                  </p>
                  <p style={{ fontSize: '25px' }}> {weatherData.sys.country}</p>
                  <div className="row d-flex">
                    <div className="col-6 text-start">
                      <p className="text-danger" style={{ fontFamily: 'cursive', fontSize: '22px' }}>
                        Weather<br />
                      </p>
                      <p style={{ fontSize: '25px' }}> {weatherData.weather[0].main}</p>
                    </div>
                    <div className="col-6 text-end">
                      <p style={{fontSize:'22px'}} className="text-danger">Temperature <br /></p>
                      <p style={{ fontSize: '25px' }}>{Math.round(weatherData.main.temp)}°C</p>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-6 text-start">
                      <img src={windspeed} alt="" className="custom-size" />
                      <p style={{fontSize:"22px"}} className="mt-3 text-danger">Wind Speed <br /></p>
                      <p style={{ fontSize: '25px' }}> {weatherData.wind.speed} km/h</p>
                    </div>
                    <div className="col-6 text-end">
                      <img src={humidity} alt="" className="custom-size" />
                      <p style={{fontSize:'22px'}} className="mt-3 text-danger">Humidity <br /></p>
                      <p style={{ fontSize: '25px' }}>{weatherData.main.humidity}%</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
