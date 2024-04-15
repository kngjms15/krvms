"use client";

import { useEffect, useState } from "react";
import Header from "./header";
import VolunteersListPage from "../components/volunteersList";
import ApplicantsList from "../components/applicantsList";
import ApplicantsListPage from "@/pages/applicantsList/page";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import CreateNewVolunteer from "../components/CreateNewVolunteer";



const Dashboard = () => {
  // const router = useRouter();
  const [activeTab, setActiveTab] = useState("volunteers");
  const [showCreateVolunteerModal, setShowCreateVolunteerModal] =
    useState(false);

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  const toggleCreateVolunteerModal = () => {
    setShowCreateVolunteerModal((prev) => !prev);
  };

  // useEffect(() => {
  //   const checkAuth = async () => {
  //     const session = await getSession();
  //     if (!session) {
  //       router.push("/login");
  //     }
  //   };
  //   checkAuth();
  // }, []);

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <div className="sidebar bg-gray-200 w-48 overflow-y-auto">
          <div
            className={`tab cursor-pointer py-4 pl-2  ${
              activeTab === "volunteers" ? "bg-[#6CC24A]" : ""
            }`}
            onClick={() => handleTabClick("volunteers")}
          >
            Volunteers
          </div>
          <div
            className={`tab cursor-pointer py-4 pl-2  ${
              activeTab === "applicants" ? "bg-[#6CC24A]" : ""
            }`}
            onClick={() => handleTabClick("applicants")}
          >
            Applicants
          </div>
        </div>

        <div className="content flex-1 p-4 overflow-y-auto bg-[#D9D9D9]">
          {activeTab === "volunteers" && (
            <div className="cards">
              <div className="flex flex-grow justify-between">
                <h1>Volunteers</h1>
                <button
            onClick={toggleCreateVolunteerModal}
            className="rounded-md bg-[#6CC24A] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:opacity-75"
          >
            Add New Volunteer
          </button>
              </div>
              <VolunteersListPage />
            </div>
          )}
          {activeTab === "applicants" && (
            <div className="cards">
              <h1>Applicants</h1>
              <ApplicantsListPage />
            </div>
          )}
        </div>
      </div>
      {showCreateVolunteerModal && (
        <div className="fixed inset-0 items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded">
            <CreateNewVolunteer />
          </div>
        </div>
      )}
    </div>
  );
};

// export const getServerSideProps: GetServerSideProps =async (context) => {
//   const session = await getSession(context);
  
//   if (!session) {
//     return {
//       redirect: {
//         destination: "/login",
//         permanent: false,
//       },
//     };
//   }

//   return {
//     props: {},
//   };
// };

export default Dashboard;
