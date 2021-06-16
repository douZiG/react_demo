import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom'
/* 组件 */
import SiderDemo from './App';
import Root from "./router/router";
import axios from "axios";

axios.defaults.baseURL = 'http://127.0.0.1:8080'       //测试环境后端 -pre/.pre  200
// axios.defaults.baseURL = 'http://192.168.189.192:8080'       //测试环境后端 -pre/.pre  200

axios.defaults.withCredentials = true;
axios.defaults.timeout = 180000;
const Web = () => {
            return (

            <BrowserRouter>
                <div>
                <SiderDemo className="management" content={
                    Root()
                }/>
                </div>
            </BrowserRouter>
        )
}


ReactDOM.render(<Web />, document.getElementById('root'))