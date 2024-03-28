'use client'

import React, { useState } from 'react';
import './dashboard.css';
import App from 'next/app';
import ApplicantsList from '@/pages/applicantsList/applicantsList';
import ApplicantsListPage from '@/pages/applicantsList/page';



const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('volunteers');

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div className="dashboard">
      <div className="sidebar">
        <div
          className={`tab ${activeTab === 'volunteers' ? 'active' : ''}`}
          onClick={() => handleTabClick('volunteers')}
        >
          Volunteers
        </div>
        <div
          className={`tab ${activeTab === 'applicants' ? 'active' : ''}`}
          onClick={() => handleTabClick('applicants')}
        >
          Applicants
        </div>
      </div>
      <div className="content">
        {activeTab === 'volunteers' && (
          <div className="cards">
            <div className="card">
              <h2>Volunteer 1</h2>
              <p>Details for Volunteer 1</p>
            </div>
            <div className="card">
              <h2>Volunteer 2</h2>
              <p>Details for Volunteer 2</p>
            </div>
          </div>
        )}
        {activeTab === 'applicants' && (
          <div className="cards">
            {/* <div className="card">
              <h2>Applicant 1</h2>
              <p>Details for Applicant 1</p>
            </div>
            <div className="card">
              <h2>Applicant 2</h2>
              <p>Details for Applicant 2</p>
            </div> */}
            <ApplicantsListPage />
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
