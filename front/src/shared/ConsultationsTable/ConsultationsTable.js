import { timeNormilize } from '../../utiles/timeNormilize'
import './ConsultationsTable.scss'

const ConsultationsTable = ({ consultations }) => {
    return (
        <div className='consultations-table'>
            <div style={{fontWeight: '500'}} className='consultations-table-row'>
                <div className='consultations-table-cell'>Дисциплина</div>
                <div className='consultations-table-cell'>Тема</div>
                <div className='consultations-table-cell'>Дата</div>
                <div className='consultations-table-cell'>Время начала</div>
                <div className='consultations-table-cell'>Время окончания</div>
                <div className='consultations-table-cell'>Группа</div>
                <div className='consultations-table-cell'>Аудитория</div>
            </div>
            {
                consultations.map((consultation) => 
                <div className='consultations-table-row'>
                    <div className='consultations-table-cell'>{consultation.disciplineid}</div>
                    <div className='consultations-table-cell'>{consultation.topic}</div>
                    <div className='consultations-table-cell'>{consultation.date}</div>
                    <div className='consultations-table-cell'>{timeNormilize(consultation.start_time)}</div>
                    <div className='consultations-table-cell'>{timeNormilize(consultation.end_time)}</div>
                    <div className='consultations-table-cell'>{consultation.groupid}</div>
                    <div className='consultations-table-cell'>{consultation.auditoriumid}</div>
                </div>
                )
            }
        </div>
    )
}

export default ConsultationsTable