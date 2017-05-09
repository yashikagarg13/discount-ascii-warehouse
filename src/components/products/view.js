import React from "react";
import PropTypes from "prop-types";

import ConstantsHelper from "../../helpers/constants";
import UtilsHelper from "../../helpers/utils";

import Loading from "../loading";
import LoadMore from "../load-more";

const Products = ({products, sort, onEndOfList, onSortChange, isEndOfCatalog, isLoading}) => {
  const {adsPosition, sortOptions} = ConstantsHelper;
  return (
    <div className="products-container">
      <div className="header clearfix">
        <span className="title">Products</span>
        <div className="pull-right">
          <label>Sort: </label>
          <select className="form-control" onChange={onSortChange} value={sort}>
            {sortOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
          </select>
        </div>
      </div>
      <hr />
      <div className="products-grid">
        {(products || []).map((product, index) => {
          return (
            <div className="product-ad-wrapper" key={product.id}>
              <div className="product">
                <span className="face" style={{fontSize: product.size + "px"}}>{product.face}</span>
                <div className="detail">
                  <span className="pull-left">{UtilsHelper.formatPrice(product.price)}</span>
                  <span className="pull-right">{UtilsHelper.formatDate(product.date)}</span>
                </div>
              </div>

              {((index + 1) % adsPosition) == 0 && index > 0
                ? <img key={`ad-${index}`} className="ad"
                    src={`/ad/?r=${UtilsHelper.getRandomNumber()}`} />
                : null}
            </div>
          );
        })}
      </div>
      <div className="clearfix">
        {isEndOfCatalog
          ? <h3 className="end-of-catalogue">~ end of catalogue ~</h3>
          : <LoadMore onEndOfList={onEndOfList}>
              {isLoading
                ? <Loading />
                : null}
            </LoadMore>
        }
      </div>
    </div>
  );
};

Products.propTypes = {
  isEndOfCatalog: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  onEndOfList: PropTypes.func.isRequired,
  onSortChange: PropTypes.func.isRequired,
  products: PropTypes.array,
  sort: PropTypes.string,
};

export default Products;