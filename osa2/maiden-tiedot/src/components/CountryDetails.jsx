import Weather from './Weather'

const CountryDetails = ({ country }) => {
  return (
    <>
      <h1>{country.name.common}</h1>

      <div>Capital: {country.capital}</div>
      <div>Area: {country.area}</div>

      <h2>Languages</h2>

      <ul>
        {Object.values(country.languages).map(language => (
          <li key={language}>{language}</li>
        ))}
      </ul>

      <img src={country.flags.png}/>

      <h2>Weather in {country.name.common}</h2>
      <Weather lat={country.latlng[0]} lon={country.latlng[1]}/>
    </>
  )
}

export default CountryDetails
