const mongoose = require('mongoose')

//此处应为共享仓库  还没整
mongoose.connect('mongodb+srv://qiusheng:Rosedale1314@public-project.avgf0.mongodb.net/project').then(() => {
    console.log('over!');
}).catch(err => {
    console.log('out');
})







module.exports = {

}

