import { collection, query, where, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../conf/firebase";

const InquirysPage = ({ currentUser }) => {
    const [inquiryData, setInquirysData] = useState([]);
    const [expandedText, setExpandedText] = useState(null);
    const inquirysCollectionRef = collection(db, "messages");

    useEffect(() => {
        const getInquirys = async () => {
            try {
                const q = query(
                    inquirysCollectionRef,
                    where("propertyOwner", "==", currentUser.uid)
                );
                const data = await getDocs(q);

                setInquirysData(
                    data.docs.map((doc) => ({
                        id: doc.id,
                        name: doc.data().name,
                        reference: doc.data().reference,
                        message: doc.data().message,
                    }))
                );
            } catch (error) {
                console.error(error);
            }
        };

        getInquirys();
    }, [currentUser.uid]);

    const handleTextToggle = (id) => {
        setExpandedText((prev) => (prev === id ? null : id));
    };

    return (
        <div>
            <div className="container min-h-screen mx-auto py-10">
                <div className="grid grid-flow-row justify-items-center lg:grid-cols-3 gap-10">
                    {inquiryData.map((inquiryData) => (
                        <div
                            className="bg-white border-2 max-w-[400px] h-full border-accent p-4 rounded-xl"
                            key={inquiryData.id}
                        >
                            <div className="flex flex-col w-full h-full items-start">
                                <span className="">
                                    Interessent: {inquiryData.name}
                                </span>
                                <span>
                                    Immobilie:{" "}
                                    <span className="font-bold">
                                        {inquiryData.reference}
                                    </span>
                                </span>
                                {expandedText === inquiryData.id ? (
                                    <p className="break-all overflow-auto">{inquiryData.message}</p>
                                ) : (
                                    <p className="break-all overflow-hidden">
                                        {inquiryData.message.slice(0, 50)}
                                        {inquiryData.message.length > 50 && (
                                            <span
                                                className="text-blue-500 cursor-pointer"
                                                onClick={() =>
                                                    handleTextToggle(inquiryData.id)
                                                }
                                            >
                                                ... Mehr lesen
                                            </span>
                                        )}
                                    </p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default InquirysPage;
