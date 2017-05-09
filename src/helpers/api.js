import Axios from "axios";

const baseUrl = "http://localhost:8000";

export default {
  fetchProducts (limit, offset, sort) {
    return Axios.get(`${baseUrl}/api/products?limit=${limit}&skip=${offset}&sort=${sort}`);
  }
};