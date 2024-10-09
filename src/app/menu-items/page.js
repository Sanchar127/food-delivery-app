'use client';
import { useEffect, useState } from "react";
import UserTabs from "../../components/layout/UserTabs";
import { useProfile } from "../../components/UseProfile";
import Link from 'next/link';
import Right from "../../components/layout/icons/Right";
import Image from "next/image";

export default function MenuItemsPage() {
  const [menuItems, setMenuItems] = useState([]);
  const [menuLoading, setMenuLoading] = useState(true); // Loading state for menu items
  const { loading: profileLoading, data } = useProfile(); // Rename loading to profileLoading to avoid conflicts

  useEffect(() => {
    // Fetch menu items from the API
    fetch('/api/menu-items')
      .then((res) => res.json())
      .then((menuItems) => {
        setMenuItems(menuItems); // Set the menu items state
        setMenuLoading(false);  // Mark loading as false
      })
      .catch((error) => {
        console.error("Failed to fetch menu items", error);
        setMenuLoading(false);  // Mark loading as false even if there’s an error
        alert("Failed to load menu items, please try again later.");
      });
  }, []);

  // Handle profile loading state
  if (profileLoading) {
    return 'Loading user info...';
  }

  // Handle if the user is not an admin
  if (!data?.admin) {
    return 'Not an admin';
  }

  return (
    <section className="mt-8 max-w-md mx-auto">
      <UserTabs isAdmin={true} />
      
      <div className="mt-8">
        <Link className="button flex" href="/menu-items/new">
          <span>Create new menu item</span>
          <Right />
        </Link>
      </div>

      <div className="mt-4">
        {menuLoading ? (
          <div>Loading menu items...</div> // Loading state for menu items
        ) : (
          <>
            <h2 className="text-sm text-gray-500 mt-8">Edit menu item:</h2>
            <div className="grid grid-cols-3 gap-2">

            {menuItems?.length > 0 ? (
              menuItems.map((item) => (
                <Link href={`/menu-items/edit/${item._id}`} key={item._id} className=" bg-gray-200  rounded-lg p-4">
                  <div className="relative">
                    <Image className="rounded-md " src={item.image} alt={`image`} width={200} height={200} />
                  </div>
                  <div className="text-center">

                  {item.name}
                  </div>
                </Link>
              ))
            ) : (
              <div>No menu items found.</div>
            )}
        </div>
          </>
        )}
      </div>
    </section>
  );
}
