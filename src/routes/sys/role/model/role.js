import * as service from '../service/role';

import {message} from 'antd';
export default {
  namespace: 'role',
  state: {
    data: [],
    total: 0,
    current: 0,
    size:20,
    selectedRowKeys:[],
    keyword:null,

    colsData:[],
    treeData:[],
    authData:[],
    treePid:1,
    roleId:0

  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === '/sys/role') {
          dispatch({ type: 'fetch', payload: {current:1, size:20, ...query}});
        }
      });
    },
  },
  reducers: {
    fetchSuccess(state, { payload: { data, total, current, keyword } }) {
      return { ...state, data, total, current, selectedRowKeys:[], keyword };
    },
    initKeyword(state, { payload }) {
      return {...state, keyword:payload};
    },
    onChangeSelectedRowKeys(state, {payload}) {
      return {...state, selectedRowKeys:payload};
    },
    fetchAuthSuccess(state, {payload}) {
      return {...state, ...payload}
    }
  },
  effects: {
    *fetch({ payload }, { call, put, select }) {
      yield put({type:'initKeyword', payload:payload.keyword});
      const data = yield call(service.fetch, payload);
      if(data) {
        const {total, current} = data;
        yield put({
          type: 'fetchSuccess',
          payload: {data:data.data, total, current, keyword: payload.keyword
          }
        });
      }
    },
    *remove({ payload }, { call, put, select }) {
      let data;
      if(payload instanceof Array) {
        const size = payload.length;
        for(let i = 0; i < size; i++) {
          data = yield call(service.remove, payload[i]);
          if(data) {
            message.success( `第${i+1}条删除成功`);
          }
        }
      } else {
        data = yield call(service.remove, payload.id);
      }
      yield put({ type: 'app/result',payload:{data, namespace:'role'} });
    },
    *update({ payload:params, callback }, { call, put }) {
      callback(yield call(service.update, params));
    },
    *create({payload:params, callback}, { call, put }) {
      callback(yield call(service.create, params));
    },
    *fetchAuth({ payload, callback }, { call, put, select}) {
      const resource = yield call(service.fetchResources);//获取资源
      const columns = yield call(service.fetchColumns);//获取权限表头
      if(resource && columns) {
        yield put({
          type: 'fetchAuthList',
          payload: {...payload, treeData:resource, colsData:columns},
          callback
        });
      }
    },
    *fetchAuthList({payload, callback}, {call, put}) {
      const {roleId, pid, treeData, colsData} = payload;
      const data = yield call(service.queryAuth, {roleId, pid});
      if(data) {
        const authData = data.data;
        if(treeData && colsData) {
          callback(treeData, colsData, authData);
        } else {
          callback(authData);
        }
      }
    },
    *doAuth({ payload, callback }, { call, put }) {
      callback(yield call(service.doAuth, payload));
    },
    *reload(action, { put, select }) {
      const current = yield select(state => state.role.current);
      yield put({ type: 'fetch', payload: { current } });
    }

  }
};
