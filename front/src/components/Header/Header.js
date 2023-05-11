import './Header.scss'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { baseURL } from '../../variables'

const Header = () => {
    const [dropdownIsVisible, setDropdownIsVisible] = useState(false)
    document.onclick = () => {setDropdownIsVisible(false)}
    const navigate = useNavigate()

    const handleClickLogout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('userID')
        localStorage.removeItem('lecturerID')
        localStorage.removeItem('username')
        localStorage.removeItem('studentID')
        localStorage.removeItem('firstName')
        localStorage.removeItem('lastName')
        localStorage.removeItem('patronymic')

        axios.get(`${baseURL}auth/token/logout`)
        navigate('/')
    }

    return (
        <div className='header'>
            <div 
            className='header-logo-container'
            onClick={() => navigate('/')}>
                <div className='header-logo-icon' />
                <div style={{lineHeight: '10px'}}>[электронный университет]</div>
            </div>

            <div className='header-title'>
                Запись на консультации
            </div>

            <div 
            onClick={() => {
                if (localStorage.getItem('token') === null) navigate('/login')
            }}
            className='header-user-container'>
                <div 
                className='header-user-icon' />
                {
                    localStorage.getItem('token') === null ?
                    'Войти':
                    `${localStorage.getItem('lastName')} ${localStorage.getItem('firstName')[0]}.${localStorage.getItem('patronymic')[0]}.`
                }
            </div>

            <div 
            className='header-menu-container'
            onClick={(e) => {
                e.stopPropagation()
                setDropdownIsVisible(!dropdownIsVisible)}
                }> 
                <div className='header-menu-icon' />
            </div>

            {
                dropdownIsVisible &&
                <div className='header-menu-dropdown'>
                    <a 
                    href='https://lks.bmstu.ru/' 
                    target={'_blank'} 
                    className='header-menu-dropdown-item'>
                        Личный кабинет
                    </a>
                    <a 
                    onClick={() => {
                        if (localStorage.getItem('token') === null) navigate('/login') 
                        else {
                            if (localStorage.getItem("lecturerID") !== 'null') navigate(`/consultations/${localStorage.lecturerID}`)
                            else navigate('/lecturers-list')
                        }
                    }} 
                    className='header-menu-dropdown-item'>
                        Консультации
                    </a>
                    <a 
                    href='https://student.bmstu.ru/' 
                    target={'_blank'} 
                    className='header-menu-dropdown-item'>
                        Электронная почта 
                    </a>
                    {
                        localStorage.getItem("token") === '123' && 
                        <a 
                        className='header-menu-dropdown-item'
                        onClick={() => navigate('/admin')}>
                            Панель администратора
                        </a>
                    }                    
                    {
                        localStorage.getItem("token") !== null && 
                        <a 
                        className='header-menu-dropdown-item'
                        onClick={handleClickLogout}>
                            Выйти
                        </a>
                    }
                </div>
            }
        </div>
    )
}

export default Header;