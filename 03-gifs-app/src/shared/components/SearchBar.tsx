import { useEffect, useState } from "react";

interface Props {
  placeholder?: string;
  onQuery: (query: string) => void;
}

const SearchBar = ({ placeholder='Search ...', onQuery}: Props) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const timeOutId = setTimeout(() => {
      onQuery(query);
    }, 700);

    return () => {
      clearTimeout(timeOutId);
    }

  }, [query, onQuery])
  

  const handleSearch = () => {
    onQuery(query);
    // setQuery('');
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
     if(event.key === 'Enter'){
          handleSearch();
        }
  }

  return (
    <div className="search-container">
      <input 
      type="text" 
      placeholder={placeholder}
      value={query}
      onChange={(event) => setQuery(event.target.value)}
      onKeyDown={handleKeyDown}
      >
      </input>
      <button 
      onClick={handleSearch}
      >Search</button>
    </div>
  );
};
export default SearchBar;
      






























