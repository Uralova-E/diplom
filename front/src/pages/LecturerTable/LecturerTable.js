import axios from 'axios'
import { useEffect, useState } from 'react'
import { GetDepartmentOptions, GetPositionOptions } from '../../utils/options'
import { baseURL } from '../../variables'
import './LecturerTable.scss'

const LecturerTable = () => {
    const [lecturerList, setLecturerList] = useState([])
    const departmentOptions = GetDepartmentOptions()
    const positionOptions = GetPositionOptions()

    useEffect(() => {
        axios.get(`${baseURL}lecturers/list/`).then(response =>
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
            </div>
            {
                lecturerList.map((lecturer) => 
                    <div className='lecturer-table-row'>
                    <div className='lecturer-table-cell'>{departmentOptions.filter(el => el.key === lecturer.departmentid)[0].text}</div>
                    <div className='lecturer-table-cell'>{positionOptions.filter(el => el.key === lecturer.positionid)[0].text}</div>
                    <div className='lecturer-table-cell'>{lecturer.last_name_lecturer}</div>
                    <div className='lecturer-table-cell'>{lecturer.first_name_lecturer}</div>
                    <div className='lecturer-table-cell'>{lecturer.patronymic_lecturer}</div>
                </div>
                )
            }
            <div 
            style={{marginTop: '15px'}}
            className='button'>Редактировать</div>
        </div>
    )
}

export default LecturerTable