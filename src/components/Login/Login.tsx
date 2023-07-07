import { Formik, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './style.css';
import CustomTextInput from '../../common/form/CustomTextInput/CustomTextInput';
import CustomTextAreaInput from '../../common/form/CustomTextAreaInput/CustomTextAreaInput';
import { LoginRequestDto } from '../../common/interfaces/AuthInterfaces';
import { useStore } from '../../stores/store';
import { Typography } from '@mui/material';

const initialValues: LoginRequestDto = {
  email: '',
  password: '',
}
const validate = Yup.object({
  email: Yup.string()
    .email('Email is invalid')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 charaters')
    .required('Password is required'),
})

export const Login = () => {
  const { userStore } = useStore();
  const { login } = userStore;
  
  return (
    <Formik
      initialValues={{
        ...initialValues,
        error: null
      }}
      validationSchema={validate}
      onSubmit={(values, { setErrors, setSubmitting }) => {
        login(values.email, values.password)
          .catch(error => {
            setSubmitting(false);
            setErrors({ error: 'Invalid email or password' });
          });
      }}
    >
      {({ isSubmitting, dirty, errors }) => (
        <Form className="loginForm">
          <h3 className="mb-3">Login</h3>
          <CustomTextInput label="Email" name="email" placeholder="Enter email" />
          <CustomTextInput label="Password" name="password" type="password" placeholder='Enter password' />

          <ErrorMessage name="error" render={() => {
            return (
              <Typography
                variant="body2"
                color="error"
                sx={{ 
                  mt: 1,
                  mb: 1,
                  fontFamily: "Poppins, sans-serif",
                  fontSize: "0.875rem",
                  fontWeight: 500,
                  lineHeight: 1.75,
                  letterSpacing: "0.02857em", 
                }}
              >
                {errors.error}
              </Typography>
            );
          }}/>

          <button className="btn btn-dark mt-3 submitBtn" type="submit" disabled={isSubmitting || !dirty}>
            {
              isSubmitting ? (
                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
              ) : (
                <span>Login</span>
              )
            }
          </button>
        </Form>
      )}
    </Formik>
  )
}
