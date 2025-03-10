import React from 'react';
import style from './nurse.module.css'
import { NavBar, Space, Toast } from 'antd-mobile'
import { CloseOutline, MoreOutline, SearchOutline } from 'antd-mobile-icons'
import { useNavigate } from 'react-router-dom';
// import { DemoBlock } from 'demos'

const Nurse: React.FC = () => {
	const navigate = useNavigate();
	const right = (
		<div style={{ fontSize: 24 }}>
			<Space style={{ '--gap': '16px' }}>
				<SearchOutline />
				<MoreOutline />
			</Space>
		</div>
	)

	return (
		<div className={style.boxs}>
			<div title='返回按钮显示文字' className={style.title} onClick={() => { navigate(-1) }}>
				<NavBar back='❌'  >
					护学岗
				</NavBar>
			</div>
			<div className={style.content}>
				<div className={style.contentOne}>护导点 : 护导点1</div>
				<div className={style.contentTwo}>时间 : 2022-03-10</div>
				<div className={style.contentThree}>
					<div className={style.contentThree1}>签到状态 : <span>未签到</span></div>
					<div className={style.contentThree2} onClick={() =>navigate('/nurses')}>签到</div>
				</div>
			</div>
			<div className={style.content}>
				<div className={style.contentOne}>护导点 : 护导点1</div>
				<div className={style.contentTwo}>时间 : 2022-03-10</div>
				<div className={style.contentThree}>
					<div className={style.contentThree12}>签到状态 : <span>未签到</span></div>
					<div className={style.contentThree22}>签到</div>
				</div>
			</div>


		</div>
	)
};

export default Nurse;