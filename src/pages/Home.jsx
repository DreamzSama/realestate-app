import React, { useEffect, useState } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../conf/firebase";
import Listing from "../components/Listing";
import SearchBar from "../components/SearchBar";
import { Link } from "react-router-dom";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FaCirclePlus } from "react-icons/fa6";

const Home = () => {
    const [propertyList, setPropertyList] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchPlace, setSearchPlace] = useState("");
    const [searchMinQm, setSearchMinQm] = useState("");
    const [searchMaxQm, setSearchMaxQm] = useState("");
    const [maxQm, setMaxQm] = useState(0);
    const [loading, setLoading] = useState(true);

    const propertyCollectionRef = collection(db, "property");

    useEffect(() => {
        const getProperty = async () => {
            const data = await getDocs(propertyCollectionRef);
            const properties = data.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
            }));
            setPropertyList(properties);

            setTimeout(() => {
                setLoading(false);
            }, 500);

            // // Find the maximum qm value
            // const maxQmValue = Math.max(
            //     ...properties.map((property) => parseFloat(property.qm))
            // );
            // setMaxQm(maxQmValue);
            // console.log(properties);
        };
        getProperty();
    }, []);

    const filteredProperties = propertyList.filter(
        (property) =>
            property.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
            property.place.toLowerCase().includes(searchPlace.toLowerCase()) &&
            (!searchMinQm ||
                parseFloat(property.qm) >= parseFloat(searchMinQm)) &&
            (!searchMaxQm || parseFloat(property.qm) <= parseFloat(searchMaxQm))
    );

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="text-4xl text-accent">
                    <AiOutlineLoading3Quarters className="animate-spin" />
                </div>
            </div>
        );
    }

    return (
        <div className="bg-[#F5F5F5] min-h-screen">
            <div className="mx-auto container py-10">
                <Link to="/profile">
                    <div className="inline-flex cursor-pointer justify-start flex-row items-center mb-5 space-x-2 bg-accent rounded-xl p-2 text-white hover:bg-orange-700">
                        <p className="">Immobilie verkaufen</p>
                        <FaCirclePlus />
                    </div>
                </Link>

                <SearchBar
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    searchPlace={searchPlace}
                    setSearchPlace={setSearchPlace}
                    searchMinQm={searchMinQm}
                    setSearchMinQm={setSearchMinQm}
                    searchMaxQm={searchMaxQm}
                    setSearchMaxQm={setSearchMaxQm}
                />

                <div className="grid mt-10 md:grid-cols-2 lg:grid-cols-4 grid-flow-row justify-items-center gap-4">
                    {filteredProperties.map((property) => (
                        <div key={property.id} className="">
                            <Link to={`/property/${property.id}`}>
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
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Home;
