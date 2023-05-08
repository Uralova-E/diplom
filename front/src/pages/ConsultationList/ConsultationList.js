import ConsultationsTable from '../../shared/ConsultationsTable/ConsultationsTable'
import './ConsultationList.scss'
import axios from 'axios';
import { baseURL } from '../../variables'
import { useEffect, useState } from 'react';
import { user } from '../../user';
import { useNavigate, useParams } from 'react-router-dom';
import { sortByField } from '../../utils/sortByField';
import { Dropdown } from 'semantic-ui-react';
import { GetGroupOptions } from '../../utils/options';

const ConsultationList = () => {
    const { lecturerID } = useParams();
    const navigate = useNavigate()

    const [consultationsNext, setConsultationsNext] = useState([])
    const [consultationsPrev, setConsultationsPrev] = useState([])

    const [consultationsPrevIsVisible, setConsultationsPrevIsVisible] = useState(false)

    const groupOptions = GetGroupOptions()

    const hangleChangeGroup = (groupID) => {
        axios.get(`${baseURL}consultation/lecturer/list/${lecturerID}/${groupID}`).then(
            response => {
                setConsultationsNext([])
                setConsultationsPrev([])
                const consultations = response.data
                .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()) 
                
                consultations.map((item) => {
                    const day = item.date.split('-')[2]
                    const month = item.date.split('-')[1]-1
                    const year = item.date.split('-')[0]
                    const hours = item.start_time.split(':')[0]
                    const min = item.start_time.split(':')[1]
                    if( new Date(year, month, day, hours, min).getTime() > new Date().getTime()) {
                        setConsultationsNext(consultationsNext => [...consultationsNext, item])
                    } else {
                        setConsultationsPrev(consultationsPrev => [...consultationsPrev, item])
                    }
                })
    })}

    useEffect(() => {
        axios.get(`${baseURL}consultation/lecturer/list/${lecturerID}`).then(
            response => {
                const consultations = response.data
                .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()) 
                
                consultations.map((item) => {
                    const day = item.date.split('-')[2]
                    const month = item.date.split('-')[1]-1
                    const year = item.date.split('-')[0]
                    const hours = item.start_time.split(':')[0]
                    const min = item.start_time.split(':')[1]
                    if( new Date(year, month, day, hours, min).getTime() > new Date().getTime()) {
                        setConsultationsNext(consultationsNext => [...consultationsNext, item])
                    } else {
                        setConsultationsPrev(consultationsPrev => [...consultationsPrev, item])
                    }
                })
    })}, [])



    return <div className='container'>
        <Dropdown
        placeholder='Выберите группу'
        style={{marginBottom: '10px'}}
        fluid
        search
        selection
        options={groupOptions.sort(sortByField('text'))}
        onChange={(e, value) => hangleChangeGroup(groupOptions[groupOptions.findIndex(el => el.text == value.value)].key)}
        />

        <div className='title'>
            Список запланированных консультаций
        </div>

        {
            consultationsNext.length === 0?
            <div className='consultation-text'>
                Запланированных консультаций пока нет. 
                { user.lecturerID !== null && 
                'Чтобы добавить новую консультацию, нажмите на кнопку "Добавить".' }
            </div>:
            <ConsultationsTable consultations={consultationsNext} />
        }

        {
            user.lecturerID !== null &&
            <div  
            className='button'
            onClick={() => {navigate('/add-consultation')}}> 
            Добавить 
            </div>
        }

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

export default ConsultationList