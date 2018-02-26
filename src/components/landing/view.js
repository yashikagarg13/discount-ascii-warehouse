import React from 'react';
import PropTypes from 'prop-types';

import Header from '../common/header';
import EndOfCatalogue from '../common/end-of-catalogue';
import LoadMore from '../common/load-more';
import Loading from '../common/loading';
import ProductList from './product-list';
import SortOptions from '../common/sort-options';

const LandingView = ({ 
  products, 
  sort, 
  onSortChange, 
  isFetching, 
  loadMore, 
  isEndOfCatalogue 
}) => {
  const controls = [{
    id: 1,
    element: SortOptions,
    positionClassName: 'pull-right',
    props: {
      isFetching,
      sort,
      onSortChange,
    },
  }];

  return (
    <div className='products-container'>
      <Header title='Products' 
              controls={controls} />
      <ProductList products={products} />
      {isEndOfCatalogue
        ? <EndOfCatalogue />
        : <LoadMore onEndOfList={loadMore}>
            {isFetching
              ? <Loading />
              : null}
          </LoadMore>
      }
    </div>
  );
};

LandingView.propTypes = {
  products: PropTypes.array,
  sort: PropTypes.string, 
  onSortChange: PropTypes.func, 
  isFetching: PropTypes.bool,
  isEndOfCatalogue: PropTypes.bool,
  loadMore: PropTypes.func
};

export default LandingView;