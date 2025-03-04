import React, { useState, useEffect } from "react";
import { NavBar, Toast, Picker, Cell, TextArea, Uploader, Input, Form, Switch } from '@nutui/nutui-react'
import { ArrowLeft, Close, Dongdong } from '@nutui/icons-react'
// import Form from '@/packages/form'

// 隐患类型
interface PickerOption {
    text: string | number
    value: string | number
    disabled?: boolean
    children?: PickerOption[]
    className?: string | number
}
// ////////
const Report: React.FC = () => {
    // 隐患信息
    const [value, setValue] = useState('')
    // 隐患类型
    const [isVisible, setIsVisible] = useState(false)
    const [baseDesc, setBaseDesc] = useState('')
    const [val, setVal] = useState<Array<number | string>>([])
    const options = [
        [
            { value: 1, text: '南京市' },
            { value: 2, text: '无锡市' },
            { value: 3, text: '海北藏族自治区' },
            { value: 4, text: '北京市' },
            { value: 5, text: '连云港市' },
            { value: 8, text: '大庆市' },
            { value: 9, text: '绥化市' },
            { value: 10, text: '潍坊市' },
            { value: 12, text: '乌鲁木齐市' },
        ],
    ]
    const confirmPicker = (
        options: PickerOption[],
        values: (string | number)[]
    ) => {
        let description = ''
        options.forEach((option: any) => {
            description += ` ${option.text}`
        })
        setBaseDesc(description)
    }
    // 上传视频或图片
    const uploadUrl = 'https://my-json-server.typicode.com/linrufeng/demo/posts'
    const onStart = () => {
        console.log('start触发')
    }
    const beforeUpload = async (files: File[]) => {
        const allowedTypes = ['image/png']
        const filteredFiles = Array.from(files).filter((file) =>
            allowedTypes.includes(file.type)
        )
        return filteredFiles
    }
    // 是否已处理
    const [checkedAsync, setCheckedAsync] = useState(true)
    const onChangeAsync = (value: boolean, event: any) => {
        // Toast.show(`2秒后异步触发 ${value}`)
        // setTimeout(() => {
        setCheckedAsync(value)
        // }, 2000)
    }
    return (
        <div>
            {/* 头部 */}
            <NavBar
                right={<span onClick={(e) => Toast.show('提交')}>提交</span>}
                left={<Close onClick={(e) => Toast.show('取消')} />}
                back={<ArrowLeft />}
                onBackClick={(e) => Toast.show('返回')}
            >
                <div className="title">
                    {/* <span onClick={(e) => Toast.show('标题')}>浏览记录</span> */}
                    <span className="desc">上报隐患</span>
                </div>
            </NavBar>
            {/* 隐患类型 */}
            <Cell
                title="请选择城市"
                description={baseDesc}
                onClick={() => setIsVisible(!isVisible)}
            />
            <Picker
                title="请选择城市"
                visible={isVisible}
                value={val}
                options={options}
                onConfirm={(list, values) => {
                    confirmPicker(list, values)
                    setVal(values)
                }}
                onClose={() => {
                    setIsVisible(false)
                }}
            />
            {/* 隐患描述信息 */}
            {/* <Cell > */}
            <TextArea value={value} onChange={(value) => setValue(value)}
                placeholder="请输入隐患描述信息..." style={{ height: '180px' }}>

            </TextArea>
            {/* 上传视频或图片 */}
            <Uploader
                url={uploadUrl}
                uploadLabel="商品主图"
                onStart={onStart}
                style={{ marginInlineEnd: '2px', marginBottom: '10px', marginLeft: '20px' }}
            />
            {/* </Cell> */}
            {/* 隐藏地点 */}
            {/* <Cell style={{marginTop:'50px'}}> */}
            <Form >
                <Form.Item label="隐患地点" name="username">
                    <Input
                        className="nut-input-text"
                        placeholder="请输入文本"
                        type="text"
                        onChange={(val) => {
                            console.log('change value:', val)
                        }}
                    />
                </Form.Item>
                {/* 是否已处理 */}
                <Form.Item label="是否已处理"  >
                    <div style={{ lineHeight: '25px' }}>
                        <span style={{ float: 'left' }}>否</span>
                        <Switch style={{ float: 'left', marginLeft: '5px' }}
                            checked={checkedAsync}
                            onChange={(value, event) => onChangeAsync(value, event)}
                        />
                        <span style={{ marginLeft: '5px' }}>是</span>
                    </div>

                </Form.Item>
            </Form>
            {/* </Cell> */}

        </div>
    )
}

export default Report;