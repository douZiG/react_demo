
import React, {useState, useEffect} from 'react';
import {Space, Table, message, Button, Divider, Modal, Form, Input, InputNumber} from "antd";

import * as PropTypes from "prop-types";
import axios from "axios";
import AddUser from "./userAdd";
import DeleteUser from "./userDelete";
import EditUser from "./userEdit";
// import AddUserDetails from "./userAdd";

const {Column} = Table;


export const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};

export const validateMessages = {
    required: '${label} is required!',
    types: {
        email: '${label} is not a valid email!',
        number: '${label} is not a valid number!',
    },
    number: {
        range: '${label} must be between ${min} and ${max}',
    },
};

Column.propTypes = {
    dataIndex: PropTypes.string,
    title: PropTypes.string
};

function getUser(callback) {
    console.log("url")
    axios.get('/user/queryUser/')
        .then(callback)
        .catch(err => message.error(err.toString()))
}


function User() {

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Age',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: 'Role',
            dataIndex: 'role',
            key: 'role',
        },
        {
            title: 'Phone',
            key: 'phone',
            dataIndex: 'phone',
        },
        {
            title: 'Mail',
            key: 'mail',
            dataIndex: 'mail',
        },
        {
            title: 'Action',
            key: 'action',
            render: record => {
                return (
                    <Space size="middle">
                        <Button type="primary" onClick={showEditUserModal.bind(record, record.valueOf())}>
                            {/*<Button type="primary" href="/user/editUser">*/}

                            编辑
                        </Button>
                        <button onClick={deleteUser.bind(record, record.valueOf())}>删除</button>
                    </Space>
                )
            }
        }
    ]
    const [state, setState] = useState({
        columns: columns,
        data: [],
        loading: false
    });
    const [addVisible, setAddVisible] = React.useState(false);
    const [confirmLoading, setConfirmLoading] = React.useState(false);

    const showAddUserModal = () => {
        setAddVisible(true)
    }

    const [form] = Form.useForm();

    const [editVisible, setEditVisible] = React.useState(false);
    const [editForm] = Form.useForm();
    //
    const [oldData, setOldData] = useState({
        data: {},
    });
    const showEditUserModal = (oldUserData) => {
        console.log("edit visible")
        setEditVisible(true)
        console.log("oldUserData:", oldUserData)
        setOldData(oldData => ({
                ...oldData,
                data: oldUserData,
            }))
        console.log("oldData", oldData)
    }

    const handleOk = (method) => {
        console.log("method:", method)
        if (method === "add") {
            const values = form.getFieldsValue()
            console.log(values)
            if (values.name === undefined) {
                message.error("name不能为空")
                return
            }
            if (values.mail === undefined) {
                message.error("mail不能为空")
                return
            }
            if (values.age === undefined) {
                message.error("age不能为空")
                return
            }
            if (values.phone === undefined) {
                message.error("phone不能为空")
                return
            }
            if (values.role === undefined) {
                message.error("role不能为空")
                return
            }
            AddUser(values, (res) => {
                console.log("新建用户返回参数", res)
                if (res.status !== 200) {
                    message.error("创建用户失败, 失败原因为:", res.data)
                } else {
                    if (res.data.status !== 1) {
                        message.error("创建用户失败, 失败原因为:", res.data.message)
                    } else {
                        message.success("创建用户成功")
                    }
                }
            })
        } else {
            const values = editForm.getFieldsValue()
            console.log("edit form values", values)
            EditUser(values, (res) => {
                console.log("更新用户返回参数", res)
                if (res.status !== 200) {
                    message.error("更新用户失败, 失败原因为:", res.data)
                } else {
                    if (res.data.status !== 1) {
                        message.error("更新用户失败, 失败原因为:", res.data.message)
                    } else {
                        message.success("更新用户成功")
                    }
                }
            })
        }

        setConfirmLoading(true);
        setTimeout(() => {
            setAddVisible(false);
            setConfirmLoading(false);
            setEditVisible(false);
        }, 2000);

    };

    const handleCancel = () => {
        console.log('Clicked cancel button');
        setAddVisible(false);
        setEditVisible(false);

    };

    function LoadData() {
        setState(state => ({
            ...state,
            loading: true
        }))
        console.log("start url")
        getUser((res) => {
            setState(state => ({
                ...state,
                data: res.data.data,
                columns: state.columns,
                loading: false
            }))
        })
    }

    useEffect(() => LoadData(), [])
    const onFinish = (values) => {
        console.log("onFinish")
        console.log(values);

    };

    function deleteUser(data) {
        DeleteUser(data, (res) => {
                console.log("删除用户返回参数", res)
                if (res.status !== 200) {
                    message.error("删除用户失败, 失败原因为:", res.data)
                } else {
                    if (res.data.status !== 1) {
                        message.error("删除用户失败, 失败原因为:", res.data.message)
                    } else {
                        message.success("删除用户成功").then(LoadData)
                    }
                }

            },
        )

    }


    return (
        // <Space direction="vertical">

        <div>
            <Divider/>
            <Button type="primary" style={{justifyContent: 'right'}} onClick={showAddUserModal}>新增用户</Button>
            <Modal
                title="新增用户"
                visible={addVisible}
                onOk={handleOk.bind("add", "add")}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
                afterClose={LoadData}>
                <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}
                      form={form}>
                    <Form.Item
                        name='name'
                        label="Name"
                        rules={[
                            {
                                required: true,
                            },
                        ]}

                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        name='mail'
                        label="Email"
                        rules={[
                            {
                                type: 'email',
                            },
                        ]}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        name='age'
                        label="Age"
                        rules={[
                            {
                                type: 'number',
                                min: 0,
                                max: 99,
                            },
                        ]}

                    >
                        <InputNumber/>
                    </Form.Item>
                    <Form.Item
                        name='phone'
                        label="Phone"
                        rules={[
                            {
                                required: true,
                            },
                        ]}

                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        name='role'
                        label="Role"
                        rules={[
                            {
                                required: true,
                            },
                        ]}

                    >
                        <Input/>
                    </Form.Item>

                </Form>
            </Modal>
            <Modal
                title="编辑用户"
                visible={editVisible}
                onOk={handleOk.bind("edit", "edit")}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
                afterClose={LoadData}>
                <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}
                      form={editForm}>
                    <Form.Item
                        id='name'
                        name='name'
                        label="Name"
                        required = "true"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                        initialValue={oldData.data.name}

                    >
                        {/*<Input defaultValue={oldData.data.name}/>*/}
                        <Input disabled="true"/>

                    </Form.Item>
                    <Form.Item
                        id='mail'
                        name='mail'
                        label="Email"
                        rules={[
                            {
                                type: 'email',
                            },
                        ]}
                        initialValue={oldData.data.mail}

                    >
                        {/*<Input defaultValue={oldData.data.mail}/>*/}
                        <Input/>

                    </Form.Item>
                    <Form.Item
                        id='age'
                        name='age'
                        label="Age"
                        rules={[
                            {
                                type: 'number',
                                min: 0,
                                max: 99,
                            },
                        ]}
                        initialValue={oldData.data.age}


                    >
                        {/*<InputNumber defaultValue={oldData.data.age}/>*/}
                                                <InputNumber/>
                    </Form.Item>
                    <Form.Item
                        id='phone'
                        name='phone'
                        label="Phone"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                        initialValue={oldData.data.phone}

                    >
                        {/*<Input defaultValue={oldData.data.phone} />*/}
                        <Input/>

                    </Form.Item>
                    <Form.Item
                        id='role'
                        name='role'
                        label="Role"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                        initialValue={oldData.data.role}

                    >
                        {/*<Input defaultValue={oldData.data.role}/>*/}
                                                <Input/>

                    </Form.Item>

                </Form>
            </Modal>
            <Divider/>
            <Table columns={state.columns} dataSource={state.data}>
            </Table>
        </div>
        // </Space>

    )
}

export default User
