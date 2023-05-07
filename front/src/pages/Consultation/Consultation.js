import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Checkbox, Dropdown, Input, TextArea } from 'semantic-ui-react'
import { user } from '../../user'
import { convertDateToYYYYMMDD } from '../../utils/convertDateToYYYYMMDD'
import { dateNormilize } from '../../utils/dateNormilize'
import { GetAuditoriumOptions, GetDisciplineOptions, GetGroupOptions } from '../../utils/options'
import { sortByField } from '../../utils/sortByField'
import { timeNormilize } from '../../utils/timeNormilize'
import { timeValidate } from '../../utils/timeValidate'
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
    const [status, setStatus] = useState()
    const [lecturerID, setLecturerID] = useState()
    
    const [disciplineID, setDisciplineID] = useState()
    const [groupID, setGroupID] = useState()
    const [auditoriumID, setAuditoriumID] = useState()

    const [updateMode, setUpdateMode] = useState(false)

    const disciplineOptions = GetDisciplineOptions()
    const groupOptions = GetGroupOptions()
    const auditoriumOptions = GetAuditoriumOptions()

    const [topicError, setTopicError] = useState(false)
    const [startTimeError, setStartTimeError] = useState(false)
    const [endTimeError, setEndTimeError] = useState(false)

    const handleClickUpdateConsultation = () => {
        if (updateMode === true) {
            let error = false

            if (typeof topic === 'undefined' || topic === '') {
                error = true
                setTopicError(true)
            }
            if (!timeValidate(startTime)) {
                setStartTimeError(true)
                error = true
            } 
            if (!timeValidate(endTime)) {
                setEndTimeError(true)
                error = true
            }

            if (!error) {
                let dateReq = date
                if (date.split('.').length === 3) dateReq = convertDateToYYYYMMDD(date)
                let statusReq = false
                if (status === true) statusReq='да'
                else statusReq = null

                const requestData = {
                    auditoriumid: auditoriumID,
                    lecturerid: lecturerID,
                    topic: topic,
                    date: dateReq,
                    start_time: startTime + ':00+03:00',
                    end_time: endTime + ':00+03:00',
                    groupid: groupID,
                    was_conducted: statusReq,
                    notes: notes,
                    disciplineid: disciplineID
                }
                
                axios.put(`${baseURL}consultation/${consultationID}`, requestData)
                .then(() => setUpdateMode(false))
            }
        } else setUpdateMode(true)
    }
     
    useEffect(() => {
        axios.get(`${baseURL}consultation/${consultationID}`).then(
            response => {
                setTopic(response.data.topic)
                setDate(dateNormilize(response.data.date))
                setStartTime(timeNormilize(response.data.start_time))
                setEndTime(timeNormilize(response.data.end_time))
                setNotes(response.data.notes)
                setLecturerID(response.data.lecturerid)
                setDisciplineID(response.data.disciplineid)
                setGroupID(response.data.groupid)
                setAuditoriumID(response.data.auditoriumid)

                if (response.data.was_conducted === 'да') setStatus(true)
                else setStatus(false)

                axios.get(`${baseURL}discipline/${response.data.disciplineid}`)
                .then((response) => setDiscipline(response.data.name_of_discipline))
                axios.get(`${baseURL}groups/${response.data.groupid}`)
                .then((response) => setGroup(response.data.number_of_group))
                axios.get(`${baseURL}auditorium/${response.data.auditoriumid}`)
                .then((response) => setAuditorium(response.data.number_of_auditorium))
            })
    }, [])

    useEffect(() => {
        axios.get(`${baseURL}discipline/${disciplineID}`)
        .then((response) => setDiscipline(response.data.name_of_discipline))
        axios.get(`${baseURL}groups/${groupID}`)
        .then((response) => setGroup(response.data.number_of_group))
        axios.get(`${baseURL}auditorium/${auditoriumID}`)
        .then((response) => setAuditorium(response.data.number_of_auditorium))
    }, [updateMode])

    return (
        <div style={{fontSize: '16px'}} className='container'>
            <div className={updateMode && 'consultation-input-container'}><b>Дисциплина: &nbsp;</b>{
                updateMode? 
                <Dropdown
                style={{display: 'inline-block'}}
                placeholder='Дисциплина'
                className='add-consultation-input'
                onChange={(e, value) => setDisciplineID(disciplineOptions[disciplineOptions.findIndex(el => el.text === value.value)].key)}
                defaultValue={disciplineOptions[disciplineOptions.findIndex(el => el.value === discipline)].value}
                fluid
                search
                selection
                options={disciplineOptions.sort(sortByField('text'))}
                />:
                discipline
            }</div>
            <div className={updateMode && 'consultation-input-container'}><b>Тема: &nbsp;</b>{
                updateMode?
                <Input
                placeholder='Тема'
                onChange={(e) => setTopic(e.target.value)}
                error={topicError}
                defaultValue={topic}
                onFocus={() => setTopicError(false)}
                className='add-consultation-input'
                fluid
                />:
                topic
            }</div>
            <div className={updateMode && 'consultation-input-container'}><b>Дата: &nbsp;</b>{
                updateMode?
                <Input
                placeholder='Дата'
                onChange={(e) => setDate(e.target.value)}
                defaultValue={convertDateToYYYYMMDD(date)}
                type='date'
                className='add-consultation-input'
                fluid
                />:
                date
            }</div>
            <div className={updateMode && 'consultation-input-container'}><b>Время начала: &nbsp;</b>{
                updateMode?
                <Input
                placeholder='Время начала'
                onChange={(e) => setStartTime(e.target.value)}
                error={startTimeError}
                onFocus={() => setStartTimeError(false)}
                defaultValue={startTime}
                className='add-consultation-input'
                fluid
                />:
                startTime
            }</div>
            <div className={updateMode && 'consultation-input-container'}><b>Время окончания: &nbsp;</b>{
                updateMode?
                <Input
                placeholder='Время окончания'
                onChange={(e) => setEndTime(e.target.value)}
                error={endTimeError}
                defaultValue={endTime}
                onFocus={() => setEndTimeError(false)}
                className='add-consultation-input'
                fluid
                />:
                endTime
            }</div>
            <div className={updateMode && 'consultation-input-container'}><b>Группа: &nbsp;</b>{
                updateMode?
                <Dropdown
                style={{display: 'inline-block'}}
                placeholder='Группа'
                className='add-consultation-input'
                onChange={(e, value) => setGroupID(groupOptions[groupOptions.findIndex(el => el.text == value.value)].key)}
                fluid
                search
                selection
                defaultValue={groupOptions[groupOptions.findIndex(el => el.value === group)].value}
                options={groupOptions.sort(sortByField('text'))}
                />:
                group
            }</div>
            <div className={updateMode && 'consultation-input-container'}><b>Аудитория: &nbsp;</b>{
                updateMode?
                <Dropdown
                style={{display: 'inline-block'}}
                placeholder='Аудитория'
                className='add-consultation-input'
                onChange={(e, value) => setAuditoriumID(auditoriumOptions[auditoriumOptions.findIndex(el => el.text == value.value)].key)}
                fluid
                search
                selection
                options={auditoriumOptions.sort(sortByField('text'))}
                defaultValue={auditoriumOptions[auditoriumOptions.findIndex(el => el.value === auditorium)].value}
                />:
                auditorium
            }</div>
            <div className={updateMode && 'consultation-input-container'}><b>Заметки: &nbsp;</b>{
                updateMode?
                <TextArea
                placeholder='Заметки'
                className='add-consultation-input'
                style={{padding: '10px'}}
                onChange={(e) => setNotes(e.target.value)}
                defaultValue={notes}
                />:
                notes
            }</div>
            <div style={{display: 'flex', alignItems: 'center'}}><b>Статус: &nbsp;</b> 
                {
                    updateMode? 
                    <Checkbox
                    defaultChecked={status}
                    onChange={() => setStatus(!status)}
                    />:
                    status ? 'Проведена': 'Не проведена'
                }
            </div>

            <div><b>Список записавшихся студентов:</b></div>
            
            {
                user.lecturerID === lecturerID &&
                <div 
                style={{marginTop: '15px', marginBottom: '25px'}}
                onClick={handleClickUpdateConsultation}
                className='button'>
                    { updateMode? 'Сохранить': 'Редактировать'}
                </div>
            }
        </div>
    )
}

export default Consultation