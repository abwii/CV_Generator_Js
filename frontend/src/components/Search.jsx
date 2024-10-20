import React from 'react';
import PropTypes from 'prop-types';

Search.propTypes = {
  criteria: PropTypes.string.isRequired,
  setCriteria: PropTypes.func.isRequired
};

function Search({ criteria, setCriteria }) {
  return (
    <input
      className="form-control"
      placeholder="recherche"
      value={criteria}
      onChange={(event) => setCriteria(event.target.value)}
    />
  );
}

export default Search;