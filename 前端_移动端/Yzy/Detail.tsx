import React, { useState, useEffect } from "react";
import { NavBar, Toast, Steps, Step, Button } from '@nutui/nutui-react'
import { ArrowLeft } from '@nutui/icons-react'
import style from '../src/css/detail.module.css';
import { useLocation, useNavigate } from "react-router-dom";
import TimeFormatter from '../src/pages/TimeFormatter'

const Detail: React.FC = () => {
    const loc = useLocation();
    const [details, setDetails] = useState([]);
    const name = loc.state.userName.userName

    const nav = useNavigate();
    // const darkTheme={
    //     nutuiStepsWaitTitleColor:"cornflowerblue",
    //     nutuiStepsProcessTitleColor:"cornflowerblue",
    //     nutuiStepsBaseLineBackground:'cornflowerblue',
    //     nutuiStepsBaseTitleColor:"cornflowerblue",
    //     nutuiStepsWaitTitleColor:"cornflowerblue"
    // }
    useEffect(() => {
        setDetails(loc.state)

    }, [details])
    return (
        <div className={style.box}>
            <NavBar className={style.navbar}
                back={
                    <>
                        <ArrowLeft />
                        返回
                    </>
                }
                onBackClick={(e) => nav('/Check')}
            >
                详情
            </NavBar>
            <div className={style.boxHerd}>
                <div className={style.boxHerdTow}>
                    <span style={{ fontSize: '14px' }}>隐患描述:{details.detail}</span>
                    <img src={details.PhotosOrVideos} alt="" width={60} height={60} />
                </div>
            </div>
            <div className={style.central}>
                <div className={style.centralTow} style={{ borderBottom: '1px solid rgb(197, 197, 197)', fontSize: '15px' }}>
                    <span style={{ fontSize: '15px' }}>隐患类型</span><span style={{ color: 'rgb(137, 137, 137)', fontSize: '15px' }}>{details.type}</span>
                </div>
                <div className={style.centralTow}>
                    <span style={{ fontSize: '15px' }}>隐患地点</span><span style={{ color: 'rgb(137, 137, 137)' }}>{details.place}</span>
                </div>
            </div>
            <div className={style.centralP}>
                <p style={{ fontSize: '15px' }}>隐患流程</p>
            </div>

            {/* <ConfigProvider theme={darkTheme}> */}
            <div style={{ height: '54.5%', padding: '30px 30px', backgroundColor: 'white' }}>
                <Steps direction="vertical" dot value={details.state} style={{}}>
                    <Step
                        value={1}
                        title={name + "上报隐患" + "待审核"}
                        description={<>
                            <p>提交时间：</p>
                            <TimeFormatter date={details.time} format="YYYY-MM-DD HH:mm:ss" />
                        </>
                        }
                    />

                    {details.state == '2' || details.state == '3' ?
                        <Step value={2}
                            title={name + "以指派" + "处理中"}
                            description={<>
                                <p>指派人：维修员-王五</p>
                                <p>处理期限：<TimeFormatter date={details.time} format="YYYY-MM-DD" /></p>
                                <p>确认隐患类型：{details.type}</p>
                                <p></p>
                            </>}
                        />
                        : undefined}
                    {details.state == '3' ?
                        <Step
                            value={3}
                            title={name + "处理完毕" + "已完成"}
                            description={
                                <>
                                    <p>完成时间：<TimeFormatter date={details.time} format="YYYY-MM-DD" /></p>
                                </>
                            }
                        />
                        : undefined}

                </Steps>
                {details.state == '1' ?
                    <Button block type="primary" onClick={()=>{nav('/Faction')}}>
                        派指
                    </Button> : undefined
                }

            </div>
            {/* </ConfigProvider> */}
        </div>
    )
}

export default Detail;