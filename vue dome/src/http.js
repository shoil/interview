import axios from 'axios'
import Vue from 'vue'

const http = axios.create({
    baseURL: 'http://localhost:3030/admin/api'
})
// 请求头中添加
http.interceptors.request.use(function (config) {
    // Do something before request is sent
    config.headers.Authorization = 'Bearer '+localStorage.token
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });
   
// 响应拦截
http.interceptors.response.use(res=>{
    return res
},err =>{
    window.console.log(err.name)
    window.console.log(err.response.data.message)
    // 当err.response.data.message 有内容再执行
    if(err.response.data.message){
        Vue.prototype.$message({
            type: 'error',
            message: err.response.data.message
        })
    
    }
   
    return Promise.reject(err)
})

export default http