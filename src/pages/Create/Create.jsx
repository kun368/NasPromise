import React, { Component } from 'react';
import TermsInfo from './components/TermsInfo';
import SettingsForm from './components/SettingsForm';

export default class Create extends Component {
  static displayName = 'Create';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="create-page">
        <TermsInfo />
        <SettingsForm />
      </div>
    );
  }
}
