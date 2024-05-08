import React, { useState } from "react";

const EditListingModal = ({ property, onSave, onClose }) => {
    const [editedProperty, setEditedProperty] = useState({ ...property });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedProperty((prevProperty) => ({
            ...prevProperty,
            [name]: value,
        }));
    };

    const handleSave = () => {
        onSave(editedProperty);
    };

    return (
        <div className="fixed top-0 left-0 w-full px-6 h-full bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-8 rounded-xl">
                <h2 className="text-2xl font-semibold mb-4">Immobilie bearbeiten</h2>
                <input
                    type="text"
                    name="title"
                    value={editedProperty.title}
                    onChange={handleInputChange}
                    placeholder="Titel"
                    className="mb-4 p-2 border border-gray-300 rounded-xl w-full"
                />
                <input
                    type="text"
                    name="price"
                    value={editedProperty.price}
                    onChange={handleInputChange}
                    placeholder="Titel"
                    className="mb-4 p-2 border border-gray-300 rounded-xl w-full"
                />
                <input
                    type="text"
                    name="place"
                    value={editedProperty.place}
                    onChange={handleInputChange}
                    placeholder="Titel"
                    className="mb-4 p-2 border border-gray-300 rounded-xl w-full"
                />
                <input
                    type="text"
                    name="type"
                    value={editedProperty.propertyType}
                    onChange={handleInputChange}
                    placeholder="Immobilientyp"
                    className="mb-4 p-2 border border-gray-300 rounded-xl w-full"
                />
                <button
                    onClick={handleSave}
                    className="bg-accent text-white px-4 py-2 rounded-xl"
                >
                    Speichern
                </button>
                <button
                    onClick={onClose}
                    className="ml-2 bg-gray-300 text-black px-4 py-2 rounded-xl"
                >
                    Abbrechen
                </button>
            </div>
        </div>
    );
};

export default EditListingModal;
