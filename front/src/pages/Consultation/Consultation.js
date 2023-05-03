import ConsultationsTable from '../../shared/ConsultationsTable/ConsultationsTable'
import './Consultation.scss'
import axios from 'axios';
import { baseURL } from '../../variables'
import { useEffect, useState } from 'react';
import { user } from '../../user';

const Consultation = () => {
    const [consultationsNext, setConsultationsNext] = useState([])
    const [consultationsPrev, setConsultationsPrev] = useState([])

    const [consultationsPrevIsVisible, setConsultationsPrevIsVisible] = useState(false)

    useEffect(() => {
        axios.get(`${baseURL}consultation/lecturer/list/${user.userID}`).then(
            response => {
                response.data.map((item) => {
                    if( new Date(item.date).getMilliseconds > new Date().getMilliseconds) {
                        setConsultationsNext(consultationsNext => [...consultationsNext, item])
                    } else {
                        setConsultationsPrev(consultationsPrev => [...consultationsPrev, item])
                    }
                })
    })}, [])

    return <div className='container'>
        <div className='title'>
            Список запланированных консультаций
        </div>
        {
            consultationsNext.length === 0?
            <div className='consultation-text'>
                Запланированных консультаций пока нет. Чтобы добавить новую консультацию, нажмите на кнопку "Добавить". 
            </div>:
            <ConsultationsTable consultations={consultationsNext} />
        }

        <div  
        className='button'
        onClick={() => {}}> 
        Добавить 
        </div>

        <div  
        className='button'
        onClick={() => setConsultationsPrevIsVisible(!consultationsPrevIsVisible)}> 
        {
            consultationsPrevIsVisible? 'Скрыть прошедшие консультации': 'Показать прошедшие консультации '
        }
        </div>

        {
            consultationsPrevIsVisible && <ConsultationsTable consultations={consultationsPrev} />
        }

    </div>
}

export default Consultation