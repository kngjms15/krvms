import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";



async function main() {
  const user = await prisma.volunteerApplicant.create({
    data: {
      firstName: "Alice",
      lastName: "Johnson",
      dob: "1995-12-12",
      address: "123 Main St",
      cityInfo: "Calgary",
      province: "AB",
      postalCode: "T2T 2T2",
      chapter: "Calgary & Area",
      primaryPhone: "403-123-4567",
      secondaryPhone: "403-123-4567",
      email: "alice@johnson.com",
      employer: "McDonalds",
      conviction: false,
      bondable: true,
      medicalCondition: false,
      medicalConditionDetails: "",
      emergencyContactName: "Bob Johnson",
      emergencyContactRelationship: "Father",
      emergencyContactPhone: "403-123-4567",
      volunteerExperienceDetails: "I have volunteered at the Calgary Food Bank for 2 years.",
      interviewStatus: "Pending" // Add the interviewStatus property
    },
  });
  console.log(user);

  const allUsers = await prisma.user.findMany();
  console.log(allUsers);
}

main()
  .catch((e) => {
    console.error(e.message);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

export default prisma;