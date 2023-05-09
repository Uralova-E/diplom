import { useState } from 'react'
import './Login.scss'
import { Input } from "semantic-ui-react"
import axios from 'axios'
import { baseURL } from '../../variables'

const Login = () => {
    const [login, setLogin] = useState()
    const [password, setPassword] = useState()

    const handleClickSignIn = () => {
        axios.post(`${baseURL}auth/token/login`, {
            username: login,
            password: password
        }).then(response => console.log(response.data))
    }

    return (
        <div className="container">
            <div className="login-form">
                <div className='title'>
                    Авторизация
                </div>
                <Input 
                className='login-input'
                placeholder="Логин"
                defaultValue={login}
                onChange={(e) => setLogin(e.target.value)}
                /> 
                <Input 
                className='login-input'
                type='password'
                placeholder="Пароль"
                defaultValue={password}
                onChange={(e) => setPassword(e.target.value)}
                /> 
                <div 
                style={{marginTop: '10px'}}
                onClick={handleClickSignIn}
                className='button'>
                    Войти
                </div>
            </div>    
        </div>
    )
}

export default Login