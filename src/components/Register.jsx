import React, { useState } from "react";
import { auth } from "../conf/firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Register = ({ setSwitchForm }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    let navigate = useNavigate();

    const registerUser = async (e) => {
        e.preventDefault();
        try {
            const userCred = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCred.user;
            console.log(user);

            await signInWithEmailAndPassword(auth, email, password);

            if (user) {
                navigate("/");
            }

        } catch (error) {
            console.error(error);
        }
    };
    

    return (
        <div>
            <div className="rounded-xl max-w-sm w-full shadow-md bg-white p-6">
                <h1 className="font-bold text-2xl">Jetzt registrieren</h1>
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
                        onClick={registerUser}
                    >
                        Registrieren
                    </button>
                </form>
                <p className="text-sm mt-4">
                    Du hast schon einen Account?{" "}
                    <span
                        onClick={() => setSwitchForm(false)}
                        className="text-accent cursor-pointer"
                    >
                        Jetzt anmelden!
                    </span>
                </p>
            </div>
        </div>
    );
};

export default Register;
