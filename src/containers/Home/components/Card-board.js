import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'reactstrap';

export default class Speech extends Component {
  static propTypes = {
    icon: PropTypes.string,
    title: PropTypes.string,
    content: PropTypes.number
  }

  render() {
    const { icon, title, content } = this.props;
    return (
      <div className="card-board">
        <Row>
          <Col xs="2" sm="2">
            <div className="card-left">
              <i className={icon} aria-hidden="true" />
            </div>
          </Col>
          <Col xs="10" sm="10">
            <ul className="card-right">
              <li className="card-title">{title}</li>
              <li className="card-content">{content}</li>
            </ul>
          </Col>
        </Row>
      </div>
    );
  }
}
