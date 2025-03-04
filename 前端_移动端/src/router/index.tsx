import { lazy } from "react";
import { Navigate } from "react-router-dom";

// 一级路由
import Login from '../Login/Index.tsx'
import Layout from '../Layout/Layout.tsx'
// 二级路由
const Index = lazy(() => import('../Layout/Components/Index/Index.tsx')) //主页
const Msg = lazy(() => import('../Layout/Components/Message/Msg.tsx')) //信息
const Mine = lazy(() => import('../Layout/Components/Mine/Mine.tsx')) //我的

const Report=lazy(()=>import('../Layout/Components/Report/Report.tsx')) //上报隐患

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
			{ path: 'report', element: <Report></Report> },
		]
	},


]

export default routes