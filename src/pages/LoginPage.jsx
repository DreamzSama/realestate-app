import React, { useState } from "react";
import Login from "../components/Login";
import Register from "../components/Register";
import mainSVG from "../img/main.svg";

const LoginPage = () => {

    const [switchForm, setSwitchForm] = useState(true);

    return (
        <div className="flex md:flex-row w-full h-screen">
            <div className="bg-gradient-to-br md:w-1/2 w-full flex justify-center items-center from-accent to-orange-300">
                {switchForm ? <Login /> : <Register />}
            </div>
            <div className="md:w-1/2 hidden md:flex flex-col justify-center space-y-10 items-center">
                <h2 className="text-4xl text-center font-light mx-16">Ohne Probleme. Ohne viel Arbeit. Ohne viel Stress. Mit uns verkaufst du deine Immobilie!</h2>
                <img src={mainSVG} alt="" />
            </div>
        </div>
    );
};

export default LoginPage;
