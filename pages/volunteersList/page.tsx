// pages/volunteersList/page.tsx

import React, { useEffect, useState } from "react";
import VolunteersList from "./volunteersList";
import { Volunteer } from "@prisma/client";

const VolunteersListPage: React.FC = () => {
  const [volunteers, setVolunteers] = useState<Volunteer[]>([]);

  useEffect(() => {
    const fetchVolunteers = async () => {
      try {
        const response = await fetch("/api/volunteers");
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const data = await response.json();
        setVolunteers(data);
      } catch (error) {
        console.error("Failed to fetch volunteers:", error);
      }
    };

    fetchVolunteers();
  }, []);

  return (
    <div className="flex-grow m-auto">
      {volunteers.map((volunteer) => (
        volunteer && volunteer.firstName && (
        <VolunteersList key={volunteer.volunteerId} volunteer={volunteer} />
        )
      ))}
    </div>
  );
};

export default VolunteersListPage;
