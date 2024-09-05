'use client'
import { useState } from "react"
import Image from "next/image"
import {signIn} from 'next-auth/react'
export default function LoginPage(){

    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [loginInProgress,setLoginINProgress]=useState(false)
    async function handleFormSubmit(ev){
        ev.preventDefault();
        setLoginINProgress(true)
        await signIn('credentials',{email,password,callbackUrl:'/'})
        setLoginINProgress(false)

    }
    return(
        <section className="mt-8">
               <h1 className="text-center text-primary text-4xl my-4">Login</h1>
               <form className="max-w-xs mx-auto" onSubmit={handleFormSubmit}>
               <input type="email" name="email" disabled={loginInProgress} placeholder="email" value={email} onChange={ev=>setEmail(ev.target.value)}/>
               <input type="password" name="password" disabled={loginInProgress}  placeholder="password" value={password} onChange={ev=>setPassword(ev.target.value)}/>
               <button type="submit" disabled={loginInProgress}>Login</button>
               <div className="my-4 text-center text-gray-500">
                    Or login with Provider
                </div>
                    <button type="button" onClick={()=>signIn('google',{callbackUrl:'/'})} className="flex gap-4 justify-center">
                        <Image src={'/google.png'} alt="" width={24} height={24}/>
                        Login with Google
                        </button>
               </form>
        </section>
    )
}