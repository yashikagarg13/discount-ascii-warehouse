// Refactor
// Test
// Prepare doc
// Send email

import React, {Component} from "react";

import APIHelper from "../../helpers/api";
import ConstantsHelper from "../../helpers/constants";

import Products from "./view";

class ProductsContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isEndOfCatalog: false,
      isEndOfList: false,
      isLoading: true,
      offset: 0,
      products: [],
      productsBuffer: [],
      sort: "",
    };

    this.onEndOfList = this.onEndOfList.bind(this);
    this.onSortChange = this.onSortChange.bind(this);
  }
  componentWillMount() {
    this.loadData();
  }

  /****************************************************************
    Checking if data is present in buffer and end of list is
    reached then call method to send buffer data to products array
  *****************************************************************/
  componentDidUpdate() {
    const {isEndOfList, productsBuffer} = this.state;
    if (isEndOfList && productsBuffer.length) {
      this.onEndOfList();
    }
  }

  /****************************************************************************************
    When end of list is reached on scrolling the page
    then if, new data is already available in buffer, it is added to products array.
    But if, new data is not fetched yet, a flag is set to communicate that end of list is reached
    and this flag is tracked in componentDidMount, so that, as soon as data is available
    in buffer, it gets added to products array and does not wait for scroll to happen again.
  ****************************************************************************************/
  onEndOfList() {
    const {products, productsBuffer} = this.state;
    if (productsBuffer.length) {
      this.setState({
        products: products.concat(productsBuffer),
        productsBuffer: [],
        isEndOfList: false,
      });
      // Every time buffer is merged to products array, pre-fetch the data.
      this.loadMore();
    } else {
      this.setState({
        isEndOfList: true,
      });
    }
  }
  /********************************************
    Reset state on change of sort.
  ********************************************/
  onSortChange (event) {
    this.setState({
      sort: event.target.value,
      offset: 0,
      products: [],
      productsBuffer: []
    }, () => {
      this.loadData();
    });
  }
  loadData(buffer) {
    this.setState({isLoading: true});
    let  {offset, sort} = this.state;

    APIHelper.fetchProducts(ConstantsHelper.limit, offset, sort)
    .then(response => {
      if (response.data === "") {
        this.setState({
          isEndOfCatalog: true,
        });
      } else {
        let {products, productsBuffer} = this.state;
        let newProducts = response.data
          .trim()
          .split("\n")
          .map(data => JSON.parse(data));

        // In case of pre-fetching, products are stored in buffer
        // so that they can only be rendered when user reaches end of list.
        if (buffer) {
          this.setState({
            isLoading: false,
            productsBuffer: productsBuffer.concat(newProducts),
          });
        } else {
          this.setState({
            isLoading: false,
            products: products.concat(newProducts)
          });

          // Prefetch the data: Another call is made to API with updated offset
          this.loadMore();
        }
      }
    })
    .catch(error => {
      console.log("error", error); //eslint-disable-line
      this.setState({isLoading: false});
    });
  }
  /********************************************
    Updates offset for calling next set of data
  ********************************************/
  loadMore() {
    let {offset} = this.state;
    offset = offset + ConstantsHelper.limit;

    this.setState({offset}, () => {
      this.loadData(true);
    });
  }

  render() {
    return (
      <Products
        isEndOfCatalog={this.state.isEndOfCatalog}
        isLoading={this.state.isLoading}
        onEndOfList={this.onEndOfList}
        onSortChange={this.onSortChange}
        products={this.state.products}
        sort={this.state.sort}
      />
    );
  }
}

export default ProductsContainer;