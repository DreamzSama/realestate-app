import React, { useEffect, useState } from "react";
import { db } from "../conf/firebase";
import {
    collection,
    getDocs,
    where,
    query,
    deleteDoc,
    doc,
} from "firebase/firestore";
import Listing from "../components/Listing";
import CreateListing from "../components/CreateListing";
import mainSVG from "../img/main.svg";

const UserPosts = ({ currentUser }) => {
    const [userPosts, setUserPosts] = useState([]);
    const propertyCollectionRef = collection(db, "property");

    useEffect(() => {
        const getPosts = async () => {
            try {
                const q = query(
                    propertyCollectionRef,
                    where("author.id", "==", currentUser.uid)
                );
                const data = await getDocs(q);

                setUserPosts(
                    data.docs.map((doc) => ({
                        id: doc.id,
                        ...doc.data(),
                    }))
                );

                console.log(userPosts);
            } catch (error) {
                console.error("Error fetching user posts:", error);
            }
        };

        getPosts();
    }, [currentUser.uid]);

    const deleteProperty = async (propertyId) => {
        try {
            await deleteDoc(doc(propertyCollectionRef, propertyId));
            // Aktualisiere die Liste der Benutzerbeiträge nach dem Löschen
            const updatedPosts = userPosts.filter(
                (property) => property.id !== propertyId
            );
            setUserPosts(updatedPosts);
        } catch (error) {
            console.error("Error deleting property:", error);
        }
    };

    return (
        <div className="bg-bgGray">
            <div className="mx-auto container py-10">
                <div className="flex justify-center flex-col lg:flex-row bg-accent mb-10 rounded-xl p-5 items-center lg:justify-between">
                    <div className="w-full mb-10 lg:mb-0">
                        <CreateListing />
                    </div>
                    <div>
                        <img src={mainSVG} alt="" />
                    </div>
                </div>
                <div className="w-full flex flex-col items-center justify-center">
                    <span className="text-2xl font-semibold text-center">
                        Ihre Immobilien:
                    </span>
                    <div className="grid lg:grid-cols-4 justify-items-center gap-10">
                        {userPosts.map((property) => (
                            <div key={property.id} className="">
                                <Listing
                                    propertyTypes={property.propertyType}
                                    price={property.price}
                                    rooms={property.rooms}
                                    place={property.place}
                                    title={property.title}
                                    company={property.company}
                                    baths={property.baths}
                                    qm={property.qm}
                                    imageSrc={property.imageUrl}
                                />
                                <button
                                    onClick={() => deleteProperty(property.id)}
                                    className="mt-2 bg-red-500 text-white px-4 py-2 rounded"
                                >
                                    Löschen
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserPosts;
