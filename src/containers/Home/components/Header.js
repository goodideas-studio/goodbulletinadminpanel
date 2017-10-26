import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col, Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';


export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      dropdownOpen: false,
      memberItem: []
    };
    this.toggle = this.toggle.bind(this);
    this.dropToggle = this.dropToggle.bind(this);
  }

  static propTypes = {
    id: PropTypes.string,
    token: PropTypes.string,
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  dropToggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  getMemberItem = () => {
    fetch(`https://devche.com/api/speechmember/?id=${this.props.id}`, {
    // fetch(`http://localhost:8007/api/speechmember/?id=${this.props.id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': this.props.token
      },
    })
      .then((response) => {
        if (!response.ok) throw new Error(response.statusText);
        return response.json().then((memberDate) => {
          if (this._isMounted) {
            this.setState({
              memberItem: memberDate.result
            });
          }
        });
      })
      .catch(err => err);
  }

  doLogOut = () => {
    fetch(`https://devche.com/api/speechmember/logout/?id=${this.props.id}`, {
    // fetch(`http://localhost:8007/api/speechmember/logout/?id=${this.props.id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (!response.ok) throw new Error(response.statusText);
      });
    window.location.href = ("https://devche.com/goodideabillboard/#/");
    // window.location.href = ("http://localhost:8000/#/");
  }

  componentDidMount() {
    this._isMounted = true;
    this.getMemberItem();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  shouldComponentUpdate() {
    if (this.state.token === "null") {
      window.location.href = ("https://devche.com/goodideabillboard/backstage/#/");
      // window.location.href = ("http://localhost:8000/#/");
      return false;
    }
    return true;
  }

  render() {
    return (
      <header>
        <Container>
          <Row className="margin-0">
            <Col xs="12" sm="12" className="padding-0">
              <Navbar light toggleable>
                <NavbarToggler right onClick={this.toggle} />
                <NavbarBrand href="/"><p>公佈欄-後台</p></NavbarBrand>
                <Collapse isOpen={this.state.isOpen} navbar>
                  <Nav className="ml-auto" navbar>
                    <NavItem>
                      <Dropdown isOpen={this.state.dropdownOpen} toggle={this.dropToggle}>
                        <DropdownToggle className="displayname" caret>
                          <img className="pic-size" src={this.state.memberItem.photos} alt="" />
                          {/* <span>{this.state.memberItem.displayName}</span> */}
                        </DropdownToggle>
                        <DropdownMenu>
                          <DropdownItem header>Hi,</DropdownItem>
                          <DropdownItem header>{this.state.memberItem.displayName}</DropdownItem>
                          <DropdownItem divider />
                          <DropdownItem onClick={this.doLogOut}>登出</DropdownItem>
                        </DropdownMenu>
                      </Dropdown>
                    </NavItem>
                  </Nav>
                </Collapse>
              </Navbar>
            </Col>
          </Row>
        </Container>
      </header>
    );
  }
}
