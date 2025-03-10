import React, { useState, useEffect } from 'react';
import style from './nurse.module.css'
import { NavBar, Space, TabBar, Toast } from 'antd-mobile'
import { CloseOutline, MoreOutline, SearchOutline } from 'antd-mobile-icons'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {images} from '../../Imgs/jxh_imgs/imgage'

const Nurse: React.FC = () => {
	const navigate = useNavigate();
	const [tabNum, setTabNum] = useState<number>(1)
	// 定义一个数据
	interface Item {
		id: number,
		name: string
	}
	const data: Item[] = ([
		{ id: 1, name: '星期一' },
		{ id: 2, name: '星期二' },
		{ id: 3, name: '星期三' },
		{ id: 4, name: '星期四' },
		{ id: 5, name: '星期五' },
		{ id: 6, name: '星期六' },
		{ id: 7, name: '星期日' },
	])
	const [list, setList] = useState<Array<any>>([]);

	const getList = async () => {
		try {
			const res = await axios.get('http://localhost:3000/JXH/list');
			setList(res.data.data);
			// console.log(res.data.data,'111111111111111');
		} catch (error) {
			console.log(error);
		}
	}

	useEffect(() => {
		getList();
	}, [])

	return (
		<div className={style.boxs}>
			<div title='返回按钮显示文字' className={style.title} onClick={() => { navigate(-1) }}>
				<NavBar back='❌'  >
					护学岗
				</NavBar>
			</div>

			<div style={{ display: tabNum === 1 ? 'block' : 'none' }} className={style.tabOne}>
				<p>护导点  : 护导1</p>
				<p>护导时间  : 08:00-22:00</p>
				<p>带班人  : 张三 <span>未签到</span></p>
				<p>带班人  : 李四 <span>未签到</span></p>
				<p>护导人  : 王五 <span>未签到</span></p>
				<p>护导人  : 李青 <span>已签到</span></p>
				<div>
					签到吧孩
				</div>
				<div onClick={() => navigate(-1)}>
					返回
				</div>
			</div>

			<div style={{ display: tabNum === 2 ? 'block' : 'none' }}>
				<div className={style.tabTwo}>暂无数据</div>
			</div>

			<div style={{ display: tabNum === 3 ? 'block' : 'none' }}>
				{data.map((item, index) => {
					return (
						<div key={index} className={style.tabThree}>
							<div className={style.week}>{item.name}</div>
							<div className={style.weeks}>
								<div>08:00-22:00</div>
								<div>护导点1</div>
								<div className={style.weekThree}>护导人</div>
							</div>
							<div className={style.weeks}>
								<div>08:00-22:00</div>
								<div>护导点2</div>
								<div className={style.weekThree}>护导人</div>
							</div>
							<div className={style.weeks}>
								<div>08:00-22:00</div>
								<div>护导点3</div>
								<div className={style.weekThree}>护导人</div>
							</div>
						</div>
					)
				})}
			</div>

			<div style={{ display: tabNum === 4 ? 'block' : 'none' }}>
				{list.map((item, index) => {
					return (
						<div key={index} className={style.tabFour}>
							<div>{item.time}</div>
							<div>
								<div>上报人 : 保安-张三</div>
								<div className={item.summary==='正常'?style.fontColorBlue : style.fontColorred}>{item.summary}</div>
							</div>
						</div>
					)
				})}
				<div className={style.tabFourButtom} onClick={() =>navigate('/addfault')}>
					{images.Jia}
				</div>

			</div>

			<div className={style.tabbar}>
				<div className={tabNum === 1 ? style.tabbars : ''} onClick={() => setTabNum(1)}>打卡</div>
				<div className={tabNum === 2 ? style.tabbars : ''} onClick={() => setTabNum(2)}>记录</div>
				<div className={tabNum === 3 ? style.tabbars : ''} onClick={() => setTabNum(3)}>排班</div>
				<div className={tabNum === 4 ? style.tabbars : ''} onClick={() => setTabNum(4)}>日报</div>
			</div>
		</div>
	)
};

export default Nurse;