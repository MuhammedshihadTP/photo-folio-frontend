import { Box, Button,  Link, Paper, TextField, Typography, } from '@mui/material'
import React, { useState } from 'react'
import style from '../styles/registration.module.scss'
import { useFormik } from 'formik';
import { loginValidation, signupValidation ,} from '../utils/validations/validation';

function Registration({type,onRegistration}) {
    const validationSchema = type === 'login' ? loginValidation : signupValidation;

 const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        name:"",
        email: "",
        password: "",
        confirmpassword:""
      },
      validationSchema: validationSchema,
      onSubmit: (values) => {
        onRegistration(values)  
      },
    });

  
  return (
    <>
    <Box className={style.container}>
      <Paper className={style.paper}>
        <form onSubmit={handleSubmit}>
          <h3>{type === 'login' ? 'Login' : 'Registration'}</h3>
          {type !== 'login' && (
            <TextField
              variant="outlined"
              label="Name"
              name="name"
              autoComplete="off"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.name && Boolean(errors.name)}
              helperText={touched.name && errors.name}
              sx={{ width: '300px' }}
            />
          )}
          <TextField
            variant="outlined"
            label="Email"
            name="email"
            autoComplete="off"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.email && Boolean(errors.email)}
            helperText={touched.email && errors.email}
            sx={{ width: '300px' }}
          />
          <TextField
            variant="outlined"
            label="Password"
            name="password"
            autoComplete="off"
            type="password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.password && Boolean(errors.password)}
            helperText={touched.password && errors.password}
            sx={{ width: '300px' }}
          />
          {type !== 'login' && (
            <TextField
              variant="outlined"
              label="Confirm Password"
              name="confirmpassword"
              autoComplete="off"
              type="password"
              value={values.confirmpassword}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.confirmpassword&& Boolean(errors.confirmpassword)}
              helperText={touched.confirmpassword && errors.confirmpassword}
              sx={{ width: '300px' }}
            />
          )}

          <Button
            variant="contained"
            type="submit"
            sx={{ outline: 'black', color: 'black', width: '150px' }}
          >
            {type === 'login' ? 'Login' : 'Register'}
          </Button>
          <Typography>
            {type === 'login' ? 'Create a New Account ' : 'Already have an account? '}
            <Link className={style.Link} href={type === 'login' ? 'signup' : 'login'}>
              {type === 'login' ? 'SignUp' : 'Login'}
            </Link>
          </Typography>
        </form>
      </Paper>
    </Box>
  </>
   
  )
}

export default Registration