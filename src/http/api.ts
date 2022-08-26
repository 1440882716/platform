import {request} from './index'
 interface loginData{
    username:string,
    password:string
 }
// 调用测试
export function login(data:loginData) {
    return request({
      url: '/auth/thirdLogin',//此处为自己请求地址
      method: 'POST'
    })
  }