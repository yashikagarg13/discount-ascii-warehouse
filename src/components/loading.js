import React, {Component} from "react";

export default class Loading extends Component {
  constructor(props) {
    super(props);

    this.originalText = "Loading.";
    this.state = {
      loadingText: this.originalText,
    };
  }

  componentDidMount() {
    const finalText = "Loading...";
    let {loadingText} = this.state;
    this.interval = setInterval(() => {
      if (loadingText === finalText) {
        loadingText = this.originalText;
      } else {
        loadingText = loadingText + ".";
      }
      this.setState({loadingText});
    }, 300);
  }

  componentWillUnmount () {
    clearInterval(this.interval);
  }

  render () {
    return (
      <h1 className="loading">
        {this.state.loadingText}
      </h1>
    );
  }
}