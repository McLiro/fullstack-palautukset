import { useEffect, useState } from 'react'
import countryService from './services/countries'
import SearchBox from './components/SearchBox'
import Countries from './components/Countries'

const App = () => {
  const [searchText, setSearchText] = useState('')
  const [allCountries, setAllCountries] = useState([])
  const [matchingCountries, setMatchingCountries] = useState([])

  const handleChange = (event) => {
    setSearchText(event.target.value)
  }

  const showCountry = (country) => {
    setMatchingCountries([country])
  }

  useEffect(() => {
    countryService.getAll()
      .then(data => {setAllCountries(data)})
  }, [])

  useEffect(() => {
    if (searchText === '') {setMatchingCountries(allCountries)}
    else {
      const filtered = allCountries.filter(country =>
        country.name.common.toLowerCase().includes(searchText.toLowerCase())
      )
      setMatchingCountries(filtered)
    }
  }, [searchText])

  return (
    <div>
      <SearchBox searchText={searchText} handleChange={handleChange}/>
      <Countries searchText={searchText} matchingCountries={matchingCountries} showCountry={showCountry}/>
    </div>
  )
}

export default App
