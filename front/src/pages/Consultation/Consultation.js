import ConsultationsTable from '../../shared/ConsultationsTable/ConsultationsTable'
import './Consultation.scss'
import axios from 'axios';
import { baseURL } from '../../variables'
import { useEffect, useState } from 'react';
import { user } from '../../user';
import { useNavigate } from 'react-router-dom';

const Consultation = () => {
    const navigate = useNavigate()

    const [consultationsNext, setConsultationsNext] = useState([])
    const [consultationsPrev, setConsultationsPrev] = useState([])

    const [consultationsPrevIsVisible, setConsultationsPrevIsVisible] = useState(false)

    useEffect(() => {
        axios.get(`${baseURL}consultation/lecturer/list/${user.userID}`).then(
            response => {
                console.log(response.data)
                response.data.map((item) => {
                    const day = item.date.split('-')[2]
                    const month = item.date.split('-')[1]-1
                    const year = item.date.split('-')[0]
                    const hours = item.start_time.split(':')[0]
                    const min = item.start_time.split(':')[1]
                    console.log(new Date(year, month, day, hours, min))
                    if( new Date(year, month, day, hours, min).getTime() > new Date().getTime()) {
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
        onClick={() => {navigate('/add-consultation')}}> 
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
            consultationsPrevIsVisible && (
                consultationsPrev.length === 0?
                <div className='consultation-text'>
                    Прошедших консультаций пока нет
                </div>:
                <ConsultationsTable consultations={consultationsPrev} />
            )
        }

    </div>
}

export default Consultation