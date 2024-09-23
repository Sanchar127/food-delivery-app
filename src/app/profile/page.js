'use client'
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { resolve } from 'path';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import UserTabs from "../../components/layout/UserTabs";
export default function ProfilePage() {
    const { data: session, status } = useSession();
const [userName,setUserName]= useState('')
const [phone,setPhone]=useState('')
const [streetAddress,setStreetAdress]=useState('')
const [postalCode,setPostalCode]=useState('')
const [city,setCity]=useState('')
const [country,setCountry]=useState('')
const [isAdmin,setISAdmin]=useState(false)
const [profileFetched,setProfileFetched]=useState(false)

const router = useRouter();


    useEffect(()=>{
        if(status=== 'authenticated'){
            setUserName(session.user.name)
            fetch('/api/profile').then(response=>{
                response.json().then(data=>{
                    setPhone(data.phone)
                    setStreetAdress(data.streetAddress)
                    setPostalCode(data.postalCode)
                    setCity(data.city)
                    setCountry(data.country)
                    setISAdmin(data.admin)
                    setProfileFetched(true)
                })
            })
        }
        
    },[session,status])
  async  function handleProfileInfoUpdate(ev){
        ev.preventDefault();
       
      const savingPromise=  new Promise(async(resolve,reject)=>{

            const response=   await  fetch('/api/profile',{
                     method:'PUT',
                     headers:{'Content-Type': 'application/json'},
                     body:JSON.stringify({name:userName,streetAddress,phone,postalCode,city,country}),
        })
        if(response.ok) 
            resolve()
        else 
        reject()
        })

      await  toast.promise(savingPromise,{
            loading:'Saving...',
            success:'Profile Saved!',
            error:'Eroor'
           })
     
     
    }
   async function handleFileChange(ev){
    
    const files= ev.target.files;
    if(files?.length===1){
        const data =new FormData;
        data.set('files',files[0])
     const response=   await    fetch('/api/upload',{
            method:'POST',
            body:data,
          //   headers:{'Content-Type':'multipart/form-data'}
        })
        const link = await response.json()
        }
    }

    if (status === 'loading' || !profileFetched) {
        return 'Loading...';
    }

    if (status === 'unauthenticated') {
        
        router.push('/login');
        return null; // Prevent rendering anything while redirecting
    }

    if (!session?.user) {
        return null; // Prevent errors if session or user is undefined
    }

    const userImage = session?.user?.image;

    return (
        <section className="mt-8">
      <UserTabs isAdmin={true}/>
            
            <div className='max-w-md mx-auto mt-8 '>
               
                <div className='flex gap-4 items-center '>
                <div>
                    <div className=' p-2 rounded-lg relative'>
                    
                        
                    <Image className='rounded-lg w-full h-full mb-1 ' src={userImage} width={250} height={250} alt='avatar' />
                    <label>
                        <input type='file' className='hidden' onChange={handleFileChange}/>

                        <span className='block border rounded-lg p-4 text-center border-gray-300 cursor-pointer'>Edit</span>
                    </label>
                  
                    </div>
                </div>
                <form className='grow' onSubmit={handleProfileInfoUpdate}>
                    <label>First and lastname</label>
                    <input type='text' placeholder='first and lastname' value={userName} onChange={ev=>setUserName(ev.target.value)}/>
                    <label>Email</label>
                    <input type='email' value={session.user.email} placeholder='email' disabled={true}/>
                    <label>PhoneNumber</label>
                    <input type= 'tel' placeholder='Phone Number' value={phone} onChange={ev=>setPhone(ev.target.value)}/>
                    <label>StreetAddress</label>
                    <input type='text' placeholder='Street address' value={streetAddress} onChange={ev=>setStreetAdress(ev.target.value)}/>
                    <div className='flex gap-2'>
                        <div>
                    <label>City</label>
                    <input type='text'  placeholder='City' value={city} onChange={ev=>setCity(ev.target.value)}/>

                        </div>
                        <div>

                    <label>PostalCode</label>
                    <input type='text'  placeholder='postalcode' value={postalCode} onChange={ev=>setPostalCode(ev.target.value)}/>
                        </div>
                    </div>
                    <label>Country</label>
                    <input type='text' placeholder='Country' value={country} onChange={ev=>setCountry(ev.target.value)}/>
                    <button type='submit'>Save</button>
                </form>
                </div>
            </div>
        </section>
    );
}
