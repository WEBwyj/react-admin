import React from 'react';
//antd
import { Button,message } from 'antd';
// API
import { GetCode } from "../../api/account";
// 验证
import { validate_email } from "../../utils/validate";

//定时器
let timer = null;
class Code extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username:props.username,
            button_text:"获取验证码",
            button_loading:false,
            button_disabled:false,
            module:props.module
        };
    }

    // 生命周期
    componentWillReceiveProps({username}){
        this.setState({
            username:username
        })
    }
    // 销毁组件
    componentWillUnmount(){
        clearInterval(timer);
    }

     // 获取验证码
     getCode = () =>{
         const username = this.state.username;
        if(!username){
            message.warning('用户名不能为空',1);
            return false;
        }
        if(!validate_email(username)){
            message.warning('邮箱格式不正确',1);
            return false;
        }
        this.setState({
            code_button_loading:true,
            button_text:"发送中"
        })
        const requestData = {
            username:username,
            module:this.state.module
        }
        GetCode(requestData).then(response=>{
            // console.log(response)
            message.success(response.data.message);
            //执行倒计时
            this.countDown();
        }).catch(error=>{
            this.setState({
                code_button_loading:false,
                button_text:"重新获取"
            })
        })
    };

    //倒计时
    countDown = () =>{
        // 定时器
        let sec =60;
        this.setState({
            code_button_loading:false,
            button_disabled:true,
            button_text:`${sec}s`
        })
        timer = setInterval(()=>{
            sec--;
            if(sec <= 0){
                this.setState({
                    button_text:`重新获取`,
                    button_disabled:false,
                })
                clearInterval(timer);
                return false;
            }
            this.setState({
                button_text:`${sec}s`
            })
        },1000)
    }

    render(){
        return <Button type="danger" disabled={this.state.button_disabled} loading={this.state.button_loading} block onClick={this.getCode}>{this.state.button_text}</Button>
    }

}

export default Code;