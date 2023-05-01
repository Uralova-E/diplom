import './ConsultationLecturer.scss'

const ConsultationLecturer = () => {
    return <div className='container'>
        <div className='title'>
            Список запланированных консультаций
        </div>
        <div  
            className='button'
            onClick={async (...args) => {  
                console.log('Button clicked!')  
                const response = await fetch('/api/db/patients')  
                const items = await response.json()  
                console.log(items)  
          }} > Добавить </div>
    </div>
}

export default ConsultationLecturer