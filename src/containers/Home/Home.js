import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from './components/Header.js';
import Content from './components/Content.js';
// import './Home.less';
import './components/css/body.css';
import './components/css/header.css';
import './components/css/content.css';
import './components/css/font-awesome.css';

export default class Home extends Component {
  static propTypes = {
    location: PropTypes.object,
  }
  render() {
    // console.log(`location: ${JSON.stringify(this.props.location)}`);
    return (
      <div>
        <Header />
        <Content
          location={this.props.location}
        />
      </div>
    );
  }
}
