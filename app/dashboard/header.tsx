import React from "react";
import Link from "next/link";
import Image from "next/image";

const Header = () => {
  const handleSignOut = () => {
    // Implement sign out logic here
    window.location.href = "/";
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
        <div className="text-black align-left">
          <h1>Welcome to the KidSport Dashboard</h1>
        </div>
      <div className="flex">
        <button className="text-" onClick={handleSignOut}>
          Sign Out
        </button>
      </div>
    </header>
  );
};

export default Header;
