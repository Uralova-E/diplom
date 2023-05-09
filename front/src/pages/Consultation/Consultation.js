import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Checkbox, Dropdown, Input, Loader, TextArea } from 'semantic-ui-react'
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

    const [studentList, setStudentList] = useState([])
    const [studentInList, setStudentInList] = useState(false)

    const [loading, setLoading] = useState(true)

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

                const requestDataConsultation = {
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
                
                axios.put(`${baseURL}consultation/${consultationID}`, requestDataConsultation)
                .then(() => {
                studentList.map(record => {
                    let visitingReq = null
                    if (record.visiting) visitingReq='да'

                    const requestDataRecord = {
                        consultationid: consultationID,
                        studentid: record.studentid,
                        visiting: visitingReq,
                        notes_of_lecturer: record.notes
                    }

                    axios.put(`${baseURL}studentrecord/${record.recordid}`, requestDataRecord)
                })
                setUpdateMode(false)
            })}
        } else setUpdateMode(true)
    }

    const onClickStudentListVisitingChange = (index) => {
        const list = new Array(studentList.length)

        studentList.map((item, i) => {
            let visiting = item.visiting
            if (i === index) visiting = !visiting

            list[i] = {
                recordid: item.recordid,
                studentid: item.studentid, 
                student: item.student,
                group: item.group,
                visiting: visiting,
                notes: item.notes
            }
        })

        setStudentList(list)
    } 

    const onClickStudentListNotesChange = (index, e) => {
        const list = new Array(studentList.length)

        studentList.map((item, i) => {
            let notes = item.notes
            if (i === index) notes = e.target.value 

            list[i] = {
                recordid: item.recordid,
                studentid: item.studentid,
                student: item.student,
                group: item.group,
                visiting: item.visiting,
                notes: notes
            }
        })

        setStudentList(list)        
    }

    const handleClickEnroll = () => {
        const requestDataRecord = {
            consultationid: consultationID,
            studentid: localStorage.getItem('studentID'),
            visiting: null,
            notes_of_lecturer: ''
        }

        axios.post(`${baseURL}studentrecord/`, requestDataRecord)
        .then(() => {
            setStudentInList(true)
            axios.get(`${baseURL}studentrecord/list/consultations/${consultationID}`)
            .then(response => setStudentList(response.data))
    })}
    
    useEffect(() => {
        setLoading(true)
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

                axios.get(`${baseURL}studentrecord/list/consultations/${consultationID}`)
                .then(response => {
                    setStudentList(response.data)
                    response.data.map((record) => {
                        if(record.studentid === localStorage.getItem('studentID')) setStudentInList(true)
                    })
                    setLoading(false)
                })
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
    
    return (<>
    {
        loading?
        <div className='loader-container'>
            <Loader active inline='centered' />
        </div>:
        <>
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

            <div style={{marginTop: '15px'}}>
                <b>Список записавшихся студентов:</b>
                <div style={{marginTop: '15px'}}>
                    {
                        studentList.length !== 0 &&
                        <div style={{fontWeight: '500'}} className='consultation-student-row'>
                            <div>ФИО</div>
                            <div>Группа</div>
                            <div>Присутствие</div>
                            <div>Заметки преподавателя</div>
                        </div>
                    }
                    { 
                        studentList.map((student, index) => 
                        <div className='consultation-student-row'>
                            <div>{student.student}</div>
                            <div>{student.group}</div>
                            <div>
                                <Checkbox
                                defaultChecked={student.visiting}
                                disabled={!updateMode}
                                onChange={() => onClickStudentListVisitingChange(index)}
                                />
                            </div>
                            <div>{
                                updateMode?
                                <TextArea 
                                defaultValue={student.notes}
                                onChange={(e) => onClickStudentListNotesChange(index, e)}
                                />:
                                student.notes
                            }</div>
                        </div>
                        )
                    }
                </div>
            </div>
            
            {
                localStorage.getItem('lecturerID') === lecturerID ?
                <div 
                style={{marginTop: '15px', marginBottom: '25px'}}
                onClick={handleClickUpdateConsultation}
                className='button'>
                    { updateMode? 'Сохранить': 'Редактировать'}
                </div>:
                studentInList? <div style={{marginTop: '25px'}}>Вы записаны на эту консультацию</div>:
                <div 
                style={{marginTop: '15px'}}
                onClick={handleClickEnroll}
                className='button'>
                    Записаться
                </div>
            }
        </div>       
        </>
    }
    </>)
}

export default Consultation