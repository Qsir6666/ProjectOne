const mongoose = require('mongoose')

//此处应为共享仓库  还没整
// mongoose.connect('mongodb+srv://qiusheng:Rosedale1314@public-project.avgf0.mongodb.net/project').then(() => {
//     console.log('over!');
// }).catch(err => {
//     console.log('out');
// })


mongoose.connect('mongodb://127.0.0.1:27017/zg6_practice').then(() => {
    console.log('连接成功');
}).catch(() => {
    console.log('连接失败');
})

//班级信息列表 
const classSchema = new mongoose.Schema({
    teacherName: String,  //班主任姓名
    class: String, //表示几年级（1~6）
    grade: String, //表示哪个班（1~3）
    phone: String  //教师联系方式
})
const classModel = mongoose.model('class', classSchema, 'class')

// 学生信息列表
const stuedentSchema = new mongoose.Schema({
    name: String,   //学生姓名 
    classid: { type: mongoose.Types.ObjectId, ref: 'class' }, //绑定班级外键
    attendance: [{
        date: Number,   // 直接存 Date.now()
        cate: { type: String, enum: ['1','2','3','4'] }
      }]
})
const studentModel = mongoose.model('student', stuedentSchema)

module.exports = {
    classModel,
    studentModel,
}

