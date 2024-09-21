'use client'
import UserTabs from "../../components/layout/UserTabs";
import { useProfile } from "../../components/UseProfile";

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
      <form className="mt-8 max-w-md mx-auto" >
        <div className="flex items-start gap-4">
          <div>
            Image
          </div>
          <div className="grow">
            <label >item name</label>
            <input type="text" />
            <label >Description</label>
            <input type="text" />
            <label >Base Prize</label>
            <input type="text" />
            <button type="submit">Save</button>
          </div>
        

        </div>

      </form>
    </section>
  )
}