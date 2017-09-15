import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap';

export default class Speech extends Component {
  constructor(props) {
    super(props);
    const {speech} = this.props;
    this.state = {
      updateModal: false,
      deleteModal: false,
      editSpeaker: speech.speaker,
      editTitle: speech.title,
      editMessage: speech.message,
      editDate: speech.speech_date
    };

    // console.log(`"first" ${this.state.editTitle}`);

    this.updateToggle = this.updateToggle.bind(this);
    this.deleteToggle = this.deleteToggle.bind(this);

    this.handleSpeakerChange = this.handleSpeakerChange.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleMessageChange = this.handleMessageChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
  }

  static propTypes = {
    // GET method
    index: PropTypes.number,
    speech: PropTypes.object,
    itemLoad: PropTypes.func
    // POST method
    // speaker: PropTypes.string,
    // speechDate: PropTypes.string,
    // title: PropTypes.string
  }

  updateToggle() {
    this.setState({
      updateModal: !this.state.updateModal
    });
  }

  handleSpeakerChange = (e) => {
    // const {speech} = this.props;
    // this.state = {
    //   editSpeaker: speech.speaker
    // };
    this.setState({
      editSpeaker: e.target.value
    });
  }

  handleTitleChange = (e) => {
    // const {speech} = this.props;
    // this.state = {
    //   editTitle: speech.title
    // };
    this.setState({
      editTitle: e.target.value
    });
  }

  handleMessageChange = (e) => {
    // const {speech} = this.props;
    // this.state = {
    //   editMessage: speech.message
    // };
    this.setState({
      editMessage: e.target.value
    });
  }

  handleDateChange = (e) => {
    // const {speech} = this.props;
    // this.state = {
    //   editDate: speech.speech_date
    // };
    this.setState({
      editDate: e.target.value
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.updateAction();
  }

  updateAction = async () => {
    const { speech, itemLoad } = this.props;
    await fetch('https://devche.com/api/speech', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        speaker: this.state.editSpeaker,
        title: this.state.editTitle,
        message: this.state.editMessage,
        speech_date: this.state.editDate,
        create_date: speech.create_date
      })
    }).then((response) => {
      // console.log(response);
      if (!response.ok) throw new Error(response.statusText);
      response.json().then(data => data);
    })
      .catch(err => err);
    await this.setState({
      updateModal: !this.state.updateModal,
    });
    await itemLoad();
  }

  deleteToggle() {
    this.setState({
      deleteModal: !this.state.deleteModal
    });
  }

  deleteAction = async () => {
    const { speech, itemLoad } = this.props;
    // console.log(speech.create_date);
    // console.log(speech.speaker);
    await fetch('https://devche.com/api/speech', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        create_date: speech.create_date,
        speaker: speech.speaker
      })
    }).then((response) => {
      // console.log(response);
      if (!response.ok) throw new Error(response.statusText);
      response.json().then(data => data);
    })
      .catch(err => err);
    await this.setState({
      deleteModal: !this.state.deleteModal,
    });
    await itemLoad();
  }

  componentWillReceiveProps(nextProps) {
    // console.log(`"second" ${nextProps.speech.title}`);
    // console.log(nextProps.speech);
    this.setState({
      editSpeaker: nextProps.speech.speaker,
      editTitle: nextProps.speech.title,
      editMessage: nextProps.speech.message,
      editDate: nextProps.speech.speech_date
    });
  }

  render() {
    const { speech, index } = this.props;
    return (
      <tbody>
        <tr>
          <th scope="row">{index}</th>
          <td>{speech.speech_date}</td>
          <td>{speech.title}</td>
          <td>{speech.speaker}</td>
          <td>
            <Button className="edit-button" onClick={this.updateToggle}><i className="fa fa-pencil" aria-hidden="true" /></Button>
            <Modal className="modal-space" isOpen={this.state.updateModal} toggle={this.updateToggle}>
              <ModalHeader toggle={this.updateToggle}>修改活動內容</ModalHeader>
              <ModalBody>
                <Form onSubmit={this.handleSubmit}>
                  <FormGroup>
                    <Label for="speechDatetime">演講時間</Label>
                    <Input type="date" name="datetime" id="datetime" placeholder="datetime" onChange={this.handleDateChange} value={this.state.editDate} />
                  </FormGroup>
                  <FormGroup>
                    <Label for="speechTitle">演講主題</Label>
                    <Input type="title" name="title" id="title" placeholder="title" onChange={this.handleTitleChange} value={this.state.editTitle} />
                  </FormGroup>
                  <FormGroup>
                    <Label for="speechName">講者</Label>
                    <Input type="name" name="name" id="name" placeholder="name" onChange={this.handleSpeakerChange} value={this.state.editSpeaker} />
                  </FormGroup>
                  <FormGroup>
                    <Label for="speechContent">演講內容</Label>
                    <Input type="textarea" name="text" id="text" onChange={this.handleMessageChange} value={this.state.editMessage} />
                  </FormGroup>
                  <Button color="primary">修改</Button>{' '}
                  <Button color="secondary" onClick={this.updateToggle}>取消</Button>
                </Form>
              </ModalBody>
            </Modal>
            {' '}
            <Button className="delete-button" onClick={this.deleteToggle}><i className="fa fa-times" aria-hidden="true" /></Button>
            <Modal className="modal-space" isOpen={this.state.deleteModal} toggle={this.deleteToggle}>
              <ModalHeader toggle={this.deleteToggle}>刪除活動</ModalHeader>
              <ModalBody>
                確定要刪除「{speech.title}」嗎？
          </ModalBody>
              <ModalFooter>
                <Button color="primary" onClick={this.deleteAction}>刪除</Button>{' '}
                <Button color="secondary" onClick={this.deleteToggle}>取消</Button>
              </ModalFooter>
            </Modal>
          </td>
        </tr>
      </tbody>
    );
  }
}
