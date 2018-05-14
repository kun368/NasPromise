import React, { Component } from 'react';
import ReleaseIntro from './components/ReleaseIntro/ReleaseIntro';
import FeatureList from './components/FeatureList/FeatureList';

export default class Home extends Component {
  static displayName = 'Home';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="home-page">
        <ReleaseIntro/>
        <FeatureList/>
      </div>
    );
  }
}
