import Axios from 'axios';
import { getProductsAPI } from '../helpers/api';
import { formatResponse } from '../helpers/utils';
import { getBuffer } from '../reducers';

const FETCH_PRODUCTS_REQUEST = 'FETCH_PRODUCTS_REQUEST';
const FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS';
const FETCH_PRODUCTS_FAILURE = 'FETCH_PRODUCTS_FAILURE';
const UPDATE_OFFSET = 'UPDATE_OFFSET';
const UPDATE_SORT = 'UPDATE_SORT';
const END_OF_CATALOGUE = 'END_OF_CATALOGUE';

const requestProducts = (isFirstFetch, buffer) => ({
  type: FETCH_PRODUCTS_REQUEST,
  isFirstFetch,
  buffer
});

const receiveProducts = (response, isFirstFetch, buffer) => ({
  type: FETCH_PRODUCTS_SUCCESS,
  response,
  isFirstFetch,
  buffer,
});

const catchError = (errorMessage) => ({
  type: FETCH_PRODUCTS_FAILURE,
  errorMessage
});

const endOfCatlogue = (buffer) => ({
  type: END_OF_CATALOGUE,
  buffer
});

const fetchProducts = (limit, offset, sort) => {
  return function (dispatch, getState) {
    let buffer = getBuffer(getState());
    let isFirstFetch = buffer.size === 0;
    dispatch(requestProducts(isFirstFetch, buffer));

    return Axios.get(getProductsAPI(limit, offset, sort))
    .then(response => {
      buffer = getBuffer(getState());
      isFirstFetch = buffer.size === 0;
      if (response.data.trim() === '') {
        dispatch(endOfCatlogue(buffer));
      } else {
        dispatch(receiveProducts(formatResponse(response), isFirstFetch, buffer));
      }
    })
    .catch(error => {
      dispatch(catchError(error));
    });
  };
};

const updateSort = (sort) => ({
  type: UPDATE_SORT,
  sort,
});

const updateOffset = (offset) => ({
  type: UPDATE_OFFSET,
  offset,
});


export {
  catchError,
  fetchProducts,
  requestProducts,
  receiveProducts,
  updateSort,
  updateOffset
};