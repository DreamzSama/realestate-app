import React, { useEffect, useState } from "react";
import { auth } from "../conf/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Login = ({ setSwitchForm }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate("");
    const [show, setShow] = useState(true);

    useEffect(() => {
        // Überprüfen, ob der Benutzer bereits authentifiziert ist
        if (auth.currentUser) {
            navigate("/");
        }
    }, [navigate]);

    const loginUser = async (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user);
                navigate("/");
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <>
            {show ? (
                <div className="rounded-xl max-w-sm w-full shadow-md bg-white p-6">
                    <h1 className="font-bold text-2xl">Jetzt anmelden</h1>
                    <form className="flex flex-col mt-5 justify-center space-y-2">
                        <label className="text-gray-400" htmlFor="emailIn">
                            E-Mail Adresse
                        </label>
                        <input
                            id="emailIn"
                            className="bg-gray-200 rounded-xl p-2 text-sm outline-none"
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                            placeholder="Email"
                        />
                        <label className="text-gray-400" htmlFor="passwordIn">
                            Passwort
                        </label>
                        <input
                            id="passwordIn"
                            className="bg-gray-200 rounded-xl p-2 text-sm outline-none"
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            placeholder="Passwort"
                        />
                        <button
                            className="bg-accent text-white p-2 rounded-xl"
                            onClick={loginUser}
                        >
                            Login
                        </button>
                    </form>
                    <p className="text-sm mt-4">
                        Noch keinen Account?{" "}
                        <span
                            onClick={() => setSwitchForm(true)}
                            className="text-accent cursor-pointer"
                        >
                            Jetzt registrieren!
                        </span>
                    </p>
                </div>
            ) : null}
        </>
    );
};

export default Login;
