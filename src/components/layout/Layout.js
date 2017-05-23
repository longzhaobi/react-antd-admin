import React, {PropTypes} from 'react';
import styles from './Layout.css';
import Header from './Header';
import classnames from 'classnames';
import Sidebar from './Sidebar';
import { Breadcrumb } from 'antd';
class Layout extends React.Component {
  constructor(props) {
    super(props);
  }
  componentWillMount() {
    //去后端请求获取用户信息
    this.props.props.dispatch({type:'app/current'})
  }
  render() {
    const {props, children} = this.props
    const {location, dispatch, app, routes} = props
    const {menuStyle, menu, user, online} = app;
    const cls = classnames({
      [styles.main]:true,
      [styles.min]:menuStyle === 'min',
      [styles.max]:menuStyle === 'max'
    });
    return (
      <div className={styles.normal}>
        <Header location={location} dispatch={dispatch} user = {user}/>
        <div className={styles.content}>
          <Sidebar location={location} dispatch = {dispatch} menuStyle={menuStyle} routes={routes} menu={menu} online={online}/>
          <div className={cls}>
          {children}
          </div>
        </div>
     </div>
    )
  }
}
export default Layout;
