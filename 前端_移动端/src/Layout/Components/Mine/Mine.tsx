import React from "react";
import style from './mine.module.css'
import { images } from '../../../Imgs/jxh_imgs/imgage'

const App: React.FC = () => {
    return (
        <div>
            <div className={style.header}></div>
            <div className={style.content}>
                <div><img src="https://tse3-mm.cn.bing.net/th/id/OIP-C.ggX8e6U3YzyhPvp8qGZtQwHaHa?rs=1&pid=ImgDetMain" alt="" /></div>
                <div>
                    <p>名称：张三</p>
                    <p>所属学校:xxx学校</p>
                </div>
            </div>
            <div className={style.hrefs}>
                <div className={style.hrefs_context}>
                    <div>{images.men}</div>
                    <div>
                        <div>通讯录</div>
                        <div>⟩</div>
                    </div>
                </div>
                <div className={style.hrefs_context}>
                    <div>{images.suo}</div>
                    <div>
                        <div>修改密码</div>
                        <div>⟩</div>
                    </div>
                </div>
                <div className={style.hrefs_context}>
                    <div>{images.i}</div>
                    <div>
                        <div>关于</div>
                        <div>⟩</div>
                    </div>
                </div>
            </div>
            <div className={style.exit}>退出当前帐号</div>
        </div>
    )
}
export default App;