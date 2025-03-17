//////////////////////////////////////////////////////////////
//  👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇
//  考勤统计页面
//  author: q
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { svgList } from '../../../../../public/svgList/index.tsx' //导入svg
import dayjs from 'dayjs'
import Style from './css/Kqtj.module.css'

import Echarts1 from './Components/Echarts1.jsx'  //子组件-迷你日历
import MiniTime from './Components/kqtj_time/Index.tsx'  //子组件-迷你日历
import MiniClock from './Components/kqtj_time/Clock.jsx'  //子组件-迷你时钟

import { NavBar, Toast, Popover } from 'react-vant'
import { NotesO } from '@react-vant/icons';
import axios from 'axios'
import img1 from '../../../../../public/imgs/办公1.png'
const popupActions = [{ text: '按日查看', icon: svgList.kqtj_2 }, { text: '月度报表', icon: svgList.kqtj_3 }]


const Kqtj: React.FC = () => {
  const navigate = useNavigate()
  const [selectDate, setSelectDate] = useState<Date>(new Date())  //所选日期
  const [mock, setMock] = useState<String>('day')  //分类： day || week
  const [statsData, setStatsData] = useState({
    total: 0,
    present: 0,    // 实出勤 = total - (病假+事假+旷课)
    cate2: 0,      // 病假
    cate3: 0,      // 事假
    cate4: 0       // 旷课
  }) //后端返回所选日期的出勤数据
  const [isDataLoaded, setIsDataLoaded] = useState(false)  //加载状态 解决echarts数据无法实时更新问题

  // 添加日期格式化函数
  const formatDisplayDate = (date: Date) => {
    return dayjs(date).isSame(dayjs(), 'day')
      ? "今天"
      : dayjs(date).format("YYYY年MM月DD日")
  }

  // 触发右上角筛选
  const select = (option: PopoverOption) => {
    if (option.text === '按日查看') {
      setMock('day')
      Toast.info('按日期查看')
    }
    if (option.text === '月度报表') {
      setMock('week')
      Toast.info('按月度查看')
    }
  }


  // 计算出勤率
  const chuqinRate = (((statsData.present) / statsData.total) * 100).toFixed(1) + '%'

  // 按日期获取数据
  const fetchStatsData = async () => {
    try {
      setIsDataLoaded(false) // 请求开始时重置状态

      const localDateStr = dayjs(selectDate).format('YYYY-MM-DD')
      const { data } = await axios.post('http://localhost:3000/QWG/getStatsData', {
        dateStr: localDateStr,
        mode: mock
      })
      const { total, attendance } = data.data
      const present = total - (attendance.cate2 + attendance.cate3 + attendance.cate4)

      setStatsData({
        total,
        present,
        cate2: attendance.cate2,
        cate3: attendance.cate3,
        cate4: attendance.cate4
      })
      setIsDataLoaded(true) // 数据加载完成
    } catch (err) {
      Toast.fail('数据加载失败')
      setIsDataLoaded(true) // 数据加载完成
    }
  }
  // 监听选择变化
  useEffect(() => {
    fetchStatsData()
  }, [selectDate, mock]) // 响应日期切换和模式切换


  // 跳转至按照班级展示考勤（detail1）页面
  const goKqtj_detail1 = () => {
    navigate('/kqtj_detail1', { state: { selectDate: selectDate } })
  }

  const goKqtj_detail2 = () =>{
    navigate('/kqtj_detail2', { state: { selectDate: selectDate } })
  }

  return (
    <div className='kqtjpage'>
      {/* navbar模块 */}
      <div>
        <NavBar
          placeholder={true}
          className={Style.kqth_navbar}
          border={false}
          fixed={true}
          title={<span className={Style.navtitle}>考勤报表</span>}
          onClickLeft={() => { window.history.back() }}
          rightText={
            <Popover
              placement="bottom-end"
              actions={popupActions}
              teleport={() => document.body}
              duration={50}
              // overlay={true}
              onSelect={select}
              reference={
                <span style={{ display: 'inline-block' }}>{svgList.kqtj_1}</span>
              }
            />
          }
        />
      </div>
      {/* 迷你日历、时钟模块 */}
      <div className={Style.kqth_top}>
        <div className={Style.kqth_top_item1}>
          <MiniTime setSelectDate={setSelectDate}></MiniTime>
        </div>
        <div className={Style.kqth_top_item2}>
          <MiniClock></MiniClock>
        </div>
      </div>

      {/* 中部，出勤数据展示及按需展示模块 */}
      <div className={Style.kqth_model1}>
        <div className={Style.kqth_model1_layout}>

          <div className={Style.kqth_model1_top}>
            {/* 出勤率 */}
            <p>{chuqinRate}</p>
          </div>

          <div className={Style.kqth_model1_num}>
            <div className={Style.kqth_model1_item}>
              <div className={Style.cate1}>{statsData.total}</div>
              <div>应出勤数</div>
            </div>
            <div className={Style.kqth_model1_item}>
              <div className={Style.cate2}>{statsData.present}</div>
              <div>实出勤数</div>
            </div>
            <div className={Style.kqth_model1_item}>
              <div className={Style.cate3}>{statsData.cate2 + statsData.cate3}</div>
              <div>事假人数</div>
            </div>
            <div className={Style.kqth_model1_item}>
              <div className={Style.cate4}>{statsData.cate4}</div>
              <div>旷课人数</div>
            </div>
          </div>
          {/* 引入echarts图标 展示出勤缺勤情况*/}
          <div>
            {isDataLoaded && <Echarts1 statsData={statsData} />}
          </div>
          <div className={Style.kqth_model1_layout_bottom}>
            <NotesO />
            <span>{formatDisplayDate(selectDate)}</span>
          </div>
        </div>


        {/* 按需选择展示数据的方式 */}
        <div className={Style.kqth_model1_select}>

          <div onClick={() => { goKqtj_detail1() }} className={Style.kqth_model1_select_left}>
            <div className={Style.kqth_model1_select_left_title}>
              <p>班级出勤统计</p>
              <p>
                点击进入
                {svgList.kqtj_detail1_2}
              </p>
            </div>
            <span className={Style.kqth_model1_select_left_img}>
              <img src={img1} alt="" />
            </span>
          </div>


          <div className={Style.kqth_model1_select_right}>
            <div onClick={goKqtj_detail2} className={Style.kqth_model1_select_right_item}>
              <span>
                {svgList.kqtj_detail1_3}
                年组横向对比
              </span>
            </div>
            <div className={Style.kqth_model1_select_right_item}>
              <span>
                {svgList.kqtj_detail1_4}
                异常学生清单
              </span>
            </div>
          </div>
        </div>


      </div>
    </div>
  )
}

export default Kqtj
