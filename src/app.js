import "./style.css";

import React from "react";
import ReactDOM from "react-dom";

import ProductsContainer from "./components/products/container";

const App = () => (
  <div><ProductsContainer /></div>
);

export default App;

ReactDOM.render(<App/>, document.getElementById("app"));
