import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Dropdown, Input } from 'semantic-ui-react'
import { GetDepartmentOptions, GetPositionOptions } from '../../../../../utils/options'
import { sortByField } from '../../../../../utils/sortByField'
import { baseURL } from '../../../../../variables'
import './AddLecturer.scss'

const AddLecturer = () => {
    const navigate = useNavigate()

    const [departmentID, setDepartmentID] = useState()
    const [positionID, setPositionID] = useState()
    const [lastName, setLastName] = useState()
    const [firstName, setFirstName] = useState()
    const [patronymic, setPatronymic] = useState()

    const departmentOptions = GetDepartmentOptions()
    const positionOptions = GetPositionOptions()

    const handleClickSave = () => {
        axios.post(`${baseURL}lecturer/`, {
            last_name_lecturer: lastName,
            first_name_lecturer: firstName,
            patronymic_lecturer: patronymic,
            positionid: positionID,
            departmentid: departmentID
        }).then(() => navigate('/lecturer-table'))
    }

    useEffect(() => {
        if (localStorage.getItem('token') !== '123') navigate('/')
    }, [])

    return (
        <div className='container' style={{width: '500px'}}>
            <div className='add-consultation-input-container'>
                <Input
                className='add-consultation-input'
                placeholder='Имя'
                defaultValue={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                />
                <Input
                className='add-consultation-input'
                placeholder='Фамилия'
                defaultValue={lastName}
                onChange={(e) => setLastName(e.target.value)}
                />
                <Input
                className='add-consultation-input'
                placeholder='Отчество'
                defaultValue={patronymic}
                onChange={(e) => setPatronymic(e.target.value)}
                />

                <Dropdown
                placeholder='Кафедра'
                className='add-consultation-input'
                onChange={(e, value) => setDepartmentID(departmentOptions[departmentOptions.findIndex(el => el.text === value.value)].key)}
                fluid
                search
                selection
                options={departmentOptions.sort(sortByField('text'))}
                />

                <Dropdown
                placeholder='Должность'
                className='add-consultation-input'
                onChange={(e, value) => setPositionID(positionOptions[positionOptions.findIndex(el => el.text === value.value)].key)}
                fluid
                search
                selection
                options={positionOptions.sort(sortByField('text'))}
                />

            </div>

            <div
            onClick={handleClickSave} 
            style={{marginLeft: '200px'}} 
            className='button'>Сохранить</div>
        </div>
    )
}

export default AddLecturer