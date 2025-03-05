import React, { useState } from "react";
import ZuKuai from './component/zukuai'
import Qing from './component/qing'
interface QingJiaItem {
    id: number;          // 唯一标识
    applicant: string;   // 申请人
    reason: string;      // 请假原因
    date: string;        // 时间
    status: 'pending' | 'approved' | 'rejected'; // 状态枚举
  }
const App: React.FC = () => {
    const [list,setlist]=useState<QingJiaItem[]>([
        {id:10,
        applicant:'申请的',
        reason:'原因',
        date:'202',
        status:'approved'},
        {id:11,
            applicant:'申请的1',
            reason:'原因1',
            date:'2021',
            status:'pending'}
    ])
    return (
        <div>
            <ZuKuai title='请假管理' area="/layout"></ZuKuai>
            <hr/> <br/>
            <Qing ></Qing>
        </div>
    )
}
export default App;