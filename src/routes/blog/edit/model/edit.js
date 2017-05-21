import * as service from '../service/edit';

export default {
  namespace: 'edit',
  state: {
    article:{}
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === '/blog/edit') {
          dispatch({ type: 'fetch', payload: query.id});
        }
      });
    },
  },
  reducers: {
    fetchSuccess(state, { payload: { data} }) {
      return { ...state, article:data};
    },
    initEdit(state, {payload}) {
      return {...state, article:{}}
    }
  },
  effects: {
    *fetch({payload}, { call, put }) {
      const data = yield call(service.fetch, payload);
      if(data) {
        yield put({
          type: 'fetchSuccess',
          payload: {data:data.data}
        });
      }
    },
    *create({payload:params, callback}, { call, put }) {
      callback(yield call(service.create, params));
    },
    *update({payload:params, callback}, { call, put }) {
      callback(yield call(service.update, params));
    },
    *fetchClassifications({ payload, callback }, { call, put, select}) {
      callback(yield call(service.fetchClassifications));
    }
  }
}
