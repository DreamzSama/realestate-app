import React from "react";
import { IoLocationSharp } from "react-icons/io5";
import { BiBath } from "react-icons/bi";
import { LuBedDouble } from "react-icons/lu";
import { BsHouseDoor } from "react-icons/bs";
import { MdOutlineLocationOn } from "react-icons/md";

const Listing = ({ company, propertyTypes, baths, price, rooms, place, title, qm, imageSrc }) => {
    const pStyle = {
        fontSize: "12px",
        color: "gray",
    };

    const iconStyle = {
        color: "#fa7000",
    };

    return (
        <div className="flex flex-col h-full relative w-full lg:max-w-[350px]">
            <div className="relative flex-grow aspect-w-7 aspect-h-10">
                <span className="bg-orange-500 select-none px-2 py-1 rounded-full text-white absolute top-4 left-[5%]">
                    {propertyTypes}
                </span>
                <img
                    className="object-cover w-full h-[250px] rounded-t-xl"
                    src={imageSrc}
                    alt=""
                />
            </div>
            <div className="p-2 flex flex-col h-full justify-between rounded-b-xl bg-white">
                <div className="">
                    <p className="font-semibold">{title}</p>
                    <p>{price} €</p>
                    <div className="flex flex-row mt-2 items-center">
                        <MdOutlineLocationOn style={iconStyle} />
                        <p style={pStyle}>{place}</p>
                    </div>
                </div>
                <div className="flex items-center space-x-5 flex-row">
                    <div className="flex space-x-1 flex-row items-center">
                        <LuBedDouble style={iconStyle} />
                        <p style={pStyle} className="text-[12px]">{rooms}</p>
                    </div>
                    <div className="flex space-x-1 flex-row items-center">
                        <BiBath style={iconStyle} />
                        <p style={pStyle} className="text-[12px]">{baths}</p>
                    </div>
                    <div className="flex space-x-1 flex-row items-center">
                        <BsHouseDoor style={iconStyle} />
                        <p style={pStyle} className="text-[12px]">{qm} qm²</p>
                    </div>
                </div>
                <div className="flex flex-row items-center space-x-2">
                    <div className="bg-green-600 rounded-full h-6 w-6"></div>
                    <p className="">{company}</p>
                </div>
            </div>
        </div>
    );
};

export default Listing;
