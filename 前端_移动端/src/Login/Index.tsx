import React from "react";
import { useNavigate } from "react-router-dom";

const App: React.FC = () => {
	const navigate = useNavigate();
	return (
		<>
			登录
			<button onClick={() => navigate("/layout")}>登录</button>
		</>
	)
}
export default App;      