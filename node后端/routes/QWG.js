var express = require('express');
var router = express.Router();
const { classModel, studentModel, attendanceModel } = require('../db/index')


// 通过不同的班级不同的日期，去获取不同的学生及学生状态
router.post('/getStudentsByClass', async (req, res) => {
  try {
    const { pickerValue, searchVal, dateStr } = req.body

    const [classValue, gradeValue] = pickerValue
    const classInfo = await classModel.findOne({
      class: classValue,
      grade: gradeValue
    })
    // 筛选出所选班级的所有学生
    const students = await studentModel.find({
      name: RegExp(searchVal),
      classid: classInfo._id
    }).lean()
    // 计算所选班级学生总人数
    const [total] = await Promise.all([
      studentModel.countDocuments({ classid: classInfo._id })
    ])

    // 对日期的处理
    const targetDate = new Date(dateStr);
    const start = new Date(targetDate).setUTCHours(0, 0, 0, 0);
    const end = new Date(targetDate).setUTCHours(23, 59, 59, 999);
    const processedStudents = students.map(student => {
      // 查找该日期范围内的最早记录（根据需求可改为最新记录）
      const matchedRecords = student.attendance.filter(
        a => a.date >= start && a.date <= end
      )
      return {
        _id: student._id,
        name: student.name,
        classid: student.classid,
        cate: matchedRecords.length ? matchedRecords[0].cate : ''  // 返回空字符串表示无记录
      }
    })

    // 处理是否当天已上传数据
    const hasSubmitted = processedStudents.length > 0 && processedStudents.every(s => s.cate !== '');

    res.send({
      code: 200,
      data: {
        classInfo: classInfo,
        students: processedStudents,
        total,
        hasSubmitted
      }
    })
  } catch (err) {
    res.status(500).send({ code: 500, msg: '服务器错误' })
  }
})

// 上传当天考勤数据
router.post('/sendKq', async (req, res) => {
  try {
    const { classId, dateStr, studentsData } = req.body
    // 参数校验
    if (!classId || !studentsData?.length) {
      return res.status(400).send({ code: 400, msg: '参数不完整' })
    }
    // 日期范围计算
    const targetDate = new Date(dateStr)
    const start = new Date(targetDate).setUTCHours(0, 0, 0, 0)
    const end = new Date(targetDate).setUTCHours(23, 59, 59, 999)
    // 批量更新操作
    const bulkOps = studentsData.map(student => ({
      updateOne: {
        filter: { _id: student._id }, // 仅通过ID匹配
        update: {
          // 分两步操作避免冲突
          $pull: { attendance: { date: { $gte: start, $lte: end } } },
        }
      }
    }))
    // 先删除旧记录
    await studentModel.bulkWrite(bulkOps)
    // 添加新记录
    const insertOps = studentsData.map(student => ({
      updateOne: {
        filter: { _id: student._id },
        update: {
          $push: {
            attendance: {
              date: Date.now(), // 按需求使用当前时间戳
              cate: student.attendance[0].cate
            }
          }
        }
      }
    }))

    // 执行批量操作
    console.log(bulkOps, '123123123');
    const result = await studentModel.bulkWrite(insertOps)
    console.log(result);

    res.send({
      code: 200,
      data: {
        insertedCount: result.upsertedCount,
        modifiedCount: result.modifiedCount
      }
    })
  } catch (err) {
    console.error('[考勤提交错误]', err)
    res.status(500).send({
      code: 500,
      msg: err.message || '考勤数据保存失败'
    })
  }
})

// 在路由文件中新增
router.post('/getStatsData', async (req, res) => {
  try {
    const { dateStr, mode } = req.body
    // console.log('[原始时间参数]', dateStr)
    // 基础UTC时间处理（保持最原始的时间计算）
    const targetDate = new Date(dateStr)
    const getTimeRange = () => {
      if (mode === 'day') {
        // 当日UTC时间范围（直接使用传入时间的年月日）
        const start = Date.UTC(
          targetDate.getUTCFullYear(),
          targetDate.getUTCMonth(),
          targetDate.getUTCDate(),
          0, 0, 0
        )
        const end = Date.UTC(
          targetDate.getUTCFullYear(),
          targetDate.getUTCMonth(),
          targetDate.getUTCDate(),
          23, 59, 999
        )
        return { $gte: start, $lte: end }
      } else {
        // 当月UTC时间范围（不涉及本地时间转换）
        const start = Date.UTC(
          targetDate.getUTCFullYear(),
          targetDate.getUTCMonth(),
          1
        )
        const end = Date.UTC(
          targetDate.getUTCFullYear(),
          targetDate.getUTCMonth() + 1, // 下个月第0天即上个月最后一天
          0, // 最后一天
          23, 59, 999
        )
        return { $gte: start, $lte: end }
      }
    }
    // 构建查询条件（保持最基础的文档结构）
    const timeCondition = {
      "attendance.date": getTimeRange()
    }
    // 优化日志输出用于调试
    // console.log('[时间过滤条件]', JSON.stringify(timeCondition, null, 2))
    // 保持最基础的聚合查询
    const [totalStudents, categories] = await Promise.all([
      studentModel.countDocuments({}),
      studentModel.aggregate([
        { $unwind: "$attendance" },
        { $match: timeCondition },
        {
          $group: {
            _id: "$attendance.cate",
            count: { $sum: 1 }
          }
        },
        { $project: { _id: 0, cate: "$_id", count: 1 } }
      ])
    ])
    // 构建结果（保持原有结构）
    const result = {
      total: totalStudents,
      attendance: ['1', '2', '3', '4'].reduce((acc, cate) => {
        acc[`cate${cate}`] = categories.find(i => i.cate === cate)?.count || 0
        return acc
      }, {})
    }
    // console.log('[最终统计结果]', result)
    res.send({ code: 200, data: result })
  } catch (err) {
    console.error('[统计错误]', err)
    res.status(500).send({ code: 500, msg: '统计失败' })
  }
})


