import axios from 'axios'
const baseUrl = 'https://api.open-meteo.com/v1/forecast'

const getWeather = (lat, lon) => {
  const request = axios.get(baseUrl, {
    params: {
      latitude: lat,
      longitude: lon,
      current: 'temperature_2m,wind_speed_10m,weather_code'
      }
  })
  return request.then(response => response.data)
}

export default {getWeather}
