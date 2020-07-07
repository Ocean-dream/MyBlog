import React, {useState} from 'react'
import axios from 'axios'
import serverPath from './../config/appiUrl'
import 'antd/dist/antd.css'
// import ParticlesBg from 'particles-bg'
import {Card, Input, Button, Spin, message} from 'antd'
import '../static/css/login.css'
function Login(props) {
    const [userName, setUserName] = useState('')
    const [password, setPassWord] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const checkLogin = async() => {
        // setIsLoading(true)
        if (!userName) {
            message.error('用户名不能为空')
            return false
        } else if (!password) {
            message.error('密码不能为空')
            return false
        }
        const dataProps = {
            userName: userName,
            password: password
        }
        const {data: res} = await axios({
            url: serverPath.login,
            method: 'post',
            data: dataProps,
            withCredentials: true
        })
        console.log(res)
        if (res.code == 0) {
            message.success('登录成功')
            localStorage.setItem('sessionId', res.sessionId)
            props.history.push('/index')
        } else {
            message.error('用户名或密码错误')
        }
        // setTimeout(() => {
        //     setIsLoading(false)
        // }, 500)
    }
    return (
        <div className="login-div">
            <Spin tip="Loading..." spinning={isLoading}>
                <Card title="haiyang Blog System" bordered style={{width:500}}>
                <Input id="userName" size="large" placeholder="Please input your username!" onChange={(e) => setUserName(e.target.value)}></Input>
                    <br /><br />
                    <Input.Password id="password" size="large" placeholder="Please input your password!" onChange={(e) => setPassWord(e.target.value)} />
                    <br /><br />
                    <Button type="primary" block size="large" onClick={checkLogin}>Submit</Button>
                </Card>
            </Spin>
            {/* <ParticlesBg color="#fff" num={400} type="thick" bg={true} color='white'/> */}
        </div>
    )
}

export default Login