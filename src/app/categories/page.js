'use client'

import { useEffect, useState } from "react";

import {useProfile} from '../../components/UseProfile'
import toast from "react-hot-toast";
import UserTabs from "../../components/layout/UserTabs";
export default function Categories(){
    const [categoryName,setCategoryName]=useState('')
    const [categories,setCategories]=useState([])
    const {loading:profileLoading,data:profileData}=useProfile()
    const [editedCategory,setEditedCategory]=useState(null)

    useEffect(() => {
        fetchCategories()
    }, []);
    
    function fetchCategories(){
        fetch('/api/categories')
            .then(res => res.json())
            .then(categories => {
                setCategories(categories); // Correctly setting the categories state
            })
            .catch(err => {
                console.error('Failed to fetch categories:', err);
            });

    }

 async   function handleCategorySubmit(ev){
        ev.preventDefault()
        console.log('Hello mf')
        const creationPromise =new Promise(async(resolve,reject)=>{
            const data={name:categoryName}
            if(editedCategory){
                data._id= editedCategory._id
            }
            const response= await fetch('/api/categories',{
                method:editedCategory?'PUT':'POST',
                headers:{'Content-Type':'application/json'},
                body:JSON.stringify(data),
            })
            setCategoryName('')
            fetchCategories()
            setEditedCategory(null); 
            if (response.ok)
                 resolve() 
                else 
             reject();
        })
     await  toast.promise(creationPromise,{
        loading: editedCategory?'Updating Category':' Creating your new category..',
        success: editedCategory?'Category Updated':'Category Created',
        error:'Eroor ,sorry...'
        })

    }
  
    if(profileLoading){
        return 'Loading user info...'
    }
    if(!profileData.admin){
        return 'Not an admin'
    }
    return(
        <section className="mt-8 max-w-lg  mx-auto ">
            <UserTabs isAdmin={true}/>
           <form className="mt-8 " onSubmit={handleCategorySubmit}>
            <div className="flex gap-2 items-end">
                <div className="grow" >

            <label>{editedCategory? 'Update category':'New category name'}
                {editedCategory &&(
                    <>:<b>{editedCategory.name}</b></>
                )}
            </label>
            <input type="text" value={categoryName} onChange={ev=>setCategoryName(ev.target.value)}/>
                </div>
                <div className="pb-2">
            <button type="submit" >

                {editedCategory ? 'Update':'Create'}
            </button>
                </div>
            </div>
           </form>
           
           <div>
    <h2 className="mt-8 text-sm text-gray-500">Edit category:</h2>
    {categories?.length > 0 && categories.map(c => (
         <button
     
         onClick={() => {
             setEditedCategory(c);
             setCategoryName(c.name);
         }}
         className="bg-gray-200 rounded-xl p-2 px-4 flex gap-2 cursor-pointer mb-2"
     >
         <span>{c.name}</span>
     </button>
        
    ))}
           </div>

        </section>
    )
}