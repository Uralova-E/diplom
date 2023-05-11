import axios from 'axios'
import { useState } from 'react'
import { Dropdown, Input } from 'semantic-ui-react'
import { GetDepartmentOptions, GetPositionOptions } from '../../../../utils/options'
import { sortByField } from '../../../../utils/sortByField'
import { baseURL } from '../../../../variables'
import './LecturerTableRow.scss'

const LecturerTableRow = ({lecturer}) => {
    const departmentOptions = GetDepartmentOptions()
    const positionOptions = GetPositionOptions()

    const [departmentID, setDepartmentID] = useState(lecturer.departmentid)
    const [positionID, setPositionID] = useState(lecturer.positionid)
    const [lastName, setLastName] = useState(lecturer.last_name_lecturer)
    const [firstName, setFirstName] = useState(lecturer.first_name_lecturer)
    const [patronymic, setPatronymic] = useState(lecturer.patronymic_lecturer)

    const [updateMode, setUpdateMode] = useState(false)

    const handleClickSave = () => {
        axios.put(`${baseURL}lecturer/${lecturer.lecturerid}`, {
            last_name_lecturer: lastName,
            first_name_lecturer: firstName,
            patronymic_lecturer: patronymic,
            positionid: positionID,
            departmentid: departmentID
        }).then(() => setUpdateMode(false))
    }

    return (<>
        {
            departmentOptions.length !== 0 &&
            positionOptions.length !== 0 &&
            <div className='lecturer-table-row'>
                {
                    updateMode?
                    <Dropdown
                    style={{width: '100px', marginLeft: '40px'}}
                    onChange={(e, value) => setDepartmentID(departmentOptions[departmentOptions.findIndex(el => el.text === value.value)].key)}
                    defaultValue={departmentOptions[departmentOptions.findIndex(el => el.key === departmentID)].value}
                    fluid
                    search
                    selection
                    options={departmentOptions.sort(sortByField('text'))}
                    />:
                    <div className='lecturer-table-cell'>{departmentOptions.filter(el => el.key === departmentID)[0].text}</div>
                }
                {
                    updateMode?
                    <Dropdown
                    style={{width: '200px', marginLeft: '40px'}}
                    onChange={(e, value) => setPositionID(positionOptions[positionOptions.findIndex(el => el.text === value.value)].key)}
                    defaultValue={positionOptions[positionOptions.findIndex(el => el.key === positionID)].value}
                    fluid
                    search
                    selection
                    options={positionOptions.sort(sortByField('text'))}
                    />:
                    <div className='lecturer-table-cell'>{positionOptions.filter(el => el.key === positionID)[0].text}</div>
                }
                {
                    updateMode ?
                    <Input
                    style={{width: '150px', marginLeft: '30px'}}
                    defaultValue={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    />:
                    <div className='lecturer-table-cell'>{lastName}</div>
                }
                {
                    updateMode ?
                    <Input
                    style={{width: '150px', marginLeft: '30px'}}
                    defaultValue={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    />:
                    <div className='lecturer-table-cell'>{firstName}</div>
                }
                {
                    updateMode ?
                    <Input
                    style={{width: '150px', marginLeft: '30px', marginRight: '10px'}}
                    defaultValue={patronymic}
                    onChange={(e) => setPatronymic(e.target.value)}
                    />:
                    <div className='lecturer-table-cell'>{patronymic}</div>
                }
                
                {
                    updateMode ?
                    <div 
                    style={{width: '138.55px', textAlign: 'center'}}
                    onClick={handleClickSave}
                    className='button'>Сохранить</div>:
                    <div 
                    onClick={() => setUpdateMode(true)}
                    className='button'>Редактировать</div>
                }

        </div>
        }
    </>)
}

export default LecturerTableRow