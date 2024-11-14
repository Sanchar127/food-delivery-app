import Trash from '../layout/icons/Trash';
import Plus from '../layout/icons/Plus';
import ChevronDown from '../../components/layout/icons/ChevronDown'
import ChevronUp from '../../components/layout/icons/ChevronUp'
import { useState } from 'react';
export default function MenuItemPriceProps({ name, addLevel, props, setProps }) {
    const [isOpen,setIsOpen]=useState(false)
    
    const addProps = (ev) => {
        ev.preventDefault(); // Prevent form submission
        setProps(oldProps => [...oldProps, { name: '', price: 0 }]);
    };

    const editProps = (ev, index, prop) => {
        const newValue = prop === 'price' ? parseFloat(ev.target.value) || 0 : ev.target.value;
        setProps(prevProps => {
            const newProps = [...prevProps];
            newProps[index][prop] = newValue;
            return newProps;
        });
    };

    const removeProps = (indexToRemove) => {
        setProps(prev => prev.filter((_, index) => index !== indexToRemove));
    };
           // onClick={()=> setIsOpen(prev=>!prev)}
       //className={isOpen ? 'block' :'hidden'}

    return (
        <div className="bg-gray-200 p-2 rounded-md mb-2 mt-2">
      
    
            <button type='button' onClick={()=> setIsOpen(prev=>!prev)} className='inline-flex p-1 border-0 justify-start'>
                {isOpen &&(
                    <ChevronUp/>
                )}
                {!isOpen&&(

                <ChevronDown/>
                )}
            <span>{name}</span>
            <span>{props?.length}</span>
            </button>

           <div className={isOpen ? 'block' :'hidden'}>
           {props.map((size, index) => (
                <div className="flex gap-2 items-end mt-4" key={index}>
                    <div >
                        <label>Name</label>
                        <input
                            type="text"
                            placeholder="size name"
                            value={size.name}
                            onChange={(ev) => editProps(ev, index, 'name')}
                            className="w-full border border-gray-300 p-2 rounded mt-2"
                        />
                    </div>

                    <div >
                        <label>Extra Price</label>
                        <input
                            type="number"
                            placeholder="Extra price"
                            value={size.price}
                            onChange={(ev) => editProps(ev, index, 'price')}
                            className="w-full border border-gray-300 p-2 rounded mt-1"
                        />
                    </div>
                    <div>
                        <button className="bg-white mb-2 px-2" type="button" onClick={() => removeProps(index)}>
                            <Trash />
                        </button>
                    </div>
                </div>
            ))}
            <button onClick={addProps} className="bg-white p-2 border border-gray-300 rounded mt-2">
                <Plus />
                <span>{addLevel}</span>
            </button>
           </div>
      
          
        </div>
    );
}
