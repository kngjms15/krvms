"use client";

import React from "react";
import Link from "next/link";

const Page = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-cover bg-center" style={{backgroundImage: 'url("/front-page-image.png")'}}>
      <div className="flex-col max-w-[940px] pl-8 pr-8 m-auto my-2 bg-[#F2F2F2] rounded-lg p-3 shadow-lg">
        <div className="flex justify-center m-20 ">
          <h1>Welcome to KidSport</h1>
        </div>
        <div className="flex justify-center m-4 ">
          <Link href="/VolunteerApplicationForm">
            <button className=" bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
              Volunteer Now!
            </button>
          </Link>
        </div>
        <div className="flex justify-center m-4">
          <Link href="/Login">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Login
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Page;
