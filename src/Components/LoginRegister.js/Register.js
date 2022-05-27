import React, { useState } from 'react';
import axios from 'axios';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import { Formik, Field, Form } from 'formik';
import toast, { Toaster } from 'react-hot-toast';
import registerValidation from './registerValidation';
import { useNavigate } from 'react-router-dom';

import { FormControl, InputGroup } from 'react-bootstrap';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { Link, useLocation } from 'react-router-dom';
import auth from '../../firebase.init';

const Register = () => {
  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth, { sendEmailVerification: true });
  let navigate = useNavigate();
  let location = useLocation();
  const [token, setToken] = useState('');
  let from = location.state?.from?.pathname || '/';
  if (loading) {
    return (
      <div className='d-flex justify-content-center'>
        <img
          src='https://c.tenor.com/1s1_eaP6BvgAAAAC/rainbow-spinner-loading.gif'
          alt=''
          width='30%'
          height='30%'
        />
      </div>
    );
  }
  if (user ) {
    const email = user?.user?.email ;
    const currentUser = { email: email };

    console.log('a', currentUser);
    
      if (email) {
        fetch(`https://ellskerwebsite.herokuapp.com/api/users/user?email=${email}`, {
          method: 'PUT',
          headers: {
            'content-type': 'application/json',
          },
          body: JSON.stringify(currentUser),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log('data inside useToken',  data.token);
            const accessToken = data.token;
            localStorage.setItem('accessToken', accessToken);
            setToken(accessToken);
          });
      }
      navigate('/dashboard')
  }
  if (error) {
    alert('Already exist this user');
    console.log(error);
  }
  // if (user) {
  //   return (
  //     <div>
  //       <p>Registered User: {user.email}</p>
  //     </div>
  //   );
  // }

  const handlerSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const user = { email, password };
    createUserWithEmailAndPassword(email, password);
    // const { data } = await axios.post(
    //   'https://phinventory.herokuapp.com/login',
    //   { email },
    // );
    // localStorage.setItem('accessToken', data.accessToken);
  };
  // let navigate = useNavigate();
  // const [nameClicked, setNameClicked] = useState(false);
  // const [emailClicked, setEmailClicked] = useState(false);
  // const [passwordClicked, setPasswordClicked] = useState(false);
  // let toastFBLoadingID;

  // const responseFacebook = (response) => {
  // 	axios
  // 		.post('users/fb-auth', {
  // 			name: response.name,
  // 			email: response.email,
  // 		})
  // 		.then((res) => {
  // 			toast.dismiss(toastFBLoadingID);
  // 			localStorage.setItem('currentUser', JSON.stringify(res.data));
  // 			navigate('/dashboard');
  // 		});
  // 	console.log(response);
  // };

  // const handleSubmit = (data) => {
  // 	const toastLoadingID = toast.loading('Creating account...');
  // 	axios
  // 		.post('users/register', {
  // 			name: data.name,
  // 			email: data.email,
  // 			password: data.password,
  // 			image: './images/no-image.jpg',
  // 		})
  // 		.then((response) => {
  // 			toast.dismiss(toastLoadingID);
  // 			localStorage.setItem(
  // 				'currentUser',
  // 				JSON.stringify(response.data)
  // 			);
  // 			navigate('/dashboard');
  // 		})
  // 		.catch((err) => {
  // 			if (err.response.data.existingUser) {
  // 				toast.dismiss(toastLoadingID);
  // 				toast.error('Account already exists!');
  // 			}
  // 			if (err.response.data.emailInvalid) {
  // 				toast.dismiss(toastLoadingID);
  // 				toast.error('Email does not exist!');
  // 			}
  // 		});
  // };

  return (
    <div className='animate__animated animate__fadeIn animate__faster home-form-holder'>
      <Toaster />
      <Formik
        initialValues={{
          name: '',
          email: '',
          password: '',
        }}
        validationSchema={registerValidation}
        validateOnMount={true}>
        {({ values, isValid, errors, touched, is }) => {
          return (
            // <Form className='contact100-form validate-form'>
            // 	<div
            // 		className={
            // 			nameClicked && errors.name
            // 				? 'wrap-input100 invalid-input'
            // 				: 'wrap-input100'
            // 		}
            // 		data-validate='Name is required'
            // 	>
            // 		<span className='label-input100'>Name</span>
            // 		<Field
            // 			className='input100'
            // 			type='text'
            // 			name='name'
            // 			placeholder='Enter your name'
            // 			onClick={() => setNameClicked(true)}
            // 		/>
            // 		<span className='focus-input100'></span>
            // 	</div>

            // 	<div
            // 		className={
            // 			emailClicked && errors.email
            // 				? 'wrap-input100 invalid-input'
            // 				: 'wrap-input100'
            // 		}
            // 		data-validate='Name is required'
            // 	>
            // 		<span className='label-input100'>Email</span>
            // 		<Field
            // 			className='input100'
            // 			type='text'
            // 			name='email'
            // 			placeholder='Enter your email'
            // 			onClick={() => setEmailClicked(true)}
            // 		/>
            // 		<span className='focus-input100'></span>
            // 	</div>

            // 	<div
            // 		className={
            // 			passwordClicked && errors.password
            // 				? 'wrap-input100 invalid-input'
            // 				: 'wrap-input100'
            // 		}
            // 		data-validate='Valid email is required: ex@abc.xyz'
            // 	>
            // 		<span className='label-input100'>Password</span>
            // 		<Field
            // 			className='input100'
            // 			type='password'
            // 			name='password'
            // 			placeholder='Enter your password'
            // 			onClick={() => setPasswordClicked(true)}
            // 		/>
            // 		<span className='focus-input100'></span>
            // 	</div>
            // 	<div className='row home-form-controls'>
            // 		<FacebookLogin
            // 			appId='294120486107959'
            // 			fields='name,email,picture.type(large)'
            // 			callback={responseFacebook}
            // 			render={(renderProps) => (
            // 				<div
            // 					className='col-6 home-form-controls-fb d-flex justify-content-end'
            // 					onClick={() => {
            // 						renderProps.onClick();
            // 						toastFBLoadingID =
            // 							toast.loading('Loading...');
            // 					}}
            // 				>
            // 					<img
            // 						style={{ cursor: 'pointer' }}
            // 						src='./images/fb-icon.png'
            // 					/>
            // 				</div>
            // 			)}
            // 		/>
            // 		<div className='col-6'>
            // 			<button
            // 				className='home-form-controls-button'
            // 				type='submit'
            // 				onClick={(e) => {
            // 					e.preventDefault();
            // 					if (!isValid)
            // 						toast.error('Invalid data!');
            // 					else handleSubmit(values);
            // 				}}
            // 			>
            // 				Cadastrar
            // 			</button>
            // 		</div>
            // 	</div>
            // </Form>
            <div>
              <h1 className='text-center'>Signup here</h1>
              <form onSubmit={handlerSubmit} className='m-auto w-50'>
                <div className='mb-3'>
                  <label className='form-label'>Email address</label>
                  <input
                    type='email'
                    className='form-control'
                    id='exampleInputEmail1'
                    aria-describedby='emailHelp'
                    name='email'
                  />
                  <div id='emailHelp' className='form-text'>
                    We'll never share your email with anyone else.
                  </div>
                </div>
                <div className='mb-3'>
                  <label className='form-label'>Password</label>
                  <input
                    type='password'
                    className='form-control'
                    id='exampleInputPassword1'
                    name='password'
                  />
                </div>
                {error && <p>Error: {error.message}</p>}
                <button type='submit' className='btn btn-primary'>
                  Submit
                </button>
                <p>
                  Already have an account? <Link to='/login'>login Here</Link>
                </p>
              </form>
            </div>
          );
        }}
      </Formik>
    </div>
  );
};
export default Register;
