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

import React from "react";
import prisma from "@/lib/prisma";
import Post from "./dashboard/post";

async function getPosts() {
  const posts = await prisma.post.findMany({
    where: { published: true },
    include: { author: { select: { name: true } } },
  });
  return posts;
}

async function Home() {
  const posts = await getPosts();
  
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
    </>
  );
}

export default Home;
