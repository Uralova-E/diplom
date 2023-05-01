import './App.css';
import Header from './components/Header/Header';
import MainPage from './pages/MainPage/MainPage';
import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom'
import ConsultationLecturer from './pages/ConsultationLecturer/ConsultationLecturer';

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
      path: "/consultations-lecturer",
      element: <>
        <Header />
        <ConsultationLecturer />
      </>
    }
  ])

  return (
    <RouterProvider router={router} />
  );
}

export default App;
