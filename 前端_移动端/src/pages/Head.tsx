import React from "react";
import { NavBar, Toast } from '@nutui/nutui-react'
import { Share, More, Cart, ArrowLeft, Close } from '@nutui/icons-react'

const App: React.FC = (props) => {
    console.log(props);
    
    return (
        <div>
            <NavBar
                right={<span onClick={(e) => Toast.show('清空')}>清空</span>}
                left={<Close />}
                back={<ArrowLeft />}
                onBackClick={(e) => Toast.show('返回')}
            >
                <div className="title">
                    <span onClick={(e) => Toast.show('标题')}>浏览记录</span>
                </div>
            </NavBar>
        </div>
    )
}
export default App;