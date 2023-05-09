import { useEffect, useState } from 'react'
import './AddConsultation.scss'
import { Dropdown, Input, TextArea } from 'semantic-ui-react'
import { sortByField } from '../../utils/sortByField'
import { timeValidate } from '../../utils/timeValidate'
import axios from 'axios'
import { baseURL } from '../../variables'
import { useNavigate } from 'react-router-dom'
import { GetAuditoriumOptions, GetDisciplineOptions, GetGroupOptions } from '../../utils/options'

const AddConsultation = () => {
    const navigate = useNavigate()

    const disciplineOptions = GetDisciplineOptions()
    const groupOptions = GetGroupOptions()
    const auditoriumOptions = GetAuditoriumOptions()

    const [selectedDiscipline, setSelectedDiscipline] = useState()
    const [selectedTheme, setSelectedTheme] = useState()
    const [selectedDate, setSelectedDate] = useState()
    const [selectedStartTime, setSelectedStartTime] = useState()
    const [selectedEndTime, setSelectedEndTime] = useState()
    const [selectedGroup, setSelectedGroup] = useState()
    const [selectedAuditorium, setSelectedAuditorium] = useState()
    const [notes, setNotes] = useState('')

    const [disciplineError, setDisciplineError] = useState(false)
    const [themeError, setThemeError] = useState(false)
    const [dateError, setDateError] = useState(false)
    const [startTimeError, setStartTimeError] = useState(false)
    const [endTimeError, setEndTimeError] = useState(false)
    const [groupError, setGroupError] = useState(false)
    const [auditoriumError, setAuditoriumError] = useState(false)

    useEffect(() => {
        if (localStorage.getItem('lecturerID') === 'null') {
            navigate('/lecturers-list')
        }
    }, [])

    const handleClickSave = () => {
        let error = false

        if (typeof selectedDiscipline === 'undefined') {
            error = true
            setDisciplineError(true)
        }
        if (typeof selectedTheme === 'undefined' || selectedTheme === '') {
            error = true
            setThemeError(true)
        }
        if (typeof selectedDate === 'undefined') {
            error = true
            setDateError(true)
        }
        if (!timeValidate(selectedStartTime)) {
            setStartTimeError(true)
            error = true
        } 
        if (!timeValidate(selectedEndTime)) {
            setEndTimeError(true)
            error = true
        }
        if (typeof selectedGroup === 'undefined') {
            error = true
            setGroupError(true)
        }
        if (typeof selectedAuditorium === 'undefined') {
            error = true
            setAuditoriumError(true)
        }

        if (!error) {
            const requestData = {
                auditoriumid: selectedAuditorium,
                lecturerid: localStorage.getItem('lecturerID'),
                topic: selectedTheme,
                date: selectedDate,
                start_time: selectedStartTime + ':00+03:00',
                end_time: selectedEndTime + ':00+03:00',
                groupid: selectedGroup,
                was_conducted: null,
                notes: notes,
                disciplineid: selectedDiscipline
            }  
            
            axios.post(`${baseURL}consultation/`, requestData)
            .then(() => navigate(`/consultations/${localStorage.getItem('lecturerID')}`))
            .catch(err => console.log(err))
        }
    }

    return (
        <div className='container'>
            <div 
            style={{
                width: '100%',
                textAlign: 'center'
            }}
            className='title'>
                Добавьте консультацию
            </div>

            <div className='add-consultation-input-container'>
                <Dropdown
                    placeholder='Дисциплина'
                    className='add-consultation-input'
                    onChange={(e, value) => setSelectedDiscipline(disciplineOptions[disciplineOptions.findIndex(el => el.text == value.value)].key)}
                    fluid
                    error={disciplineError}
                    onFocus={() => setDisciplineError(false)}
                    search
                    selection
                    options={disciplineOptions.sort(sortByField('text'))}
                />
                <Input
                    placeholder='Тема'
                    onChange={(e) => setSelectedTheme(e.target.value)}
                    error={themeError}
                    onFocus={() => setThemeError(false)}
                    className='add-consultation-input'
                    fluid
                />
                <Input
                    placeholder='Дата'
                    onChange={(e) => setSelectedDate(e.target.value)}
                    error={dateError}
                    onFocus={() => setDateError(false)}
                    type='date'
                    className='add-consultation-input'
                    fluid
                />
                <Input
                    placeholder='Время начала'
                    onChange={(e) => setSelectedStartTime(e.target.value)}
                    error={startTimeError}
                    onFocus={() => setStartTimeError(false)}
                    className='add-consultation-input'
                    fluid
                />
                <Input
                    placeholder='Время окончания'
                    onChange={(e) => setSelectedEndTime(e.target.value)}
                    error={endTimeError}
                    onFocus={() => setEndTimeError(false)}
                    className='add-consultation-input'
                    fluid
                />
                <Dropdown
                    placeholder='Группа'
                    className='add-consultation-input'
                    onChange={(e, value) => setSelectedGroup(groupOptions[groupOptions.findIndex(el => el.text == value.value)].key)}
                    fluid
                    search
                    selection
                    error={groupError}
                    onFocus={() => setGroupError(false)}
                    options={groupOptions.sort(sortByField('text'))}
                />
                <Dropdown
                    placeholder='Аудитория'
                    className='add-consultation-input'
                    onChange={(e, value) => setSelectedAuditorium(auditoriumOptions[auditoriumOptions.findIndex(el => el.text == value.value)].key)}
                    fluid
                    search
                    selection
                    error={auditoriumError}
                    onFocus={() => setAuditoriumError(false)}
                    options={auditoriumOptions.sort(sortByField('text'))}
                />
                <TextArea 
                placeholder='Заметки'
                className='add-consultation-input'
                style={{padding: '10px'}}
                onChange={(e) => setNotes(e.target.value)}
                />
            </div>

            <div className='add-consultation-button-container'>
                <div 
                onClick={handleClickSave}
                className='button'>
                    Сохранить
                </div>
            </div>
        </div>
    )
}

export default AddConsultation