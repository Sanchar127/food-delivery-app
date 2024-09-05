"use client"
import { signIn } from "next-auth/react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

export default function RegisterPage(){
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [creatingUser,setCreatingUser]=useState(false)
    const [userCreated,setUserCreated]=useState(false)
    const [error,setError]=useState(false)
    async function handleFormSubmit(ev){

        ev.preventDefault();
        setCreatingUser(true)
        setError(false)
        setUserCreated(false)
      const {ok}=await fetch('/api/register',{method:'POST',body:JSON.stringify({email,password}),headers:{'Content-Type':'application/json'}})
      if(ok){

          setUserCreated(true)
        }else{

            setError(true)
        }
        setCreatingUser(false)
    }
    return(
        <div>
            <section className="mt-8">
                <h1 className="text-center text-primary text-4xl my-4">Register</h1>
                {userCreated && (
                    <div className="my-4 text-center">userCreated.<br/> Now you can  <Link  className='underline' href={'/login'}>login &raquo;</Link></div>
                )}
                {error && (
                    <div className="my-4 text-center">Eroor has occur <br/> Please try again later</div>
                )}
                <form className="block max-w-xs mx-auto" onSubmit={handleFormSubmit}>
                    <input type="email" disabled={creatingUser} placeholder="email" value={email} onChange={ev=>setEmail(ev.target.value)}/>
                    <input type="password" disabled={creatingUser} placeholder="password" value={password} onChange={ev=>setPassword(ev.target.value)}/>
                    <button type="submit" disabled={creatingUser}>Register</button>
                <div className="my-4 text-center text-gray-500">
                    Or login with Provider
                </div>
                    <button type="button" onClick={()=>signIn('google',{callbackUrl:'/'})} className="flex gap-4 justify-center">
                        <Image src={'/google.png'} alt="" width={24} height={24}/>
                        Login with Google
                        </button>
                        <div className="my-4 text-center text-gray-500 border-t pt-4">
                            Existing account ?{' '} <Link  className='underline' href={'/login'}>Login here</Link>
                        </div>
                </form>
            </section>
        </div>
    )
}