"use client";

import React from "react";
import Link from "next/link";

const Page = () => {


  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="max-w-[940px] bg-[#F2F2F2] rounded-lg p-3">
        <div className=" m-10 ">
          <h1>Welcome to KidSport&#8482; Canada</h1>
        </div>
        <div className="flex flex-col items-center">
          <div className="m-4">
            <Link href="/VolunteerApplicationForm">
              <button className="bg-[#6CC24A] hover:opacity-50 text-white font-medium py-2 px-4 rounded">
                Volunteer Now!
              </button>
            </Link>
          </div>
          <div className="m-4">
            <Link href="/Login">
              <button className="bg-[#FFF200] hover:opacity-50 text-black font-medium py-2 px-4 rounded">
                Login
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;


