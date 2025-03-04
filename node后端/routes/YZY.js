var express = require('express');
var router = express.Router();
const { HiddenTroubleModel,typeModel, } = require('../db/index')

// 上报隐患数据接口
router.get('/hidden',async (req,res)=>{

  let hiddenFind = await HiddenTroubleModel.find()
  console.log(hiddenFind);
  

  res.send({
    code:200,
    hiddenFind,
    
  })
})
// 上报隐患类型数据接口
router.get('/type',async (req,res)=>{

  let typeFind = await typeModel.find()
  console.log(typeFind);
  

  res.send({
    code:200,
    typeFind,

  })
})

module.exports = router;
