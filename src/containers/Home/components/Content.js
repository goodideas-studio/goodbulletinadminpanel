import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { Container, Row, Col, Table, Form, FormGroup, Modal, ModalHeader, ModalBody, Label, Input, Button } from 'reactstrap';
import PropTypes from 'prop-types';
import Speech from './Speech';

import Cardboard from './Card-board';
// import speechJson from './data.json';

export default class Content extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: [],
      classItem: [],
      memberItem: [],
      createModal: false,

      speechDateValid: false,
      speechTitleValid: false,
      speechSpeakerValid: false,
      speechMessageValid: false,
      formValid: false,

      speechDate: '',
      speechTitle: '',
      speechSpeaker: '',
      speechMessage: '',
      // class初始值
      speechClass: 'backend-end',
      speechClassImg: '',
      speechUrl: ''
    };

    this.createToggle = this.createToggle.bind(this);

    this.handleValueChange = this.handleValueChange.bind(this);
  }

  static propTypes = {
    id: PropTypes.string,
    token: PropTypes.string,
  };

  createToggle() {
    this.setState({
      createModal: !this.state.createModal
    });
  }

  handleValueChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    // console.log(`name: ${name}, value: ${value}`);
    this.setState({
      [name]: value
    }, () => { this.vailDateField(name, value); });
  }

  vailDateField(fieldName, value) {
    let dateValid = this.state.speechDateValid;
    let titleValid = this.state.speechTitleValid;
    // let speakerValid = this.state.speechSpeakerValid;
    let messageValid = this.state.speechMessageValid;

    switch (fieldName) {
      case 'speechDate':
        dateValid = value !== null || "";
        break;
      case 'speechTitle':
        titleValid = value !== null || "";
        break;
      // case 'speechSpeaker':
      //   speakerValid = value !== null || "";
      //   break;
      case 'speechMessage':
        messageValid = value !== null || "";
        break;
      default:
        break;
    }
    // console.log(`second: ${dateValid}`);
    this.setState({
      speechDateValid: dateValid,
      speechTitleValid: titleValid,
      // speechSpeakerValid: speakerValid,
      speechMessageValid: messageValid
    }, this.valiForm);
  }

  valiForm() {
    this.setState({
      formValid: this.state.speechDateValid && this.state.speechTitleValid && this.state.speechMessageValid
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.serverItemCreate();
  }

  serverItemLoad = () => {
    fetch(`https://devche.com/api/speech/?id=${this.props.id}`, {
    // fetch(`http://localhost:8007/api/speech/?id=${this.props.id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': this.props.token
      },
      // credentials: 'include'
    })
      .then((response) => {
        if (!response.ok) throw new Error(response.statusText);
        return response.json().then((data) => {
          // 依造日期排序
          const dataSorting = data.result.sort((a, b) => new Date(b.speech_date) - new Date(a.speech_date));
          dataSorting.forEach((element) => {
            if (element.link === "null" || element.link === null) {
              element.link = "";
            }
          });
          // console.log(JSON.stringify(dataSorting));
          if (this._isMounted) {
            this.setState({
              item: dataSorting
            });
          }
        });
      })
      .catch(err => err);
  }

  serverItemCreate = async () => {
    // console.log(this.state.speechMessage);

    const classArray = this.state.classItem;
    const chooseClass = this.state.speechClass;
    for (let i = 0; i < classArray.length; i += 1) {
      // console.log(`chooseClass: ${chooseClass}, names: ${classArray[i].name}`);
      if (classArray[i].name === chooseClass) {
        await this.setState({
          speechClassImg: classArray[i].img_url
        });
      }
    }
    // console.log(`speechUrl: ${this.state.speechUrl}`);
    if (this.state.speechUrl === "" || this.state.speechUrl === null) {
      await this.setState({
        speechUrl: ''
      });
    }

    await fetch(`https://devche.com/api/speech/?id=${this.props.id}`, {
    // await fetch(`http://localhost:8007/api/speech/?id=${this.props.id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': this.props.token
      },
      body: JSON.stringify({
        speech_date: this.state.speechDate,
        id: this.props.id,
        title: this.state.speechTitle,

        // 默認方式輸入speaker跟speaker_img
        speaker: this.state.memberItem.displayName,
        speaker_img: this.state.memberItem.photos,

        message: this.state.speechMessage,
        link: this.state.speechUrl,
        class: this.state.speechClass,
        class_img: this.state.speechClassImg
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
      // create filed 初始化
      speechDate: '',
      speechTitle: '',
      speechSpeaker: '',
      speechMessage: '',
      speechClass: 'backend-end',
      speechClassImg: '',
      speechUrl: ''
    });

    await this.serverItemLoad();
    await this.getClassItem();
  }

  getMemberItem = () => {
    fetch(`https://devche.com/api/speechmember/?id=${this.props.id}`, {
    // fetch(`http://localhost:8007/api/speechmember/?id=${this.props.id}`, {
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': this.props.token
      },
      // credentials: 'include'
    })
      .then((response) => {
        if (!response.ok) throw new Error(response.statusText);
        return response.json().then((memberData) => {
          if (this._isMounted) {
            this.setState({
              memberItem: memberData.result
            });
          }
          // console.log(`memberData second: ${JSON.stringify(this.state.memberItem)}`);
        });
      })
      .catch(err => err);
  }

  getClassItem = () => {
    fetch(`https://devche.com/api/speechclass/?id=${this.props.id}`, {
    // fetch(`http://localhost:8007/api/speechclass/?id=${this.props.id}`, {
      Method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': this.props.token
      },
      // credentials: 'include'
    })
      .then((response) => {
        if (!response.ok) throw new Error(response.statusText);
        return response.json().then((classData) => {
          if (this._isMounted) {
            this.setState({
              classItem: classData.result
            });
          }
        });
      })
      .catch(err => err);
  }

  componentDidMount() {
    this._isMounted = true;
    this.getMemberItem();
    this.serverItemLoad();
    this.getClassItem();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  shouldComponentUpdate() {
    // console.log(`token: ${this.props.token}`);
    if (this.props.token === "null") {
      window.location.href = ("https://devche.com/#/");
      // window.location.href = ("http://localhost:8000/#/");
      return false;
    }
    return true;
  }

  render() {
    const result = this.state.item.map((speech, index) => (
      <Speech
        id={this.props.id}
        token={this.props.token}
        itemLoad={this.serverItemLoad}
        itemClassLoad={this.getClassItem}
        classItem={this.state.classItem}
        index={index + 1}
        key={index}
        speech={speech}
      />
    ));
    const classResult = this.state.classItem.map((classData, index) => (
      <option value={classData.name} key={index}>{classData.name}</option>
    ));
    // const memberIndex = () => this.state.memberItem.length;
    const memberIndex = () => {
      if (typeof this.state.memberItem === 'object') {
        return 1;
      }
      return this.state.memberItem.length;
    };
    // console.log(`member: ${JSON.stringify(this.state.memberItem)}`);
    const speechIndex = () => this.state.item.length;

    const beforeSpeechIndex = () => {
      let i = 0;
      this.state.item.forEach((speech) => {
        const now = new Date();
        if (now > new Date(speech.speech_date)) {
          i += 1;
        }
      });
      return i;
    };

    const afterSpeechIndex = () => {
      let j = 0;
      this.state.item.forEach((speech) => {
        const now = new Date();
        if (now <= new Date(speech.speech_date)) {
          j += 1;
        }
      });
      return j;
    };

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
                {/* <div className="main-title">Main Title.</div> */}
                <div className="card-packge">
                  <Row>
                    <Col xs="12" sm="3" className="card-col">
                      <Cardboard
                        icon="fa fa-user-circle fa-3x icon"
                        title="演講人數"
                        content={memberIndex()}
                      />
                    </Col>
                    <Col xs="12" sm="3" className="card-col">
                      <Cardboard
                        icon="fa fa-info-circle fa-3x icon"
                        title="演講活動數"
                        content={speechIndex()}
                      />
                    </Col>
                    <Col xs="12" sm="3" className="card-col">
                      <Cardboard
                        icon="fa fa-question-circle fa-3x icon"
                        title="未完成演講"
                        content={afterSpeechIndex()}
                      />
                    </Col>
                    <Col xs="12" sm="3" className="card-col">
                      <Cardboard
                        icon="fa fa-check-circle fa-3x icon"
                        title="已完成演講"
                        content={beforeSpeechIndex()}
                      />
                    </Col>
                  </Row>
                </div>
                {/* <hr /> */}
                <div className="section-title">
                  演講活動資料
                    </div>
                <Button className="create-button" onClick={this.createToggle}><i className="fa fa-plus" aria-hidden="true" /></Button>
                <Modal className="modal-space" isOpen={this.state.createModal} toggle={this.createModal}>
                  <ModalHeader toggle={this.createModal}>我要分享</ModalHeader>
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
                        <Label for="exampleSelect">主題分類</Label>
                        <Input type="select" name="speechClass" id="exampleSelect" onChange={this.handleValueChange} value={this.state.speechClass}>
                          {classResult}
                        </Input>
                      </FormGroup>
                      {/* <FormGroup>
                        <Label for="speechName">講者</Label>
                        <Input type="name" name="speechSpeaker" id="name" placeholder="name" onChange={this.handleValueChange} value={this.state.speechSpeaker} />
                      </FormGroup> */}
                      <FormGroup>
                        <Label for="speechContent">演講內容</Label>
                        <Input type="textarea" name="speechMessage" id="text" onChange={this.handleValueChange} value={this.state.speechMessage} />
                      </FormGroup>
                      <FormGroup>
                        <Label for="speechUrl">相關連結</Label>
                        <Input type="url" name="speechUrl" id="URL" placeholder="URL" onChange={this.handleValueChange} value={this.state.speechUrl} />
                      </FormGroup>
                      <Button color="primary" disabled={!this.state.formValid}>建立</Button>{' '}
                      <Button color="secondary" onClick={this.createToggle}>取消</Button>
                    </Form>
                  </ModalBody>
                </Modal>
                <Row>
                  {/* <Col xs="12" sm="8" lg="7"> */}
                  <Col xs="12" sm="12" lg="12">
                    <Table hover className="speech-td table-message">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>分類</th>
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
