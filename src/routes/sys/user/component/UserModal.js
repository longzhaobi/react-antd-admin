import React, { Component } from 'react';
import { Form, Input, Modal, Button, Radio, message, Checkbox, Icon, Row, Col, Upload} from 'antd';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
import styles from './UserList.css'

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const type = file.type
  if (!type === 'image/png' || !type === 'image/jpeg') {
    message.error('You can only upload JPG file!');
    return false
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isLt2M;
}

class UserModal extends Component {

  constructor(props) {
    super(props);
    this.dispatch = props.dispatch;
    this.state = {
      visible: false,
      imageUrl:null,
      avatar:null,
      uploading:false,
      uploadIcon: 'plus'
    };
  }

  handleChange = (info) => {
    const { response, status } = info.file;
    if (status === 'done') {
      getBase64(info.file.originFileObj, imageUrl => this.setState({ imageUrl }));
      let avatar = '';
      if(response.data.error == "0") {
        avatar = response.data.url;
      }
      this.setState({
        uploading: false,
        avatar
      });
    } else if ( status === 'uploading') {
      if(!this.state.uploading) {
        this.setState({
          uploading: true,
          uploadIcon: 'loading'
        });
      }
    }
  };

  showModelHandler = (e) => {
    this.props.form.resetFields();
    if (e) e.stopPropagation();
    const {record} = this.props;
    this.setState({
      visible: true,
      uploadIcon: 'plus',
      avatar: record.avatar
    });
  };

  hideModelHandler = () => {
    this.setState({
      visible: false,
    });
  };

  okHandler = () => {
    const { title, dispatch, namespace, option,record } = this.props;
    this.props.form.validateFields((err, params) => {
      if (!err) {
        Modal.confirm({
          title: `确定${title}吗？`,
          content: 'Bla bla ...',
          okText: '确定',
          cancelText: '取消',
          onOk:() => {
            const _self = this;
            dispatch({
              type: `${namespace}/${option}`,
              payload: {...params, id:record.id_, avatar: _self.state.avatar},
              callback(data) {
                dispatch({ type: 'app/result',payload:{data, namespace}, onHander() {
                  _self.hideModelHandler();
                } });
              }
            })
          }
        });
      }
    });
  };

  render() {
    const { children, title, loading, record } = this.props;
    const { getFieldDecorator } = this.props.form;
    const avatar = this.state.avatar
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };

    const status = loading || this.state.uploading;

    return (
      <span>
        <span onClick={this.showModelHandler}>
          { children }
        </span>
        <Modal
          title={title}
          visible={this.state.visible}
          width={900}
          onOk={this.okHandler}
          onCancel={this.hideModelHandler}
          footer={[
          <Button key="back" type="ghost" size="large" onClick={this.hideModelHandler}>取消</Button>,
          <Button key="submit" type="primary" size="large" disabled={loading} loading={loading} onClick={this.okHandler}>
            {status ? '处理中...' : '确定'}
          </Button>,
        ]}
        >
          <Form layout='horizontal' onSubmit={this.okHandler}>
            <Row gutter={16}>
              <Col sm={12}>
                <FormItem
                  {...formItemLayout}
                  label="用户名"
                >
                {getFieldDecorator('username', {
                  rules: [
                      { required: true, min: 5, message: '用户名不能小于5位' },
                      { max: 20, message: '用户名不能超过20位' },
                      // { validator: this.userExists },
                    ],
                    initialValue: record['username'] || ''
                  })(
                  <Input type="text" placeholder="请输入用户名" />
                )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label="性别"
                >
                  {getFieldDecorator('gender', { initialValue: record['gender'] || '1' })(
                    <RadioGroup>
                      <Radio value="1">男</Radio>
                      <Radio value="2">女</Radio>
                    </RadioGroup>
                  )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label="身份证号"
                >
                  {getFieldDecorator('idcard', {
                    rules: [
                      { max: 20, message: '身份证不能超过20位' },
                      // { validator: this.userExists },
                    ],
                    initialValue: record['idcard'] || ''
                  })(
                    <Input type="text" placeholder="请输入身份证号码" />
                  )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label="联系电话"
                >
                  {getFieldDecorator('phone', {
                    rules: [
                      { min: 5, message: '联系电话不能小于7位' },
                      { max: 20, message: '联系电话不能超过20位' },
                      // { validator: this.userExists },
                    ],
                    initialValue: record['phone'] || ''
                  })(
                    <Input type="text" placeholder="请输入联系电话" />
                  )}
                </FormItem>
              </Col>

              <Col sm={12}>
                <FormItem
                  {...formItemLayout}
                  label="密码"
                >
                  {getFieldDecorator('password', {
                    rules: [
                      { min: 5, message: '密码不能小于5位' },
                      { max: 32, message: '密码不能超过20位' },
                      // { validator: this.userExists },
                    ],
                    initialValue: record['password'] || ''
                  })(
                    <Input type="password" placeholder="请输入密码" />
                  )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label="邮箱"
                >
                  {getFieldDecorator('email', {
                    rules: [
                      { min: 5, message: '邮箱不能小于5位' },
                      { max: 20, message: '邮箱不能超过20位' },
                      // { validator: this.userExists },
                    ],
                    initialValue: record['email'] || ''
                  })(
                    <Input type="email" placeholder="请输入邮箱" />
                  )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label="工作职位"
                >
                  {getFieldDecorator('job', {
                    rules: [
                      { min: 2, message: '工作职位不能小于5位' },
                      { max: 20, message: '工作职位不能超过20位' },
                      // { validator: this.userExists },
                    ],
                    initialValue: record['job'] || ''
                  })(
                    <Input type="text" placeholder="请输入工作职位" />
                  )}
                </FormItem>

                <FormItem
                  {...formItemLayout}
                  label="用户头像"
                >
                  <Upload
                    className={styles.avatarUploader}
                    name="uploadFile"
                    showUploadList={false}
                    action="api/upload/images"
                    beforeUpload={beforeUpload}
                    onChange={this.handleChange}
                  >
                    {
                      avatar ?
                        <img src={avatar} alt="" className={styles.avatar} /> :
                        <Icon type={this.state.uploadIcon} className={styles.avatarUploaderTrigger} />
                    }
                  </Upload>
                </FormItem>

              </Col>
            </Row>
          </Form>
        </Modal>
      </span>
    );
  }
}

export default Form.create()(UserModal);
