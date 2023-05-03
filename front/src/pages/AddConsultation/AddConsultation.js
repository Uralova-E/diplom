import './AddConsultation.scss'

const AddConsultation = () => {
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
                <input 
                type='text'
                placeholder='Дисциплина'
                className='add-consultation-input' />
                
                <input 
                type='text'
                placeholder='Тема'
                className='add-consultation-input' />
                
                <input 
                type='text'
                placeholder='Дата'
                className='add-consultation-input' />
                                
                <input 
                type='text'
                placeholder='Время начала'
                className='add-consultation-input' />
                                
                <input 
                type='text'
                placeholder='Время окончания'
                className='add-consultation-input' />
                                
                <input 
                type='text'
                placeholder='Группа'
                className='add-consultation-input' />
                                
                <input 
                type='text'
                placeholder='Аудитория'
                className='add-consultation-input' />
            </div>

            <div className='add-consultation-button-container'>
                <div className='button'>
                    Сохранить
                </div>
            </div>
        </div>
    )
}

export default AddConsultation