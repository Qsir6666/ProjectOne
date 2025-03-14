var express = require('express');
var router = express.Router();
const {  JbaseModel,JpatrolModel  } = require('../db/index')

async function bnm() {
  let op = {}
  op.time = '2022-02-02'
  op.status = true
  op.summary = '正常'
  op.imgUrl = ['https://ts1.tc.mm.bing.net/th/id/R-C.b8dd91dda9505cebf965a01b3101c558?rik=UGjiqSOKUqxH9g&riu=http%3a%2f%2fwww.kmsdba.com%2fdata%2fimages%2fproduct%2fthumb_20180330092342_346.jpg&ehk=WE0D13m8tQ3264YzAkka8EWN9RRwDUphWDnrxuUOeUE%3d&risl=&pid=ImgRaw&r=0','https://ts1.tc.mm.bing.net/th/id/R-C.dbf83fef9753a1d5e153f37bbcd3d79e?rik=h%2bpgTkDL%2fGMaow&riu=http%3a%2f%2fwww.jbbaoan.com%2fuserfiles%2f3(10).jpg&ehk=RNYPFtnPtnSX0ysMsVfhQLx9p1RnP4Ttf4g8KyOUejo%3d&risl=&pid=ImgRaw&r=0','https://www.hfuu.edu.cn/_upload/article/images/a2/14/ea054e6b44fabd2e4f16e831b392/e042dbd8-b1c4-4797-847f-3fc8322657e3.jpg']
  op.id = '67ce879a21c82bf48b45db0d'
  await JpatrolModel.create(op)
  let data = await JpatrolModel.find()
  console.log(data)
}
// bnm()


async function vbnm() {
  let op = {}
  op.name = "张三"
  op.id = 1
  await JbaseModel.create(op)
  let data = await JbaseModel.find()
  console.log(data)
}
// vbnm()

router.get('/list' ,async (req,res) => {
  let data = await JpatrolModel.find()
  res.send({
    code: 200,
    data: data
  })
})




/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
