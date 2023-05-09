export const setLocalStorage = (data) => {
    localStorage.setItem('token', data.token);
    localStorage.setItem('userID', data.userid);
    localStorage.setItem('username', data.login);
    localStorage.setItem('lecturerID', data.lecturerid);
    localStorage.setItem('studentID', data.studentid);
    localStorage.setItem('firstName', data.firstName);
    localStorage.setItem('lastName', data.lastName);
    localStorage.setItem('patronymic', data.patronymic);
};