import React, { useEffect, useState } from 'react';
import style from './nurse.module.css'
import { NavBar, Space, Toast } from 'antd-mobile'
import { CloseOutline, MoreOutline, SearchOutline } from 'antd-mobile-icons'
import { useNavigate } from 'react-router-dom';
import { DatetimePicker, Field, Radio, Uploader } from 'react-vant'

const Addfault: React.FC = () => {
	const navigate = useNavigate();
	const [value, setValue] = useState(new Date()) // time
	const [summary, setSummary] = useState<string>('nm'); // text
	const [status, setStatus] = useState<boolean | string>(true) // status
	const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setSummary(e.target.value);
	  };
	  const [imgs, setImgs] = useState<string>('') // 图片上传
	const handleupimg = (v: any) => {
		const imgUrls = v.map((file: any) => file.url); 
		setImgs(imgUrls)
		// console.log(imgUrls);
	}

	useEffect(() => {
		console.log(value);
		
	},[value])

	return (
		<div className={style.box}>
			<div title='返回按钮显示文字' className={style.title} onClick={() => { navigate(-1) }}>
				<NavBar back='❌'  >
					护学岗
				</NavBar>
			</div>
			<div>
				<DatetimePicker
					popup={{
						round: true,
					}}
					type='date'
					title='填报日期'
					minDate={new Date(2025, 0, 1)}
					maxDate={new Date(2025, 10, 1)}
					value={value} 
					onConfirm={setValue} 
				>
					{(val, _, actions) => {
						return (
							<Field
								readOnly
								clickable
								label='选择年月日'
								value={val.toLocaleDateString()}
								placeholder='请选择日期'
								onClick={() => actions.open()}
							/>
						)
					}}
				</DatetimePicker>
			</div>
			<div className={style.addinput}>
				<div>
					<Radio.Group defaultValue="true" direction="horizontal" onChange={(e) => { setStatus(e) }}>
						<Radio name="true">正常</Radio>
						<Radio name="false">异常</Radio>
					</Radio.Group>

				</div>

			</div>
			<div className={style.addend}>
				<div>
					<div>护导总结</div>
					<div><textarea name={summary} id={summary} cols={50} rows={5} placeholder='请输入护导总结...'  onChange={handleChange}></textarea></div>
				</div>
			</div>
			<div style={{paddingLeft:'5vw',backgroundColor:'white'}}>
				<Uploader
					onChange={(v) => {handleupimg(v)}}
				/>
				{/* <img src={imgs} alt="" /> */}
			</div>
			<div className={style.addsubmit} onClick={() => navigate('/nurses')}>提交</div>
		</div>
	)
};

export default Addfault;