import { config } from "antd-mobile/es/components/toast/methods";
import axios,{AxiosInstance,AxiosResponse} from "axios";

// 创建axios实例
const instance:AxiosInstance = axios.create({
    baseURL:'http://127.0.0.1:3000',
    timeout:10000,

})

// 请求拦截器
instance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token){
            config.headers = config.headers || {};
            config.headers.Authorization = `Bearer${token}`;

        }
        return config;   
    },
    (error)=>{
        return Promise.reject(error);

    }
)

// 响应拦截器
instance.interceptors.response.use(
    (Response:AxiosResponse)=>{
        return Response.data;
    },
    (error)=>{
        if(error.response){
            switch (error.response.status) {
                case 401:
                  console.error('未授权，请重新登录');
                  break;
                case 404:
                  console.error('请求的资源不存在');
                  break;
                case 500:
                  console.error('服务器内部错误');
                  break;
                default:
                  console.error('请求失败', error.message);
                    
            }
        }
        return Promise.reject(error)
    }
);
export default instance;

 
