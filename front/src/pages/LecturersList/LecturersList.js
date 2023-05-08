import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Dimmer, Dropdown, Loader } from 'semantic-ui-react';
import Faculty from '../../shared/Faculty/Faculty';
import { sortByField } from '../../utils/sortByField';
import { baseURL } from '../../variables';
import './LecturersList.scss'

const LecturersList = () => {
    const navigate = useNavigate()

    const [facultyList, setFacultyList] = useState([])
    const [lecturersOption, setLecturersOption] = useState([])

    const [loading, setLoading] = useState(true)

    useEffect(() => {
        axios.get(`${baseURL}faculty/list/`).then(response => setFacultyList(response.data))

        setLoading(true)
        axios.get(`${baseURL}lecturers/list/`).then(
            response => {
                response.data.map((item) => {
                    setLecturersOption((options) => [...options, {
                        key: item.lecturerid,
                        text: item.last_name_lecturer + ' ' + item.first_name_lecturer + ' ' + item.patronymic_lecturer, 
                        value: item.last_name_lecturer + ' ' + item.first_name_lecturer + ' ' + item.patronymic_lecturer
                    }])
                })
                setLoading(false)
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
                onChange={(e, value) => {
                    if(e._reactName === 'onClick')
                    navigate(`/consultations/${lecturersOption[lecturersOption.findIndex(el => el.text === value.value)].key}`)
                }}
                fluid
                search
                selection
                options={lecturersOption.sort(sortByField('text'))}
            />
            {
                loading?
                    <div className='loader-container'>
                        <Loader active inline='centered' />
                    </div>
                :
                facultyList.map((faculty) => <Faculty faculty={faculty} />)
            }
        </div>
    )
}

export default LecturersList;