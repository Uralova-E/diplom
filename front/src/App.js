import './App.css';
import Header from './components/Header/Header';
import MainPage from './pages/MainPage/MainPage';
import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom'

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <MainPage />
    },
  ])

  return (
  <>
    <Header />
    <RouterProvider router={router} />
  </>
  );
}

export default App;
