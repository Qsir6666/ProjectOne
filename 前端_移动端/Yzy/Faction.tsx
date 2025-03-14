import React, { useEffect, useState } from "react";
import { NavBar, Toast, Button, Form, Sticky, Cell, DatePicker, type PickerOption } from '@nutui/nutui-react'
import { Star, ArrowLeft, Close } from '@nutui/icons-react'
import faction from '../src/css/faction.module.css'


const Faction: React.FC = () => {
  const [form] = Form.useForm()
  // const account = Form.useWatch('account', form)
  // 日历
  const defaultValue = new Date()
  useEffect(() => {

    console.log(defaultValue);

  }, [])
  const defaultDescription = `${defaultValue.getFullYear()}-${defaultValue.getMonth() + 1
    }-${defaultValue.getDate()}`
  const [show, setShow1] = useState(false)
  const [desc1, setDesc1] = useState(defaultDescription)

  const [value, setValue] = useState('2023/01/01')
  const [show2, setShow2] = useState(false)
  const [desc2, setDesc2] = useState('')
  const confirm1 = (values: (string | number)[], options: PickerOption[]) => {
    setDesc1(options.map((option) => option.text).join(' '))
  }
  const change = (options: PickerOption[], values: (string | number)[]) => {
    const v = values.join('/')
    setValue(v)
    setDesc2(options.map((option) => option.text).join(' '))
  }

  // 按钮

  return (
    <div className={faction.box}>
      <Sticky>
        <NavBar style={{ backgroundColor: 'white', width: '100vw' }}
          left={<Close />}
          back={<ArrowLeft />}
          onBackClick={(e) => Toast.show('返回')}
        >
          <div className="title">
            <span className="desc">详情</span>
          </div>
        </NavBar>

      </Sticky>

      <div style={{ fontSize: '15px', marginLeft: '18px', marginTop: '10px' }}>
        隐患确认信息
      </div>
      <div className={faction.central}>
        <div className={faction.centralTow} style={{ borderBottom: '0px solid rgb(197, 197, 197)', fontSize: '15px' }}>
          <span style={{ fontSize: '15px' }}>隐患确认</span>
          <div className={faction.radio}>
            <input type="radio" name="fruit" value="1" />是隐患
            <input type="radio" name="fruit" value="2" />非隐患
            <input type="radio" name="fruit" value="3" />重复上报
          </div>
        </div>
        <div className={faction.centralTow} style={{ borderBottom: '1px solid rgb(197, 197, 197)', fontSize: '15px' }}>
          <span style={{ fontSize: '15px' }}>隐患类型</span><span style={{ color: 'rgb(137, 137, 137)', fontSize: '15px' }}>{ }</span>
        </div>
        <div className={faction.centralTow} style={{ borderBottom: '1px solid rgb(197, 197, 197)', fontSize: '15px' }}>
          <span style={{ fontSize: '15px' }}>隐患级别</span><span style={{ color: 'rgb(137, 137, 137)' }}>{ }</span>
        </div>
        <div className={faction.centralTow} style={{ borderBottom: '0px solid rgb(197, 197, 197)', fontSize: '15px' }}>
          <span style={{ fontSize: '15px' }}>隐患描述</span>
          <textarea id="myTextarea" name="myTextarea" rows={8} cols={40} className={faction.text}>

          </textarea>
        </div>
      </div>

      <div style={{ fontSize: '15px', marginLeft: '18px', lineHeight: '45px' }}>
        派指人员
      </div>

      <div className={faction.centrala}>
        <div className={faction.centralTow} style={{ borderBottom: '0px solid rgb(197, 197, 197)', fontSize: '15px' }}>
          <span style={{ fontSize: '15px' }}>处理负责人</span>
          <div className={faction.cell}>
            <Cell>
              <select className={faction.select} >
                <option value=''>请选择</option>
                <option>李总</option>
                <option>王总</option>
              </select>
            </Cell>
          </div>
        </div>
        <div className={faction.centralTow} style={{ borderBottom: '0px solid rgb(197, 197, 197)', fontSize: '15px' }}>
          <span style={{ fontSize: '15px' }}>处理期限</span>

          <div className={faction.cell}>
            <Cell
              title="请选择日期"
              description={desc2}
              onClick={() => setShow2(true)}
            />
            <DatePicker
              title="日期选择"
              visible={show2}
              value={new Date(value)}
              showChinese
              onClose={() => setShow2(false)}
              threeDimensional={false}
              onChange={(options, values) => change(options, values)}
            />
          </div>

        </div>
        <div className={faction.centralTow} style={{ borderBottom: '0px solid rgb(197, 197, 197)', fontSize: '15px' }}>
          <span style={{ fontSize: '15px' }}>抄送人</span>
          <div className={faction.cell}>
            <Cell>
              <select className={faction.select} >
                <option value=''>请选择</option>
                <option>李总</option>
                <option>王总</option>
              </select>
            </Cell>
          </div>
        </div>
        <div className={faction.centralTow} style={{ borderBottom: '0px solid rgb(197, 197, 197)', fontSize: '15px' }}>
          <span style={{ fontSize: '15px' }}>处理意见</span>
          <Cell className={faction.cell}>
            <textarea id="myTextarea" name="myTextarea" rows={8} cols={40} className={faction.text} />

          </Cell>
        </div>
      </div>

      <Sticky threshold={0} position="bottom">
        <Button style={{ width: '50vw', height: '40px', backgroundColor: '#f2f2f2', color: 'black', border: '0px' }} shape="square" >
          取消
        </Button>
        <Button style={{ width: '50vw', height: '40px', backgroundColor: '#0099ff', color: 'white', border: '0px' }} shape="square">
          确定
        </Button>
      </Sticky>
    </div >
  )
}

export default Faction;


