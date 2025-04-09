const express = require('express');
const router = express.Router();
const { HiddenTroubleModel } = require('../db');
const mongoose = require('mongoose');

// 验证MongoDB ID是否有效
const isValidMongoId = (id) => mongoose.Types.ObjectId.isValid(id);

// 获取隐患列表
router.get('/hidden-trouble', async (req, res) => {
  try {
    const { state } = req.query;
    const query = state ? { state: state.toString() } : {};

    console.log('获取隐患列表:', query);

    const troubles = await HiddenTroubleModel.find(query)
      .sort({ time: -1 }) // 按时间倒序
      .populate('type') // 关联隐患类型
      .exec();

    console.log(`找到 ${troubles.length} 条记录`);
    res.json({ 
      success: true, 
      message: '获取成功', 
      data: troubles 
    });
  } catch (error) {
    console.error('获取隐患列表失败:', error);
    res.status(500).json({ 
      success: false, 
      message: '服务器错误，获取失败',
      error: error.message 
    });
  }
});

// 更新隐患状态和处理信息
router.put('/hidden-trouble/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    // 验证ID格式
    if (!id || !isValidMongoId(id)) {
      return res.status(400).json({ 
        success: false, 
        message: '无效的隐患ID格式' 
      });
    }

    const {
      hazardConfirmation,
      responsiblePerson,
      deadline,
      ccPerson,
      handleSuggestion,
      state
    } = req.body;

    // 构建更新数据
    const updateData = {
      state,
      repai: responsiblePerson,
      date: deadline,
      peple: ccPerson,
    };

    console.log('更新隐患信息:', {
      id,
      updateData
    });

    // 使用 mongoose 的 findByIdAndUpdate 方法
    const result = await HiddenTroubleModel.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!result) {
      console.log('未找到隐患记录:', id);
      return res.status(404).json({ 
        success: false, 
        message: '未找到该隐患记录' 
      });
    }

    console.log('更新成功:', result);
    res.json({ 
      success: true, 
      message: '更新成功', 
      data: result 
    });
  } catch (error) {
    console.error('更新隐患信息失败:', error);
    res.status(500).json({ 
      success: false, 
      message: '服务器错误，更新失败',
      error: error.message 
    });
  }
});

// 删除隐患
router.delete('/hidden-trouble/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    // 验证ID格式
    if (!id || !isValidMongoId(id)) {
      return res.status(400).json({ 
        success: false, 
        message: '无效的隐患ID格式' 
      });
    }

    console.log('尝试删除隐患:', id);

    const result = await HiddenTroubleModel.findByIdAndDelete(id);

    if (!result) {
      console.log('未找到隐患记录:', id);
      return res.status(404).json({ 
        success: false, 
        message: '未找到该隐患记录' 
      });
    }

    console.log('删除成功:', result);
    res.json({ 
      success: true, 
      message: '删除成功' 
    });
  } catch (error) {
    console.error('删除隐患失败:', error);
    res.status(500).json({ 
      success: false, 
      message: '服务器错误，删除失败',
      error: error.message 
    });
  }
});

module.exports = router; 