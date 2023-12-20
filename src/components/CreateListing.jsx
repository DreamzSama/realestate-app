import React, { useState } from "react";
import { db, auth, storage } from "../conf/firebase"; // Stelle sicher, dass storage importiert ist
import { addDoc, collection } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { GoArrowRight } from "react-icons/go";
import { FaRegImages } from "react-icons/fa";

const CreateListing = () => {
    const [title, setTitle] = useState("");
    const [propertyType, setPropertyType] = useState("");
    const [place, setPlace] = useState("");
    const [company, setCompany] = useState("");
    const [rooms, setRooms] = useState("");
    const [baths, setBaths] = useState("");
    const [qm, setQm] = useState("");
    const [price, setPrice] = useState("");
    const [image, setImage] = useState(null);
    const propertyCollectionRef = collection(db, "property");
    const propertyTypes = ["Haus", "Wohnung", "Gewerbe", "Andere"];

    const inputStyle = {
        padding: "5px",
        paddingLeft: "10px",
        paddingRight: "10px",
        background: "#F5F5F5",
        borderRadius: "5px",
        fontSize: "14px",
    };

    const handleImageChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };

    const postProperty = async (e) => {
        e.preventDefault();
        console.log("clicked");

        // 1. Bild hochladen
        const timeStamp = new Date().getTime();
        const imageRef = ref(storage, `property_images/${title}_${timeStamp}`);
        await uploadBytes(imageRef, image);

        // 2. Download-URL abrufen
        const imageUrl = await getDownloadURL(imageRef);

        // 3. Immobilie hinzufügen
        await addDoc(propertyCollectionRef, {
            title,
            propertyType,
            place,
            rooms,
            baths,
            qm,
            price,
            company,
            imageUrl, // Die URL des Bildes speichern
            author: { name: auth.currentUser.email, id: auth.currentUser.uid },
        });

        // Zurücksetzen der Eingabefelder
        setTitle("");
        setPlace("");
        setRooms("");
        setBaths("");
        setQm("");
        setPrice("");
        setCompany("");
        setImage(null);
    };

    return (
        <div className="bg-white p-4 max-w-[500px] rounded-xl">
            <h2 className="font-bold text-2xl mb-5">Immobilie inserieren</h2>
            <form className="flex flex-col space-y-3">
                <input
                    className="focus:outline-1 transform duration-200 ease-in-out outline-orange-500"
                    style={inputStyle}
                    onChange={(e) => setTitle(e.target.value)}
                    type="text"
                    placeholder="Titel"
                />
                <select
                    className="focus:outline-1 transform duration-200 ease-in-out outline-orange-500"
                    style={inputStyle}
                    value={propertyType}
                    onChange={(e) => setPropertyType(e.target.value)}
                >
                    <option value="" disabled selected>
                        Immobilientyp auswählen
                    </option>
                    {propertyTypes.map((type, index) => (
                        <option key={index} value={type}>
                            {type}
                        </option>
                    ))}
                </select>
                <input
                    className="focus:outline-1 transform duration-200 ease-in-out outline-orange-500"
                    style={inputStyle}
                    onChange={(e) => setPrice(e.target.value)}
                    type="text"
                    placeholder="Preis"
                />
                <input
                    className="focus:outline-1 transform duration-200 ease-in-out outline-orange-500"
                    style={inputStyle}
                    onChange={(e) => setRooms(e.target.value)}
                    type="number"
                    placeholder="Anzahl Schlafzimmer"
                />
                <input
                    className="focus:outline-1 transform duration-200 ease-in-out outline-orange-500"
                    style={inputStyle}
                    onChange={(e) => setBaths(e.target.value)}
                    type="number"
                    placeholder="Anzahl Badezimmer"
                />
                <input
                    className="focus:outline-1 transform duration-200 ease-in-out outline-orange-500"
                    style={inputStyle}
                    onChange={(e) => setQm(e.target.value)}
                    type="number"
                    placeholder="Wie viele Quadratmeter"
                />
                <input
                    className="focus:outline-1 transform duration-200 ease-in-out outline-orange-500"
                    style={inputStyle}
                    onChange={(e) => setPlace(e.target.value)}
                    type="text"
                    placeholder="Ort"
                />
                <input
                    className="focus:outline-1 transform duration-200 ease-in-out outline-orange-500"
                    style={inputStyle}
                    onChange={(e) => setCompany(e.target.value)}
                    type="text"
                    placeholder="Ihr Name/Unternehmen"
                />
                <div className="flex bg-[#F5F5F5] p-2 rounded-md cursor-pointer items-center space-x-2">
                    <FaRegImages className="text-orange-500" />
                    <label className="cursor-pointer" htmlFor="file">
                        Bild auswählen
                    </label>
                </div>
                <input
                    className="hidden"
                    id="file"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                />
            </form>
            <div
                onClick={postProperty}
                className="bg-accent hover:bg-orange-700 mt-4 text-white rounded-xl px-4 py-1 flex  items-center mx-auto cursor-pointer space-x-2"
            >
                <button className="text-center">Inserieren</button>
                <GoArrowRight />
            </div>
        </div>
    );
};

export default CreateListing;
