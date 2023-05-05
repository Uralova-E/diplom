import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Dropdown } from 'semantic-ui-react';
import Faculty from '../../shared/Faculty/Faculty';
import { sortByField } from '../../utils/sortByField';
import { baseURL } from '../../variables';
import './LecturersList.scss'

const LecturersList = () => {
    const navigate = useNavigate()

    const [facultyList, setFacultyList] = useState([])
    const [lecturersOption, setLecturersOption] = useState([])

    useEffect(() => {
        axios.get(`${baseURL}faculty/list/`).then(response => setFacultyList(response.data))

        axios.get(`${baseURL}lecturers/list/`).then(
            response => {
                response.data.map((item) => {
                    setLecturersOption((options) => [...options, {
                        key: item.lecturerid,
                        text: item.last_name_lecturer + ' ' + item.first_name_lecturer + ' ' + item.patronymic_lecturer, 
                        value: item.last_name_lecturer + ' ' + item.first_name_lecturer + ' ' + item.patronymic_lecturer
                    }])
                })
            })
    }, [])

    return (
        <div className='container'>
            <div className='title'>
                Выберите преподавателя
            </div>
            <Dropdown
                placeholder='Поиск преподавателя'
                style={{margin: '15px 0'}}
                onChange={(e, value) => navigate(`/consultations/${lecturersOption.findIndex(el => el.text === value.value)}`)}
                fluid
                search
                selection
                options={lecturersOption.sort(sortByField('text'))}
            />
            {
                facultyList.map((faculty) => <Faculty faculty={faculty} />)
            }
        </div>
    )
}

export default LecturersList;