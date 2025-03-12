const { text } = require('body-parser');
const mongoose = require('mongoose');


// 连接 MongoDB 数据库
// mongoose.connect('mongodb+srv://2660023684:151416@medicalitems.5hia4.mongodb.net/MyProjects')
//   .then(() => {
//     console.log('连接成功');
//   })
//   .catch(() => {
//     console.log('连接失败');
//   });
  
// JXH
mongoose.connect('mongodb://127.0.0.1/2025666').then(rep => {
  console.log('连接成功2');
}).catch(err => {
  console.log('连接失败2');
})



// // 隐患类型模式
// const TypeSchema = new mongoose.Schema({
//   text: String,
//   value:String,
// });

// // 隐患类型模型
// const TypeModel = mongoose.model('Type', TypeSchema, 'type');

// // 上报隐患模式
// const HiddenTroubleSchema = new mongoose.Schema({
//   // 隐患信息
//   detail: String,
//   // 照片或视频
//   PhotosOrVideos: String,
//   // 隐患地点
//   place: String,
//   // 是否处理
//   dispose: {
//     type: Boolean,
//     default: false
//   },
//   // 隐患类型
//   type: {
//     type: mongoose.Types.ObjectId,
//     ref: 'Type' // 引用 Type 模型
//   }
// });


// // 上报隐患模型
// const HiddenTroubleModel = mongoose.model('HiddenTrouble', HiddenTroubleSchema, 'hidden');

// JXH
const Jbaschema = new mongoose.Schema({
    name: String,
    id:Number
})
const JbaseModel = mongoose.model('Jbase', Jbaschema)

const Jpatrol = new mongoose.Schema({
    time: String,
    status:{
        type: Boolean,
        default: true
    },
    summary:String,
    imgUrl:{
        type:Array,
        default:[] 
    },
    id:{
        ref: 'Jbase',
        type: mongoose.Schema.Types.ObjectId
    }
})
const JpatrolModel = mongoose.model('Jpatrol', Jpatrol)




module.exports = {
  // HiddenTroubleModel,
  // TypeModel,
  JbaseModel,JpatrolModel
};
