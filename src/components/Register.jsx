import React, { useState } from "react";
import { auth } from "../conf/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const registerUser = async (e) => {
        e.preventDefault();
        await createUserWithEmailAndPassword(auth, email, password)
            .then((userCred) => {
                const user = userCred.user;
            })
            .catch((error) => {
                console.error(error);
            });
    };

    return (
        <div>
            <h1>Login</h1>
            <form>
                <input type="text" placeholder="Name" />
                <input
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    placeholder="Email"
                />
                <input
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    placeholder="Passwort"
                />
                <button onClick={registerUser}>Registrieren</button>
            </form>
        </div>
    );
};

export default Register;
