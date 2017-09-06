import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap';

export default class Speech extends Component {
  constructor(props) {
    super(props);
    this.state = {
      updateModal: false,
      deleteModal: false
    };

    this.updateToggle = this.updateToggle.bind(this);
    this.deleteToggle = this.deleteToggle.bind(this);
  }

  updateToggle() {
    this.setState({
      updateModal: !this.state.updateModal
    });
  }

  deleteToggle() {
    this.setState({
      deleteModal: !this.state.deleteModal
    });
  }

  static propTypes = {
    speech: PropTypes.object
  }

  render() {
    const { speech } = this.props;
    return (
      <tbody>
        <tr>
          <th scope="row">{speech.id}</th>
          <td>{speech.date}</td>
          <td>{speech.title}</td>
          <td>{speech.speaker}</td>
          <td>
            <Button className="edit-button" onClick={this.updateToggle}><i className="fa fa-pencil" aria-hidden="true" /></Button>
            <Modal className="modal-space" isOpen={this.state.updateModal} toggle={this.updateToggle}>
              <ModalHeader toggle={this.updateToggle}>updateModal title</ModalHeader>
              <ModalBody>
                <Form>
                  <FormGroup>
                    <Label for="speechDatetime">演講時間</Label>
                    <Input type="date" name="datetime" id="datetime" placeholder="datetime" defaultValue={speech.date} />
                  </FormGroup>
                  <FormGroup>
                    <Label for="speechTitle">演講主題</Label>
                    <Input type="title" name="title" id="title" placeholder="title" defaultValue={speech.title} />
                  </FormGroup>
                  <FormGroup>
                    <Label for="speechName">講者</Label>
                    <Input type="name" name="name" id="name" placeholder="name" defaultValue={speech.speaker} />
                  </FormGroup>
                  <FormGroup>
                    <Label for="speechContent">演講內容</Label>
                    <Input type="textarea" name="text" id="text" defaultValue="" />
                  </FormGroup>
                  <Button color="primary" onClick={this.updateToggle}>Do Something</Button>{' '}
                  <Button color="secondary" onClick={this.updateToggle}>Cancel</Button>
                </Form>
              </ModalBody>
            </Modal>
            {' '}
            <Button className="delete-button" onClick={this.deleteToggle}><i className="fa fa-times" aria-hidden="true"/></Button>
            <Modal className="modal-space" isOpen={this.state.deleteModal} toggle={this.deleteToggle}>
              <ModalHeader toggle={this.deleteToggle}>deleteModal title</ModalHeader>
              <ModalBody>
                確定要刪除「{speech.title}」嗎？
          </ModalBody>
              <ModalFooter>
                <Button color="primary" onClick={this.deleteToggle}>Do Something</Button>{' '}
                <Button color="secondary" onClick={this.deleteToggle}>Cancel</Button>
              </ModalFooter>
            </Modal>
          </td>
        </tr>
      </tbody>
    );
  }
}
