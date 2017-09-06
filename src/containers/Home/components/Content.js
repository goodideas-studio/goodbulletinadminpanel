import React, { Component } from 'react';
import { Row, Col, Table, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import Speech from './Speech';
import Cardboard from './Card-board';
import speechJson from './data.json';

export default class Content extends Component {
  state = {
    speechData: speechJson
  }

  render() {
    const { speechData } = this.state;
    return (
      <content>
        <Row className="margin-0">
          <Col xs="12" md="2" sm="12" className="padding-0 left-none left-color left-col">
            <div className="left-content">
              <ul className="left-feature">
                <li>
                  <div className="inside-word">
                    預留功能-0
                    </div>
                </li>
                <li>
                  <div className="inside-word">
                    預留功能-1
                    </div>
                </li>
                <li>
                  <div className="inside-word">
                    預留功能-2
                  </div>
                </li>
                <li>
                  <div className="inside-word">
                    預留功能-3
                  </div>
                </li>
              </ul>
            </div>
          </Col>
          <Col xs="12" md="10" sm="12" className="padding-0 right-color right-col">
            <div className="right-content">
              <div className="main-title">Main Title.</div>
              <div className="card-packge">
                <Row>
                  <Col xs="12" sm="3" className="card-col">
                    <Cardboard
                      icon="fa fa-user-circle fa-3x icon"
                      title="演講人數"
                      content="2"
                    />
                  </Col>
                  <Col xs="12" sm="3" className="card-col">
                    <Cardboard
                      icon="fa fa-info-circle fa-3x icon"
                      title="演講活動數"
                      content={speechData.length}
                    />
                  </Col>
                  <Col xs="12" sm="3" className="card-col">
                    <Cardboard
                      icon="fa fa-question-circle fa-3x icon"
                      title="未完成演講"
                      content="5"
                    />
                  </Col>
                  <Col xs="12" sm="3" className="card-col">
                    <Cardboard
                      icon="fa fa-check-circle fa-3x icon"
                      title="已完成演講"
                      content="3"
                    />
                  </Col>
                </Row>
              </div>
              <hr />
              <div className="section-title">
                Section Title.
                    </div>
              <Row>
                <Col xs="12" sm="8" lg="7">
                  <Table hover className="table-message">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>時間</th>
                        <th>主題</th>
                        <th>講者</th>
                      </tr>
                    </thead>
                    {
                      speechData.map(speech => (
                        <Speech
                          key={speech.id}
                          speech={speech}
                        />
                      ))
                    }
                  </Table>
                </Col>
                <Col xs="12" sm="4" lg="5">
                  <Form className="form-space">
                    <FormGroup>
                      <Label className="form-title" for="speechDatetime">演講時間</Label>
                      <Input type="date" name="datetime" id="datetime" placeholder="datetime" defaultValue="" />
                    </FormGroup>
                    <FormGroup>
                      <Label className="form-title" for="speechTitle">演講主題</Label>
                      <Input type="title" name="title" id="title" placeholder="title" defaultValue="" />
                    </FormGroup>
                    <FormGroup>
                      <Label className="form-title" for="speechName">講者</Label>
                      <Input type="name" name="name" id="name" placeholder="name" defaultValue="" />
                    </FormGroup>
                    <FormGroup>
                      <Label className="form-title" for="speechContent">演講內容</Label>
                      <Input type="textarea" name="text" id="text" defaultValue="" />
                    </FormGroup>
                    <Button color="primary" onClick="">Do Something</Button>{' '}
                    <Button color="secondary" onClick="">Cancel</Button>
                  </Form>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </content>
    );
  }
}
