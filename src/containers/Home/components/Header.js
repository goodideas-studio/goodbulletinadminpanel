import React, { Component } from 'react';
import {Row, Col, Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';


export default class Header extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    return (
      <header>
        <Row className="margin-0">
          <Col xs="12" sm="12" className="padding-0">
            <Navbar light toggleable>
              <NavbarToggler right onClick={this.toggle} />
              <NavbarBrand href="/"><p>公佈欄-後台</p></NavbarBrand>
              <Collapse isOpen={this.state.isOpen} navbar>
                <Nav className="ml-auto" navbar>
                  <NavItem>
                    <NavLink href="/"><p>登出</p></NavLink>
                  </NavItem>
                </Nav>
              </Collapse>
            </Navbar>
          </Col>
        </Row>
      </header>
    );
  }
}
