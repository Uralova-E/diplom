import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './AdminPanel.scss'

const AdminPanel = () => {
    const navigate = useNavigate()

    useEffect(() => {
        if (localStorage.getItem('token') !== '123') {
            navigate('/')
        }
    }, [])

    return (
        <div className='container'>
            <div className='admin-panel-wrapper'>
                <div className='admin-panel'>
                    <div className='admin-panel-button'>Аудитория</div>
                    <div className='admin-panel-button'>Группа</div>
                    <div className='admin-panel-button'>Дисциплина</div>
                    <div className='admin-panel-button'>Должность</div>
                    <div className='admin-panel-button'>Запись студента</div>
                    <div className='admin-panel-button'>Кафедра</div>
                    <div className='admin-panel-button'>Консультация</div>
                    <div className='admin-panel-button'>Корпус</div>
                    <div 
                    onClick={() => navigate('/lecturer-table')}
                    className='admin-panel-button'>
                        Преподаватель
                    </div>
                    <div className='admin-panel-button'>Студент</div>
                    <div className='admin-panel-button'>Тип аудитории</div>
                    <div className='admin-panel-button'>Факультет</div>
                </div>
            </div>
        </div>
    )
} 

export default AdminPanel