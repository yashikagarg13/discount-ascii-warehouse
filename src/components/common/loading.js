import React, { Component } from 'react';
import { LOADING_TEXT_START } from '../../helpers/constants';
import { getUpdatedLoadingText } from '../../helpers/utils';

export default class Loading extends Component {
  constructor( props ) {
    super(props);

    this.state = {
      loadingText: LOADING_TEXT_START,
    };
  }

  componentDidMount() {
    let {loadingText} = this.state;
    this.interval = setInterval(() => {
      
      this.setState({ loadingText: getUpdatedLoadingText(loadingText) });
    }, 300);
  }

  componentWillUnmount () {
    clearInterval(this.interval);
  }

  render () {
    return (
      <h1 className='loading'>
        {this.state.loadingText}
      </h1>
    );
  }
}