import { Children, lazy } from "react";
import { Navigate } from "react-router-dom";

// 一级路由
import Login from '../Login/Index.tsx'
import Layout from '../Layout/Layout.tsx'
import Menu from '../Layout/Components/Index/Menu.tsx'

// JXH
import Nurse from '../J250310/Nurse/nurse.tsx'
import Mission from '../J250310/Mission/mission.tsx'
import Nurses from '../J250310/Nurse/nurses.tsx'
import Addfault from "../J250310/Nurse/addFault.tsx";

// 二级路由
const Index = lazy(() => import('../Layout/Components/Index/Index.tsx')) //主页
const Msg = lazy(() => import('../Layout/Components/Message/Msg.tsx')) //信息
const Mine = lazy(() => import('../Layout/Components/Mine/Mine.tsx')) //我的

// 杨振宇
const Report = lazy(() => import('../Layout/Components/Report/Report.tsx')) //上报隐患
const Examine = lazy(() => import('../Layout/Components/Examine/Examine.tsx')) // 日常检查
const ExamineDate = lazy(() => import('../Layout/Components/ExamineDate/ExamineDate.tsx')) //检查隐患
const Check = lazy(() => import('../Layout/Components/Check/Check.tsx')) //隐患排查
const Detail = lazy(() => import('../../Yzy/Detail.tsx')) //隐患详情
const Faction = lazy(() => import('../../Yzy/Faction.tsx')) //派指人员维修
//何百川
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
			{ path: 'mine', element: <Mine></Mine> },

		],

	},
	//上报隐患
	{ path: '/report', element: <Report></Report> },
	// 日常检查
	{ path: '/examine', element: <Examine></Examine> },
	// 检查页面(未检查，已检查)
	{ path: '/ExamineDate', element: <ExamineDate></ExamineDate> },
	// 隐患排查
	{ path: '/Check', element: <Check></Check> },
	//隐患详情
	{ path: '/Detail', element: <Detail></Detail> },
	//派指人员维修
	{ path: '/Faction', element: <Faction></Faction> },


	{ path: '/menu', element: <Menu></Menu> },

	//何百川
	{ path: '/qingjia', element: <QingJia /> },


	// JXH
	{ path: '/nurse', element: <Nurse /> },
	{ path: '/mission', element: <Mission /> },
	{ path: '/nurses', element: <Nurses /> },
	{ path: '/addfault', element: <Addfault /> },


]

export default routes