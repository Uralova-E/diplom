import './App.css';
import Header from './components/Header/Header';
import MainPage from './pages/MainPage/MainPage';
import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom'
import ConsultationList from './pages/ConsultationList/ConsultationList';
import AddConsultation from './pages/AddConsultation/AddConsultation';
import LecturerList from './pages/LecturersList/LecturersList';
import Consultation from './pages/Consultation/Consultation';
import Login from './pages/Login/Login';
import AdminPanel from './pages/AdminPanel/AdminPanel';
import LecturerTable from './pages/LecturerTable/LecturerTable';
import AddLecturer from './pages/LecturerTable/components/LecturerTableRow/AddLecturer/AddLecturer';

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <>
        <Header />
        <MainPage />
      </>
    },
    {
      path: "/consultations/:lecturerID",
      element: <>
        <Header />
        <ConsultationList />
      </>
    },
    {
      path: "/login",
      element: <>
        <Header />
        <Login />
      </>
    },
    {
      path: "/consultation/:consultationID",
      element: <>
        <Header />
        <Consultation />
      </>
    },
    {
      path: "/add-consultation",
      element: <>
        <Header />
        <AddConsultation />
      </>
    },
    {
      path: "/lecturers-list",
      element: <>
        <Header />
        <LecturerList />
      </>
    },
    {
      path: "/admin",
      element: <>
        <Header />
        <AdminPanel />
      </>
    },
    {
      path: "/lecturer-table",
      element: <>
        <Header />
        <LecturerTable />
      </>
    },
    {
      path: "/add-lecturer",
      element: <>
        <Header />
        <AddLecturer />
      </>
    }
  ])

  return (
    <RouterProvider router={router} />
  );
}

export default App;
