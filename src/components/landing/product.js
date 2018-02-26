import React from 'react';
import PropTypes from 'prop-types';

import { formatDate, formatPrice } from '../../helpers/utils';

const Product = ({product}) => {
  return (
    <div className='product'>
      <span className='face' 
            style={{fontSize: product.size + 'px'}}>{product.face}</span>
      <div className='detail'>
        <span className='pull-left'>{formatPrice(product.price)}</span>
        <span className='pull-right'>{formatDate(product.date)}</span>
      </div>
    </div>
  );
};
Product.propTypes = {
  product: PropTypes.object,
};


export default Product;