// import React from 'react';
import 'antd/dist/antd.css';
// import './index.css';
import {message} from 'antd';
import axios from "axios";


function DeleteUser(requestData, callback) {
    console.log("删除用户")
    console.log("删除用户请求参数:", requestData)
    axios({
        url: '/user/deleteUser',
        method: 'delete',
        data: {
            "name": requestData.name
        },
        header: {
    'Content-Type': 'application/x-www-form-urlencoded'
    }
    }).then(callback).catch(err => message.error(err.toString()))
}



export default DeleteUser