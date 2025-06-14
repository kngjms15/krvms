"use client";

import { useEffect, useState } from "react";
import Header from "./header";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import CreateNewVolunteer from "../components/CreateNewVolunteer";
import SortAndSearchComponent from "../components/SortAndSearchComponent";
import { VolunteerApplicant } from "@prisma/client";
import ApplicantsListPage from "../components/ApplicantsListComponent";
import VolunteersListPage from "../components/VolunteersListComponent";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("volunteers");
  const [showCreateVolunteerModal, setShowCreateVolunteerModal] =
    useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("");

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  const closeModal = () => {
    setShowCreateVolunteerModal(false);
  };

  const toggleCreateVolunteerModal = () => {
    setShowCreateVolunteerModal((prev) => !prev);
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

        <div className="content flex-1 overflow-y-auto px-2 bg-[#D9D9D9]">
          {activeTab === "volunteers" && (
            <div className="cards">
              <div className=" bg-[#D9D9D9]">
                <div className="flex justify-between py-4">
                  <h1>Volunteers</h1>
                  <button
                    onClick={toggleCreateVolunteerModal}
                    className="rounded-md bg-[#6CC24A] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:opacity-75"
                  >
                    Add New Volunteer
                  </button>
                </div>
                <SortAndSearchComponent
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                  sortOption={sortOption}
                  setSortOption={setSortOption}
                />
              </div>

              <VolunteersListPage
                searchQuery={searchQuery}
                sortOption={sortOption}
              />
            </div>
          )}
          {activeTab === "applicants" && (
            <div className="cards">
              <div className="bg-[#D9D9D9]">
                <div className="flex justify-between py-4">
                  <h1>Applicants</h1>
                </div>
                <SortAndSearchComponent
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                  sortOption={sortOption}
                  setSortOption={setSortOption}
                />
              </div>
              <ApplicantsListPage
                searchQuery={searchQuery}
                sortOption={sortOption}
              />
            </div>
          )}
        </div>
      </div>
      {showCreateVolunteerModal && (
        <div className="fixed inset-0 items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded">
            <CreateNewVolunteer onClose={closeModal} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
