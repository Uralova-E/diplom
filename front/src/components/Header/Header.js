import './Header.scss'
import { useState } from 'react'

const Header = () => {
    const [dropdownIsVisible, setDropdownIsVisible] = useState(false)
    document.onclick = () => {setDropdownIsVisible(false)}

    return (
        <div className='header'>
            <div 
            className='header-logo-container'
            onClick={() => window.location.assign('/')}>
                <div className='header-logo-icon' />
                <div style={{lineHeight: '10px'}}>[электронный университет]</div>
            </div>

            <div className='header-title'>
                Запись на консультации
            </div>

            <div className='header-user-container'>
                <div className='header-user-icon' />
                Войти
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
                    <a href='https://lks.bmstu.ru/' target={'_blank'} className='header-menu-dropdown-item'>
                        Кабинет обучающегося
                    </a>
                    <a href='https://student.bmstu.ru/' target={'_blank'} className='header-menu-dropdown-item'>
                        Студенческая почта 
                    </a>
                </div>
            }
        </div>
    )
}

export default Header;