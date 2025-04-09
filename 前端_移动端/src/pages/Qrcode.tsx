import React, { useEffect, useRef, useState } from 'react';
import QRCode from 'react-qr-code';
import { Overlay, Loading, ConfigProvider } from '@nutui/nutui-react'
import { QrCode, } from '@nutui/icons-react';

const QRCodeGenerator = ({
    value,
    buttonText = <QrCode></QrCode>,
    downloadText = '下载二维码 (JPEG)',
    size = 256,
    bgColor = '#ffffff',
    fgColor = '#000000',
    level = 'Q',
}) => {

    const qrCodeRef = useRef(null); // 引用二维码的 <svg> 元素

    const downloadQRCode = () => {
        if (qrCodeRef.current) {
            const svg = qrCodeRef.current; // 获取 <svg> 元素
            const svgData = new XMLSerializer().serializeToString(svg); // 将 <svg> 转换为字符串
            // 创建 <canvas> 元素
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            // 设置 canvas 尺寸与二维码一致
            canvas.width = size;
            canvas.height = size;
            // 将 SVG 绘制到 canvas 上
            const img = new Image();
            img.onload = () => {
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                // 将 canvas 转换为 JPEG 并下载
                const url = canvas.toDataURL('image/jpeg', 1.0); // 1.0 表示最高质量
                const link = document.createElement('a');
                link.href = url;
                link.download = 'qrcode.jpg'; // 下载文件名
                link.click();
            };
            img.src = `data:image/svg+xml;base64,${btoa(svgData)}`;
        }
    };

    const [visible, setVisible] = useState(false)
    const wrapperStyle = {
        display: 'flex',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    }

    const [a, seta] = useState(false)
    const handleToggleShow = () => {
        setVisible(true)
        setTimeout(() => {
            // setVisible(false)
            seta(true)
        }, 2000)
    }
    const onClose = () => {
        setVisible(false)
    }


    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <button
                onClick={() => handleToggleShow()}
                style={{ padding: '1px 1px', }}
            >
                {buttonText}
            </button>


            <Overlay visible={visible} onClick={onClose}>
                <div className="wrapper" style={wrapperStyle}>
                    {a ? undefined : <Loading>生成中</Loading>}
                    {a ? <div>
                        <div>
                            <QRCode
                                ref={qrCodeRef}
                                value={value} // 二维码内容
                                size={size} // 二维码大小
                                bgColor={bgColor} // 背景颜色
                                fgColor={fgColor} // 前景颜色
                                level={level} // 容错级别（L/M/Q/H）
                            />
                        </div>
                        <button
                            onClick={downloadQRCode}
                            style={{ marginTop: '20px', padding: '10px 20px', fontSize: '16px' }}
                        >
                            {downloadText}
                        </button>
                    </div> : undefined}

                </div>
            </Overlay>
        </div>
    );
};

export default QRCodeGenerator;