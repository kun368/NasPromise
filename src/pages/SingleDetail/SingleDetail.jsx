import React, { Component } from 'react';
import DetailTable from './components/DetailTable';

export default class SingleDetail extends Component {
  static displayName = 'SingleDetail';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="single-detail-page">
        <DetailTable />
      </div>
    );
  }
}