// 后端接口修改
router.post('/getMsgByDate', async (req, res) => {
  try {
    const { date } = req.body;

    // 获取所有班级（需确保数据库有班级数据）
    const classes = await classModel.find().lean();

    const result = await Promise.all(classes.map(async cls => {
      // 当天时间范围
      const start = new Date(date).setHours(0, 0, 0, 0);
      const end = new Date(date).setHours(23, 59, 59, 999);

      // 获取班级总人数（需要确保classid索引）
      const total = await studentModel.countDocuments({ classid: cls._id });

      // 使用聚合管道优化查询
      const attendanceStats = await studentModel.aggregate([
        { $match: { classid: cls._id } },
        { $unwind: "$attendance" },
        {
          $match: {
            "attendance.date": { $gte: start, $lte: end },
            "attendance.cate": { $in: ["2", "3", "4"] } // 只统计需要特殊处理的项目
          }
        },
        {
          $group: {
            _id: "$attendance.cate",
            count: { $sum: 1 }
          }
        }
      ]);

      // 将统计结果转换为对象 {2: count, 3: count...}
      const statsObj = attendanceStats.reduce((acc, curr) => {
        acc[curr._id] = curr.count;
        return acc;
      }, {});

      // 数字转中文映射函数  1年级 》》》一年级
      function numberToChinese(numStr) {
        const chineseNumbers = {
          '1': '一',
          '2': '二',
          '3': '三',
          '4': '四',
          '5': '五',
          '6': '六'
        };
        // 添加默认值处理，防止出现undefined
        return chineseNumbers[numStr] || numStr;
      }
      

      // 处理数据格式
      return {
        name: `${numberToChinese(cls.class)}年级 ${cls.grade} 班`,
        total: total,
        present: total - ((statsObj['2'] || 0) + (statsObj['3'] || 0) + (statsObj['4'] || 0)),
        cate2: statsObj['2'] || 0,
        cate3: statsObj['3'] || 0,
        cate4: statsObj['4'] || 0
      }
    }))

    res.json({
      code: 200,
      data: result,
      message: '获取成功'
    });
  } catch (error) {
    console.error('出勤数据获取失败:', error);
    res.status(500).json({ code: 500, message: '服务器内部错误' });
  }
})


// 根据单个班级查出所有异常状态的学生
router.post('/getAttendanceStudents', async (req, res) => {
  try {
    const { className, dateInfo } = req.body;
    // 保持最基础的班级解析逻辑
    const [gradeStr, classNum] = className.replace(/班/g, ' ').split('').filter(Boolean).slice(-2);
    if (!gradeStr || !classNum) {
      return res.status(400).json({ code: 400, msg: '班级格式应为示例：二年级 2 班' });
    }
    // 中文数字转换（与getMsgByDate一致）
    const chineseToNumber = {
      '一': '1', '二': '2', '三': '3',
      '四': '4', '五': '5', '六': '6'
    };
    const classValue = chineseToNumber[gradeStr.charAt(0)] || gradeStr;
    // 查询班级逻辑（保持与其他接口一致）
    const classData = await classModel.findOne({
      class: classValue,
      grade: classNum
    });
    if (!classData) return res.status(404).json({ code: 404, msg: '班级不存在' });
    // 保持最简单的时间处理（与getStudentsByClass一致）
    const targetDate = new Date(dateInfo);
    const start = new Date(targetDate).setHours(0, 0, 0, 0);
    const end = new Date(targetDate).setHours(23, 59, 59, 999);
    // 简化聚合查询（仅保留必要步骤）
    const students = await studentModel.aggregate([
      { $match: { classid: classData._id } },
      { $unwind: "$attendance" },
      { 
        $match: {
          "attendance.date": { $gte: start, $lte: end },
          "attendance.cate": { $in: ["2", "3", "4"] }
        }
      },
      {
        $group: {
          _id: "$_id",
          name: { $first: "$name" },
          attendanceList: { $push: "$attendance" }
        }
      }
    ]);
    // 保持最基础的数据格式化
    const result = students.map(student => ({
      name: student.name,
      attendance: student.attendanceList.map(att => ({
        type: getAttendanceType(att.cate),
        time: new Date(att.date).toLocaleTimeString('zh-CN', { 
          hour: '2-digit', 
          minute: '2-digit' 
        })
      }))
    }));
    res.json({ code: 200, data: result });
  } catch (err) {
    res.status(500).json({ code: 500, msg: err.message });
  }
})




module.exports = router;
