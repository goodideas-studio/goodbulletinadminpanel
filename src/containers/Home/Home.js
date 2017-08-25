import React, { Component } from 'react';
import Header from './components/Header.js';
import Content from './components/Content.js';
// import './Home.less';
import './components/header.css';
import './components/content.css';

export default class Home extends Component {
  render() {
    return (
      <div>
        <Header />
        <Content />
      </div>
    );
  }
}
