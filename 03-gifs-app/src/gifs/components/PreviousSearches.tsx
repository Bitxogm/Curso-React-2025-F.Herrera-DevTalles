import type { FC } from 'react';

interface PreviousSearchesProps {
  searches: string[];
  onLabelClicked: (term: string) => void;
}

const PreviousSearches: FC<PreviousSearchesProps> = ({searches, onLabelClicked }) => {
  return (
    <div className="previous-searches">
      <h2>Previous Searches</h2>
      <ul className="previous-searches-list">
        {
          searches.map( term => (
            <li key={term}
            onClick={() => onLabelClicked(term)}
            >{term}</li>
          ))
        }
      </ul>
    </div>
  );
};

export default PreviousSearches;