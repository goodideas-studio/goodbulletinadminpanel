import React, { Component } from 'react';
import Header from './components/Header.js';
import Content from './components/Content.js';
// import './Home.less';
import './components/css/header.css';
import './components/css/content.css';
import './components/css/font-awesome.css';

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
