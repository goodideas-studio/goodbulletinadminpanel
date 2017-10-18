import React, { Component } from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import Header from './components/Header.js';
import Content from './components/Content.js';

// import './Home.less';
import './components/css/body.css';
import './components/css/header.css';
import './components/css/content.css';
import './components/css/font-awesome.css';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: '',
      speechID: '',
      memberItem: []
    };
  }

  static propTypes = {
    location: PropTypes.object,
  }

  getID = () => {
    this.setState({
      speechID: queryString.parse(this.props.location.search).id
    });
  }

  getToken = () => {
    // fetch(`https://devche.com/api/speechmember/login/redirect/?id=${this.state.speechID}`, {
    fetch(`http://localhost:8007/api/speechmember/login/redirect/?id=${this.state.speechID}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      // credentials: 'include'
    })
      .then((response) => {
        if (!response.ok) throw new Error(response.statusText);
        const tokenValue = response.headers.get('x-access-token');
        this.setState({
          token: tokenValue
        });
        return tokenValue;
      })
      .catch(err => err);
  }

  async componentWillMount() {
    await this.getID();
    await this.getToken();
  }

  // checkToken = () => {
  //   const token = this.state.token;
  //   if (this.state.token === "null") {
  //      return (window.location.href = ("http://localhost:8000/#"));
  //   } else if (this.state.token !== "null") {
  //     const checkDiv = token ? (<div><Header id={this.state.speechID} token={this.state.token}/> <Content id={this.state.speechID} token={this.state.token} /></div>) : null;
  //     return checkDiv;
  //   }
  // }

  render() {
    const token = this.state.token;
    const checkDiv = token ? (<div><Header id={this.state.speechID} token={this.state.token}/> <Content id={this.state.speechID} token={this.state.token} /></div>) : null;
    // console.log(`location: ${JSON.stringify(this.props.location)}`);
    return (
      <div>
        {checkDiv}
      </div>
      // <div><Header /> <Content location={this.props.location} /></div>
    );
  }
}
