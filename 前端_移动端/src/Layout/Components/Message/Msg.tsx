import React from "react";
import { Friends } from '@react-vant/icons';
import style from './msg.module.css'
import SwipeNavigation from "../SwipeNavigation/SwipeNavigation";


const App: React.FC = () => {
    return (
        <div>
            <SwipeNavigation />

            <div className={style.header}>
                <div className={style.vis}></div>
                <div>消息</div>
                <div className={style.fri}><Friends  /></div>
            </div> <hr />
        </div>
    ) 
}
export default App; 