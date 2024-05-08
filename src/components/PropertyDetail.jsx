import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../conf/firebase";
import { MdOutlineLocationOn } from "react-icons/md";
import { FaArrowLeftLong } from "react-icons/fa6";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import SendMessage from "./SendMessage";
import { LuBedDouble } from "react-icons/lu";
import { BiBath } from "react-icons/bi";
import { BsHouseDoor } from "react-icons/bs";

const PropertyDetail = () => {
    const iconStyle = {
        color: "#fa7000",
    };

    const pStyle = {
        fontSize: "16px",
        color: "gray",
    };

    const { id } = useParams();
    const [property, setProperty] = useState(null);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [showSendMessage, setShowSendMessage] = useState(false);

    useEffect(() => {
        const getPropertyDetail = async () => {
            try {
                const propertyDocRef = doc(db, "property", id);
                const propertyDoc = await getDoc(propertyDocRef);
                if (propertyDoc.exists()) {
                    const propertyData = {
                        id: propertyDoc.id,
                        ...propertyDoc.data(),
                    };
                    setProperty(propertyData);
                } else {
                    console.log("Property not found");
                }
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        getPropertyDetail();
    }, [id]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="text-4xl text-accent">
                    <AiOutlineLoading3Quarters className="animate-spin" />
                </div>
            </div>
        );
    }

    const goBack = () => {
        navigate(-1);
    };

    const openSendMessagePopup = () => {
        setShowSendMessage(true);
    };

    const closeSendMessagePopup = () => {
        setShowSendMessage(false);
    };

    return (
        <div className="py-10 min-h-screen">
            <div className="flex flex-col md:flex-row container mx-auto md:space-x-5 justify-center">
                {/* <div>
                    <button
                        onClick={goBack}
                        className="bg-accent flex flex-row items-center space-x-4 p-2 rounded-xl text-white"
                    >
                        <FaArrowLeftLong />
                        Zurück
                    </button>
                </div> */}
                <div className="lg:max-w-[700px] w-full bg-white rounded-xl">
                    <div className="max-w-[700px]">
                        <img
                            src={property.imageUrl}
                            className="rounded-xl"
                            alt=""
                        />
                    </div>
                    <div className="flex flex-col space-y-4 items-start">
                        <h1 className="font-bold text-xl lg:text-2xl mt-4">
                            {property.title}
                        </h1>
                        <div className="flex flex-row mt-2 items-center">
                            <MdOutlineLocationOn style={iconStyle} />
                            <p style={pStyle}>{property.place}</p>
                        </div>
                        <div className="flex items-center space-x-5 flex-row">
                            <div className="flex space-x-1 flex-row items-center">
                                <LuBedDouble style={iconStyle} />
                                <p style={pStyle} className="text-[12px]">
                                    {property.rooms}
                                </p>
                            </div>
                            <div className="flex space-x-1 flex-row items-center">
                                <BiBath style={iconStyle} />
                                <p style={pStyle} className="text-[12px]">
                                    {property.baths}
                                </p>
                            </div>
                            <div className="flex space-x-1 flex-row items-center">
                                <BsHouseDoor style={iconStyle} />
                                <p style={pStyle} className="text-[12px]">
                                    {property.qm} qm²
                                </p>
                            </div>
                        </div>
                        <p className="bg-accent font-semibold lg:text-xl p-2 text-white rounded-xl">
                            {property.price} €
                        </p>
                    </div>
                </div>
                <div>
                    <div className="h-full hidden md:block">
                        <SendMessage
                            propertyTitle={property.title}
                            propertyOwner={property.author.id}
                        />
                    </div>
                    <button
                        onClick={openSendMessagePopup}
                        className="bg-accent w-full block md:hidden text-white p-2 rounded-xl mt-4"
                    >
                        Nachricht senden
                    </button>
                    {showSendMessage && (
                        <div className="fixed md:hidden top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
                            <div className="bg-white p-4 rounded-xl">
                                <SendMessage
                                    propertyTitle={property.title}
                                    propertyOwner={property.author.id}
                                />
                                <button
                                    onClick={closeSendMessagePopup}
                                    className="bg-accent text-white p-2 rounded-xl mt-4"
                                >
                                    Schließen
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PropertyDetail;
