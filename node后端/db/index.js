const mongoose = require('mongoose')

//此处应为共享仓库  还没整
// mongoose.connect('mongodb+srv://qiusheng:Rosedale1314@public-project.avgf0.mongodb.net/project').then(() => {
//     console.log('over!');
// }).catch(err => {
//     console.log('out');
// })

mongoose.connect('mongodb://127.0.0.1/2025666').then(rep => {
  console.log('连接成功2');
}).catch(err => {
  console.log('连接失败2');
})


































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



module.exports = { JbaseModel,JpatrolModel }
