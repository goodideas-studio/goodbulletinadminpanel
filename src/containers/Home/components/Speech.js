import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap';

export default class Speech extends Component {
  constructor(props) {
    super(props);
    const { speech } = this.props;
    this.state = {
      updateModal: false,
      deleteModal: false,
      editSpeakerID: speech.id,
      editSpeaker: speech.speaker,
      editSpeakerImg: speech.speaker_img,
      editTitle: speech.title,
      editMessage: speech.message,
      editDate: speech.speech_date,
      editClass: speech.class,
      editClassImg: speech.class_img,
      editUrl: speech.link,
    };
    // console.log(`"editUrl: " ${this.state.editUrl}`);
    // console.log(`"first" ${this.state.editTitle}`);

    this.updateToggle = this.updateToggle.bind(this);
    this.deleteToggle = this.deleteToggle.bind(this);

    this.handleChangeValue = this.handleChangeValue.bind(this);
  }

  static propTypes = {
    // GET method
    id: PropTypes.string,
    token: PropTypes.string,
    index: PropTypes.number,
    speech: PropTypes.object,
    itemLoad: PropTypes.func,
    itemClassLoad: PropTypes.func,
    classItem: PropTypes.array,
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

  handleChangeValue = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    this.setState({
      [name]: value
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.updateAction();
  }

  updateAction = async () => {
    const { speech, itemLoad, itemClassLoad, classItem } = this.props;
    const classArray = classItem;
    const chooseClass = this.state.editClass;
    for (let i = 0; i < classArray.length; i += 1) {
      // console.log(`chooseClass: ${chooseClass}, names: ${classArray[i].name}`);
      if (classArray[i].name === chooseClass) {
        await this.setState({
          editClassImg: classArray[i].img_url
        });
      }
    }
    if (this.state.editUrl === "") {
      await this.setState({
        editUrl: ''
      });
    }
    await fetch(`https://devche.com/api/speech/?id=${this.props.id}`, {
      // await fetch(`http://localhost:8007/api/speech/?id=${this.props.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': this.props.token
      },
      body: JSON.stringify({
        speaker_id: this.state.editSpeakerID,
        speaker: this.state.editSpeaker,
        speaker_img: this.state.editSpeakerImg,
        title: this.state.editTitle,
        message: this.state.editMessage,
        speech_date: this.state.editDate,
        create_date: speech.create_date,
        class: this.state.editClass,
        class_img: this.state.editClassImg,
        link: this.state.editUrl
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
    await itemClassLoad();
  }

  deleteToggle() {
    this.setState({
      deleteModal: !this.state.deleteModal
    });
  }

  deleteAction = async () => {
    const { speech, itemLoad, itemClassLoad } = this.props;
    await fetch(`https://devche.com/api/speech/?id=${this.props.id}`, {
      // await fetch(`http://localhost:8007/api/speech/?id=${this.props.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': this.props.token
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
    await itemClassLoad();
  }

  componentWillReceiveProps(nextProps) {
    // console.log(`"second" ${nextProps.speech.title}`);
    // console.log(nextProps.speech);
    // console.log(`"this.props: " ${JSON.stringify(this.props)}`);
    this.setState({
      editSpeakerID: nextProps.speech.id,
      editSpeaker: nextProps.speech.speaker,
      editSpeakerImg: nextProps.speech.speaker_img,
      editTitle: nextProps.speech.title,
      editMessage: nextProps.speech.message,
      editDate: nextProps.speech.speech_date,
      editClass: nextProps.speech.class,
      editClassImg: nextProps.speech.class_img,
      editUrl: nextProps.speech.link
    });
  }

  render() {
    const { speech, index, classItem } = this.props;
    // 判斷link是否為空值，若為空值則不顯示link icon.
    const linkArea = () => {
      const link = speech.link;
      // console.log(link);

      if (link !== '') {
        return <td><a href={link} target="_new"><i className="fa fa-link" aria-hidden="true" />{''}</a></td>;
      }
      return <td />;
    };

    // 將分類資料全部藉由class api所取得的資料來匯入option
    const classResult = classItem.map((classData, classIndex) => (
      <option value={classData.name} key={classIndex}>{classData.name}</option>
    ));

    // 判斷api id與query id是否相符合
    const checkID = () => {
      const apiID = this.props.speech.id;
      const queryID = this.props.id;
      // console.log(`apiID: ${apiID}`);
      // console.log(`queryID: ${queryID}`);
      if (queryID === apiID) {
        return false;
      }
      return true;
    };
    return (
      <tbody>
        <tr>
          <th scope="row">{index}</th>
          <td><img src={speech.class_img} alt="" height="25" width="25" title={speech.class} /></td>
          <td>{speech.speech_date}</td>
          <td>{speech.title}</td>
          <td><img className="circle" src={speech.speaker_img} alt="" height="25" width="25" title={speech.speaker} /></td>
          {linkArea()}
          <td>
            <Button className="edit-button" disabled={checkID()} onClick={this.updateToggle}><i className="fa fa-pencil" aria-hidden="true" /></Button>
            <Modal className="modal-space" isOpen={this.state.updateModal} toggle={this.updateToggle}>
              <ModalHeader toggle={this.updateToggle}>修改活動內容</ModalHeader>
              <ModalBody>
                <Form onSubmit={this.handleSubmit}>
                  <FormGroup>
                    <Label for="speechDatetime">演講時間</Label>
                    <Input type="date" name="editDate" id="datetime" placeholder="datetime" onChange={this.handleChangeValue} value={this.state.editDate} />
                  </FormGroup>
                  <FormGroup>
                    <Label for="speechTitle">演講主題</Label>
                    <Input type="title" name="editTitle" id="title" placeholder="title" onChange={this.handleChangeValue} value={this.state.editTitle} />
                  </FormGroup>
                  <FormGroup>
                    <Label for="exampleSelect">主題分類</Label>
                    <Input type="select" name="editClass" id="exampleSelect" onChange={this.handleChangeValue} value={this.state.editClass}>
                      {classResult}
                    </Input>
                  </FormGroup>
                  {/* <FormGroup>
                    <Label for="speechName">講者</Label>
                    <Input type="name" name="editSpeaker" id="name" placeholder="name" onChange={this.handleChangeValue} value={this.state.editSpeaker} />
                  </FormGroup> */}
                  <FormGroup>
                    <Label for="speechContent">演講內容</Label>
                    <Input type="textarea" name="editMessage" id="text" onChange={this.handleChangeValue} value={this.state.editMessage} />
                  </FormGroup>
                  <FormGroup>
                    <Label for="speechUrl">相關連結</Label>
                    <Input type="url" name="editUrl" id="URL" placeholder="URL" onChange={this.handleChangeValue} value={this.state.editUrl} />
                  </FormGroup>
                  <Button color="primary">修改</Button>{' '}
                  <Button color="secondary" onClick={this.updateToggle}>取消</Button>
                </Form>
              </ModalBody>
            </Modal>
            {' '}
            <Button className="delete-button" disabled={checkID()} onClick={this.deleteToggle}><i className="fa fa-times" aria-hidden="true" /></Button>
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
