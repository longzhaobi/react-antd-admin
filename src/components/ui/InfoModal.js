import React, { Component } from 'react';
import { Modal, Card, Row, Col } from 'antd';

import styles from './InfoModal.css';

class InfoModal extends Component {

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      user:{}
    };
  }


  showModelHandler = (e) => {
    if (e) e.stopPropagation();
    const { user } = this.props;
    this.setState({
      visible: true,
      user
    });
  };

  hideModelHandler = () => {
    this.setState({
      visible: false,
      user:{}
    });
  };

  okHandler = () => {

  };

  render() {
    const { children, user } = this.props;
    console.log(styles)
    return (
      <span>
        <span onClick={this.showModelHandler}>
          { children }
        </span>
        <Modal
          visible={this.state.visible}
          width={360}
          footer={null}
          onOk={this.okHandler}
          onCancel={this.hideModelHandler} 
          className="info-modal"
        >
          <Card style={{ width: 360 }} bodyStyle={{ padding: 0 }}>
            <div className="custom-image">
              <img alt="example" width="100%" height="360px" src={user.avatar} />
            </div>
            <div style={{width:'100%',textAlign:'center',height:40}}>
              <h2 style={{margin:'0 auto'}}>{user.username}</h2>
            </div>
            <div className={styles.customCard}>
              <Row>
                <Col span={12} push={8} style={{height:30}}>邮箱</Col>
                <Col span={12} pull={2} style={{height:30}}>{user.email}</Col>
                <Col span={12} push={8} style={{height:30}}>手机</Col>
                <Col span={12} pull={2} style={{height:30}}>{user.phone}</Col>
                <Col span={12} push={8} style={{height:30}}>职业</Col>
                <Col span={12} pull={2} style={{height:30}}>{user.job}</Col>
                <Col span={12} push={8} style={{height:30}}>性别</Col>
                <Col span={12} pull={2} style={{height:30}}>{user.gender == '1' ? '男':'女'}</Col>
                <Col span={12} push={8} style={{height:30}}>生日</Col>
                <Col span={12} pull={2} style={{height:30}}>{user.birthday}</Col>
              </Row>
            </div>
          </Card>
        </Modal>
      </span>
    );
  }
}

export default InfoModal;
