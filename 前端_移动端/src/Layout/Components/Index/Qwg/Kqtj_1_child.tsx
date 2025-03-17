import React, { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import * as echarts from 'echarts'
import { ArrowLeft } from '@react-vant/icons'
import axios from 'axios';



const App: React.FC = () => {
  const location = useLocation()
  const [classInfo, setClassInfo] = useState(location.state?.classInfo)
  const [dateInfo, setDateInfo] = useState(location.state?.dateStr)
  console.log(dateInfo)

  const attendanceRate = classInfo.total > 0
    ? ((classInfo.present / classInfo.total) * 100).toFixed(1)
    : '0.0'  //计算出勤率

  const distributionChartRef = useRef<HTMLDivElement>(null)
  const resizeHandler = () => {
    if (distributionChartRef.current) {
      const chart = echarts.getInstanceByDom(distributionChartRef.current)
      chart?.resize();
    }
  }

  const [studentList, setStudentList] = useState([])

  const getdate = async () => {
    const reqData = {
      className: classInfo.name,
      dateInfo: dateInfo  // 使用实际需要查询的日期
    }

    axios.post('http://localhost:3000/QWG/getAttendanceStudents', reqData).then(res => {
      if (res.data.code === 200) {
        setStudentList(res.data.data)
        console.log(res.data.data, 'awffwwffwaawf')
        const sickStudents = res.data.data.filter(s =>
          s.attendance.some(a => a.type === '病假')
        )
        const affairStudents = res.data.data.filter(s =>
          s.attendance.some(a => a.type === '事故')
        )
        const truancyStudents = res.data.data.filter(s =>
          s.attendance.some(a => a.type === '旷课')
        )
      }
    })
  }
  useEffect(() => {
    getdate()
  }, [location.state])


  useEffect(() => {
    window.addEventListener('resize', resizeHandler)
    return () => {
      window.removeEventListener('resize', resizeHandler)
    }
  }, [])

  useEffect(() => {
    if (distributionChartRef.current) {
      const chart = echarts.init(distributionChartRef.current)
      const option = {
        animation: false,
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'horizontal',
          bottom: 0
        },
        series: [{
          name: '考勤分布',
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: '#fff',
            borderWidth: 2
          },
          label: {
            show: false,
            position: 'center'
          },
          emphasis: {
            label: {
              show: true,
              fontSize: 20,
              fontWeight: 'bold'
            }
          },
          labelLine: {
            show: false
          },
          data: [
            { value: classInfo.present, name: '正常出勤', itemStyle: { color: '#10B981' } },
            { value: classInfo.cate2, name: '事假', itemStyle: { color: '#F59E0B' } },
            { value: classInfo.cate3, name: '病假', itemStyle: { color: '#6B7280' } },
            { value: classInfo.cate4, name: '旷课', itemStyle: { color: '#EF4444' } }
          ]
        }]
      }
      chart.setOption(option)
    }
  }, [])
  return (
    <div className="min-h-screen bg-gray-50">
      {/* 顶部导航 */}
      <div className="bg-white shadow fixed top-0 left-0 right-0 z-10">
        <div className="px-4 py-3 flex items-center justify-between">
          <button className="text-gray-600 !rounded-button whitespace-nowrap">
            <ArrowLeft onClick={() => { window.history.back() }} />
          </button>
          <h1 className="text-base font-medium">{classInfo.name}考勤数据</h1>
          <div className="w-8"></div>
        </div>
      </div>
      <div className="pt-14">
        {/* 今日出勤率 */}
        <div className="px-4 mt-4">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-baseline">
              <span className="text-4xl font-bold text-indigo-600">{attendanceRate}%</span>
              <span className="ml-2 text-sm text-green-500">
                <i className="fas fa-arrow-up mr-1"></i>
                1.2%
              </span>
            </div>
            <p className="text-gray-500 mt-1">今日出勤率</p>
          </div>
        </div>
        {/* 数据概览 */}
        <div className="px-4 mt-4 grid grid-cols-2 gap-3">
          <div className="bg-white rounded-lg shadow p-4">
            <div className="text-2xl font-semibold">{classInfo.total}/{classInfo.present}</div>
            <div className="text-gray-500 text-sm mt-1">应到/实到</div>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <div className="text-2xl font-semibold">{classInfo.cate2}</div>
            <div className="text-gray-500 text-sm mt-1">病假</div>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <div className="text-2xl font-semibold">{classInfo.cate3}</div>
            <div className="text-gray-500 text-sm mt-1">事假人数</div>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <div className="text-2xl font-semibold">{classInfo.cate4}</div>
            <div className="text-gray-500 text-sm mt-1">旷课人数</div>
          </div>
        </div>
        {/* 图表区域 */}
        <div className="px-4 mt-4 space-y-4">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium mb-4">考勤类型分布</h3>
            <div ref={distributionChartRef} style={{ height: '300px' }}></div>
          </div>
        </div>
        {/* 考勤明细 */}
        <div className="px-4 mt-4 mb-20">
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-medium">考勤明细</h3>
            </div>
            <div className="divide-y divide-gray-200">
              <div className="p-4 flex items-center justify-between">
                <div>
                  <div className="font-medium">赵梓涵</div>
                  <div className="text-sm text-gray-500 mt-1">07:45 - 16:30</div>
                </div>
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">正常</span>
              </div>
              <div className="p-4 flex items-center justify-between">
                <div>
                  <div className="font-medium">林思远</div>
                  <div className="text-sm text-gray-500 mt-1">08:15 - 16:30</div>
                </div>
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">迟到</span>
              </div>
              <div className="p-4 flex items-center justify-between">
                <div>
                  <div className="font-medium">陈雨桐</div>
                  <div className="text-sm text-gray-500 mt-1">请假</div>
                </div>
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">请假</span>
              </div>
            </div>
          </div>
        </div>
        {/* 底部导航 */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
          <div className="grid grid-cols-3 gap-px bg-gray-200">
            <button className="flex flex-col items-center justify-center py-2 bg-white text-gray-600">
              <i className="fas fa-shield-alt text-lg"></i>
              <span className="text-xs mt-1">责任监察</span>
            </button>
            <button className="flex flex-col items-center justify-center py-2 bg-white text-gray-600">
              <i className="fas fa-exclamation-circle text-lg"></i>
              <span className="text-xs mt-1">异常考勤</span>
            </button>
            <button className="flex flex-col items-center justify-center py-2 bg-indigo-600 text-white">
              <i className="fas fa-sync-alt text-lg"></i>
              <span className="text-xs mt-1">刷新数据</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default App
