"use client"
import { useState } from 'react';
import { useProfile } from "../../../components/UseProfile";
import { useSession } from "next-auth/react";
import UserTabs from "../../../components/layout/UserTabs"
import Image from 'next/image'; // Import Next.js Image component
import { toast } from 'react-hot-toast'; // Import toast for notifications
import Right from '../../../components/layout/icons/Right';
import Link from 'next/link';
import Left from '../../../components/layout/icons/Left'
import { redirect } from 'next/navigation';
import MenuItemForm from '../../../components/layout/MenuItemForm'
const NewMenuItemPage = () => {
    const { loading, data } = useProfile(); // Only one declaration
   
    const { data: session } = useSession(); // Destructure session
    const [redirectToItems,setRedirectToItems]=useState(false)
    async function handleFormSubmit(ev,data) {
        ev.preventDefault();
        
        
        const savingPromise = new Promise(async (resolve, reject) => {
            const response = await fetch('../api/menu-items', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: { 'Content-Type': 'application/json' }
            });

            if (response.ok) resolve();
            else reject();
        });

        await toast.promise(savingPromise, {
            loading: 'Saving this tasty item',
            success: 'Saved successfully!',
            error: 'Error saving item'
        });
        setRedirectToItems(true)
    }
   if(redirectToItems){
   return redirect('/menu-items')
   }

    if (loading) {
        return 'Loading user info...';
    }

    if (!data?.admin) {
        return 'Not an admin';
    }

    async function handleFileChange(ev) {
        const file = ev.target.files[0];
        if (file) {
            // handle file upload logic here
            setImage(file);
        }
    }

    const userImage = session?.user?.image;

    return (
        <section className="mt-8">
            <UserTabs isAdmin={true} />
            <div className='max-w-md mx-auto mt-8'>

              <Link href={'/menu-items'} className='button'>
              <Left/>
              <span>Show all menu items</span>
          
              </Link>
            </div>
           <MenuItemForm menuItem={null} onSubmit={handleFormSubmit}/>
        </section>
    );
}

export default NewMenuItemPage;
