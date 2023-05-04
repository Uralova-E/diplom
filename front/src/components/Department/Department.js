import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { baseURL } from '../../variables'
import './Department.scss'

const Department = ({ department }) => {
    const navigate = useNavigate()

    const [lecturerList, setLecturerList] = useState([])
    const [lecturerIsVisible, setLecturerIsVisible] = useState(false)

    const handleClickShowLecturers = () => {
        if (lecturerList.length === 0) {
            axios.get(`${baseURL}lecturers/list/${department.departmentid}`).then(response => {
                setLecturerList(response.data)
            })
            setLecturerIsVisible(true)
        } 
        setLecturerIsVisible(!lecturerIsVisible)
    }

    return (
        <div className='department'>
            <div 
            onClick={handleClickShowLecturers}
            className='department-title'>
                {
                    department.abbreviation
                }
            </div>
            <div style={{paddingLeft: '10px'}}>
            {
                lecturerIsVisible &&
                lecturerList.map((lecturer) => 
                <div 
                onClick={() => navigate(`/consultations/${lecturer.lecturerid}`)}
                style={{cursor: 'pointer'}}>
                    {lecturer.last_name_lecturer + ' ' + lecturer.first_name_lecturer + ' ' + lecturer.patronymic_lecturer}
                </div>
                )
            }
        </div>
        </div>
    )
}

export default Department