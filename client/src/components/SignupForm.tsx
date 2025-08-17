import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { TextField, Button, Container, Box, Typography } from '@mui/material';

// Validation Schema using Yup
const SignupSchema = Yup.object().shape({
  username: Yup.string().required('Username is required'),
  password: Yup.string()
    .required('Password is required')
    .min(2, 'Password must be at least 6 characters'), // Corrected minimum length
});

const SignupForm = () => {
  const navigate = useNavigate();

  const handleSubmit = async (values: any) => {
    try {
      // Make a POST request to register the user
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/signup`, {
        username: values.username,
        password: values.password,
      });

      if (response.status === 201) {
        // Redirect to login page after successful signup
        navigate('/');
      } else {
        alert(response.data.message); // Show error message from server
      }
    } catch (error) {
      console.error('Error during signup:', error);
      alert('An error occurred while signing up.');
    }
  };

  return (
    <Container maxWidth="sm" className="signup-container">
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 2 }}>
        <Typography variant="h5" className="form-title">Signup</Typography>

        <Formik
          initialValues={{ username: '', password: '' }}
          validationSchema={SignupSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => ( // Destructure errors and touched
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
                Signup
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
    </Container>
  );
};

export default SignupForm;