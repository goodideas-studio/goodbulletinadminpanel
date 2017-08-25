import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';

export default class Content extends Component {
  render() {
    return (
      <content>
        <Row>
          <Col xs="12" sm="3" className="padding-0">
            <div className="left-content">
              <p>left</p>
            </div>
          </Col>
          <Col xs="12" sm="9" className="padding-0">
            <div className="right-content">
              <h1>right</h1>
            </div>
          </Col>
        </Row>
      </content>
    );
  }
}
