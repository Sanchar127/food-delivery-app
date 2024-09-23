'use client'
import { useState } from "react";
import UserTabs from "../../components/layout/UserTabs";
import { useProfile } from "../../components/UseProfile";
import { useSession } from 'next-auth/react';
import Image from "next/image";
import { rejects } from "assert";
import toast from "react-hot-toast";

export default function MenuItemsPage(){
const [image,setImage]=useState('')
const [name,setName]=useState('')
const [description,setDescription]=useState('')
const [basePrice,setBasePrice]=useState('')
  const {loading,data}= useProfile()
  const { data: session, status } = useSession();

  
  async function handleFormSubmit(ev){
   ev.preventDefault();
   const data ={image,name,description,basePrice}
    const savingPromise = new Promise(async(resolve,reject)=>{

      const response= await fetch('api/menu-items',{
        method: 'POST',
        body :JSON.stringify(data),
        headers:{'Content-Type':'application/json'}
       })

       if (response.ok)
        resolve()
      else
      reject()
    })
  
await toast.promise(savingPromise,{
  loading: 'Saving this tasty item',
  success:'saved',
  error:'Error'
})    
    }

  if(loading){
    return 'Loading user info...'

  }
  if(!data.admin){
    return 'Not a admin'
  }
  async function handleFileChange(ev){

    }
  const userImage = session?.user?.image;
  return (
    <section className="mt-8">
      <UserTabs isAdmin={true}/>
      <form onSubmit={handleFormSubmit} className="mt-8 max-w-md mx-auto" >
        <div className="flex items-start gap-4">
          <div className=' p-2 rounded-lg relative'>

        <Image className='rounded-lg w-full h-full mb-1 ' src={userImage} width={250} height={250} alt='avatar' />
                    <label>
                        <input type='file' className='hidden' onChange={handleFileChange}/>

                        <span className='block border rounded-lg p-4 text-center border-gray-300 cursor-pointer'>Edit</span>
                    </label>
          </div>
          <div className="grow">
            <label >item name</label>
            <input type="text"  value={name} onChange={ev=> setName(ev.target.value)}/>
            <label >Description</label>
            <input type="text"  value={description} onChange={ev=> setDescription(ev.target.value)}/>
            <label >Base Prize</label>
            <input type="text"  value={basePrice} onChange={ev=> setBasePrice(ev.target.value)} />
            <button type="submit" >Save</button>
          </div>
        

        </div>

      </form>
    </section>
  )
}