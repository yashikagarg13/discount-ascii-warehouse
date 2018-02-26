import { combineReducers } from 'redux';
import { toMap } from '../helpers/utils';

const entities = (state = new Map(), action) => {
  switch (action.type) {
  case 'UPDATE_SORT':
    return new Map();
  default:
    if (action.response) {
      return toMap([
        ...state.values(), 
        ...(action.response).values()
      ], 'id');
    }
    return state;
  }
};

const ids = (state = new Map(), action) => {
  switch(action.type) {
  case 'UPDATE_SORT':
    return new Map();
  case 'FETCH_PRODUCTS_REQUEST':
    if (action.buffer && action.buffer.size > 0) {
      return toMap([
        ...action.buffer.values()
      ]);
    }
    return state;
  case 'FETCH_PRODUCTS_SUCCESS':
    if (action.isFirstFetch) {
      return toMap([
        ...(action.response).keys()
      ]);
    } else {
      return toMap([
        ...action.buffer.values(),
      ]);
    }
  case 'END_OF_CATALOGUE':
    return toMap([
      ...action.buffer.values(),
    ]);
  default:
    return state;
  }
};

const buffer = (state = new Map(), action) => {
  switch(action.type) {
  case 'UPDATE_SORT':
    return new Map();
  case 'FETCH_PRODUCTS_SUCCESS':
    return toMap([
      ...state.values(),
      ...action.response.keys()
    ]);
  default:
    return state;
  }
};

const isFetching = (state = false, action) => {
  switch(action.type) {
  case 'FETCH_PRODUCTS_REQUEST':
    return true;
  case 'FETCH_PRODUCTS_SUCCESS':
  case 'FETCH_PRODUCTS_FAILURE':
    return false;
  default:
    return state;
  }
};

const isEndOfCatalogue = (state = false, action) => {
  switch(action.type) {
  case 'UPDATE_SORT':
    return false;
  case 'END_OF_CATALOGUE':
    return true;
  default:
    return state;
  }
};

const sort = (state = 'size', action) => {
  switch(action.type) {
  case 'UPDATE_SORT':
    return action.sort;
  default:
    return state;
  }
};

const offset = (state = 0, action) => {
  switch(action.type) {
  case 'UPDATE_OFFSET':
    return action.offset;
  default:
    return state;
  }
};

const errorMessage = (state = '', action) => {
  switch(action.type) {
  case 'FETCH_PRODUCTS_FAILURE':
    return action.errorMessage;
  default:
    return state;
  }
};

const products = combineReducers({
  buffer,
  entities,
  errorMessage,
  ids,
  isEndOfCatalogue,
  isFetching,
  offset,
  sort,
});

export const getBuffer = (state) => state.buffer;
export const getErrorMessage = (state) => state.errorMessage;
export const getIds = (state) => [...(state.ids).values()];
export const getIsEndOfCatalogue = (state) => state.isEndOfCatalogue;
export const getIsFetching = (state) => state.isFetching;
export const getOffset = (state) => state.offset;
export const getProduct = (state, id) => state.entities.get(id);
export const getProducts = (state) => getIds(state).map(id => getProduct(state, id));
export const getSortOption = (state) => state.sort;


export default products;