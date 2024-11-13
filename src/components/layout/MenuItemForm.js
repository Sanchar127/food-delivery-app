import { useState } from "react";
import Image from 'next/image'; // Import Image component from Next.js

export default function MenuItemForm({ onSubmit, menuItem }) {
    const [image, setImage] = useState(menuItem?.image || '');
    const [name, setName] = useState(menuItem?.name || '');
    const [description, setDescription] = useState(menuItem?.description || '');
    const [basePrice, setBasePrice] = useState(menuItem?.basePrice || '');
    const [sizes, setSizes] = useState([]);

    // Handle file change event
    const addSize = (ev) => {
        ev.preventDefault(); // Prevent form submission
        setSizes(oldSizes => [...oldSizes, { name: '', price: 0 }]);
    };

    const handleFileChange = (ev) => {
        const file = ev.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file); // Generate a preview URL for the selected file
            setImage(imageUrl);
        }
    };

    const editSize = (ev, index, prop) => {
        const newValue = ev.target.value;
        setSizes(prevSizes => {
            const newSizes = [...prevSizes];
            newSizes[index][prop] = newValue;
            return newSizes;
        });
    };
function removeSize(indexToRemove){
    setSizes(prev=>prev.filter((v,index)=>index!==indexToRemove))
}
    // Handle form submission
    const handleSubmit = (ev) => {
        ev.preventDefault();
        onSubmit(ev, { image, name, description, basePrice });
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
                    <div className="bg-gray-200 p-2 rounded-md mb-2">
                        <label>Sizes</label>
                        {sizes.map((size, index) => (
                            <div className="flex gap-2 items-end" key={index}>
                                <div>
                                    <label>Size Name</label>
                                    <input
                                        type="text"
                                        placeholder="size name"
                                        value={size.name}
                                        onChange={(ev) => editSize(ev, index, 'name')}
                                        className="w-full border border-gray-300 p-2 rounded mt-1"
                                    />
                                </div>

                                <div>
                                    <label>Extra Price</label>
                                    <input
                                        type="number"
                                        placeholder="Extra price"
                                        value={size.price}
                                        onChange={(ev) => editSize(ev, index, 'price')}
                                        className="w-full border border-gray-300 p-2 rounded mt-1"
                                    />
                                </div>
                                <div>
                                    <button className="bg-white" type="button" onClick={()=> removeSize(index)}>x</button>
                                </div>
                            </div>
                        ))}
                        <button onClick={addSize} className="bg-white p-2 border border-gray-300 rounded mt-2">Add item size</button>
                    </div>
                    <button type="submit" className="mt-4 p-2 bg-blue-500 text-white rounded">Save</button>
                </div>
            </div>
        </form>
    );
}
