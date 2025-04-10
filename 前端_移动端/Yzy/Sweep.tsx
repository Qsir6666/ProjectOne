import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { NavBar, Button } from "@nutui/nutui-react";
import { ArrowLeft, Close } from "@nutui/icons-react";
import Sweep from "../../../css/sweep.module.css";
import { jsQR } from "jsqr";

interface QRCodeResult {
  type: 'internal' | 'external';
  content: string;
  timestamp: string;
  data?: {
    _id: string;
    state: string;
    detail: string;
    place: string;
    PhotosOrVideos: string;
  };
}

const App: React.FC = () => {
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [lastResult, setLastResult] = useState<QRCodeResult | null>(null);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [isFlashlightOn, setIsFlashlightOn] = useState(false);
  const streamRef = useRef<MediaStream | null>(null);

  const startScanning = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" }
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
        setIsScanning(true);
        setHasPermission(true);
        scanQRCode();
      }
    } catch (error) {
      console.error("无法访问摄像头:", error);
      setHasPermission(false);
    }
  };

  const stopScanning = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setIsScanning(false);
  };

  const scanQRCode = () => {
    if (!isScanning || !videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    if (!context) return;

    const scanFrame = () => {
      if (video.readyState === video.HAVE_ENOUGH_DATA) {
        canvas.height = video.videoHeight;
        canvas.width = video.videoWidth;
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
        const code = jsQR(imageData.data, imageData.width, imageData.height);

        if (code) {
          handleScanResult(code.data);
          stopScanning();
        } else {
          requestAnimationFrame(scanFrame);
        }
      } else {
        requestAnimationFrame(scanFrame);
      }
    };

    requestAnimationFrame(scanFrame);
  };

  const handleScanResult = (result: string) => {
    if (result.startsWith('YZY_')) {
      const [prefix, id, state, detail, place, photos] = result.split('_');
      const hazardData = {
        _id: id,
        state: state,
        detail: decodeURIComponent(detail),
        place: decodeURIComponent(place),
        PhotosOrVideos: decodeURIComponent(photos)
      };
      setLastResult({
        type: 'internal',
        content: result,
        timestamp: new Date().toISOString(),
        data: hazardData
      });
      
      if (state === '1') {
        navigate('/Chuli', { state: hazardData });
      } else {
        navigate('/Detail', { state: hazardData });
      }
    } else {
      setLastResult({
        type: 'external',
        content: result,
        timestamp: new Date().toISOString()
      });
    }
  };

  const handleResultClick = () => {
    if (lastResult?.type === 'internal' && lastResult.data) {
      const hazardData = lastResult.data;
      if (hazardData.state === '1') {
        navigate('/Chuli', { state: hazardData });
      } else {
        navigate('/Detail', { state: hazardData });
      }
    }
  };

  const toggleFlashlight = async () => {
    if (!streamRef.current) return;

    const videoTrack = streamRef.current.getVideoTracks()[0];
    if (!videoTrack) return;

    try {
      await videoTrack.applyConstraints({
        advanced: [{ torch: !isFlashlightOn } as any]
      });
      setIsFlashlightOn(!isFlashlightOn);
    } catch (error) {
      console.error("无法切换闪光灯:", error);
    }
  };

  useEffect(() => {
    return () => {
      stopScanning();
    };
  }, []);

  return (
    <div className={Sweep.aaaaaa}>
      <NavBar
        className={Sweep.navbarOne}
        left={<Close />}
        back={<ArrowLeft />}
        onBackClick={() => navigate("/layout")}
      >
        <div className="title">
          <span className="desc">扫描二维码</span>
        </div>
      </NavBar>

      <div className={Sweep.scannerContainer}>
        {!isScanning ? (
          <div className={Sweep.startButtonContainer}>
            <Button type="primary" onClick={startScanning}>
              开始扫描
            </Button>
          </div>
        ) : (
          <>
            <video
              ref={videoRef}
              autoPlay
              playsInline
              className={Sweep.videoElement}
            />
            <canvas ref={canvasRef} style={{ display: "none" }} />
            <div className={Sweep.controls}>
              <Button type="primary" onClick={stopScanning}>
                停止扫描
              </Button>
              <Button type="primary" onClick={toggleFlashlight}>
                {isFlashlightOn ? "关闭闪光灯" : "打开闪光灯"}
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default App;