import React, { PropTypes } from 'react';
import { Menu, Icon, Modal} from 'antd';
import { Link } from 'dva/router';
import styles from './Header.css';
import { Select } from 'antd';
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
  return (
    <div className={styles.normal}>
      <div className={styles.leaft}>
        <a className={styles.logo}>LOOZB 后台管理系统</a>
        <a className={styles.item}>数据控制台</a>
      </div>
      <div className={styles.right}>
        <a onClick={logout} className={styles.logout}><Icon style={{marginTop:17}} type="user" />欢迎您-{user.username}</a>
      </div>
    </div>
  );
}

Header.propTypes = {
  location: PropTypes.object,
};

export default Header;
