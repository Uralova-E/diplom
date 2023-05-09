import { useEffect, useState } from 'react'
import './Login.scss'
import { Input } from "semantic-ui-react"
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { baseURL } from '../../variables'
import { setLocalStorage } from '../../user'

const Login = () => {
    const navigate = useNavigate()

    const [login, setLogin] = useState()
    const [password, setPassword] = useState()

    const handleClickSignIn = () => {
        axios.post(`${baseURL}auth/token/login`, {
            username: login,
            password: password
        }).then(response => {
            const token = response.data.auth_token
            let firstName = ''
            let lastName = ''
            let patronymic = ''
            let userid = ''
            let lecturerid = ''
            let studentid = ''
            
            axios.get(`${baseURL}user/${login}`, {
                headers: {
                    'Authorization': `token ${token}`
                }
            }).then(response => {  
                userid = response.data.userid
                lecturerid = response.data.lecturerid
                studentid = response.data.studentid
                
                if (response.data.lecturerid !== null) {
                    axios.get(`${baseURL}lecturer/${lecturerid}`).then(response => {
                        firstName = response.data.first_name_lecturer
                        lastName = response.data.last_name_lecturer
                        patronymic = response.data.patronymic_lecturer

                        const data = {
                            token: token,
                            login: login, 
                            userid: userid,
                            lecturerid: lecturerid, 
                            studentid: studentid,
                            firstName: firstName,
                            lastName: lastName,
                            patronymic: patronymic
                        }
                        
                        setLocalStorage(data)
                        navigate(`/`)
                })} else {
                    axios.get(`${baseURL}students/${studentid}`).then(response => {
                        firstName = response.data.first_name_student
                        lastName = response.data.last_name_student
                        patronymic = response.data.patronymic_student   
                        
                        const data = {
                            token: token,
                            login: login, 
                            userid: userid,
                            lecturerid: lecturerid, 
                            studentid: studentid,
                            firstName: firstName,
                            lastName: lastName,
                            patronymic: patronymic
                        }
                        
                        setLocalStorage(data)
                        navigate(`/`)
                })}

    })})}

    useEffect(() => {
        if (localStorage.getItem('token') !== null) navigate(`/`)
    }, [])

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