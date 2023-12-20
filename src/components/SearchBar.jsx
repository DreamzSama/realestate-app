import React from "react";
import { IoSearch } from "react-icons/io5";

const SearchBar = ({
    searchTerm,
    setSearchTerm,
    searchPlace,
    setSearchPlace,
    searchMinQm,
    setSearchMinQm,
    searchMaxQm,
    setSearchMaxQm,
}) => {


    return (
        <div className="bg-white p-4 rounded-xl">
            <div className="flex flex-col lg:space-y-0 space-y-5 lg:flex-row items-center lg:space-x-5 justify-center">
                <input
                    placeholder="Wonach suchst du?"
                    className="rounded-xl w-full p-3 outline-accent border-2 border-gray-300"
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <input
                    placeholder="Wo suchst du?"
                    className="rounded-xl w-full p-3 outline-accent border-2 border-gray-300"
                    type="text"
                    value={searchPlace}
                    onChange={(e) => setSearchPlace(e.target.value)}
                />
                <input
                    placeholder="Ab wie viel qm²?"
                    className="rounded-xl w-full p-3 outline-accent border-2 border-gray-300"
                    type="text"
                    value={searchMinQm}
                    onChange={(e) => setSearchMinQm(e.target.value)}
                />
                <input
                    placeholder="Bis wie viel qm²?"
                    className="rounded-xl w-full p-3 outline-accent border-2 border-gray-300"
                    type="text"
                    value={searchMaxQm}
                    onChange={(e) => setSearchMaxQm(e.target.value)}
                />
                <button className="text-white cursor-pointer w-full hover:bg-orange-700 bg-accent p-2 rounded-xl flex flex-row items-center">
                    <IoSearch className="w-8 h-auto" />
                </button>
            </div>
        </div>
    );
};

export default SearchBar;
