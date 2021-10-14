import axios from 'axios'
import Qs from 'qs'
import { Loading, Message } from 'element-ui'
import { url } from '../api'

axios.defaults.retry = 0; //请求失败后重试次数
axios.defaults.withCredentials = false  //false  不跨域  true 跨域
// axios.defaults.headers.common['token'] = localStorage.getItem('token')

// 加载条，可更改为其他样式
let loading

function startLoading() {
    loading = Loading.service({
        lock: true,
        text: "加载中",
        background: "rgba(0,0,0,0.3)"
    })
}

function endLoading() {
    loading.close()
}

export default function({path, method = "GET", params = "", headerType = "json"}) {
    let baseURL = process.env.BASE_URL, data = {}
    //post请求
    if (method === 'post' || method === 'POST') {
        if (headerType === "json") {
            axios.defaults.headers["Content-Type"] = 'application/json;charset=UTF-8'
            data = params
        } else {
            axios.defaults.headers["Content-Type"] = 'application/x-www-form-urlencoded;charset=UTF-8'
            data = Qs.stringify(params)
        }
    }

    //get请求
    if (method === 'get' || method === 'GET') {
        if (headerType == !'json') {
            axios.defaults.headers["Content-Type"] = 'application/x-www-form-urlencoded;charset=UTF-8'
        }
        data = Qs.stringify(params)
        path = path + '?' + data
        data = {}
    }
    
    //其他类型请求自己添加
    
    // 请求拦截
    axios.interceptors.request.use(config => {
        let token = localStorage.getItem('token')
        if (token) {
          config.headers.Authorization = token   
        }else if(config.url === url.signin || config.url === url.signup) {
            config.headers.Authorization = ""
        }else{
            console.log("axios返回首页")
        }
        startLoading()
        return config;
       }, error => {
          return Promise.reject(error)
       });

    //响应拦截
    axios.interceptors.response.use(response => {
        endLoading()
        // if (response.headers.token) {
        //     localStorage.setStorage('token', response.headers.token)
        // }
        if (response.data.resultCode == 400) {  //状态码是根据后台设置
            console.log("登录失败")
        }
        return response
    }, error => {
        console.log(error.response.data)
        Message.error(error.response.data.resultMsg)
        endLoading()
        if (error.response.status === 500) {    //状态码是根据http错误
            console.log("error: 500")
          }
        if (error.response.status === 400) {    //状态码是根据http错误
            console.log("error: 400")
        }
        return Promise.resolve(error)
    })

       //发送请求
      return new Promise((resolve,reject)=>{
         axios({
            baseURL,
            method,
            url: path,
            data:params,
            timeout:10000,
            }).then(result=>{
                resolve(result.data)
            }).catch(err=>{
                reject(err)
            })
         })
}