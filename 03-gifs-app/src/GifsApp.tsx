import GifList from './gifs/components/GifList';
import PreviousSearches from './gifs/components/PreviousSearches';
import CustomHeader from './shared/components/CustomHeader';
import SearchBar from './shared/components/SearchBar';
import useGifs from './gifs/hooks/useGifsHook';

const GifsApp = () => {
  const{ previousTerms, gifs, handleTermClicked, handleSearch} = useGifs();

  return (
    <>
      {/* Header */}
      <CustomHeader title='Gifs Searcher' description='Seek and share your  perfect gif' />

      {/* Search */}
      <SearchBar
        placeholder="Search gif"
        onQuery={handleSearch}
      />

      {/* Search previous */}
      <PreviousSearches searches={previousTerms} onLabelClicked={handleTermClicked} />
      
      {/* Gifs */}
      <GifList gifs={gifs} />
    </>
  );
};
export default GifsApp;














