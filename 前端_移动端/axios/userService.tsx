import instance from "./axios";

// 定义接口类型
interface User {
    id: number,
    name: string,
    // 隐患信息
    detail: string,
    // 照片或视频
    PhotosOrVideos: string,
    // 隐患地点
    place: string,
    // 是否处理
    dispose:Boolean,
    // 上报时间
    time:Date,
    // 隐患状态
    type:string,
    state:string,
}
interface Login{
    userName: string,
    password: string,
    school: string,
    imgs: string,
}
interface Type {
    text: string,
    value: string,
}

// 获取上报隐患数据
const hiddenUsers = async (): Promise<User[]> => {
    try {
        const response = await instance.get('/YZY/hidden');
        return response.data;
    } catch (error) {
        console.error("获取隐患数据失败", error);
        throw new Error;
    }
}
// 获取登陆数据
const login = async(): Promise<Login[]>=>{
    try {
        const loginData = await instance.get('/YZY/login');
        return loginData.data;
    } catch (error){
        console.error("获取登录数据失败",error);
        throw error;
    }
}
// 隐患类型接口 
const getType = async():Promise<Type[]>=>{
    try {
      const resZuo = await instance.get('/YZY/type')
      return resZuo.data;
    }catch (error){
      console.error("获取隐患类型数据失败",error);
      throw error
    }
  }

export default {
    hiddenUsers,
    login,
    getType,

}

