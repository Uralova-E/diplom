import './ConsultationsTable.scss'

const ConsultationsTable = ({ consultations }) => {
    return (
        <div className='consultations-table'>
            <div className='consultations-table-row'>
                <div className='consultations-table-cell'>Дисциплина</div>
                <div className='consultations-table-cell'>Тема</div>
                <div className='consultations-table-cell'>Дата</div>
                <div className='consultations-table-cell'>Время начала</div>
                <div className='consultations-table-cell'>Время окончания</div>
                <div className='consultations-table-cell'>Группа</div>
                <div className='consultations-table-cell'>Аудитория</div>
            </div>
        </div>
    )
}

export default ConsultationsTable