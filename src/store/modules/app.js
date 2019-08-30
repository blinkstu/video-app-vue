import {get} from '@/utils/api';

const state = {
  baseUrl: process.env == 'development'?'http://192.168.100.10/':'http://test.dongpingago.com/',
  userInfo: null
};

const mutations = {
  SET_USER_INFO: (state, data) => {
    state.userInfo = data;
  }
};

const actions = {
  getUserInfo: ({state, commit}) => {
    return new Promise(async function(resolve,reject){
      var token = localStorage.getItem('token');
      var result = await get('/video/user/user_info')
      if(result){
        commit('SET_USER_INFO', result.data);
        resolve(true)
      } else {
        resolve(false)
      }
    })

  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
