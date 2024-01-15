import React, { useState } from 'react';
import CardPresentation from '../Components/Card-presentation/Card-presentation';
import Logo from '../Components/Logo/Logo';
import './login.css';
import { useNavigate } from 'react-router-dom';
import { signInAuthUserWithEmailAndPassword, signInWithGooglePopup } from '../utils/firestore/firebase.utils';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { selectCurrentUser } from '../store/user/user.selector';

const LogIn = () => {
  const user = useSelector(selectCurrentUser);
  const navigate = useNavigate();
  const [signInEmail, setSignInEmail] = useState('');
  const [signInPassword, setSignInPassword] = useState('');

  useEffect(() => {
    user && navigate('/home');
  }, []);
  useEffect(() => {
    user && navigate('/home');
  }, [user]);

  const onEmailChange = (event) => {
    setSignInEmail({ signInEmail: event.target.value })
  }

  const onPasswordChange = (event) => {
    setSignInPassword({ signInPassword: event.target.value })
  }

  const onSubmitSignIn = () => {

    /* fetch('http://localhost:3000/signin', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: signInEmail,
        password: signInPassword
      })
    })
      .then(response => response.json())
      .then(user => {
        if (user.id) {
          loadUser(user)
        }
      }) */
  }

  return (
    <section className="h-100 gradient-form">
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-xl-10">
            <div className="card rounded-3 text-black mb-4">
              <div className="row g-0">
                <div className="col-lg-6">
                  <div className="card-body px-md-5 mx-md-4">
                    <div className="text-center">
                      <Logo />
                    </div>
                    <form>
                      <div className="form-outline mb-3">
                        <label className=" form-label" htmlFor="l-email">Username</label>
                        <input onChange={onEmailChange} type="email" id="l-email" className="form-control"
                          placeholder="Email address" />
                      </div>
                      <div className="form-outline mb-5">
                        <label className="form-label" htmlFor="l-password">Password</label>
                        <input onChange={onPasswordChange} type="password" id="l-password" className="form-control" />

                        <a className="text-muted float-end" href="#!">Forgot password?</a>
                      </div>
                      <div className="text-center pt-1 mb-1 ">
                        <button onClick={() => signInAuthUserWithEmailAndPassword(signInEmail, signInPassword)} className="btn btn-primary btn-block w-100 fa-lg gradient-custom-2 mb-3" type="button">
                          Sign In
                        </button>
                      </div>
                      <p className='text-center'>-or-</p>
                      <button onClick={signInWithGooglePopup} className="btn btn-primary btn-block w-100 fa-lg gradient-custom-3 mb-3" type="button">
                        <img src="https://img.icons8.com/color/16/000000/google-logo.png" /> Sign in with google
                      </button>
                      <div className="d-flex align-items-center justify-content-center pb-4">
                        <p className="mb-0 me-2">Don't have an account?</p>
                        <button onClick={() => navigate('sign-in')} type="button" className="btn btn-outline-danger">Create new</button>
                      </div>
                    </form>
                  </div>
                </div>
                <CardPresentation />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
export default LogIn;