import React from "react";
import Link from "next/link";
import Image from "next/image";

const Header = () => {
  const handleSignOut = () => {
    // Implement sign out logic here
  };

  return (
    <header className="bg-[#FFFFFF] p-4 flex justify-between items-center min-h-36">
      <div className="flex items-center">
        <Image
          src="/KidSport-Month-Graphic-SS-Website.png"
          layout="fixed"
          width={100}
          height={100}
          alt="Company Logo"
          className="h-100 w-100 rounded-md"
        />
      </div>
      <div className="flex items-center space-x-4 ml-auto">
        <div className="text-black">Username</div>
        <Link href="/edit-profile">
          <span className="text-black cursor-pointer hover:text-cyan-400">Edit Profile</span>
        </Link>
        <button className="text-black hover:text-cyan-400" onClick={handleSignOut}>
          Sign Out
        </button>
      </div>
    </header>
  );
};

export default Header;
