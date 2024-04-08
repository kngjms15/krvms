'use client'

import React from 'react';
import Link from 'next/link';
import ApplicantsListPage from '@/pages/applicantsList/page';

const Page = () => {
  return (
    <div>
      <Link href="/VolunteerApplicationForm">
          <button>Volunteer Now!</button>
      </Link>

      <ApplicantsListPage />
    </div>
  );
};

export default Page;

