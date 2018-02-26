import {combineReducers} from 'redux';
import products, * as productSelectors from './products';

const rootReducer = combineReducers({
  products
});

export const getProducts = (state) => {
  return productSelectors.getProducts(state.products);
};
export const getIsFetching = (state) => {
  return productSelectors.getIsFetching(state.products);
};
export const getSortOption = (state) => {
  return productSelectors.getSortOption(state.products);
};
export const getOffset = (state) => {
  return productSelectors.getOffset(state.products);
};
export const getBuffer = (state) => {
  return productSelectors.getBuffer(state.products);
};
export const getIds = (state) => {
  return productSelectors.getIds(state.products);
};
export const getIsEndOfCatalogue = (state) => {
  return productSelectors.getIsEndOfCatalogue(state.products);
};


export default rootReducer;