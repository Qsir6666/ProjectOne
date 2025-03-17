import React,{ lazy } from "react";
import { Navigate } from "react-router-dom";

// 一级路由
import Login from '../Login/Index.tsx'
import Layout from '../Layout/Layout.tsx'
import Menu from '../Layout/Components/Index/menu.tsx'
import Bjkq from '../Layout/Components/Index/Qwg/Bjkq.tsx' //班级考勤
import Kqtj from '../Layout/Components/Index/Qwg/Kqtj.tsx'  //考勤统计
import Kqtj_detail1 from '../Layout/Components/Index/Qwg/kqtj_detail1.tsx'  //考勤统计 --按班级展示考勤
import Kqtj_detail2 from '../Layout/Components/Index/Qwg/kqtj_detail2.tsx'  //考勤统计 --按年租展示考勤
import Kqtj_1_child from '../Layout/Components/Index/Qwg/Kqtj_1_child.tsx'  //考勤统计 --按年租展示考勤

// 二级路由
const Index = React.lazy(() => import('../Layout/Components/Index/Index.tsx')) //主页
const Msg = lazy(() => import('../Layout/Components/Message/Msg.tsx')) //信息
const Mine = lazy(() => import('../Layout/Components/Mine/Mine.tsx')) //我的

const QingJia = lazy(() => import('../Layout/Components/HBCpages/qingjia.tsx'))

let routes = [
	{ path: '/', element: <Navigate to="/login"></Navigate> },
	{ path: '/login', element: <Login></Login> },
	{
		path: '/layout',
		element: <Layout></Layout>,
		children: [
			{ index: true, element: <Index></Index> },
			{ path: 'msg', element: <Msg></Msg> },
			{ path: 'mine', element: <Mine></Mine> }
		]
	},
	{ path: '/menu', element: <Menu></Menu> },

	//何百川
	{ path: '/qingjia', element: <QingJia /> },

	// qwg
	{ path: '/bjkq', element: <Bjkq /> },//班级学生考勤页面
	{ path: '/kqtj', element: <Kqtj /> },//考勤统计页面
	{ path: '/kqtj_detail1', element: <Kqtj_detail1 /> },//考勤统计1 ——按照班级统计页面
	{ path: '/kqtj_1_child', element: <Kqtj_1_child /> },//考勤统计1.1 ——展示单个班级考勤

	{ path: '/kqtj_detail2', element: <Kqtj_detail2 /> },//考勤统计2 ——按照年组展示考勤


	
]

export default routes 