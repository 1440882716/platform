import {request} from './index'
 interface loginData{
    username:string,
    password:string
 }
 interface npcDuties{
  uid:string,
  page:number,
  size:number
}
// 登录
export function login(data:loginData) {
    return request({
      url: '/auth/thirdLogin',//此处为自己请求地址
      method: 'POST',
      data: data
    })
}
// 获取代表的履职情况
export function duties(data:npcDuties) {
  return request({
    url: '/display_directory/performanceList',//此处为自己请求地址
    method: 'GET',
    params: data
  })
}