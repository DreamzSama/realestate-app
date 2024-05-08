import { addDoc, collection, doc } from "firebase/firestore";
import React, { useState } from "react";
import { GoArrowRight } from "react-icons/go";
import { auth, db } from "../conf/firebase"; // Make sure to import your firebase configuration

const SendMessage = ({ propertyOwner, currentUser, propertyTitle }) => {
    const [name, setName] = useState("");
    const [message, setMessage] = useState("");
    const [contact, setContact] = useState("");
    const [reference, setReference] = useState("");

    const inputStyle = {
        padding: "5px",
        paddingLeft: "10px",
        paddingRight: "10px",
        background: "#F5F5F5",
        borderRadius: "5px",
        fontSize: "14px",
    };

    const messageCollectionRef = collection(db, "messages");
    const propertyOwnerRef = doc(db, "property", propertyOwner);

    const sendInquiry = async (e) => {
        e.preventDefault();
        console.log("clicked");

        await addDoc(messageCollectionRef, {
            name,
            message,
            reference: propertyTitle,
            propertyOwner: auth.currentUser.uid,
        });

        setName("");
        setContact("");
        setMessage("");
        setReference("");
    };

    return (
        <div className="bg-white p-4 max-w-[500px] rounded-xl">
            <h2 className="font-bold text-2xl mb-5">Immobilie Anfragen</h2>
            <form className="flex flex-col space-y-3">
                <input
                    className="focus:outline-1 transform duration-200 ease-in-out outline-orange-500"
                    style={inputStyle}
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    placeholder="Ihr Name"
                />
                <input
                    className="focus:outline-1 transform duration-200 ease-in-out outline-orange-500"
                    style={inputStyle}
                    onChange={(e) => setContact(e.target.value)}
                    type="text"
                    placeholder="Wo können wir Sie kontaktieren?"
                />
                <label htmlFor="ref">Betreff</label>
                <input
                    id="ref"
                    readOnly
                    className="border-2 outline-none transform duration-200 ease-in-out border-gray-500"
                    style={inputStyle}
                    value={propertyTitle}
                    type="text"
                    placeholder="Betreff"
                />
                <textarea
                    className="focus:outline-1 h-[200px] resize-none transform duration-200 ease-in-out outline-orange-500"
                    style={inputStyle}
                    onChange={(e) => setMessage(e.target.value)}
                    type="text"
                    placeholder="Nachricht"
                ></textarea>
            </form>
            <div className="bg-accent hover:bg-orange-700 mt-4 text-white rounded-xl px-4 py-1 flex  items-center mx-auto cursor-pointer space-x-2">
                <button onClick={sendInquiry} className="text-center">
                    Anfrage senden
                </button>
                <GoArrowRight />
            </div>
        </div>
    );
};

export default SendMessage;
