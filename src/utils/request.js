/*
 * Created Date: Tuesday, May 28th 2019, 12:41:50 pm
 * Author: Jkssua
 * Author: blinkstu@gmail.com
 * -----
 * Last Modified: 2019-06-09 02:02:58
 * Modified By: Jkssua
 * -----
 * Copyright (c) 2019 Jkssua
 *
 * I'm sad
 * -----
 * HISTORY:
 * Date      	By	Comments
 * ----------	---	----------------------------------------------------------
 */

import axios from 'axios'
import App from '../app'
import qs from 'qs'
import { Toast } from 'vant';

if(process.env == 'development'){
  var url = 'http://192.168.100.10/api/' 
} else {
  var url = 'http://test.dongpingago.com/api/'
}

const service = axios.create({
  baseURL: url,
  withCredentials: false,
  timeout: 10000
})

service.interceptors.request.use(
  config => {
    if (config.method === 'post') {
      config.data = qs.stringify(config.data)
    }
    return config
  },
  error => {
    console.log(error)
    Promise.reject(error)
  }
)

// request interceptor
service.interceptors.request.use(
  config => {
    config.headers['XX-Token'] = localStorage.getItem("token");
    config.headers['XX-Device-Type'] = 'web';
    return config
  },
  error => {
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  res => {
    res = res.data;
    if (res.code == 0) {
      var request_toast = Toast(res.msg);
      return false
    } else {
      return res
    }
  },
  error => {
    console.log(error.message);
    var request_toast = Toast('网络异常');
    return false
  }
)

export default service
