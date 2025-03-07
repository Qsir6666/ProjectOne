import React, { useState, useEffect, useRef } from "react";
import { NavBar, Toast, Picker, Cell, TextArea, Input, Form, Switch, Notify } from '@nutui/nutui-react';
import { ArrowLeft, Close, } from '@nutui/icons-react';
import { useNavigate } from "react-router-dom";
import sparkMD5 from 'spark-md5';
import axios from 'axios';
import report from '../../../css/report.module.css';

// 定义常量，每个文件分片的大小为 5MB
const CHUNK_SIZE = 5 * 1024 * 1024;

// 隐患类型选项接口
interface PickerOption {
    text: string | number;
    value: string | number;
    disabled?: boolean;
    children?: PickerOption[];
    className?: string | number;
}

const http = 'http://localhost:3000'
// 定义 Report 组件
const Report: React.FC = () => {
    // 用于页面导航
    const nav = useNavigate();
    // 隐患信息
    const [value, setValue] = useState<string>('');
    // 隐患类型选择器是否可见
    const [isVisible, setIsVisible] = useState<boolean>(false);
    // 所选隐患类型的描述
    const [baseDesc, setBaseDesc] = useState<string>('');
    // 所选隐患类型的值
    const [val, setVal] = useState<Array<number | string>>([]);
    // 隐患类型选项
    const [options, setoptions] = useState([]);
    // 隐患地点
    const [place, setPlace] = useState('')
    // 是否已处理
    const [checkedAsync, setCheckedAsync] = useState<boolean>(false);
    // 用于存储用户选择的文件
    const [file, setFile] = useState<File | null>(null);

    // 获取隐患类型
    const type = async () => {
        const { data: { code, typeFind } } =
            await axios.get(`${http}/YZY/type`)
        if (code == 200) {
            setoptions(typeFind)
        }
    }
    useEffect(() => {
        type()
    }, [])
    useEffect(() => {
        console.log(options);
    }, [options])
    // useEffect(())
    // 提交隐患

    const hiddenAdd = async () => {
        if (value !== '') {
            const { data: { code, msg } } =
                await axios.post("http://localhost:3000/YZY/hiddenAdd", {
                    type: val,
                    detail: value,
                    PhotosOrVideos: `${http}` + "/routes/uploads/" + file.name,
                    place: place,
                    dispose: checkedAsync,
                })
            if (code == 200) {
                Notify.success(msg)
                // setTimeout(()=>{
                //     nav('/layout')
                // },1000)
               
            }
        } else {
            Notify.danger("请输入隐患内容")
        }

    }

    // 确认选择隐患类型后的处理函数
    const confirmPicker = (
        options: PickerOption[],
        values: (string | number)[]
    ): void => {
        let description = '';
        options.forEach((option: PickerOption) => {
            description += ` ${option.text}`;
        });
        console.log(description, 'des');

        setBaseDesc(description);
    };

    // 上传进度
    const [uploadProgress, setUploadProgress] = useState<number>(0);
    // 用于防止重复触发上传逻辑
    const uploading = useRef<boolean>(false);

    // 处理文件选择事件
    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>): void => {
        console.log("触发");

        if (e.target.files && e.target.files.length > 0) {
            setFile(e.target.files[0]);
            setUploadProgress(0);
        }
    };

    // 计算文件的唯一标识 (哈希)
    const calculateFileHash = async (file: File): Promise<string> => {
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.onload = (e: ProgressEvent<FileReader>): void => {
                if (e.target && e.target.result instanceof ArrayBuffer) {
                    const hash = sparkMD5.ArrayBuffer.hash(e.target.result);
                    resolve(hash);
                }
            };
            reader.readAsArrayBuffer(file);
        });
    };

    // 开始文件上传
    const handleUpload = async (): Promise<void> => {
        if (!file || uploading.current) return;
        uploading.current = true;
        const fileHash = await calculateFileHash(file);
        // console.log('fileHash', fileHash);
        const totalChunks = Math.ceil(file.size / CHUNK_SIZE);
        // 检查哪些分片已经上传
        const { data: uploadedChunks } = await axios.post(
            'http://localhost:3000/YZY/check',
            {
                fileName: file.name,
                fileHash,
            },
        );

        // 上传未完成的分片
        for (let chunkIndex = 0; chunkIndex < totalChunks; chunkIndex++) {
            if (uploadedChunks?.includes(chunkIndex)) {
                console.log('跳过chunkIndx', chunkIndex);
                setUploadProgress(((chunkIndex + 1) / totalChunks) * 100);
                continue;
            }
            console.log('上传chunkIndx', chunkIndex);
            const start = chunkIndex * CHUNK_SIZE;
            const end = Math.min(file.size, start + CHUNK_SIZE);
            const chunk = file.slice(start, end);

            const formData = new FormData();
            formData.append('chunk', chunk);
            formData.append('fileName', file.name);
            formData.append('fileHash', fileHash);
            formData.append('chunkIndex', chunkIndex.toString());

            await axios.post(
                `http://localhost:3000/YZY/upload?fileHash=${fileHash}&chunkIndex=${chunkIndex}&fileName=${file.name}`,
                formData,
                {
                    onUploadProgress: (progressEvent: ProgressEvent): void => {
                        const progress =
                            ((chunkIndex + progressEvent.loaded / progressEvent.total) /
                                totalChunks) *
                            100;
                        setUploadProgress(progress);
                    },
                },
            );
        }

        // 通知服务端合并分片
        await axios.post('http://localhost:3000/YZY/merge', {
            fileName: file.name,
            fileHash,
            totalChunks,
        });

        Notify.success('上传成功！')
        uploading.current = false;
    };

    // 处理开关状态变化
    const onChangeAsync = (value: boolean, event: any): void => {
        Toast.show(`1秒后异步触发 ${value}`);
        setTimeout(() => {
            setCheckedAsync(value);
        }, 1000);
    };


    return (
        <div>
            {/* 头部 */}
            <NavBar
                right={<span onClick={() => { hiddenAdd(),handleUpload() }}>提交</span>}
                left={<Close onClick={() => Toast.show('取消')} />}
                back={<ArrowLeft />}
                onBackClick={() => { nav('/layout'); Toast.show('返回'); }}
            >
                <div className="title">
                    <span className="desc">上报隐患</span>
                </div>
            </NavBar>
            {/* 隐患类型 */}
            <Cell
                title="隐患类型"
                description={baseDesc}
                onClick={() => setIsVisible(!isVisible)}
            />
            <Picker
                title="请选择隐患类型"
                visible={isVisible}
                value={val}
                options={options}
                onConfirm={(list, values) => {
                    confirmPicker(list, values)
                    setVal(values)
                }}
                onClose={() => {
                    setIsVisible(false);
                }}
            />
            {/* 隐患描述信息 */}
            <TextArea
                value={value}
                onChange={(newValue) => setValue(newValue)}
                placeholder="请输入隐患描述信息..."
                style={{ height: '180px' }}
            />
            {/* 上传视频或图片 */}
            <Cell style={{ flexWrap: 'wrap', paddingBottom: '0px' }}>
                <input type="file" onChange={handleFileChange} id={report.fileInput} multiple
                    style={{ float: 'left' }} />
                {/* <button onClick={handleUpload}>提交上传文件</button> */}
                <div style={{ marginTop: '0px', marginLeft: "20px", }}>
                    <progress value={uploadProgress} max="100" />
                    <div>上传进度：{uploadProgress.toFixed(2)}%</div>
                </div>
            </Cell>
            {/* 隐患地点 */}
            <Form>
                <Form.Item label="隐患地点" name="username">
                    <Input
                        className="nut-input-text"
                        placeholder="请输入文本"
                        type="text"
                        onChange={(val) => setPlace(val)}
                    />
                </Form.Item>
                {/* 是否已处理 */}
                <Form.Item label="是否已处理">
                    <div style={{ lineHeight: '25px' }}>
                        <span style={{ float: 'left' }}>否</span>
                        <Switch
                            style={{ float: 'left', marginLeft: '5px' }}
                            checked={checkedAsync}
                            onChange={(value, event) => onChangeAsync(value, event)}
                        />
                        <span style={{ marginLeft: '5px' }}>是</span>
                    </div>
                </Form.Item>
            </Form>
        </div>
    );
};

export default Report;