import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { dateNormilize } from '../../utils/dateNormilize'
import { timeNormilize } from '../../utils/timeNormilize'
import { baseURL } from '../../variables'
import './Consultation.scss'

export const Consultation = () => {
    const { consultationID } = useParams()

    const [topic, setTopic] = useState()
    const [discipline, setDiscipline] = useState()
    const [date, setDate] = useState()
    const [startTime, setStartTime] = useState()
    const [endTime, setEndTime] = useState()
    const [group, setGroup] = useState()
    const [auditorium, setAuditorium] = useState()
    const [notes, setNotes] = useState()

    const [updateMode, setUpdateMode] = useState(false)

    const handleClickUpdateConsultation = () => {
        setUpdateMode(!updateMode)
    }
     
    useEffect(() => {
        axios.get(`${baseURL}consultation/${consultationID}`).then(
            response => {
                setTopic(response.data.topic)
                setDate(dateNormilize(response.data.date))
                setStartTime(timeNormilize(response.data.start_time))
                setEndTime(timeNormilize(response.data.end_time))
                setNotes(response.data.notes)
                axios.get(`${baseURL}discipline/${response.data.disciplineid}`)
                .then((response) => setDiscipline(response.data.name_of_discipline))
                axios.get(`${baseURL}groups/${response.data.groupid}`)
                .then((response) => setGroup(response.data.number_of_group))
                axios.get(`${baseURL}auditorium/${response.data.auditoriumid}`)
                .then((response) => setAuditorium(response.data.number_of_auditorium))
            })
    }, [])

    return (
        <div style={{fontSize: '16px'}} className='container'>
            <div><b>Дисциплина: </b>{discipline}</div>
            <div><b>Тема: </b>{topic}</div>
            <div><b>Дата: </b>{date}</div>
            <div><b>Время начала: </b>{startTime}</div>
            <div><b>Время окончания: </b>{endTime}</div>
            <div><b>Группа: </b>{group}</div>
            <div><b>Аудитория: </b>{auditorium}</div>
            <div><b>Заметки: </b>{notes}</div>
            <div 
            style={{marginTop: '15px'}}
            onClick={handleClickUpdateConsultation}
            className='button'>
                { updateMode? 'Сохранить': 'Редактировать'}
            </div>
        </div>
    )
}

export default Consultation