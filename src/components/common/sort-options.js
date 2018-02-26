import React from 'react';
import PropTypes from 'prop-types';

import { SORT_OPTIONS } from '../../helpers/constants';

const SortOptions = ({ isFetching, onSortChange, sort }) => {
  return (
    <div>
      <label>Sort: </label>
      <select className='form-control' 
              onChange={onSortChange} 
              value={sort}
              disabled={isFetching}>
        {SORT_OPTIONS.map(opt => 
          <option key={opt} 
                  value={opt}>{opt}</option>
        )}
      </select>
    </div>
  );
};

SortOptions.propTypes = {
  isFetching: PropTypes.bool,
  onSortChange: PropTypes.func,
  sort: PropTypes.string
};

export default SortOptions;