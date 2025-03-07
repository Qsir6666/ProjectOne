import { lazy } from "react";
import { Navigate } from "react-router-dom";

// 一级路由
import Login from '../Login/Index.tsx'
import Layout from '../Layout/Layout.tsx'
// 二级路由
const Index = lazy(() => import('../Layout/Components/Index/Index.tsx')) //主页
const Msg = lazy(() => import('../Layout/Components/Message/Msg.tsx')) //信息
const Mine = lazy(() => import('../Layout/Components/Mine/Mine.tsx')) //我的

const Report = lazy(() => import('../Layout/Components/Report/Report.tsx')) //上报隐患
const Examine = lazy(() => import('../Layout/Components/Examine/Examine.tsx')) // 日常检查
const ExamineDate = lazy(()=>import('../Layout/Components/ExamineDate/ExamineDate.tsx')) //检查隐患

let routes = [
	{ path: '/', element: <Navigate to="/login"></Navigate> },
	{ path: '/login', element: <Login></Login> },
	{
		path: '/layout',
		element: <Layout></Layout>,
		children: [
			{ index: true, element: <Index></Index> },
			{ path: 'msg', element: <Msg></Msg> },
			{ path: 'mine', element: <Mine></Mine> },

		]
	},
	//上报隐患
	{ path: 'report', element: <Report></Report> },
	// 日常检查
	{ path: 'examine', element: <Examine></Examine> },
	// 检查页面(未检查，已检查)
	{path:'ExamineDate',element:<ExamineDate></ExamineDate>}

]

export default routes