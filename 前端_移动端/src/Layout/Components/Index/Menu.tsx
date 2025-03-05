import React from "react";
import style from './Index.module.css'
import { NavBar } from 'antd-mobile'

const App: React.FC = () => {
    return (
        <div>
            <div className={style.menu_nav}>
                <NavBar 
                  style={{
                    // '--height': '36px',
                    '--border-bottom': '1px #d0d0d0 solid',
                  }}
                onBack={() => { window.history.back() }}>我的菜单</NavBar>
            </div>
            <div className={style.menu_title}>
                <p>全部应用</p>
            </div>
            <div className={style.nav}>
                <div className={style.navitem}>
                    <svg width="26" height="26" viewBox="0 0 1307 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="20988"><path d="M334.205581 181.942034l645.184518 0 0 645.184519-645.184518 0 0-645.184519Z" fill="#87c38f" p-id="20989"></path><path d="M1069.162916 1024H234.847165a98.252385 98.252385 0 0 1-98.068047-98.068047V626.750675a36.867687 36.867687 0 0 1 73.735373 0v299.181278a24.332673 24.332673 0 0 0 24.332674 24.332673H1069.162916a24.332673 24.332673 0 0 0 24.332674-24.332673V636.70495a36.867687 36.867687 0 0 1 73.735373 0v289.227003A98.252385 98.252385 0 0 1 1069.162916 1024zM173.646805 422.319352a36.867687 36.867687 0 0 1-36.867687-36.867687V98.068047A98.252385 98.252385 0 0 1 234.847165 0H1069.162916a98.252385 98.252385 0 0 1 98.068047 98.068047v284.80288a36.867687 36.867687 0 0 1-73.735373 0V98.068047A24.332673 24.332673 0 0 0 1069.162916 73.735374H234.847165a24.332673 24.332673 0 0 0-24.332674 24.332673v287.383618a36.867687 36.867687 0 0 1-36.867686 36.867687zM1270.276148 553.015302H36.867687a36.867687 36.867687 0 0 1 0-73.735374h1233.408461a36.867687 36.867687 0 0 1 0 73.735374z" fill="#3D3D3D" p-id="20990"></path></svg>
                    <p>扫一扫</p>
                </div>
                <div className={style.navitem}>
                    <svg width="26" height="26" viewBox="0 0 1307 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="20988"><path d="M334.205581 181.942034l645.184518 0 0 645.184519-645.184518 0 0-645.184519Z" fill="#87c38f" p-id="20989"></path><path d="M1069.162916 1024H234.847165a98.252385 98.252385 0 0 1-98.068047-98.068047V626.750675a36.867687 36.867687 0 0 1 73.735373 0v299.181278a24.332673 24.332673 0 0 0 24.332674 24.332673H1069.162916a24.332673 24.332673 0 0 0 24.332674-24.332673V636.70495a36.867687 36.867687 0 0 1 73.735373 0v289.227003A98.252385 98.252385 0 0 1 1069.162916 1024zM173.646805 422.319352a36.867687 36.867687 0 0 1-36.867687-36.867687V98.068047A98.252385 98.252385 0 0 1 234.847165 0H1069.162916a98.252385 98.252385 0 0 1 98.068047 98.068047v284.80288a36.867687 36.867687 0 0 1-73.735373 0V98.068047A24.332673 24.332673 0 0 0 1069.162916 73.735374H234.847165a24.332673 24.332673 0 0 0-24.332674 24.332673v287.383618a36.867687 36.867687 0 0 1-36.867686 36.867687zM1270.276148 553.015302H36.867687a36.867687 36.867687 0 0 1 0-73.735374h1233.408461a36.867687 36.867687 0 0 1 0 73.735374z" fill="#3D3D3D" p-id="20990"></path></svg>
                    <p>上报隐患</p>
                </div>
                <div className={style.navitem}>
                    <svg width="26" height="26" viewBox="0 0 1307 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="20988"><path d="M334.205581 181.942034l645.184518 0 0 645.184519-645.184518 0 0-645.184519Z" fill="#87c38f" p-id="20989"></path><path d="M1069.162916 1024H234.847165a98.252385 98.252385 0 0 1-98.068047-98.068047V626.750675a36.867687 36.867687 0 0 1 73.735373 0v299.181278a24.332673 24.332673 0 0 0 24.332674 24.332673H1069.162916a24.332673 24.332673 0 0 0 24.332674-24.332673V636.70495a36.867687 36.867687 0 0 1 73.735373 0v289.227003A98.252385 98.252385 0 0 1 1069.162916 1024zM173.646805 422.319352a36.867687 36.867687 0 0 1-36.867687-36.867687V98.068047A98.252385 98.252385 0 0 1 234.847165 0H1069.162916a98.252385 98.252385 0 0 1 98.068047 98.068047v284.80288a36.867687 36.867687 0 0 1-73.735373 0V98.068047A24.332673 24.332673 0 0 0 1069.162916 73.735374H234.847165a24.332673 24.332673 0 0 0-24.332674 24.332673v287.383618a36.867687 36.867687 0 0 1-36.867686 36.867687zM1270.276148 553.015302H36.867687a36.867687 36.867687 0 0 1 0-73.735374h1233.408461a36.867687 36.867687 0 0 1 0 73.735374z" fill="#3D3D3D" p-id="20990"></path></svg>
                    <p>日常检查</p>
                </div>
                <div className={style.navitem}>
                    <svg width="26" height="26" viewBox="0 0 1307 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="20988"><path d="M334.205581 181.942034l645.184518 0 0 645.184519-645.184518 0 0-645.184519Z" fill="#87c38f" p-id="20989"></path><path d="M1069.162916 1024H234.847165a98.252385 98.252385 0 0 1-98.068047-98.068047V626.750675a36.867687 36.867687 0 0 1 73.735373 0v299.181278a24.332673 24.332673 0 0 0 24.332674 24.332673H1069.162916a24.332673 24.332673 0 0 0 24.332674-24.332673V636.70495a36.867687 36.867687 0 0 1 73.735373 0v289.227003A98.252385 98.252385 0 0 1 1069.162916 1024zM173.646805 422.319352a36.867687 36.867687 0 0 1-36.867687-36.867687V98.068047A98.252385 98.252385 0 0 1 234.847165 0H1069.162916a98.252385 98.252385 0 0 1 98.068047 98.068047v284.80288a36.867687 36.867687 0 0 1-73.735373 0V98.068047A24.332673 24.332673 0 0 0 1069.162916 73.735374H234.847165a24.332673 24.332673 0 0 0-24.332674 24.332673v287.383618a36.867687 36.867687 0 0 1-36.867686 36.867687zM1270.276148 553.015302H36.867687a36.867687 36.867687 0 0 1 0-73.735374h1233.408461a36.867687 36.867687 0 0 1 0 73.735374z" fill="#3D3D3D" p-id="20990"></path></svg>
                    <p>隐患排查</p>
                </div>

                <div className={style.navitem}>
                    <svg width="26" height="26" viewBox="0 0 1307 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="20988"><path d="M334.205581 181.942034l645.184518 0 0 645.184519-645.184518 0 0-645.184519Z" fill="#87c38f" p-id="20989"></path><path d="M1069.162916 1024H234.847165a98.252385 98.252385 0 0 1-98.068047-98.068047V626.750675a36.867687 36.867687 0 0 1 73.735373 0v299.181278a24.332673 24.332673 0 0 0 24.332674 24.332673H1069.162916a24.332673 24.332673 0 0 0 24.332674-24.332673V636.70495a36.867687 36.867687 0 0 1 73.735373 0v289.227003A98.252385 98.252385 0 0 1 1069.162916 1024zM173.646805 422.319352a36.867687 36.867687 0 0 1-36.867687-36.867687V98.068047A98.252385 98.252385 0 0 1 234.847165 0H1069.162916a98.252385 98.252385 0 0 1 98.068047 98.068047v284.80288a36.867687 36.867687 0 0 1-73.735373 0V98.068047A24.332673 24.332673 0 0 0 1069.162916 73.735374H234.847165a24.332673 24.332673 0 0 0-24.332674 24.332673v287.383618a36.867687 36.867687 0 0 1-36.867686 36.867687zM1270.276148 553.015302H36.867687a36.867687 36.867687 0 0 1 0-73.735374h1233.408461a36.867687 36.867687 0 0 1 0 73.735374z" fill="#3D3D3D" p-id="20990"></path></svg>
                    <p>访客管理</p>
                </div>
                <div className={style.navitem}>
                    <svg width="26" height="26" viewBox="0 0 1307 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="20988"><path d="M334.205581 181.942034l645.184518 0 0 645.184519-645.184518 0 0-645.184519Z" fill="#87c38f" p-id="20989"></path><path d="M1069.162916 1024H234.847165a98.252385 98.252385 0 0 1-98.068047-98.068047V626.750675a36.867687 36.867687 0 0 1 73.735373 0v299.181278a24.332673 24.332673 0 0 0 24.332674 24.332673H1069.162916a24.332673 24.332673 0 0 0 24.332674-24.332673V636.70495a36.867687 36.867687 0 0 1 73.735373 0v289.227003A98.252385 98.252385 0 0 1 1069.162916 1024zM173.646805 422.319352a36.867687 36.867687 0 0 1-36.867687-36.867687V98.068047A98.252385 98.252385 0 0 1 234.847165 0H1069.162916a98.252385 98.252385 0 0 1 98.068047 98.068047v284.80288a36.867687 36.867687 0 0 1-73.735373 0V98.068047A24.332673 24.332673 0 0 0 1069.162916 73.735374H234.847165a24.332673 24.332673 0 0 0-24.332674 24.332673v287.383618a36.867687 36.867687 0 0 1-36.867686 36.867687zM1270.276148 553.015302H36.867687a36.867687 36.867687 0 0 1 0-73.735374h1233.408461a36.867687 36.867687 0 0 1 0 73.735374z" fill="#3D3D3D" p-id="20990"></path></svg>
                    <p>保安巡查</p>
                </div>
                <div className={style.navitem}>
                    <svg width="26" height="26" viewBox="0 0 1307 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="20988"><path d="M334.205581 181.942034l645.184518 0 0 645.184519-645.184518 0 0-645.184519Z" fill="#87c38f" p-id="20989"></path><path d="M1069.162916 1024H234.847165a98.252385 98.252385 0 0 1-98.068047-98.068047V626.750675a36.867687 36.867687 0 0 1 73.735373 0v299.181278a24.332673 24.332673 0 0 0 24.332674 24.332673H1069.162916a24.332673 24.332673 0 0 0 24.332674-24.332673V636.70495a36.867687 36.867687 0 0 1 73.735373 0v289.227003A98.252385 98.252385 0 0 1 1069.162916 1024zM173.646805 422.319352a36.867687 36.867687 0 0 1-36.867687-36.867687V98.068047A98.252385 98.252385 0 0 1 234.847165 0H1069.162916a98.252385 98.252385 0 0 1 98.068047 98.068047v284.80288a36.867687 36.867687 0 0 1-73.735373 0V98.068047A24.332673 24.332673 0 0 0 1069.162916 73.735374H234.847165a24.332673 24.332673 0 0 0-24.332674 24.332673v287.383618a36.867687 36.867687 0 0 1-36.867686 36.867687zM1270.276148 553.015302H36.867687a36.867687 36.867687 0 0 1 0-73.735374h1233.408461a36.867687 36.867687 0 0 1 0 73.735374z" fill="#3D3D3D" p-id="20990"></path></svg>
                    <p>班级考勤</p>
                </div>
                <div className={style.navitem}>
                    <svg width="26" height="26" viewBox="0 0 1307 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="20988"><path d="M334.205581 181.942034l645.184518 0 0 645.184519-645.184518 0 0-645.184519Z" fill="#87c38f" p-id="20989"></path><path d="M1069.162916 1024H234.847165a98.252385 98.252385 0 0 1-98.068047-98.068047V626.750675a36.867687 36.867687 0 0 1 73.735373 0v299.181278a24.332673 24.332673 0 0 0 24.332674 24.332673H1069.162916a24.332673 24.332673 0 0 0 24.332674-24.332673V636.70495a36.867687 36.867687 0 0 1 73.735373 0v289.227003A98.252385 98.252385 0 0 1 1069.162916 1024zM173.646805 422.319352a36.867687 36.867687 0 0 1-36.867687-36.867687V98.068047A98.252385 98.252385 0 0 1 234.847165 0H1069.162916a98.252385 98.252385 0 0 1 98.068047 98.068047v284.80288a36.867687 36.867687 0 0 1-73.735373 0V98.068047A24.332673 24.332673 0 0 0 1069.162916 73.735374H234.847165a24.332673 24.332673 0 0 0-24.332674 24.332673v287.383618a36.867687 36.867687 0 0 1-36.867686 36.867687zM1270.276148 553.015302H36.867687a36.867687 36.867687 0 0 1 0-73.735374h1233.408461a36.867687 36.867687 0 0 1 0 73.735374z" fill="#3D3D3D" p-id="20990"></path></svg>
                    <p>学校考勤</p>
                </div>

                <div className={style.navitem}>
                    <svg width="26" height="26" viewBox="0 0 1307 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="20988"><path d="M334.205581 181.942034l645.184518 0 0 645.184519-645.184518 0 0-645.184519Z" fill="#87c38f" p-id="20989"></path><path d="M1069.162916 1024H234.847165a98.252385 98.252385 0 0 1-98.068047-98.068047V626.750675a36.867687 36.867687 0 0 1 73.735373 0v299.181278a24.332673 24.332673 0 0 0 24.332674 24.332673H1069.162916a24.332673 24.332673 0 0 0 24.332674-24.332673V636.70495a36.867687 36.867687 0 0 1 73.735373 0v289.227003A98.252385 98.252385 0 0 1 1069.162916 1024zM173.646805 422.319352a36.867687 36.867687 0 0 1-36.867687-36.867687V98.068047A98.252385 98.252385 0 0 1 234.847165 0H1069.162916a98.252385 98.252385 0 0 1 98.068047 98.068047v284.80288a36.867687 36.867687 0 0 1-73.735373 0V98.068047A24.332673 24.332673 0 0 0 1069.162916 73.735374H234.847165a24.332673 24.332673 0 0 0-24.332674 24.332673v287.383618a36.867687 36.867687 0 0 1-36.867686 36.867687zM1270.276148 553.015302H36.867687a36.867687 36.867687 0 0 1 0-73.735374h1233.408461a36.867687 36.867687 0 0 1 0 73.735374z" fill="#3D3D3D" p-id="20990"></path></svg>
                    <p>离校管理</p>
                </div>
                <div className={style.navitem}>
                    <svg width="26" height="26" viewBox="0 0 1307 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="20988"><path d="M334.205581 181.942034l645.184518 0 0 645.184519-645.184518 0 0-645.184519Z" fill="#87c38f" p-id="20989"></path><path d="M1069.162916 1024H234.847165a98.252385 98.252385 0 0 1-98.068047-98.068047V626.750675a36.867687 36.867687 0 0 1 73.735373 0v299.181278a24.332673 24.332673 0 0 0 24.332674 24.332673H1069.162916a24.332673 24.332673 0 0 0 24.332674-24.332673V636.70495a36.867687 36.867687 0 0 1 73.735373 0v289.227003A98.252385 98.252385 0 0 1 1069.162916 1024zM173.646805 422.319352a36.867687 36.867687 0 0 1-36.867687-36.867687V98.068047A98.252385 98.252385 0 0 1 234.847165 0H1069.162916a98.252385 98.252385 0 0 1 98.068047 98.068047v284.80288a36.867687 36.867687 0 0 1-73.735373 0V98.068047A24.332673 24.332673 0 0 0 1069.162916 73.735374H234.847165a24.332673 24.332673 0 0 0-24.332674 24.332673v287.383618a36.867687 36.867687 0 0 1-36.867686 36.867687zM1270.276148 553.015302H36.867687a36.867687 36.867687 0 0 1 0-73.735374h1233.408461a36.867687 36.867687 0 0 1 0 73.735374z" fill="#3D3D3D" p-id="20990"></path></svg>
                    <p>报表填报</p>
                </div>
                <div className={style.navitem}>
                    <svg width="26" height="26" viewBox="0 0 1307 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="20988"><path d="M334.205581 181.942034l645.184518 0 0 645.184519-645.184518 0 0-645.184519Z" fill="#87c38f" p-id="20989"></path><path d="M1069.162916 1024H234.847165a98.252385 98.252385 0 0 1-98.068047-98.068047V626.750675a36.867687 36.867687 0 0 1 73.735373 0v299.181278a24.332673 24.332673 0 0 0 24.332674 24.332673H1069.162916a24.332673 24.332673 0 0 0 24.332674-24.332673V636.70495a36.867687 36.867687 0 0 1 73.735373 0v289.227003A98.252385 98.252385 0 0 1 1069.162916 1024zM173.646805 422.319352a36.867687 36.867687 0 0 1-36.867687-36.867687V98.068047A98.252385 98.252385 0 0 1 234.847165 0H1069.162916a98.252385 98.252385 0 0 1 98.068047 98.068047v284.80288a36.867687 36.867687 0 0 1-73.735373 0V98.068047A24.332673 24.332673 0 0 0 1069.162916 73.735374H234.847165a24.332673 24.332673 0 0 0-24.332674 24.332673v287.383618a36.867687 36.867687 0 0 1-36.867686 36.867687zM1270.276148 553.015302H36.867687a36.867687 36.867687 0 0 1 0-73.735374h1233.408461a36.867687 36.867687 0 0 1 0 73.735374z" fill="#3D3D3D" p-id="20990"></path></svg>
                    <p>教师考勤</p>
                </div>

                <div className={style.navitem}>
                    <svg width="26" height="26" viewBox="0 0 1307 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="20988"><path d="M334.205581 181.942034l645.184518 0 0 645.184519-645.184518 0 0-645.184519Z" fill="#87c38f" p-id="20989"></path><path d="M1069.162916 1024H234.847165a98.252385 98.252385 0 0 1-98.068047-98.068047V626.750675a36.867687 36.867687 0 0 1 73.735373 0v299.181278a24.332673 24.332673 0 0 0 24.332674 24.332673H1069.162916a24.332673 24.332673 0 0 0 24.332674-24.332673V636.70495a36.867687 36.867687 0 0 1 73.735373 0v289.227003A98.252385 98.252385 0 0 1 1069.162916 1024zM173.646805 422.319352a36.867687 36.867687 0 0 1-36.867687-36.867687V98.068047A98.252385 98.252385 0 0 1 234.847165 0H1069.162916a98.252385 98.252385 0 0 1 98.068047 98.068047v284.80288a36.867687 36.867687 0 0 1-73.735373 0V98.068047A24.332673 24.332673 0 0 0 1069.162916 73.735374H234.847165a24.332673 24.332673 0 0 0-24.332674 24.332673v287.383618a36.867687 36.867687 0 0 1-36.867686 36.867687zM1270.276148 553.015302H36.867687a36.867687 36.867687 0 0 1 0-73.735374h1233.408461a36.867687 36.867687 0 0 1 0 73.735374z" fill="#3D3D3D" p-id="20990"></path></svg>
                    <p>护导管理</p>
                </div>

                <div className={style.navitem}>
                    <svg width="26" height="26" viewBox="0 0 1307 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="20988"><path d="M334.205581 181.942034l645.184518 0 0 645.184519-645.184518 0 0-645.184519Z" fill="#87c38f" p-id="20989"></path><path d="M1069.162916 1024H234.847165a98.252385 98.252385 0 0 1-98.068047-98.068047V626.750675a36.867687 36.867687 0 0 1 73.735373 0v299.181278a24.332673 24.332673 0 0 0 24.332674 24.332673H1069.162916a24.332673 24.332673 0 0 0 24.332674-24.332673V636.70495a36.867687 36.867687 0 0 1 73.735373 0v289.227003A98.252385 98.252385 0 0 1 1069.162916 1024zM173.646805 422.319352a36.867687 36.867687 0 0 1-36.867687-36.867687V98.068047A98.252385 98.252385 0 0 1 234.847165 0H1069.162916a98.252385 98.252385 0 0 1 98.068047 98.068047v284.80288a36.867687 36.867687 0 0 1-73.735373 0V98.068047A24.332673 24.332673 0 0 0 1069.162916 73.735374H234.847165a24.332673 24.332673 0 0 0-24.332674 24.332673v287.383618a36.867687 36.867687 0 0 1-36.867686 36.867687zM1270.276148 553.015302H36.867687a36.867687 36.867687 0 0 1 0-73.735374h1233.408461a36.867687 36.867687 0 0 1 0 73.735374z" fill="#3D3D3D" p-id="20990"></path></svg>
                    <p>日常任务</p>
                </div>
            </div>
        </div>
    )
}
export default App;