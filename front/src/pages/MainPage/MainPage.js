import './MainPage.scss'

const MainPage = () => {
    const linkToWiki = 'https://wiki.bmstu.ru/support/index.php/%D0%A0%D0%B5%D0%B3%D0%B8%D1%81%D1%82%D1%80%D0%B0%D1%86%D0%B8%D1%8F_%D0%BF%D0%BE%D0%BB%D1%8C%D0%B7%D0%BE%D0%B2%D0%B0%D1%82%D0%B5%D0%BB%D0%B5%D0%B9_%D1%81%D0%B5%D1%82%D0%B8'

    return (
    <div className='container'>
        <div className='main-page-title'>
            Запись на консультации
        </div>
        <p className='main-page-text'>
            Подсистема «Запись на консультации» предназначена для быстрой записи 
            студентов на консультации к преподавателям. Доступ к подсистеме осуществляется 
            с помощью логина и пароля единой учетной записи обучающегося 
            (логин и пароль почты и Wi-Fi). Пользователи, не имеющие такой учетной записи, 
            могут оформить ее <a style={{fontWeight: '700'}} href={linkToWiki}> по инструкции</a>.
            С вопросами и предложениями по работе личного кабинета можно 
            обращаться по адресу <a href='mailto:eu@bmstu.ru'> eu@bmstu.ru </a>
        </p>
    </div>
    )
}

export default MainPage