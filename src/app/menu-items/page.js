'use client'
import { useState } from "react";
import UserTabs from "../../components/layout/UserTabs";
import { useProfile } from "../../components/UseProfile";
import Link from 'next/link'
export default function MenuItemsPage(){

  const {loading,data}= useProfile()


  
  
  if(loading){
    return 'Loading user info...'

  }
  if(!data.admin){
    return 'Not a admin'
  }

 
  return (
    <section className="mt-8">
      <UserTabs isAdmin={true}/>
      <Link href={'/menu-items/new'}>The main funciton </Link>
    </section>
  )
}