const SearchBox = ({ searchText, handleChange }) => {
  return (
    <>
      Find countries <input value={searchText} onChange={handleChange}/>
    </>
  )
}

export default SearchBox