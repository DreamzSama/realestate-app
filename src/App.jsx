// App.jsx
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { auth } from "./conf/firebase";
import { onAuthStateChanged } from "firebase/auth";
import PrivateRoute from "./components/PrivateRoute";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import Navbar from "./components/Navbar";
import UserPage from "./pages/UserPage";
import PropertyDetail from "./components/PropertyDetail";
import InquirysPage from "./pages/InquirysPage";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const App = () => {
    const [user, setUser] = useState(null);
    const [isFetching, setIsFetching] = useState(true);
    const userIn = auth.currentUser;

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
                setIsFetching(false);
                return;
            }
            setUser(null);
            setIsFetching(false);
        });

        return () => unsubscribe();
    }, []);

    if (isFetching) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="text-4xl text-accent">
                    <AiOutlineLoading3Quarters className="animate-spin" />
                </div>
            </div>
        );
    }

    return (
        <div className="font-primary">
            <Router>
                <Navbar />
                <Routes>
                    <Route index path="/" element={<Home />} />
                    <Route
                        path="/profile"
                        element={
                            <PrivateRoute user={user}>
                                <UserPage currentUser={user} />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/inquirys"
                        element={
                            <PrivateRoute user={user}>
                                <InquirysPage currentUser={user} />
                            </PrivateRoute>
                        }
                    />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/property/:id" element={<PropertyDetail />} />
                </Routes>
            </Router>
        </div>
    );
};

export default App;
