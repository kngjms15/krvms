"use client";
import { useEffect, useState } from "react";
import Header from "./header";
import ApplicantsListPage from "@/pages/applicantsList/page";
import VolunteersListPage from "@/pages/volunteersList/page";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("volunteers");

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

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
              <h1>Volunteers</h1>
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
    </div>
  );
};

export default Dashboard;
