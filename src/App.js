import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./routes/Home.component";
import Container from "./routes/Container.component";
import SignIn from "./routes/SignIn.component";
import LogIn from "./routes/LogIn.component";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "./store/user/user.action";
import { onAuthStateChangedListener } from "./utils/firestore/firebase.utils";

const App = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        const unsubscribe = onAuthStateChangedListener((user) => {
            /* if (user) {
              createUserDocumentFromAuth(user);
            } */
            console.log('user: ', user);
            dispatch(setCurrentUser(user));
            console.log('user: ', user);
        });

        return unsubscribe;
    }, []);
    return (
        <Routes>
            <Route path="/" element={<Container />}>
                <Route index element={<LogIn />} />
                <Route path="home" element={<Home />} />
                <Route path="sign-in" element={<SignIn />} />
                <Route path="log-in" element={<LogIn />} />
            </Route>
        </Routes>
    )

}

export default App;