const mongoose = require('mongoose');


// 连接 MongoDB 数据库
mongoose.connect('mongodb+srv://2660023684:151416@medicalitems.5hia4.mongodb.net/MyProjects')
  .then(() => {
    console.log('连接成功');
  })
  .catch(() => {
    console.log('连接失败');
  });

// 登录表
const loginSchema = new mongoose.Schema({
  userName: String,
  password: String,
  school: String,
  imgs: String,
})
const loginModel = mongoose.model('login', loginSchema, 'login')


// 隐患类型模式
const TypeSchema = new mongoose.Schema({
  text: String,
  value: String,
});

// 隐患类型模型
const TypeModel = mongoose.model('Type', TypeSchema, 'type');

// 上报隐患模式
const HiddenTroubleSchema = new mongoose.Schema({
  // 隐患信息
  detail: String,
  // 照片或视频
  PhotosOrVideos: String,
  // 隐患地点
  place: String,
  // 是否处理
  dispose: {
    type: Boolean,
    default: false
  },
  // 上报时间
  time:{  
    type:Date,
  },
  // 隐患状态
  state:{
    type:String,
    enum:['1','2','3','4'],//1待审核，2处理中，3已完成，4我的
    default:1
  },
  // 隐患类型
  type: {
    type: mongoose.Types.ObjectId,
    ref: 'Type' // 引用 Type 模型
  },

  // 提交人信息
  userName: {
    type: mongoose.Types.ObjectId,
    ref: 'login',
  },
  // 派指维修人姓名
  repai:String,
  // 处理期限
  date:String,
  // 抄送人
  peple:String,
  // 
});

// 上报隐患模型
const HiddenTroubleModel = mongoose.model('HiddenTrouble', HiddenTroubleSchema, 'hidden');

// // JXH
// const Jbaschema = new mongoose.Schema({
//     name: String,
//     id:Number
// })
// const JbaseModel = mongoose.model('Jbase', Jbaschema)

// const Jpatrol = new mongoose.Schema({
//     time: String,
//     status:{
//         type: Boolean,
//         default: true
//     },
//     summary:String,
//     imgUrl:{
//         type:Array,
//         default:[] 
//     },
//     id:{
//         ref: 'Jbase',
//         type: mongoose.Schema.Types.ObjectId
//     }
// })
// const JpatrolModel = mongoose.model('Jpatrol', Jpatrol)




module.exports = {
  HiddenTroubleModel,
  TypeModel,
  loginModel,
  // JbaseModel,JpatrolModel,
};
