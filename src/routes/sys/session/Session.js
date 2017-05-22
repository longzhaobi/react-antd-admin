import React, {PropTypes} from 'react';
import {connect} from 'dva';
import List from './component/List';

import styles from './Session.css';

const Session = ({location, dispatch, children, session, loading}) => {

  const namespace = 'session';
  const listProps = {
    ...session,
    dispatch,
    loading,
    namespace
  }

  return (
    <div className={styles.root}>
      <List {...listProps}/>
    </div>
  )
}

function mapStateToProps(state) {
  return {
    loading: state.loading.models.session,
    session:state.session
  };
}

export default connect(mapStateToProps)(Session);
