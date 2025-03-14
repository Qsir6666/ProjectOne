import React from "react";
import { NavBar } from 'antd-mobile'
import { useNavigate } from "react-router";
import '../hbc.css'
interface IProps{
    
}
const App: React.FC<IProps> = (props) => {
    const navigate=useNavigate()
    const back=()=>{
        console.log('点击了返qing')
        

    }      
    return (
        <>
        <div className="navtil">
            <div>年级</div>
            <div>日历</div>
        </div>
        </>
    )
}
export default App;