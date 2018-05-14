import React, { Component } from 'react';
import TagMessageList from './components/TagMessageList';

export default class MyCenter extends Component {
  static displayName = 'MyCenter';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="my-center-page">
        <TagMessageList />
      </div>
    );
  }
}
