import React from "react";
import Registration from "../components/Registration";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

function SignUp() {
  const handleRegistrationData = async (data) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/api/user/signup`,
        data
      );
      console.log(response);
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  return (
    <>
      <Registration type={"signup"} onRegistration={handleRegistrationData} />
      <ToastContainer />
    </>
  );
}

export default SignUp;
