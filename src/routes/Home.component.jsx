import React from 'react';
import Face from '../Components/Face-image/Face';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../store/user/user.selector';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const user = useSelector(selectCurrentUser);
    const navigate = useNavigate();
    useEffect(()=>{
        !user && navigate('/log-in');
    },[user]);
    useEffect(()=>{
        !user && navigate('/log-in');
    },[]);

    return (
        <div className="container-fluid d-flex align-items-center" style={{ height: '90vh' }}>
            <Face />
        </div>
    )
};

export default Home;