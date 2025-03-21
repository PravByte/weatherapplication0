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
        return sunny;
    }
  };

  return (
    <div className='body' style={{ position: 'relative', height: '100vh', fontFamily: 'cursive' }}>
  <div  className="container-fluid d-flex justify-content-center align-items-center pb-2">
    <div style={{backgroundColor:'yellow',height:'680px'}} className="row p-3 rounded-3">
      {!weatherData && <p style={{ fontSize: '14px' }}>Loading weather data for {submit}...</p>}
      <div  className="col-12 text-center">
        <form action="#" method="get" onSubmit={getit}>
          <div className="mt-3">
            <label className="city form-label text-success" htmlFor="cityname" style={{ fontSize: '14px' }}>
              ENTER CITY NAME
            </label>
            <input
              value={city}
              onChange={handle}
              className="city form-control w-50 mx-auto" 
              type="text"
              name="cityname"
              id="cityname"
              style={{ fontSize: '14px' }} 
            />
            <img
            className='city'
              src={getWeatherImage(weatherData.weather[0].main)}
              alt={weatherData.weather[0].main}
              style={{
                width: '100px',
                height: '100px',
                marginTop: '20px',
                display: 'block',
                marginLeft: 'auto',
                marginRight: 'auto',
              }}
            />
          </div>
        </form>
      </div>
      <div className="row">
        <div className="col-12">
          {weatherData && (
            <div className="text-center" style={{ fontFamily: 'cursive' }}>
              <p className="city text-danger" style={{ fontSize: '16px' }}>
                City <br />
              </p>
              <p style={{ fontSize: '18px' }}>{weatherData.name}</p>
              <p className= "city text-danger" style={{ fontSize: '16px' }}>
                Country <br />
              </p>
              <p style={{ fontSize: '18px' }}>{weatherData.sys.country}</p>
              <div className="weather row d-flex mb-4">
                <div className="col-6 text-start">
                  <p className="text-danger" style={{ fontSize: '16px' }}>
                    Weather<br />
                  </p>
                  <p style={{ fontSize: '18px' }}> {weatherData.weather[0].main}</p>
                </div>
                <div className="col-6 text-end">
                  <p className="text-danger" style={{ fontSize: '16px' }}>
                    Temperature <br />
                  </p>
                  <p style={{ fontSize: '18px' }}>{Math.round(weatherData.main.temp)}°C</p>
                </div>
              </div>

              <div className="row two">
                <div className="col-6 text-start">
                  <img src={windspeed} alt="" className="custom-size" />
                  <p className="mt-3 text-danger" style={{ fontSize: '16px' }}>
                    Wind Speed <br />
                  </p>
                  <p style={{ fontSize: '18px' }}> {weatherData.wind.speed} km/h</p>
                </div>
                <div className="col-6 text-end">
                  <img src={humidity} alt="" className="custom-size" />
                  <p className="mt-3 text-danger" style={{ fontSize: '16px' }}>
                    Humidity <br />
                  </p>
                  <p style={{ fontSize: '18px' }}>{weatherData.main.humidity}%</p>
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
