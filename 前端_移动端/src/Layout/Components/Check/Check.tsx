import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { NavBar, Sticky, Button, Loading, Toast } from "@nutui/nutui-react";
import { ArrowLeft, Close, Add, QrCode } from "@nutui/icons-react";
import Check from "../../../css/check.module.css";
import userService from "../../../../axios/userService";
import TimeFormatter from "../../../pages/TimeFormatter";
import QRCodeGenerator from "../../../pages/Qrcode";
import QRCodeSVG from "qrcode.react";

// 定义用户信息的类型
interface UserInfo {
  imgs: string;
  userName: string;
  school: string;
}

// 定义隐患信息的类型
interface HiddenInfo {
  _id: string;
  userName: UserInfo;
  state: number;
  time: string | Date;
  detail: string;
  PhotosOrVideos: string;
  place: string;
}

// 定义组件
const App: React.FC = () => {
  const navigate = useNavigate();
  const [login, setLogin] = useState<any[]>([]);
  const [hidden, setHidden] = useState<HiddenInfo[]>([]);
  const [audit, setAudit] = useState(0);
  const [dispose, setDispose] = useState(0);
  const [finish, setFinish] = useState(0);
  const [cate, setCate] = useState("1");
  const [hiddenTow, setHiddenTow] = useState<HiddenInfo[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const details = (i: HiddenInfo) => {
    navigate("/Detail", { state: { ...i } });
  };

  // 获取登录用户
  const getLogin = async () => {
    try {
      const data = await userService.login();
      setLogin(data);
    } catch (error) {
      console.error("加载登陆用户信息失败", error);
    } finally {
      // 检查是否两个请求都完成
      if (!isLoadingUser) {
        setIsLoading(false);
      }
    }
  };

  // 获取上报的隐患信息
  const getHidden = async () => {
    try {
      const hiddenData = await userService.hiddenUsers();
      setHidden(hiddenData);
    } catch (error) {
      console.error("加载隐患信息失败", error);
    } finally {
      // 检查是否两个请求都完成
      if (!isLoadingHidden) {
        setIsLoading(false);
      }
    }
  };

  const [isLoadingUser, setIsLoadingUser] = useState(true);
  const [isLoadingHidden, setIsLoadingHidden] = useState(true);

  const hiddenNum = () => {
    const stateCount = { 1: 0, 2: 0, 3: 0 };

    hidden.forEach((item: HiddenInfo) => {
      if (stateCount.hasOwnProperty(item.state)) {
        stateCount[item.state]++;
      }
    });
    const { 1: stateS, 2: stateB, 3: stateC } = stateCount;
    setAudit(stateS);
    setDispose(stateB);
    setFinish(stateC);
  };

  // 类别筛选
  useEffect(() => {
    hiddenNum();
  }, [hidden]);

  useEffect(() => {
    setIsLoading(true);
    setIsLoadingUser(true);
    setIsLoadingHidden(true);
    const fetchData = async () => {
      try {
        await Promise.all([
          (async () => {
            await getLogin();
            setIsLoadingUser(false);
          })(),
          (async () => {
            await getHidden();
            setIsLoadingHidden(false);
          })()
        ]);
      } finally {
        if (!isLoadingUser && !isLoadingHidden) {
          setIsLoading(false);
        }
      }
    };
    fetchData();
  }, []);

  const sx = () => {
    let acc = [...hidden];
    acc = hidden.filter((item: HiddenInfo) => item.state.toString() === cate);
    console.log(acc);
    setHiddenTow([...acc]);
  };

  useEffect(() => {
    sx();
  }, [cate]);

  const renderQRCode = (item: HiddenInfo) => {
    // 构建二维码内容，确保与扫描端格式匹配
    const qrContent = `YZY_${item._id}_${item.state}_${encodeURIComponent(item.detail)}_${encodeURIComponent(item.place)}_${encodeURIComponent(item.PhotosOrVideos)}`;

    return (
      <QRCodeGenerator 
        value={qrContent}
        options={{
          errorCorrectionLevel: 'H',
          margin: 1,
          scale: 4,
          width: 128,
          color: {
            dark: '#000000',
            light: '#ffffff'
          }
        }}
      />
    );
  };

  return (
    <>
      {isLoading && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-500 bg-opacity-50 z-50">
          <Loading text="正在加载..." />
        </div>
      )}
      <div className={Check.aaaaaa}>
        <NavBar
          className={Check.navbarOne}
          right={
            <span onClick={(e) => navigate("/report")}>
              <Add />
            </span>
          }
          left={<Close />}
          back={<ArrowLeft />}
          onBackClick={(e) => {
            navigate("/layout");
          }}
        >
          <div className="title">
            <span className="desc">隐患排查</span>
          </div>
        </NavBar>
        <div className={Check.boxOne}>
          <ul className={Check.boxUl}>
            <li
              onClick={() => setCate("1")}
              className={cate === "1" ? Check.li_active : ""}
            >
              待审核 ({audit})
            </li>
            <li
              onClick={() => setCate("2")}
              className={cate === "2" ? Check.li_active : ""}
            >
              处理中 ({dispose})
            </li>
            <li
              onClick={() => setCate("3")}
              className={cate === "3" ? Check.li_active : ""}
            >
              已完成 ({finish})
            </li>
          </ul>
        </div>
      </div>
      <div className={Check.box}>
        {hiddenTow.length > 0 &&
          hiddenTow.map((i: HiddenInfo) => (
            <div className={Check.boxTow} key={i.time + i.detail}>
              <div className={Check.head} onClick={() => details(i)}>
                <div className={Check.headLeft}>
                  <div style={{ float: "left" }}>
                    <img
                      src={i.userName.imgs}
                      alt=""
                      width={45}
                      height={45}
                      style={{ borderRadius: "50px" }}
                    />
                  </div>
                  <div style={{ marginLeft: "10px" }}>
                    <ul style={{ listStyle: "none" }}>
                      <li style={{ fontSize: "16px" }}>
                        {i.userName.userName}
                      </li>
                      <li>{i.userName.school}</li>
                    </ul>
                  </div>
                </div>
                <div className={Check.headRight}>
                  <div
                    className={Check.headFont}
                    style={{
                      backgroundColor:
                        i.state == 1
                          ? "#ffcc66"
                          : i.state == 2
                          ? "#ff6600"
                          : i.state == 3
                          ? "#00cc00"
                          : "#ff6600",
                    }}
                  >
                    {i.state == 1
                      ? "待审查"
                      : i.state == 2
                      ? "处理中"
                      : i.state == 3
                      ? "已完成"
                      : "我的"}
                  </div>
                </div>
              </div>
              <div className={Check.buttom}>
                <ul
                  style={{
                    listStyle: "none",
                    fontSize: "17px",
                    marginTop: "10px",
                    marginLeft: "10px",
                  }}
                >
                  <li>
                    上报时间：
                    <TimeFormatter date={i.time} format="YYYY-MM-DD HH:mm:ss" />
                  </li>
                  <li>隐患描述：{i.detail}</li>
                  <li style={{ marginTop: "7px", marginLeft: "5px" }}>
                    <img src={i.PhotosOrVideos} width="90px" height="80px" />
                  </li>
                </ul>

                <div className={Check.erwei}>
                  {renderQRCode(i)}
                </div>
              </div>
            </div>
          ))}
        {!hiddenTow.length > 0 &&
          hidden.map((i: HiddenInfo) => {
            if (i.state.toString() === cate) {
              return (
                <div className={Check.boxTow} key={i.time + i.detail}>
                  <div className={Check.head} onClick={() => details(i)}>
                    <div className={Check.headLeft}>
                      <div style={{ float: "left" }}>
                        <img
                          src={i.userName.imgs}
                          alt=""
                          width={45}
                          height={45}
                          style={{
                            backgroundColor: "red",
                            borderRadius: "50px",
                          }}
                        />
                      </div>
                      <div style={{ marginLeft: "10px" }}>
                        <ul style={{ listStyle: "none" }}>
                          <li style={{ fontSize: "16px" }}>
                            {i.userName.userName}
                          </li>
                          <li>{i.userName.school}</li>
                        </ul>
                      </div>
                    </div>
                    <div className={Check.headRight}>
                      <div
                        className={Check.headFont}
                        style={{
                          backgroundColor:
                            i.state == 1
                              ? "#ffcc66"
                              : i.state == 2
                              ? "#ff6600"
                              : i.state == 3
                              ? "#00cc00"
                              : "#ff6600",
                        }}
                      >
                        {i.state == 1
                          ? "待审查"
                          : i.state == 2
                          ? "处理中"
                          : i.state == 3
                          ? "已完成"
                          : "我的"}
                      </div>
                    </div>
                  </div>
                  <div className={Check.buttom}>
                    <ul
                      style={{
                        listStyle: "none",
                        fontSize: "17px",
                        marginTop: "10px",
                        marginLeft: "10px",
                      }}
                    >
                      <li>
                        上报时间：
                        <TimeFormatter
                          date={i.time}
                          format="YYYY-MM-DD HH:mm:ss"
                        />
                      </li>
                      <li>隐患描述：{i.detail}</li>
                      <li style={{ marginTop: "7px", marginLeft: "5px" }}>
                        <img
                          src={i.PhotosOrVideos}
                          width="90px"
                          height="80px"
                        />
                      </li>

                      <div className={Check.erwei}>
                        {renderQRCode(i)}
                      </div>
                    </ul>
                  </div>
                </div>
              );
            }
            return null;
          })}
      </div>
    </>
  );
};

export default App;
    