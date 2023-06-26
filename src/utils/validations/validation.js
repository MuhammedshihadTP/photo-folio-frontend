import * as yup from "yup";

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;
// min 5 characters, 1 upper case letter, 1 lower case letter,1 numeric digit.

export const signupValidation = yup.object().shape({
  name: yup.string().required("Requaired"),
  email: yup.string().email("please Enter Valid Email").required("Requaired"),
  password: yup
    .string()
    .min(5)
    .max(16)
    .matches(passwordRules, { message: "Please create a strong password" })
    .required("Requaired"),
  confirmpassword: yup
    .string()
    .oneOf([yup.ref("password")], "Password must Match").required("Requaired"),
});

export const loginValidation = yup.object().shape({
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup.string().required('Password is required'),
  });