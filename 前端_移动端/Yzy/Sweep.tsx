import React, { useRef, useEffect, useState } from 'react';
import { NavBar, Toast, Dialog } from '@nutui/nutui-react';
import { ArrowLeft, Image as NutImage, Eye } from '@nutui/icons-react';
import { useNavigate } from 'react-router-dom';
import jsQR from 'jsqr';
import styles from '../src/css/sweep.module.css';
import axios from 'axios';
// 引入axios配置
const BASE_URL = 'http://127.0.0.1:3000';

interface QRCodeResult {
  type: 'internal' | 'external' | 'unknown';
  content: string;
  timestamp: number;
  data?: {
    _id: string;
    state: string;
    detail: string;
    place: string;
    PhotosOrVideos: string;
    time?: string | Date;
  };
}

const Sweep: React.FC = () => {
    const nav = useNavigate();
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [qrCodeData, setQrCodeData] = useState<string | null>(null);
  const [scanning, setScanning] = useState(true);
  const [flashlightOn, setFlashlightOn] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastResult, setLastResult] = useState<QRCodeResult | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const animationFrameRef = useRef<number | null>(null);

        const startCamera = async () => {
            try {
      setError(null);
                const stream = await navigator.mediaDevices.getUserMedia({
        video: { 
          facingMode: 'environment',
          width: { ideal: 1920 },
          height: { ideal: 1080 }
        }
      });
      
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                    videoRef.current.onloadedmetadata = () => {
          setScanning(true);
                        scanQRCode();
                    };
        streamRef.current = stream;
                }
            } catch (error) {
                console.error('无法访问摄像头', error);
      setError('请允许访问摄像头以继续使用此功能');
    }
  };

  const stopCamera = () => {
    setScanning(false);
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => {
        track.stop();
      });
      videoRef.current.srcObject = null;
    }
  };

  useEffect(() => {
        startCamera();
        return () => {
      stopCamera();
        };
    }, []);

  const toggleFlashlight = async () => {
    try {
      if (videoRef.current?.srcObject) {
            const stream = videoRef.current.srcObject as MediaStream;
        const track = stream.getVideoTracks()[0];
        
        // 检查是否支持闪光灯
        const capabilities = track.getCapabilities();
        if (capabilities && 'torch' in capabilities) {
          const constraints = {
            advanced: [{ torch: !flashlightOn } as MediaTrackConstraintSet]
          };
          await track.applyConstraints(constraints);
          setFlashlightOn(!flashlightOn);
        } else {
          setError('您的设备不支持闪光灯控制');
        }
      }
    } catch (error) {
      console.error('闪光灯控制失败:', error);
      setError('无法控制闪光灯');
        }
    };

    const scanQRCode = () => {
    if (!scanning || !videoRef.current || !canvasRef.current) return;

        const video = videoRef.current;
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');

        if (!context) return;

        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        if (canvas.width > 0 && canvas.height > 0) {
            context.drawImage(video, 0, 0, canvas.width, canvas.height);
            const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
            const code = jsQR(imageData.data, imageData.width, imageData.height, {
                inversionAttempts: 'dontInvert',
            });

            if (code) {
        // console.log('扫描到二维码:', code.data);
        setQrCodeData(code.data);
        stopCamera();
        handleScanResult(code.data);
      } else if (scanning) {
                requestAnimationFrame(scanQRCode);
            }
    } else if (scanning) {
            requestAnimationFrame(scanQRCode);
        }
    };

  const handleScanResult = (qrCodeContent: string) => {
    try {
      // console.log('扫描到的二维码内容:', qrCodeContent);
      
      // 检查是否是隐患二维码
      if (qrCodeContent.startsWith('YZY_')) {
        // 尝试提取信息
        const parts = qrCodeContent.split('_');
        if (parts.length >= 3) {  // 至少需要ID和状态
          const _id = parts[1];
          const state = parts[2];
          
          // 显示加载提示
          Toast.show({
            content: '正在处理二维码内容...'
          });
          
          // 构建隐患信息对象并跳转
          const hazardData = {
            _id: _id,
            state: state,
            detail: parts.length >= 4 ? decodeURIComponent(parts[3]) : '',
            place: parts.length >= 5 ? decodeURIComponent(parts[4]) : '',
            PhotosOrVideos: parts.length >= 6 ? decodeURIComponent(parts[5]) : ''
          };
          
          // console.log('解析的隐患数据:', hazardData);
          
          // 更新最后扫描结果
          setLastResult({
            type: 'internal',
            content: '发现隐患信息，点击查看详情',
            data: hazardData,
            timestamp: Date.now()
          });
          
          // 根据状态处理不同的情况
          if (state === '1') {
            Toast.show({
              onClose: () => {
                // 跳转到处理页面
                nav('/Chuli', { 
                  state: hazardData
                });
              }
            });
          } else if (state === '2') {
            Toast.show({
              onClose: () => {
                nav('/Chuli', { 
                  state: hazardData
                });
              }
            });
          } else if (state === '3') {
            Toast.show({
              onClose: () => {
                nav('/Chuli', { 
                  state: hazardData
                });
              }
            });
          } else {
            Toast.show('未知的隐患状态');
          }
        } else {
          // 二维码格式不正确
          Toast.show('二维码格式不正确');
          setLastResult({
            type: 'unknown',
            content: '二维码格式不正确，格式应为: YZY_ID_状态_描述_地点_图片',
            timestamp: Date.now()
          });
        }
      } else if (qrCodeContent.startsWith('http://') || qrCodeContent.startsWith('https://')) {
        setLastResult({
          type: 'external',
          content: qrCodeContent,
          timestamp: Date.now()
        });
        Toast.show('发现外部链接');
      } else {
        setLastResult({
          type: 'unknown',
          content: qrCodeContent,
          timestamp: Date.now()
        });
        Toast.show('未知类型的二维码');
      }
    } catch (error) {
      console.error('处理二维码内容时出错:', error);
      setLastResult({
        type: 'unknown',
        content: `二维码解析失败: ${error instanceof Error ? error.message : '未知错误'}`,
        timestamp: Date.now()
      });
      Toast.show('二维码解析失败，请重试');
    }
  };

  const handleResultClick = () => {
    if (lastResult?.type === 'internal' && lastResult.data) {
      nav('/Chuli', { 
        state: lastResult.data
      });
    }
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setError(null);
      const image = await loadImage(file);
      decodeQRCodeFromImage(image);
    } catch (error) {
      console.error('图片处理失败:', error);
      setError('图片加载失败，请选择正确的图片文件');
    }
  };

  const loadImage = (file: File): Promise<HTMLImageElement> => {
    return new Promise((resolve, reject) => {
            const reader = new FileReader();
      const img = document.createElement('img');
      
            reader.onload = (e) => {
        if (e.target?.result) {
          img.onload = () => resolve(img);
          img.onerror = () => reject(new Error('图片加载失败'));
          img.src = e.target.result as string;
        } else {
          reject(new Error('文件读取失败'));
        }
      };
      
      reader.onerror = () => reject(new Error('文件读取失败'));
      reader.readAsDataURL(file);
    });
    };

    const decodeQRCodeFromImage = (image: HTMLImageElement) => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
    if (!ctx) {
      setError('无法创建画布上下文');
      return;
    }

    canvas.width = image.naturalWidth;
    canvas.height = image.naturalHeight;
        ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

    try {
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const code = jsQR(imageData.data, imageData.width, imageData.height, {
            inversionAttempts: 'dontInvert', 
        });

        if (code) {
        setQrCodeData(code.data);
        handleScanResult(code.data);
        } else {
        setError('未检测到二维码，请确保图片清晰可见');
      }
    } catch (error) {
      console.error('二维码解析错误:', error);
      setError('二维码解析失败，请重试');
    }
  };

    return (
    <div className={styles.box}>
            <NavBar
        style={{ backgroundColor: 'transparent', position: 'fixed', width: '100%', zIndex: 10 }}
                back={<ArrowLeft style={{ color: 'white' }} />}
        onBackClick={() => {
          stopCamera();
          nav(-1);
        }}
      />

      {error && (
        <div className={styles.result}>
          <p>{error}</p>
        </div>
      )}

      <div className={styles.mask} />
      
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className={styles.video}
      />
      <canvas ref={canvasRef} style={{ display: 'none' }} />

      <div className={styles.boxOne}>
        <div className={styles.boxsweep}>
          <div className={styles.corner}></div>
          <div className={styles.corneri}></div>
          <div className={styles.cornerl}></div>
          <div className={styles.cornerb}></div>
          <div className={styles.scanLine}></div>
                </div>
            </div>

      <div className={styles.boxToe}>
        <div>将二维码放入框内，即可自动扫描</div>
            </div>

      <div className={styles.toolbar}>
        <div className={styles.toolItem}>
                <input
                    type="file"
            accept="image/*"
                    ref={fileInputRef}
                    onChange={handleFileChange}
            style={{ display: 'none' }}
                />
                <div
            className={styles.toolIcon}
            onClick={() => fileInputRef.current?.click()}
          >
            <NutImage className={styles.albumIcon} />
          </div>
          <p className={styles.toolText}>相册</p>
        </div>

        <div 
          className={styles.toolItem}
          onClick={toggleFlashlight}
        >
          <div className={styles.toolIcon}>
            <Eye className={styles.albumIcon} />
          </div>
          <p className={styles.toolText}>照明</p>
                </div>
            </div>

      {lastResult && (
        <div className={styles.result} onClick={handleResultClick}>
          <p>类型: {lastResult.type}</p>
          {lastResult.type === 'internal' && lastResult.data && (
            <>
              <p>隐患描述: {lastResult.data.detail}</p>
              <p>隐患地点: {lastResult.data.place}</p>
              <p>状态: {
                lastResult.data.state === '1' ? '未处理' : 
                lastResult.data.state === '2' ? '处理中' : 
                lastResult.data.state === '3' ? '已完成' : '未知状态'
              }</p>
              <p style={{ color: 'blue', textDecoration: 'underline' }}>点击查看详情</p>
            </>
          )}
          {lastResult.type === 'external' && (
            <p>外部链接: <a href={lastResult.content} target="_blank" rel="noopener noreferrer">{lastResult.content}</a></p>
          )}
          {lastResult.type === 'unknown' && (
            <p>未知内容: {lastResult.content}</p>
          )}
        </div>
      )}
        </div>
    );
};

export default Sweep;