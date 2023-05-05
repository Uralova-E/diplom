import axios from 'axios'
import { useState } from 'react'
import { baseURL } from '../../variables'
import Department from '../Department/Department'
import './Faculty.scss'

const Faculty = ({ faculty }) => {
    const [departmentList, setDepartmentList] = useState([])
    const [departmentsIsVisible, setDepartmentsIsVisible] = useState(false)

    const handleClickShowDepartments = () => {
        if (departmentList.length === 0) {
            axios.get(`${baseURL}departments/list/${faculty.facultyid}`).then(response => {
                setDepartmentList(response.data)
            })
            setDepartmentsIsVisible(true)
        } 
        setDepartmentsIsVisible(!departmentsIsVisible)
    }

    return <div className='faculty'>
        <div 
        className='title' 
        style={{cursor: 'pointer', marginTop: '5px'}}
        onClick={handleClickShowDepartments}>
            {faculty.abbreviated_name_of_faculty}
        </div>
        <div style={{paddingLeft: '10px'}}>
            {
                departmentsIsVisible &&
                departmentList.map((department) => <Department department={department} />)
            }
        </div>
    </div>
}

export default Faculty