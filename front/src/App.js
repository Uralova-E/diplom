import './App.css';
import Header from './components/Header/Header';
import MainPage from './pages/MainPage/MainPage';
import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom'
import Consultation from './pages/Consultation/Consultation';
import AddConsultation from './pages/AddConsultation/AddConsultation';

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
      path: "/consultations",
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
    }
  ])

  return (
    <RouterProvider router={router} />
  );
}

export default App;
