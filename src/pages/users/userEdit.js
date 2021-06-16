import {Divider, Form, Input, InputNumber, message, Modal} from "antd";
import React, {useEffect, useState} from "react";
// import AddUser from "./userAdd";
import {layout, validateMessages} from "./user";
import axios from "axios";

function EditUser(requestData, callback) {
        console.log("新增用户")
    console.log(requestData)
    axios({
        url: '/user/updateUser',
        method: 'put',
        data: requestData,
        header: {
    'Content-Type': 'application/x-www-form-urlencoded'
    }
    }).then(callback).catch(err => message.error(err.toString()))
}


export default EditUser