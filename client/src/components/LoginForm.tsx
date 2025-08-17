//LoginForm.tsx
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { TextField, Button, Container, Box, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { setUser } from '../store/userSlice'; // Assuming you have this action
import './componentall.css';

// Validation schema
const LoginSchema = Yup.object().shape({
  username: Yup.string().required('Username is required'),
  password: Yup.string().required('Password is required'),
});

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch(); // Initialize dispatch for Redux actions

  const handleSubmit = async (values: any) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/login`, {
        username: values.username,
        password: values.password,
      });
  

  
      if (response.status === 200) {
        // Save token, role, and user_id to localStorage
        localStorage.setItem('authToken', response.data.access_token);
        localStorage.setItem('role', response.data.role);
        localStorage.setItem('user_id', response.data.user_id); // Save user_id to localStorage


        // Dispatch the action to set user in Redux
      dispatch(setUser({
        id: response.data.user_id, // Assuming the user id is in the response
        username: response.data.username, // Assuming the username is in the response
        token: response.data.access_token, // Assuming the access token is in the response
      }));



        // Redirect to /tasks based on role
        if (response.data.role === 'User') {
          navigate('/tasks'); // Redirect to tasks page
        } else if (response.data.role === 'Admin') {
          navigate('/admin'); // Redirect to admin page
        } else {
          navigate('/signup'); // Redirect to signup if role is not admin or user
        }
      } else {
        alert(response.data.message); // Show alert if response status isn't 200
      }
    } catch (error) {
      console.error('Error during login:', error);
      navigate('/signup'); // If error, navigate to signup
    }
  };
  
  

  return (
    <Container maxWidth="sm" className="login-container">
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 2 }}>
        <Typography variant="h5" className="form-title">Login</Typography>

        <Formik
          initialValues={{ username: '', password: '' }}
          validationSchema={LoginSchema}
          onSubmit={handleSubmit}
        >
          {({ setFieldValue, touched, errors }) => (
            <Form className="login-form">
              <div className="field-container">
                <Field
                  name="username"
                  type="text"
                  as={TextField}
                  label="Username"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  error={touched.username && !!errors.username} // Check for error
                  helperText={touched.username && errors.username} // Show error message
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: 'black', // Default border color
                      },
                      '&:hover fieldset': {
                        borderColor: 'black', // Border color when hovered
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: 'black', // Border color when focused
                      },
                    },
                  }}
                />
              </div>

              <div className="field-container">
                <Field
                  name="password"
                  type="password"
                  as={TextField}
                  label="Password"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  error={touched.password && !!errors.password} // Check for error
                  helperText={touched.password && errors.password} // Show error message
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: 'black', // Default border color
                      },
                      '&:hover fieldset': {
                        borderColor: 'black', // Border color when hovered
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: 'black', // Border color when focused
                      },
                    },
                  }}
                />
              </div>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                sx={{ marginTop: 2 }}
              >
                Login
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
    </Container>
  );
};

export default LoginForm;


