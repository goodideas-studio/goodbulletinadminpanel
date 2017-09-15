import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { Container, Row, Col, Table, Form, FormGroup, Modal, ModalHeader, ModalBody, Label, Input, Button } from 'reactstrap';
import Speech from './Speech';
// import Cardboard from './Card-board';
// import speechJson from './data.json';

export default class Content extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: [],
      createModal: false,

      speechDateValid: false,
      speechTitleValid: false,
      speechSpeakerValid: false,
      speechMessageValid: false,
      formValid: false,

      speechDate: '',
      speechTitle: '',
      speechSpeaker: '',
      speechMessage: ''
    };

    this.createToggle = this.createToggle.bind(this);

    this.handleValueChange = this.handleValueChange.bind(this);
  }

  createToggle() {
    this.setState({
      createModal: !this.state.createModal
    });
  }

  handleValueChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      [name]: value
    }, () => { this.vailDateField(name, value); });
  }

  vailDateField(fieldName, value) {
    let dateValid = this.state.speechDateValid;
    let titleValid = this.state.speechTitleValid;
    let speakerValid = this.state.speechSpeakerValid;
    let messageValid = this.state.speechMessageValid;

    // console.log(value);
    // console.log(`onde: ${dateValid}`);

    switch (fieldName) {
      case 'speechDate':
        dateValid = value !== null;
        break;
      case 'speechTitle':
        titleValid = value !== null;
        break;
      case 'speechSpeaker':
        speakerValid = value !== null;
        break;
      case 'speechMessage':
        messageValid = value !== null;
        break;
      default:
        break;
    }
    // console.log(`second: ${dateValid}`);
    this.setState({
      speechDateValid: dateValid,
      speechTitleValid: titleValid,
      speechSpeakerValid: speakerValid,
      speechMessageValid: messageValid
    }, this.valiForm);
  }

  valiForm() {
    this.setState({
      formValid: this.state.speechDateValid && this.state.speechTitleValid && this.state.speechSpeakerValid && this.state.speechMessageValid
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.serverItemCreate();
  }

  serverItemLoad = () => {
    fetch('https://devche.com/api/speech', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .then((response) => {
        if (!response.ok) throw new Error(response.statusText);
        return response.json().then((data) => {
          // 依造日期排序
          const dataSorting = data.result.sort((a, b) => new Date(b.speech_date) - new Date(a.speech_date));
          this.setState({
            item: dataSorting
          });
        });
      })
      .catch(err => err);
  }

  serverItemCreate = async () => {
    // console.log(this.state.speechMessage);
    await fetch('https://devche.com/api/speech', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        speech_date: this.state.speechDate,
        title: this.state.speechTitle,
        speaker: this.state.speechSpeaker,
        message: this.state.speechMessage
      })
    })
      .then((response) => {
        // console.log(response);
        if (!response.ok) throw new Error(response.statusText);
        response.json().then(data => data);
      })
      .catch(err => err);
    await this.setState({
      createModal: !this.state.createModal,
    });
    // create filed 初始化
    this.state = {
      speechDate: '',
      speechTitle: '',
      speechSpeaker: '',
      speechMessage: ''
    };
    await this.serverItemLoad();
  }

  componentDidMount() {
    this.serverItemLoad();
  }

  render() {
    // console.log(JSON.stringify(this.state.item));
    const result = this.state.item.map((speech, index) => (
      <Speech
        itemLoad={this.serverItemLoad}
        index={index + 1}
        key={index}
        speech={speech}
      />
    ));
    // this.state.speechData = "2017-08-20";
    return (
      <content>
        <Container>
          <Row className="margin-0">
            {/* <Col xs="12" md="2" sm="12" className="padding-0 left-none left-color left-col">
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
          </Col> */}
            <Col xs="12" md="12" sm="12" className="padding-0 right-color right-col">
              <div className="right-content">
                {/* <div className="main-title">Main Title.</div>
              <div className="card-packge">
                <Row>
                  <Col xs="12" sm="3" className="card-col">
                    <Cardboard
                      icon="fa fa-user-circle fa-3x icon"
                      title="演講人數"
                      content={2}
                    />
                  </Col>
                  <Col xs="12" sm="3" className="card-col">
                    <Cardboard
                      icon="fa fa-info-circle fa-3x icon"
                      title="演講活動數"
                      content={5}
                    />
                  </Col>
                  <Col xs="12" sm="3" className="card-col">
                    <Cardboard
                      icon="fa fa-question-circle fa-3x icon"
                      title="未完成演講"
                      content={5}
                    />
                  </Col>
                  <Col xs="12" sm="3" className="card-col">
                    <Cardboard
                      icon="fa fa-check-circle fa-3x icon"
                      title="已完成演講"
                      content={3}
                    />
                  </Col>
                </Row>
              </div>
              <hr /> */}
                <div className="section-title">
                  演講活動資料
                    </div>
                <Button className="create-button" onClick={this.createToggle}><i className="fa fa-plus" aria-hidden="true" /></Button>
                <Modal className="modal-space" isOpen={this.state.createModal} toggle={this.createModal}>
                  <ModalHeader toggle={this.createModal}>建立活動</ModalHeader>
                  <ModalBody>
                    <Form onSubmit={this.handleSubmit}>
                      <FormGroup>
                        <Label for="speechDatetime">演講時間</Label>
                        <Input type="date" name="speechDate" id="datetime" placeholder="datetime" onChange={this.handleValueChange} value={this.state.speechData} />
                      </FormGroup>
                      <FormGroup>
                        <Label for="speechTitle">演講主題</Label>
                        <Input type="title" name="speechTitle" id="title" placeholder="title" onChange={this.handleValueChange} value={this.state.speechTitle} />
                      </FormGroup>
                      <FormGroup>
                        <Label for="speechName">講者</Label>
                        <Input type="name" name="speechSpeaker" id="name" placeholder="name" onChange={this.handleValueChange} value={this.state.speechSpeaker} />
                      </FormGroup>
                      <FormGroup>
                        <Label for="speechContent">演講內容</Label>
                        <Input type="textarea" name="speechMessage" id="text" onChange={this.handleValueChange} value={this.state.speechMessage} />
                      </FormGroup>
                      <Button color="primary" disabled={!this.state.formValid}>建立</Button>{' '}
                      <Button color="secondary" onClick={this.createToggle}>取消</Button>
                    </Form>
                  </ModalBody>
                </Modal>
                <Row>
                  {/* <Col xs="12" sm="8" lg="7"> */}
                  <Col xs="12" sm="12" lg="12">
                    <Table hover className="table-message">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>時間</th>
                          <th>主題</th>
                          <th>講者</th>
                        </tr>
                      </thead>
                      {result}
                    </Table>
                  </Col>
                  {/* <Col xs="12" sm="4" lg="5">
                  <Form className="form-space" onSubmit={this.handleSubmit}>
                    <FormGroup>
                      <Label className="form-title" for="speechDatetime">演講時間</Label>
                      <Input type="date" name="datetime" id="datetime" placeholder="datetime" onChange={this.handleDateChange} value={this.state.speechData} />
                    </FormGroup>
                    <FormGroup>
                      <Label className="form-title" for="speechTitle">演講主題</Label>
                      <Input type="title" name="title" id="title" placeholder="title" onChange={this.handleTitleChange} value={this.state.speechTitle} />
                    </FormGroup>
                    <FormGroup>
                      <Label className="form-title" for="speechName">講者</Label>
                      <Input type="name" name="name" id="name" placeholder="name" onChange={this.handleSpeakerChange} value={this.state.speechSpeaker} />
                    </FormGroup>
                    <FormGroup>
                      <Label className="form-title" for="speechContent">演講內容</Label>
                      <Input type="textarea" name="text" id="text" onChange={this.handleMessageChange} value={this.state.speechMessage} />
                    </FormGroup>
                    <Button color="primary">Do Something</Button>{' '}
                    <Button color="secondary">Cancel</Button>
                  </Form>
                </Col> */}
                </Row>
              </div>
            </Col>
          </Row>
        </Container>
      </content>
    );
  }
}
