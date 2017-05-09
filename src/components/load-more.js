import React, {Component} from "react";
import PropTypes from "prop-types";

class LoadMore extends Component {
  constructor (props) {
    super (props);

    this.state = {
      isVisible: false,
    };
  }
  componentDidMount() {
    window.addEventListener("scroll", this.isScrollIntoView.bind(this));
  }
  componentWillUnmount() {
    window.removeEventListener("scroll", this.isScrollIntoView);
  }
  componentDidUpdate(nextProps, nextState) {
    if (this.state.isVisible != nextState.isVisible && this.state.isVisible) {
      this.props.onEndOfList();
    }
  }

  isScrollIntoView() {
    let point = document.getElementById("point");
    if (point) {
      let bodyHeight = document.body.scrollTop + window.innerHeight;

      if (bodyHeight >= point.offsetTop) {
        this.setState({
          isVisible: true,
        });
      } else {
        this.setState({
          isVisible: false,
        });
      }
    }
  }

  render () {
    return (
      <div id="point">
        {this.props.children}
      </div>
    );
  }
}

LoadMore.propTypes = {
  children: PropTypes.element,
  onEndOfList: PropTypes.func.isRequired,
};

export default LoadMore;