import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import './style.css';
import CustomTextInput from '../../common/form/CustomTextInput/CustomTextInput';
import CustomTextAreaInput from '../../common/form/CustomTextAreaInput/CustomTextAreaInput';
import { LoginRequestDto } from '../../common/interfaces/AuthInterfaces';
import { useStore } from '../../stores/store';

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
      initialValues={initialValues}
      validationSchema={validate}
      onSubmit={values => {
        login(values.email, values.password);
      }}
    >
      {({ handleSubmit, isSubmitting, isValid, dirty }) => (
        <Form className="loginForm">
          <h3 className="mb-3">Login</h3>
          <CustomTextInput label="Email" name="email" placeholder="Enter email" />
          <CustomTextInput label="Password" name="password" type="password" placeholder='Enter password' />
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
