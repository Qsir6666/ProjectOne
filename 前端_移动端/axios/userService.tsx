import { Router } from "react-router-dom";
import instance from "./axios";

// 定义接口类型
interface User{
    id:Number,
    name:String,
}


// 获取上报隐患数据
const hiddenUsers = async ():Promise<User[]> => {
    try {
        const response = await instance.get('/hidden',{
            params:{

            }
        });
        return response.data.data;
    }catch(error){
        console.error("获取隐患数据失败",error);
        throw error;
    }
}


export default {
    hiddenUsers,

}

