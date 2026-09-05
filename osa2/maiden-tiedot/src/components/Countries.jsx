import CountryDetails from './CountryDetails'

const Countries = ({ searchText, matchingCountries, showCountry }) => {
  if (searchText === '') {return null}

  if (matchingCountries.length > 10) {
    return (
      <div>Too many matches, specify another filter</div>
    )
  }

  if (matchingCountries.length === 1) {
    return (
      <CountryDetails country={matchingCountries[0]}/>
    )
  }

  return (
      matchingCountries.map(country =>
        <div key={country.name.common}>
          {country.name.common}
          <button onClick={() => showCountry(country)}>Show</button>
        </div>
      )
  )
}

export default Countries
