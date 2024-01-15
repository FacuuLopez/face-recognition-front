import React from "react";
import Navegation from "../Components/Navegation/Navegation";
import './container.css';
import Particles from "../Components/Particles";
import { Outlet } from "react-router-dom";


const Container = () => {
    return (
        <div className="container-fluid p-0 mt-4">
            <header>
                <Navegation />
            </header>
            <main>
                <Outlet />
            </main>
            <Particles id="tsparticles" />
        </div>
    );
}

export default Container;