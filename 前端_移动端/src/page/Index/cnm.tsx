import React from "react";
import { useNavigate, Outlet } from 'react-router-dom'

const App: React.FC = () => {
	const Navigate = useNavigate();
	return (
		<>
			<Outlet></Outlet>
			<div style={{ display: 'flex' }}>
				<button onClick={() => Navigate('/cnm')}>111</button>
				<button onClick={() => Navigate('/cnm/bbb')}>222</button>
				<button onClick={() => Navigate('/cnm/ccc')}>333</button>
			</div>
		</>
	)
}
export default App;   