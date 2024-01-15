import React, { useState } from "react";
import Logo from "../Components/Logo/Logo";
import './SignIn.css';
import CardPresentation from "../Components/Card-presentation/Card-presentation";
import { useNavigate } from "react-router-dom";
import { signInWithGooglePopup, createAuthUserWithEmailAndPassword } from "../utils/firestore/firebase.utils";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../store/user/user.selector";
import { useEffect } from "react";

const signInWithGoogle = async () => {
  signInWithGooglePopup()/* .then((result) => {
    const user = result.user;
    createUserDocumentFromAuth(user, { additionalInfo: 'some value' });
  }) */
    .then(response => { console.log(response) })
    .catch((error) => {
      console.log(error);
    });
};

const SignIn = () => {
  const navigate = useNavigate();
  const user = useSelector(selectCurrentUser);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  useEffect(() => {
    user && navigate('../home');
  }, []);
  useEffect(() => {
    user && navigate('../home');
  }, [user]);

  const onNameChange = (event) => {
    setName(event.target.value)
  };
  const onEmailChange = (event) => {
    setEmail(event.target.value)
  };
  const onPasswordChange = (event) => {
    setPassword(event.target.value)
  };
  const onSubmitSignIn = () => {
    /* fetch('http://localhost:3000/register', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        email,
        password,
        name,
      })
    })
      .then(response => response.json())
      .then(user => {
        if (user) {
          navigate('home');
        }
      }) */
    createAuthUserWithEmailAndPassword(email, password);
  }

  return (
    <section className="h-100 gradient-form">
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-xl-10">
            <div className="card rounded-3 text-black">
              <div className="row g-0">
                <div className="col-lg-6">
                  <div className="card-body p-md-5 mx-md-4">

                    <div className="text-center">
                      <Logo />
                    </div>

                    <form>
                      <p>Create your account</p>
                      <div className="form-outline mb-4">
                        <input onChange={onNameChange} type="text" id="l-name" className="form-control"
                          placeholder="Username" />
                        <label className=" form-label" htmlFor="l-name">Username</label>
                      </div>

                      <div className="form-outline mb-4">
                        <input onChange={onEmailChange} type="email" id="l-email" className="form-control"
                          placeholder="Email address" />
                        <label className=" form-label" htmlFor="l-email">Email</label>
                      </div>

                      <div className="form-outline mb-4">
                        <input onChange={onPasswordChange} type="password" id="l-password" className="form-control" />
                        <label className="form-label" htmlFor="l-password">Password</label>
                      </div>

                      <div className="text-center pt-1 mb-5 pb-1">
                        <button onClick={onSubmitSignIn} className="btn btn-primary btn-block w-100 fa-lg gradient-custom-2 mb-3" type="button">Sign
                          Up</button>
                      </div>

                      <button onClick={signInWithGoogle} className="btn btn-primary btn-block w-100 fa-lg gradient-custom-2 mb-3" type="button">
                        Sign up with google
                      </button>

                      <div className="d-flex align-items-center justify-content-center pb-4">
                        <p className="mb-0 me-2">Already have an account?</p>
                        <button onClick={() => navigate('log-in')} type="button" className="btn btn-outline-danger">Create new</button>
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

export default SignIn;