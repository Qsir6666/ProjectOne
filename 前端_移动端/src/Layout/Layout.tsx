import React from "react";
import { useNavigate, Outlet, useLocation } from 'react-router-dom'
import { TabBar } from 'antd-mobile'
import './Layout.css'

const Layout: React.FC = () => {
  const location = useLocation();
  const pathname = location.pathname;

  return (
    <div className='LayoutPage'>
      <div className='LayoutPage_content' style={{ flex: 1, overflowY: 'auto' }}>
        <Outlet />
      </div>
      
      {pathname !== '/layout/report' ||  '/layout/examine' ? <div className='LayoutPage_tabbar'>
        <LayoutPage_Tabbar />
      </div> : undefined}    
    </div>
  );
}
export default Layout;


interface TabItem {
  key: string;
  title: string;
  icon: React.ReactNode;
}

// 自定义底部TabBar组件
const LayoutPage_Tabbar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;

  const setRouteActive = (value: string) => {
    navigate(value);
  };

  const tabs: TabItem[] = [
    {
      key: '/layout',
      title: '首页',
      icon: pathname === '/layout/index' ?
        <svg width="25" height="25" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="824"><path d="M554.688 810.688h256V425.728L512 193.408l-298.688 232.32v384.96h256v-256h85.376v256z m341.312 42.624a42.624 42.624 0 0 1-42.688 42.688H170.688A42.624 42.624 0 0 1 128 853.312V404.928a42.688 42.688 0 0 1 16.448-33.728l341.376-265.472a42.688 42.688 0 0 1 52.352 0L879.552 371.2a42.624 42.624 0 0 1 16.448 33.728v448.384z" fill="#F68D96" p-id="825" data-spm-anchor-id="a313x.manage_type_mylikes.0.i0.6e723a81jfxWlo"></path></svg>
        :
        <svg width="25" height="25" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="824"><path d="M554.688 810.688h256V425.728L512 193.408l-298.688 232.32v384.96h256v-256h85.376v256z m341.312 42.624a42.624 42.624 0 0 1-42.688 42.688H170.688A42.624 42.624 0 0 1 128 853.312V404.928a42.688 42.688 0 0 1 16.448-33.728l341.376-265.472a42.688 42.688 0 0 1 52.352 0L879.552 371.2a42.624 42.624 0 0 1 16.448 33.728v448.384z" fill="#cdcdcd" p-id="825" data-spm-anchor-id="a313x.manage_type_mylikes.0.i0.6e723a81jfxWlo"></path></svg>
    },
    {
      key: '/layout/msg',
      title: '消息',
      icon: pathname === '/layout/message' ?
        <svg width="25" height="25" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="17135"><path d="M511.6 130.1C267 130.1 68 277.4 68 458.3c0 101 61.4 194.8 167 256.6 2.4 1.7 5 3.4 7.6 5.1 13.8 9.1 22.4 15.3 24.6 26.9 2.9 15.3-3.6 48.1-51.5 117.2-4.5 6.5-4.7 14.9-0.6 21.6 3.6 5.9 10 9.4 16.8 9.4 0.9 0 1.9-0.1 2.8-0.2 45.3-6.5 102.1-37.2 144.8-78.2 32.9-31.6 46.3-34.1 60.4-34.1 2.6 0 5.2 0.1 6.8 0.2 24.3 2.6 44.9 3.9 64.9 3.9 244.6 0 443.5-147.2 443.5-328.2 0-181.1-199-328.4-443.5-328.4z m0 617c-18.6 0-37.8-1.2-61.8-3.7-30.7-1.6-53.5 2.4-97.7 44.9-23.6 22.7-50.2 39.9-74.2 51.4 23.9-42.3 32.9-74.8 28-100.1-5.5-28.5-26.3-42.3-41.6-52.3-2.3-1.5-4.5-3-8.1-5.4-94.6-55.4-148.8-136.8-148.8-223.4 0-159.2 181.3-288.8 404.1-288.8s404.1 129.5 404.1 288.8-181.2 288.6-404 288.6z m-25.2-518.4c-176.4 0-319.8 106.8-319.8 238.2 0 10.9 8.8 19.7 19.7 19.7 10.9 0 19.7-8.8 19.7-19.7 0-109.6 125.8-198.7 280.4-198.7 10.9 0 19.7-8.8 19.7-19.7 0.1-11-8.8-19.8-19.7-19.8z" fill="#F68D96" p-id="17136"></path></svg>
        :
        <svg width="25" height="25" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="17135"><path d="M511.6 130.1C267 130.1 68 277.4 68 458.3c0 101 61.4 194.8 167 256.6 2.4 1.7 5 3.4 7.6 5.1 13.8 9.1 22.4 15.3 24.6 26.9 2.9 15.3-3.6 48.1-51.5 117.2-4.5 6.5-4.7 14.9-0.6 21.6 3.6 5.9 10 9.4 16.8 9.4 0.9 0 1.9-0.1 2.8-0.2 45.3-6.5 102.1-37.2 144.8-78.2 32.9-31.6 46.3-34.1 60.4-34.1 2.6 0 5.2 0.1 6.8 0.2 24.3 2.6 44.9 3.9 64.9 3.9 244.6 0 443.5-147.2 443.5-328.2 0-181.1-199-328.4-443.5-328.4z m0 617c-18.6 0-37.8-1.2-61.8-3.7-30.7-1.6-53.5 2.4-97.7 44.9-23.6 22.7-50.2 39.9-74.2 51.4 23.9-42.3 32.9-74.8 28-100.1-5.5-28.5-26.3-42.3-41.6-52.3-2.3-1.5-4.5-3-8.1-5.4-94.6-55.4-148.8-136.8-148.8-223.4 0-159.2 181.3-288.8 404.1-288.8s404.1 129.5 404.1 288.8-181.2 288.6-404 288.6z m-25.2-518.4c-176.4 0-319.8 106.8-319.8 238.2 0 10.9 8.8 19.7 19.7 19.7 10.9 0 19.7-8.8 19.7-19.7 0-109.6 125.8-198.7 280.4-198.7 10.9 0 19.7-8.8 19.7-19.7 0.1-11-8.8-19.8-19.7-19.8z" fill="#cdcdcd" p-id="17136"></path></svg>
    },
    {
      key: '/layout/mine',
      title: '我的',
      icon: pathname === '/layout/mine' ?
        <svg width="25" height="25" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="18521"><path d="M498.176 702.464c178.176 0 323.584-145.408 323.584-323.584s-145.408-323.584-323.584-323.584S174.592 200.704 174.592 378.88s145.408 323.584 323.584 323.584z m0-585.728c144.384 0 262.144 117.76 262.144 262.144 0 144.384-117.76 262.144-262.144 262.144s-262.144-117.76-262.144-262.144c0-144.384 117.76-262.144 262.144-262.144zM911.872 913.92c-108.544-115.712-255.488-179.712-413.696-179.712-151.552 0-293.888 58.88-400.896 166.4-11.776 11.776-11.776 31.232 0 43.52 11.776 11.776 31.232 11.776 43.52 0 95.232-95.744 221.696-147.968 356.864-147.968 140.8 0 271.872 56.832 368.64 160.256 6.144 6.656 14.336 9.728 22.528 9.728 7.68 0 14.848-2.56 20.992-8.192 12.8-12.288 13.312-31.744 2.048-44.032z" fill="#F68D96" p-id="18522"></path></svg>
        :
        <svg width="25" height="25" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="18521"><path d="M498.176 702.464c178.176 0 323.584-145.408 323.584-323.584s-145.408-323.584-323.584-323.584S174.592 200.704 174.592 378.88s145.408 323.584 323.584 323.584z m0-585.728c144.384 0 262.144 117.76 262.144 262.144 0 144.384-117.76 262.144-262.144 262.144s-262.144-117.76-262.144-262.144c0-144.384 117.76-262.144 262.144-262.144zM911.872 913.92c-108.544-115.712-255.488-179.712-413.696-179.712-151.552 0-293.888 58.88-400.896 166.4-11.776 11.776-11.776 31.232 0 43.52 11.776 11.776 31.232 11.776 43.52 0 95.232-95.744 221.696-147.968 356.864-147.968 140.8 0 271.872 56.832 368.64 160.256 6.144 6.656 14.336 9.728 22.528 9.728 7.68 0 14.848-2.56 20.992-8.192 12.8-12.288 13.312-31.744 2.048-44.032z" fill="#cdcdcd" p-id="18522"></path></svg>
    },

  ]

  return (
    <TabBar activeKey={pathname} onChange={(value) => setRouteActive(value)}>
      {tabs.map((item) => (
        <TabBar.Item
          key={item.key}
          icon={item.icon}
          title={item.title}
        >
        </TabBar.Item>
      ))}
    </TabBar>
  );
};