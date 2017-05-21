import React, {PropTypes} from 'react';
import {connect} from 'dva';
import List from './component/List';

import styles from './Log.css';

const Log = ({location, dispatch, children, log, loading}) => {

  const namespace = 'log';
  console.log(log);
  const listProps = {
    ...log,
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
    loading: state.loading.models.log,
    log:state.log
  };
}

export default connect(mapStateToProps)(Log);
