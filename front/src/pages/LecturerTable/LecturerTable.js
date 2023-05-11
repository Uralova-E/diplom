import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { baseURL } from '../../variables'
import LecturerTableRow from './components/LecturerTableRow/LecturerTableRow'
import './LecturerTable.scss'

const LecturerTable = () => {
    const [lecturerList, setLecturerList] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        if (localStorage.getItem('token') !== '123') navigate('/')
        else axios.get(`${baseURL}lecturers/list/`).then(response =>
            setLecturerList(response.data)
            )
    }, [])

    return (
        <div className='container'>
            <div style={{fontWeight: '500'}} className='lecturer-table-row'>
                <div className='lecturer-table-cell'>Кафедра</div>
                <div className='lecturer-table-cell'>Должность</div>
                <div className='lecturer-table-cell'>Фамилия</div>
                <div className='lecturer-table-cell'>Имя</div>
                <div className='lecturer-table-cell'>Отчество</div>
                <div style={{width: '160px'}}></div>
            </div>
            {
                lecturerList.map((lecturer) => 
                    <LecturerTableRow lecturer={lecturer} />
                )
            }
            <div 
            onClick={() => navigate('/add-lecturer')}
            style={{marginTop: '20px'}}
            className='button'>
                Добавить преподавателя
            </div>
        </div>
    )
}

export default LecturerTable