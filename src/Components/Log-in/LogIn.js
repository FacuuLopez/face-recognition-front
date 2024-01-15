import React, { useState } from 'react';
import { navigate } from '../../utils/router/Router.utils';
import CardPresentation from '../Card-presentation/Card-presentation';
import Logo from '../Logo/Logo';
import './login.css';
import { selectCurrentUser } from '../../store/user/user.selector';
import { signInAuthUserWithEmailAndPassword } from '../../utils/firestore/firebase.utils';
import { useSelector } from 'react-redux';

const LogIn = () => {
  user = useSelector(selectCurrentUser);
  const [signInEmail, setSignInEmail] = useState('');
  const [signInPassword, setSignInPassword] = useState('');

  const onEmailChange = (event) => {
    setSignInEmail({signInEmail: event.target.value})
  }

  const onPasswordChange = (event) => {
    setSignInPassword({signInPassword: event.target.value})
  }

  const onSubmitSignIn = () => {
    fetch('http://localhost:3000/signin', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
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
      })
  }

  return(    
    <section className="h-100 gradient-form">
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-xl-10">
            <div className="card rounded-3 text-black mb-4">
              <div className="row g-0">
                <div className="col-lg-6">
                  <div className="card-body px-md-5 mx-md-4">
                    <div className="text-center">
                        <Logo/>
                    </div>
                    <form>
                      <p>Please login to your account</p>
                      <div className="form-outline mb-4">
                        <input  onChange={onEmailChange} type="email" id="l-email" className="form-control"
                          placeholder="Phone number or email address" />
                        <label className=" form-label" htmlFor="l-email">Username</label>
                      </div>
                      <div className="form-outline mb-4">
                        <input onChange={onPasswordChange} type="password" id="l-password" className="form-control" />
                        <label className="form-label" htmlFor="l-password">Password</label>
                      </div>
                      <div className="text-center pt-1 mb-5 pb-1">
                        <button onClick={onSubmitSignIn} className="btn btn-primary btn-block w-100 fa-lg gradient-custom-2 mb-3" type="button">Log
                          In</button>
                        <a className="text-muted" href="#!">Forgot password?</a>
                      </div>
                      <div className="d-flex align-items-center justify-content-center pb-4">
                        <p className="mb-0 me-2">Don't have an account?</p>
                        <button  onClick={()=>signInAuthUserWithEmailAndPassword(signInEmail,signInPassword)} type="button" className="btn btn-outline-danger">Create new</button>
                      </div>
                    </form>
                  </div>
                </div>
                <CardPresentation/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
);

}

export default LogIn;

