import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import { Formik, Field, Form } from 'formik';
import toast, { Toaster } from 'react-hot-toast';
import loginValidation from './loginValidation';
import {
  useAuthState,
  useSendPasswordResetEmail,
  useSignInWithEmailAndPassword,
  useSignInWithFacebook,
} from 'react-firebase-hooks/auth';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './main.css';

import auth from '../../firebase.init';
import useToken from '../Hooks/useHooks';

const Login = () => {
  // let navigate = useNavigate();
  // const [emailClicked, setEmailClicked] = useState(false);
  // const [passwordClicked, setPasswordClicked] = useState(false);
  // let toastFBLoadingID;

  // const responseFacebook = (response) => {
  //   axios
  //     .post('users/fb-auth', {
  //       name: response.name,
  //       email: response.email,
  //       image: response.picture.data.url,
  //     })
  //     .then((res) => {
  //       toast.dismiss(toastFBLoadingID);
  //       localStorage.setItem('currentUser', JSON.stringify(res.data));
  //       navigate('/dashboard');
  //     });
  // };

  // const handleSubmit = (data) => {
  //   const toastLoadingID = toast.loading('Logging in...');
  //   axios
  //     .post('users/login', {
  //       email: data.email,
  //       password: data.password,
  //     })
  //     .then((response) => {
  //       toast.dismiss(toastLoadingID);
  //       localStorage.setItem('currentUser', JSON.stringify(response.data));
  //       navigate('/dashboard');
  //     })
  //     .catch((err) => {
  //       toast.dismiss(toastLoadingID);
  //       console.log(err.response.data);
  //       if (!err.response.data.isEmailMatch) toast.error('Incorrect email!');
  //       else if (
  //         !err.response.data.isPasswordMatch &&
  //         err.response.data.isEmailMatch
  //       )
  //         toast.error('Incorrect password!');
  //     });
  // };

  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);
  const [signInWithFacebook, userFB, loadingFB, errorFB] =
    useSignInWithFacebook(auth);
  const [sendPasswordResetEmail, sending, passReseterror] =
    useSendPasswordResetEmail(auth);
  const [userr] = useAuthState(auth);
  const emailtRef = useRef('');
  let navigate = useNavigate();
  const [token, setToken] = useState('');
  let location = useLocation();
  // const [token] = useToken(user || userFB);
  // console.log("hello",token);
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
  console.log(userFB, userr);
  if (user || userFB) {
    const email = user?.user?.email || userFB?.user?.email;
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
  }
  
    if (token) {
      navigate('/dashboard')
    }

  const handlerSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const user = { email, password };

    signInWithEmailAndPassword(email, password);
    // const { data } = await axios.post(
    //   'https://phinventory.herokuapp.com/login',
    //   { email },
    // );
    // localStorage.setItem('accessToken', data.accessToken);
    // console.log(data);
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();

    const email = emailtRef.current.value;

    const confirm = window.confirm('Want to reset your password?');
    if (!confirm) {
      return;
    }
    await sendPasswordResetEmail(email);
    //toast('Sent email');
  };
  const handleFacebookLogin = () => {
    signInWithFacebook();
    console.log(auth);
  };
  return (
    <div className='animate__animated animate__fadeIn animate__faster home-form-holder'>
      <Toaster />
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        validationSchema={loginValidation}
        validateOnMount={true}>
        {({ values, isValid, errors }) => {
          return (
            // <Form class='contact100-form validate-form'>
            //   <div
            //     className={
            //       emailClicked && errors.email
            //         ? 'wrap-input100 invalid-input'
            //         : 'wrap-input100'
            //     }
            //     data-validate='Name is required'
            //   >
            //     <span class='label-input100'>Email</span>
            //     <Field
            //       class='input100'
            //       type='text'
            //       name='email'
            //       placeholder='Enter your email'
            //       onClick={() => setEmailClicked(true)}
            //     />
            //     <span class='focus-input100'></span>
            //   </div>

            //   <div
            //     className={
            //       passwordClicked && errors.password
            //         ? 'wrap-input100 invalid-input'
            //         : 'wrap-input100'
            //     }
            //     data-validate='Valid email is required: ex@abc.xyz'
            //   >
            //     <span class='label-input100'>Password</span>
            //     <Field
            //       class='input100'
            //       type='password'
            //       name='password'
            //       placeholder='Enter your password'
            //       onClick={() => setPasswordClicked(true)}
            //     />
            //     <span class='focus-input100'></span>
            //   </div>
            //   <div className='row home-form-controls'>
            //     <FacebookLogin
            //       appId='540322103868922'
            //       fields='name,email,picture.type(large)'
            //       callback={responseFacebook}
            //       render={(renderProps) => (
            //         <div
            //           className='col-6 home-form-controls-fb d-flex justify-content-end'
            //           onClick={() => {
            //             renderProps.onClick();
            //             toastFBLoadingID = toast.loading('Loading...');
            //           }}
            //         >
            //           <img
            //             style={{ cursor: 'pointer' }}
            //             src='./images/fb-icon.png'
            //           />
            //         </div>
            //       )}
            //     />
            //     <div className='col-6'>
            //       <button
            //         className='home-form-controls-button'
            //         type='submit'
            //         onClick={(e) => {
            //           e.preventDefault();
            //           if (!isValid) toast.error('Invalid data!');
            //           else handleSubmit(values);
            //         }}
            //       >
            //         Entrar
            //       </button>
            //     </div>
            //   </div>
            // </Form>

            <div>
              <div>
                <h4 className='text-center'>Login here</h4>
                <form onSubmit={handlerSubmit} className='m-auto w-50'>
                  <div className='mb-3'>
                    <label className='form-label'>Email address</label>
                    <input
                      type='email'
                      className='form-control'
                      id='exampleInputEmail1'
                      aria-describedby='emailHelp'
                      name='email'
                      ref={emailtRef}
                    />
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
                  <div className='d-flex'>
                  <button type='submit' className='btn bg-transparent'>
                      Submit
                    </button>
                    <button
                      className='d-block btn bg-transparent'
                      onClick={handleResetPassword}>
                      Forget Password?
                    </button>
                   
                    <p>
               
                </p>
                  </div>
                  <div className='d-flex justify-content-center mt-1'> New User? <Link to='/signup'>Signup Here</Link></div>
                </form>
                <div className='d-flex justify-content-center'>
               
                  <button
                    className='btn bg-transparent m-auto'
                    onClick={() => handleFacebookLogin()}>
                    Facebook Login
                  </button>
                </div>
              </div>
            </div>
          );
        }}
      </Formik>
    </div>
  );
};

export default Login;
