import * as service from '../service/session';

import {message} from 'antd';
export default {
  namespace: 'session',
  state: {
    data: [],
    total: 0,
    current: 0,
    size:20,
    selectedRowKeys:[],
    keyword:null

  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === '/sys/session') {
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
    *remove({ payload: {token} }, { call, put, select }) {
      console.log(token)
      const data = yield call(service.remove, token);
      yield put({ type: 'app/result',payload:{data, namespace:'session'} });
    },
    *update({ payload:params, callback }, { call, put }) {
      callback(yield call(service.update, params));
    },
    *create({payload:params, callback}, { call, put }) {
      callback(yield call(service.create, params));
    },
    *reload(action, { put, select }) {
      const current = yield select(state => state.session.current);
      yield put({ type: 'fetch', payload: { current } });
    }

  }
};
