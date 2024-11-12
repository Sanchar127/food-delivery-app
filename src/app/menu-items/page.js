'use client';
import { useEffect, useState } from "react";
import UserTabs from "../../components/layout/UserTabs";
import { useProfile } from "../../components/UseProfile";
import Link from 'next/link';
import Right from "../../components/layout/icons/Right";
import Image from "next/image";

export default function MenuItemsPage() {
  const [menuItems, setMenuItems] = useState([]);
  const [menuLoading, setMenuLoading] = useState(true);
  const { loading: profileLoading, data } = useProfile();

  useEffect(() => {
    fetch('/api/menu-items')
      .then((res) => res.json())
      .then((menuItems) => {
        setMenuItems(menuItems);
        setMenuLoading(false);
      })
      .catch((error) => {
        console.error("Failed to fetch menu items", error);
        setMenuLoading(false);
        alert("Failed to load menu items, please try again later.");
      });
  }, []);

  if (profileLoading) {
    return <div>Loading user info...</div>;
  }

  if (!data?.admin) {
    return <div>Not an admin</div>;
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
          <div>Loading menu items...</div>
        ) : (
          <>
            <h2 className="text-sm text-gray-500 mt-8">Edit menu item:</h2>
            <div className="grid grid-cols-3 gap-2">
              {menuItems?.length > 0 ? (
                menuItems.map((item) => (
                  <Link href={`/menu-items/edit/${item._id}`} key={item._id} className="bg-gray-200 rounded-lg p-4">
                    <div className="relative">
                      <Image
                        className="rounded-md"
                        src={item.image || '/fallback-image.png'}  // Use a fallback image
                        alt={item.name ? `Image of ${item.name}` : "Menu item image"}
                        width={200}
                        height={200}
                      />
                    </div>
                    <div className="text-center">
                      {item.name || "Unnamed Item"}
                      
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
