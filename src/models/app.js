import {hashHistory, routerRedux} from 'dva/router';
import * as service from '../services/app';
import {message} from 'antd';
import cookie from 'js-cookie';
export default {
  namespace: 'app',
  state: {
    subMenu:[],
    menu:[],
    menuStyle:'max',
    user:{},
    permission:[],
    msg:null,

    //循环删除时，如果为true，则取消删除
    break:false
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        const path = pathname.split('/')[1];
        //从本地获取菜单信息
        dispatch({type:'getMenu',payload:{identity:path,isRoot:pathname === '/' + path}})
      });
    }
  },
  effects: {
    *login({ payload }, { put, select, call }) {
      const data = yield call(service.login, payload);
      if(data) {
        const o = data.data;
        //设置权限信息到本地
        localStorage.setItem('has_permissions', o.hasPermissions);
        //设置角色信息到本地
        localStorage.setItem('has_roles', o.hasRoles);
        //设置菜单信息到本地
        localStorage.setItem('has_menus', JSON.stringify(o.hasMenus));
        //设置用户信息到本地
        // localStorage.setItem('current_user', JSON.stringify(o.sysUser));
        //保存token
        // localStorage.setItem('access_token', o.token);
        // cookie.set('access_token', o.token, {expires: 7});
        yield put(routerRedux.push('/'));
      } else {
        message.error(data.msg ? data.msg : '登录失败！');
      }
    },
    *getMenu({payload}, {put, select, call}) {
      const menus = localStorage.getItem('has_menus');
      if(menus) {
        const hasMenus = JSON.parse(menus);
        const {identity} = payload;
        yield put({type:'queryMenuSuccess',payload:hasMenus});
        if(hasMenus && hasMenus.length > 0) {
          for (let menu of hasMenus) {
            if(menu.identity === identity) {
              const subMenu = menu.children;
              if(subMenu && subMenu.length > 0) {
                if(menu.identity === payload.identity) {
                  yield put({
                    type:'querySubMenuSuccess',
                    payload:subMenu.sort((a, b) => a.weight - b.weight)
                  });
                  if(payload.isRoot) {
                    if(subMenu[0].children.length > 0) {
                      //假如还有孩子
                      yield put(routerRedux.push(subMenu[0].children[0].url));
                    } else {
                      yield put(routerRedux.push(subMenu[0].url));
                    }
                  }
                }
              }
            }
          }
        }
      }
    },
    *result({ payload: {data, namespace}, onHander }, { put, select }) {
      if(data) {
        // message.success('操作成功！');
        if(typeof onHander === 'function') {
          onHander(data);
        } else {
          message.success('操作成功');
        }
        yield put({ type: `${namespace}/reload` });
      }
    },
    *logout({payload}, {put, select, call}) {
      const data = yield call(service.logout);
      yield put(routerRedux.push('/login'));
    },
    *current({payload}, {call,put}) {
      const data = yield call(service.current)
      if(data) {
        yield put({
          type: 'setCurrentUser',
          payload: data.data
        });
      }
    }
  },
  reducers: {
    queryMenuSuccess(state, action) {
      return {...state, menu:action.payload};
    },
    querySubMenuSuccess(state, action) {
      return {...state, subMenu:action.payload};
    },
    switchClick(state, action) {
      return {...state, menuStyle:action.payload}
    },
    changeMsg(state, action) {
      return {...state, msg:action.payload};
    },
    setCurrentUser(state, action) {
      return {...state, user: action.payload}
    }
  }
};
