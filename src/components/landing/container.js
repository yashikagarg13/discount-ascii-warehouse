import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as actions from '../../actions/products';
import { LIMIT } from '../../helpers/constants';
import {
  getProducts, 
  getIsFetching, 
  getSortOption, 
  getOffset, 
  getIsEndOfCatalogue
} from '../../reducers';

import LandingView from './view';

/**
 - error message
**/

class Landing extends Component {
  constructor( props ) {
    super(props);

    this.onSortChange = this.onSortChange.bind(this);
    this.loadMore = this.loadMore.bind(this);
  }

  componentWillMount() {
    this.loadData(true);
  }

  loadData( buffer ) {
    let {fetchProducts, sort, offset} = this.props;
    fetchProducts(LIMIT, offset, sort);

    if (buffer) {
      this.loadMore();
    }
  }

  loadMore() {
    let {updateOffset, offset} = this.props;
    updateOffset(offset + LIMIT);
    this.loadData(false);
  }

  onSortChange( event ) {
    let {updateSort, updateOffset} = this.props;
    updateOffset(0);
    updateSort(event.target.value);

    process.nextTick(() => this.loadData(true));
  }

  render() {
    let {products, isFetching, sort, isEndOfCatalogue} = this.props;
    return (
      <LandingView
        products={products}
        sort={sort}
        onSortChange={this.onSortChange}
        loadMore={this.loadMore}
        isFetching={isFetching}
        isEndOfCatalogue={isEndOfCatalogue}
      />
    );
  }
}

const mapStateToProps = ( state ) => {
  return {
    products: getProducts(state),
    isFetching: getIsFetching(state),
    isEndOfCatalogue: getIsEndOfCatalogue(state),
    sort: getSortOption(state),
    offset: getOffset(state),
  };
};

Landing.propTypes = {
  products: PropTypes.array, 
  isFetching: PropTypes.bool, 
  isEndOfCatalogue: PropTypes.bool,
  sort: PropTypes.string,
  updateOffset: PropTypes.func, 
  offset: PropTypes.number,
  fetchProducts: PropTypes.func,
  updateSort: PropTypes.func
};

Landing = connect( // eslint-disable-line no-class-assign
  mapStateToProps,
  actions
)(Landing);

export default Landing;