import React from 'react';
import 'antd/dist/antd.css';
// import './index.css';
import {Form, Input, InputNumber, Button, message} from 'antd';
import axios from "axios";


function AddUser(requestData, callback) {
    console.log("新增用户")
    // axios.post('/user/addUser/')
    //     .then(callback)
    //     .catch(err => message.error(err.toString()))
    console.log(requestData)
    axios({
        url: '/user/addUser',
        method: 'post',
        data: requestData,
        header: {
    'Content-Type': 'application/x-www-form-urlencoded'
    }
    }).then(callback).catch(err => message.error(err.toString()))
}



export default AddUser