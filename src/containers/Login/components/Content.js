import React, { Component } from 'react';

import { Container, Button, Form, FormGroup, Label, Input } from 'reactstrap';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      test: ''
    };
  }

  loginFun = () => {
    // location.href = "https://devche.com/api/speechmember/login/facebook";
    location.href = "http://localhost:8007/api/speechmember/login/facebook";
  }

  render() {
    return (
      <div className="page">
        <div className="title-place">
          <p className="title">
            Do you want to know?
    </p>
        </div>
        <div className="login-place">
          <Container>
            <p className="login-title">後台登入</p>
            <br />
            <Form>
              <FormGroup>
                <Label for="exampleAccount">Account</Label>
                <Input type="text" name="account" id="exampleAccount" placeholder="Account placeholder" />
              </FormGroup>
              <FormGroup>
                <Label for="examplePassword">Password</Label>
                <Input type="password" name="password" id="examplePassword" placeholder="password placeholder" />
              </FormGroup>
              <div className="center">
                <Button className="login-button">Submit</Button>
              </div>
            </Form>
            <br />
            <p className="center">or</p>
            <div className="center">
              <Button className="facebook-login-button" name="facebook-login" id="exampleAccount" onClick={this.loginFun}>Facebook</Button>
            </div>
          </Container>
        </div>
      </div>
    );
  }
}
