import React, { useEffect } from 'react'
import Registration from '../components/Registration'
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from 'react-router-dom';


function Login() {
  const navigate = useNavigate()

  useEffect(() => {
    const isAuth = () => {
      const token = localStorage.getItem('token')
      if (token) {
        navigate('/')
      }
      else {
        navigate('/login')
      }
    }
    isAuth()
  }, [navigate])

  const handleRegistrationData = async (data) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/api/user/login`,
        data
      );
      if (response.status === 200) {
        localStorage.setItem('token', response.data.data)
        navigate('/')
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  return (
    <>
    <Registration type={'login'} onRegistration={handleRegistrationData}/>
  <div>
    <ToastContainer/>
  </div>
    </>
  )
}

export default Login