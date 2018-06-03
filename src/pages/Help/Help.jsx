import React, { Component } from 'react';
import MarkdownDocs from './components/MarkdownDocs';
import SimpleTimeline from './components/SimpleTimeline';

export default class Help extends Component {
  static displayName = 'Help';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="help-page">
        <SimpleTimeline />
        <MarkdownDocs />
      </div>
    );
  }
}
