import ConsultationsTable from '../../shared/ConsultationsTable/ConsultationsTable'
import './ConsultationLecturer.scss'
import axios from 'axios';
import { baseURL } from '../../variables'
import { useEffect, useState } from 'react';

const ConsultationLecturer = () => {
    const [consultations, setConsultations] = useState([])

    useEffect(() => {
        axios.get(`${baseURL}consultation/list/`).then(response => setConsultations(response.data))
    })

    return <div className='container'>
        <div className='title'>
            Список запланированных консультаций
        </div>
        <ConsultationsTable consultations={consultations} />
        <div  
        className='button'
        onClick={() => {}}> 
        Добавить 
        </div>
    </div>
}

export default ConsultationLecturer