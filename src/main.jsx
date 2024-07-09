import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Login from './pages/Login.jsx';
import PrivetRoute from './Provider/PrivetRoute.jsx';
import AuthProvider from './Provider/AuthProvider.jsx';
import Home from './pages/MyInfo/Home.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children:[
      
      {
        path:'/',
        element : <PrivetRoute><Home/></PrivetRoute>
      },
      
      
      {
        path:'/login',
        element : <Login/>
      },
      {
        path:'*',
        element : <h2 className='mt-5 text-center text-secondary'>Not Found</h2>
      },
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>,
)