import { useState, useRef, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import axiosInstance from "../../services/axios";

import AuthContext from '../../store/auth-context';
import classes from './AuthForm.module.css';

const AuthForm = () => {
  const history = useHistory();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const passwordConfirmInputRef = useRef();

  const authCtx = useContext(AuthContext);

  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    const enteredPasswordConfirm = passwordConfirmInputRef.current.value;

    // optional: Add validation
    try {
      setIsLoading(true);
      let url;
      if (isLogin) {
        url =
          'http://localhost:3001/api/v1/users/signin';
      } else {
        url =
          'http://localhost:3001/api/v1/users/signup';
      }
      await axiosInstance.post(url, {
        email: enteredEmail,
        password: enteredPassword,
        passwordConfirm: enteredPasswordConfirm,
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => {
          setIsLoading(false);
          if (response.status === 200) {

            const expirationTime = new Date(
              new Date().getTime() + +3600000
            );
            console.log(response.data)
            console.log("expirationTime", expirationTime)

            authCtx.login(response.data.token, expirationTime.toISOString());
            history.replace('/');

          } if (response === 201) {
            console.log("User registered!")
          }
          else {

            console.log(response.error)
            throw new Error('Authentication failed!');
            // }
            // );
          }
        })

    } catch (error) {
      setIsLoading(false);

      console.log("error:", error.message)
    }

  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' required ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input
            type='password'
            id='password'
            required
            ref={passwordInputRef}
          />
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Password Confirm</label>
          <input
            type='password'
            id='passwordConfirm'
            required
            ref={passwordConfirmInputRef}
          />
        </div>
        <div className={classes.actions}>
          {!isLoading && (
            <button>{isLogin ? 'Login' : 'Create Account'}</button>
          )}
          {isLoading && <p>Sending request...</p>}
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
