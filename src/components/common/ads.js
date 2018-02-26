import React from 'react';
import PropTypes from 'prop-types';

import { getAdsUrl, isCorrectAdPosition } from '../../helpers/utils';

const Ads = ({ index }) => {
  if (isCorrectAdPosition(index)) {
    return <img className='ad' 
                src={getAdsUrl()} />;
  }
  return <span></span>;
};

Ads.propTypes = {
  index: PropTypes.number.isRequired,
};


export default Ads;