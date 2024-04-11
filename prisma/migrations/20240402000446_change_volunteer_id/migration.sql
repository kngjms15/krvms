/*
  Warnings:

  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_authorId_fkey";

-- DropTable
DROP TABLE "Post";

-- DropTable
DROP TABLE "users";

-- CreateTable
CREATE TABLE "Volunteer" (
    "volunteerId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "firstName" VARCHAR(50) NOT NULL,
    "lastName" VARCHAR(50) NOT NULL,
    "role" VARCHAR(20) NOT NULL,
    "dob" TIMESTAMP(3) NOT NULL,
    "address" VARCHAR(50) NOT NULL,
    "city" VARCHAR(50) NOT NULL,
    "province" VARCHAR(2) NOT NULL,
    "postalCode" VARCHAR(6) NOT NULL,
    "chapter" VARCHAR(20) NOT NULL,
    "primaryPhone" VARCHAR(10) NOT NULL,
    "secondaryPhone" TEXT,
    "email" VARCHAR(50) NOT NULL,
    "employer" VARCHAR(50) NOT NULL,
    "conviction" BOOLEAN NOT NULL,
    "bondable" BOOLEAN NOT NULL,
    "medicalCondition" BOOLEAN NOT NULL,
    "medicalConditionDetails" VARCHAR(500),
    "emergencyContactName" VARCHAR(50) NOT NULL,
    "emergencyContactRelationship" VARCHAR(50) NOT NULL,
    "emergencyContactPhone" VARCHAR(10) NOT NULL,
    "volunteerExperienceDetails" VARCHAR(500),
    "interviewStatus" VARCHAR(20) NOT NULL,
    "status" VARCHAR(20) NOT NULL,

    CONSTRAINT "Volunteer_pkey" PRIMARY KEY ("volunteerId")
);
