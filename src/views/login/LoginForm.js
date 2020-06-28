import React from 'react';
//白名单
import {withRouter} from 'react-router-dom';
//antd
import { Form, Input, Button, Row, Col, } from 'antd';
import { UserOutlined, UnlockOutlined } from '@ant-design/icons';
// 验证
import { validate_password } from "../../utils/validate";
// API
import { Login } from "../../api/account";
//验证码组件
import Code from "../../components/code/index";
//MD5加密
import CryptoJs from 'crypto-js';
//方法
import {setToken} from '../../utils/session';

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username:"",
            password:"",
            code:"",
            module:"login",
            loading:false
        };
    }

    // 登录
    onFinish = (values) => {
        // console.log('Received values of form: ', values);
        const requestData ={
            username:this.state.username,
            password:CryptoJs.MD5(this.state.password).toString(),
            code:this.state.code
        }
        this.setState({
            loading:true
        })
        Login(requestData).then(response=>{
            this.setState({
                loading:false
            })
            // message.success(data.message)
            const data = response.data.data;
            //存储token
            setToken(data.token);
            //路由跳转
            this.props.history.push('/index');
        }).catch(error=>{
            this.setState({
                loading:false
            })
        })
    };
    
    //input输入处理
    inputChangeUsername=(e)=>{
        let value = e.target.value;
        this.setState({
            username:value
        })
    }
    inputChangePassword=(e)=>{
        let value = e.target.value;
        this.setState({
            password:value
        })
    }
    inputChangeCode=(e)=>{
        let value = e.target.value;
        this.setState({
            code:value
        })
    }

    toggleForm = ()=>{
        //调父级的方法 切换登录注册
        this.props.switchForm("register");
    }

    render() {
        const {username,module,loading} = this.state;
        // const _this = this;
        return (
            <div>
                <div className="form-header">
                    <h4 className="column">登录</h4>
                    <span onClick={this.toggleForm}>账号注册</span>
                </div>
                <div className="form-content">
                    <Form
                        name="normal_login"
                        className="login-form"
                        initialValues={{ remember: true }}
                        onFinish={this.onFinish}
                    >
                        <Form.Item
                            name="username"
                            rules={
                                [
                                    { required: true, message: '邮箱不能为空' },
                                    { type: "email", message: '邮箱格式不正确' },
                                ]}
                        >
                            <Input value={username} onChange={this.inputChangeUsername} prefix={<UserOutlined className="site-form-item-icon" />} placeholder="请输入邮箱" />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={
                                [
                                    { required: true, message: '密码不能为空' },
                                    { pattern: validate_password, message: "请输入大于6位小于20位数字+字母" },
                                ]}
                        >
                            <Input type="password" onChange={this.inputChangePassword} prefix={<UnlockOutlined className="site-form-item-icon" />} placeholder="请输入密码" />
                        </Form.Item>
                        <Form.Item
                            name="code"
                            rules={[
                                { required: true, message: '验证码不能为空' },
                                { len: 6, message: '请输入长度为6位的验证码' }
                            ]}
                        >
                            <Row gutter={13}>
                                <Col span={15}>
                                    <Input onChange={this.inputChangeCode} prefix={<UnlockOutlined className="site-form-item-icon" />} placeholder="请输入验证码" />
                                </Col>
                                <Col span={9}>
                                    {/* 获取验证码 */}
                                    <Code username={username} module={module}></Code>
                                    {/* <Button type="danger" disabled={code_button_disabled} loading={code_button_loading} block onClick={this.getCode}>{code_button_text}</Button> */}
                                </Col>
                            </Row>
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" loading={loading} htmlType="submit" className="login-form-button" block>
                                登录
                                </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>

        )
    }
}

export default withRouter(LoginForm);