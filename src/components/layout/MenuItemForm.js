import { useState, useEffect } from "react";
import Image from 'next/image'; // Import Image component from Next.js
import MenuItemPriceProps from "./MenuItemPriceProps";

export default function MenuItemForm({ onSubmit, menuItem }) {
    const [image, setImage] = useState(menuItem?.image || '');
    const [name, setName] = useState(menuItem?.name || '');
    const [description, setDescription] = useState(menuItem?.description || '');
    const [basePrice, setBasePrice] = useState(menuItem?.basePrice || '');
    const [sizes, setSizes] = useState(menuItem?.sizes || []);
    const [extraIngredientPrices, setExtraIngredientPrices] = useState(menuItem?.extraIngredientPrices || []);

    useEffect(() => {
        return () => {
            if (image.startsWith("blob:")) {
                URL.revokeObjectURL(image); // Clean up image URL when the component unmounts
            }
        };
    }, [image]);

    const handleFileChange = (ev) => {
        const file = ev.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file); // Generate a preview URL for the selected file
            setImage(imageUrl);
        }
    };

    const handleSubmit = (ev) => {
        ev.preventDefault();
        onSubmit(ev, { image, name, description, basePrice: parseFloat(basePrice), sizes, extraIngredientPrices });
    };

    return (
        <form onSubmit={handleSubmit} className="mt-8 max-w-md mx-auto">
            <div className="flex items-start gap-4">
                <div className="p-2 rounded-lg relative">
                    <Image
                        className="rounded-lg w-full h-full mb-1"
                        src={image || '/default-avatar.png'} // Fallback image if none is set
                        width={250}
                        height={250}
                        alt="avatar"
                        unoptimized // Add this to handle dynamic image URLs
                    />
                    <label>
                        <input type="file" className="hidden" onChange={handleFileChange} />
                        <span className="block border rounded-lg p-4 text-center border-gray-300 cursor-pointer">Edit</span>
                    </label>
                </div>
                <div className="grow">
                    <label>Item Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(ev) => setName(ev.target.value)}
                        required
                        className="w-full border border-gray-300 p-2 rounded mt-1"
                    />
                    <label>Description</label>
                    <input
                        type="text"
                        value={description}
                        onChange={(ev) => setDescription(ev.target.value)}
                        required
                        className="w-full border border-gray-300 p-2 rounded mt-1"
                    />
                    <label>Base Price</label>
                    <input
                        type="number"
                        value={basePrice}
                        onChange={(ev) => setBasePrice(ev.target.value)}
                        required
                        className="w-full border border-gray-300 p-2 rounded mt-1"
                    />
                    <MenuItemPriceProps name="Sizes" addLevel="Add item size" props={sizes} setProps={setSizes} />
                    <MenuItemPriceProps
                        name="Extra ingredients"
                        addLevel="Add ingredient price"
                        props={extraIngredientPrices}
                        setProps={setExtraIngredientPrices}
                    />
                    <button type="submit" className="mt-4 p-2 bg-blue-500 text-white rounded">Save</button>
                </div>
            </div>
        </form>
    );
}
