
import Index from '../page/Login/Index.tsx'
import Cnm from '../page/Index/cnm.tsx'
import Aaa from '../page/Index/aaa.tsx'
import Bbb from '../page/Index/bbb.tsx'
import Ccc from '../page/Index/ccc.tsx'
import { Navigate } from "react-router-dom"

let routes = [
	{ path: '/', element: <Navigate to="/index"></Navigate> },  //默认跳转index
	{ path: '/index', element: <Index></Index> },
	{
		path: '/cnm',
		element: <Cnm></Cnm>,
		children: [
			{ index: true, element: <Aaa></Aaa> },
			{ path: 'bbb', element: <Bbb></Bbb> },
			{ path: 'ccc', element: <Ccc></Ccc> }
		]
	}
]

export default routes