import React, { PropTypes } from 'react';
import { Menu, Icon, Modal, Select, Dropdown} from 'antd';
import { Link } from 'dva/router';
import styles from './Header.css';

import InfoModal from '../ui/InfoModal';

const Option = Select.Option;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

function Header({ location,dispatch, user }) {
  function logout() {
    Modal.confirm({
      title: '确定退出吗？',
      onOk() {
        dispatch({
          type:'app/logout'
        });
      },
      okText: '确定',
      cancelText: '取消',
    });
  }

  function checkInfo() {

  }

  const menu = (
    <Menu>
      <Menu.Item key="0">
        <InfoModal user={user}>
          <span><Icon type="book" onClick={checkInfo}/> 个人信息</span>
        </InfoModal>
      </Menu.Item>
      <Menu.Item key="1">
        <span onClick={logout}><Icon type="logout" /> 安全退出</span>
      </Menu.Item>
    </Menu>
  );

  return (
    <div className={styles.normal}>
      <div className={styles.leaft}>
        <a className={styles.logo}>LOOZB 后台管理系统</a>
        <a className={styles.item}>数据控制台</a>
      </div>
      <div className={styles.right}>
          <InfoModal user={user}>
            <img src={user.avatar} style={{height:'30px', width: '30px',marginTop:'10px', borderRadius:'50%', cursor:'pointer'}}/>
          </InfoModal>
          <Dropdown overlay={menu} trigger={['click']}>
            <a className="ant-dropdown-link" href="#">
              {user.username} <Icon type="down" />
            </a>
          </Dropdown>
      </div>
    </div>
  );
}

Header.propTypes = {
  location: PropTypes.object,
};

export default Header;
