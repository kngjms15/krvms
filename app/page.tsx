// 'use client';

// import React from 'react'
// import VolunteerApplicationForm from './components/volunteerApplicationForm'
// import ApplicationParent from './pages/applicationParent'

// const page = () => {
//   return (
//     <>
//       <VolunteerApplicationForm />
//       {/* <ApplicationParent /> */}
//     </>

//   )
// }

// export default page
//-------------------------------------
"use client";

import React from "react";
import prisma from "@/lib/prisma";
import Post from "./dashboard/post";
import volunteers from "./pages/api/volunteers";
import VolunteersList from "./dashboard/applicantsList";

async function getPosts() {
  const posts = await prisma.post.findMany({
    where: { published: true },
    include: { author: { select: { name: true } } },
  });
  return posts;
}

async function getVolunteers() {
  const volunteers = await prisma.volunteerApplicant.findMany();
  return volunteers;
}

async function Home() {
  const posts = await getPosts();
  const volunteers = await getVolunteers();
  
  return (
    <>
      <h1>Feed</h1>
      {posts.map((post) => {
        return( 
          <Post 
          key={post.id} 
          id={post.id} 
          title={post.title}
          content={post.content ?? ""}
          authorName={post.author?.name ?? ""}/>);
      })}

      <h1>Volunteers</h1>
      {volunteers.map((volunteer) => {
        return(
          <VolunteersList 
          
            firstName={volunteer.firstName}
            lastName={volunteer.lastName}
            createdAt={volunteer.createdAt}
            chapter={volunteer.chapter}


          />);
      })}
      
    </>
  );
}

export default Home;
