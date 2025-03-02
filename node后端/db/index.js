const mongoose = require('mongoose')

//此处应为共享仓库  还没整
mongoose.connect('mongodb://127.0.0.1:27017/       ').then(()=>{
    console.log('连接成功');
}).catch(()=>{
    console.log('连接失败');
})








module.exports = {
    
}

