import './App.css';
import Header from './components/Header/Header';
import MainPage from './pages/MainPage/MainPage';
import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom'
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
      path: "/consultations",
      element: <>
        <Header />
        <Consultation />
      </>
    }
  ])

  return (
    <RouterProvider router={router} />
  );
}

export default App;
