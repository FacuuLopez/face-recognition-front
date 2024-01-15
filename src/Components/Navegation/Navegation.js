import React, { createRef, useEffect } from 'react';
import './navigation.css';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../store/user/user.selector';
import { useNavigate, useLocation } from 'react-router-dom';
import { signOutUser } from '../../utils/firestore/firebase.utils';
import { useState } from 'react';
import { selectFacesCounet, selectNewDetectedFaces } from '../../store/faces/faces.selectors';


const Navigation = () => {
  const facesDetected = useSelector(selectNewDetectedFaces);
  const contador = useSelector(selectFacesCounet)
  const location = useLocation();
  const navigate = useNavigate();
  const user = useSelector(selectCurrentUser);
  const signOut = createRef();
  const logIn = createRef();
  const signIn = createRef();
  const [currentpath, setCurrentPath] = useState('');

  useEffect(() => {
    const segments = location.pathname.split('/');
    let lastSegment = segments.pop();
    if (lastSegment === '') {
      lastSegment = segments.pop();
    }
    setCurrentPath(lastSegment);
  }, [location])

  useEffect(()=>{console.log('nav ',facesDetected)},[contador]);

  return (
    <nav className='navbar bg-dark fixed-top justify-content-end px-4  text-uppercase'>
      {user ? (
        <a ref={signOut} onClick={signOutUser} id="sign-out" className='fw-bolder  link-light'>Sign Out</a>
      ) : (
        <nav className='navbar bg-dark fixed-top justify-content-end px-3 p-2 text-uppercase'>
          {currentpath !== 'log-in' ? (
            <li className="nav-item">
              <a ref={logIn} onClick={() => navigate(`/log-in`)} id="log-in" className='fw-bolder link-light'>Log In</a>
            </li>
          ) : null}
          {currentpath !== 'sign-in' ? (
            <li className="nav-item">
              <a ref={signIn} onClick={() => navigate(`/sign-in`)} id="sign-in" className='fw-bolder link-light'>Sign up</a>
            </li>
          ) : null}
        </nav>
      )}
    </nav>
  );
}



export default Navigation;