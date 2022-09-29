 
import axios from 'axios'
import { ElMessage  } from 'element-plus'
import router from "../router/index";
 
export  const request =(options:any)=> {
  return new Promise((resolve, reject) => {
 
    // create an axios instance
    const service = axios.create({
      // baseURL: process.env.BASE_API, // api 的 base_url
    //   baseURL: '/api',
      // baseURL:'http://192.168.1.116:9527/api/manager',
      baseURL:"https://www.khdpro1.top/api/manager",
      timeout: 6000, // request timeout
    })
 
    // request interceptor
    service.interceptors.request.use(
      (config:any) => {
        config.headers["Content-Type"] = "application/json";
        let tokenstr = localStorage.getItem("token") as string
        let token:string =tokenstr//此处换成自己获取回来的token，通常存在在cookie或者store里面
        if (token) {
          // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
        //   config.headers['X-Token'] = token
          config.headers.Authorization =  token   
        //   config.headers["Authorization"] =     
         }
        return config
      },
      error => {
        // Do something with request error
        console.log("出错啦", error) // for debug
        Promise.reject(error)
      }
    )
 
    // response interceptor
    service.interceptors.response.use(
       (response:any) => {
        return response.data
      },
      error => {
        console.log('err' + error) // for debug
        if(error.response.status == 403){
          ElMessage.error('错了')
        }else if(error.response.status == 401){
            router.replace("/");
            // ElMessage.error('服务器请求错误，请稍后再试')  
        }
        else{
          ElMessage.error('网络出问题啦，请检查网络设置')
        }
        return Promise.reject(error)
      }
    )
    // 请求处理
    service(options)
      .then((res) => {
        resolve(res)
      })
      .catch((error) => {
        reject(error)
      })
  })
}
 
 
export default request