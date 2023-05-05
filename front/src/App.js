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
    }
  ])

  return (
    <RouterProvider router={router} />
  );
}

export default App;
