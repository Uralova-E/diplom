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

        </div>
    )
} 

export default AdminPanel