const mongoose = require('mongoose');

// 连接 MongoDB 数据库
mongoose.connect('mongodb://127.0.0.1:27017/MyProjects')
  .then(() => {
    console.log('连接成功');
  })
  .catch(() => {
    console.log('连接失败');
  });

// 隐患类型模式
const TypeSchema = new mongoose.Schema({
  type: String
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
  // 隐患类型
  type: {
    type: mongoose.Types.ObjectId,
    ref: 'Type' // 引用 Type 模型
  }
});

// 上报隐患模型
const HiddenTroubleModel = mongoose.model('HiddenTrouble', HiddenTroubleSchema, 'hidden');

module.exports = {
  HiddenTroubleModel,
  TypeModel
};