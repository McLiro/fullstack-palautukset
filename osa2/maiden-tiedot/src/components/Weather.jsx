import { useState, useEffect } from 'react';
import weatherService from '../services/weather';

const Weather = ({ lat, lon }) => {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    weatherService.getWeather(lat, lon)
      .then((data) => {
        setWeatherData(data.current);
      })
  }, []);

  if (!weatherData) return null;

  return (
    <>
      <div>Temperature: {weatherData.temperature_2m} Celsius</div>
      <div>Wind: {weatherData.wind_speed_10m} m/s</div>
      <div>Wheater code: {weatherData.weather_code}</div>
    </>
  );
};

export default Weather;
