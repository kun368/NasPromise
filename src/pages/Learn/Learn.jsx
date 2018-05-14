import React, { Component } from 'react';
import TermsInfo from './components/TermsInfo';

export default class Learn extends Component {
  static displayName = 'Learn';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="learn-page">
        <TermsInfo />
      </div>
    );
  }
}
