import React from "react";
import { IoSearch } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";
import { auth } from "../conf/firebase";
import logo from "../img/logo.png";
import { signOut as firebaseSignOut } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { MdOutlineMessage } from "react-icons/md";

const Navbar = ({ currentUser }) => {
    let navigate = useNavigate();
    const user = auth.currentUser;

    const handleSignOut = () => {
        firebaseSignOut(auth)
            .then(() => {
                localStorage.clear();
                navigate("/");
                window.location.reload();
            })
            .catch((err) => {
                console.error(err);
            });
    };

    return (
        <div className="border-b-2 py-4">
            <div className="container mx-auto">
                <div className="flex flex-row items-center justify-between">
                    <div className="">
                        <Link to="/">
                            <img className="w-[150px]" src={logo} alt="" />
                        </Link>
                    </div>
                    <div className="flex flex-row space-x-2 items-center">
                        {user ? (
                            <button
                                onClick={handleSignOut}
                                className="text-gray-500 text-sm"
                            >
                                Logout
                            </button>
                        ) : null}
                        <div className="flex flex-row space-x-2 bg-gray-100 p-2 items-center rounded-full">
                            <Link to="/profile">
                                <FaUserCircle className="text-accent w-6 h-auto" />
                            </Link>
                            <Link to="/inquirys">
                                <MdOutlineMessage className="text-accent w-6 h-auto" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
