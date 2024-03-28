/*
  Warnings:

  - You are about to drop the `AdminEvent` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Administrator` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Applicant` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Application` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Chapter` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Event` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Job` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Roles` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Speciality` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Volunteer` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `VolunteerEvent` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "AdminEvent" DROP CONSTRAINT "AdminEvent_adminId_fkey";

-- DropForeignKey
ALTER TABLE "AdminEvent" DROP CONSTRAINT "AdminEvent_eventId_fkey";

-- DropForeignKey
ALTER TABLE "Administrator" DROP CONSTRAINT "Administrator_chapterId_fkey";

-- DropForeignKey
ALTER TABLE "Application" DROP CONSTRAINT "Application_applicantId_fkey";

-- DropForeignKey
ALTER TABLE "Application" DROP CONSTRAINT "Application_eventId_fkey";

-- DropForeignKey
ALTER TABLE "Job" DROP CONSTRAINT "Job_adminId_fkey";

-- DropForeignKey
ALTER TABLE "Job" DROP CONSTRAINT "Job_roleId_fkey";

-- DropForeignKey
ALTER TABLE "Speciality" DROP CONSTRAINT "Speciality_roleId_fkey";

-- DropForeignKey
ALTER TABLE "Speciality" DROP CONSTRAINT "Speciality_volunteerId_fkey";

-- DropForeignKey
ALTER TABLE "VolunteerEvent" DROP CONSTRAINT "VolunteerEvent_eventId_fkey";

-- DropForeignKey
ALTER TABLE "VolunteerEvent" DROP CONSTRAINT "VolunteerEvent_volunteerId_fkey";

-- DropTable
DROP TABLE "AdminEvent";

-- DropTable
DROP TABLE "Administrator";

-- DropTable
DROP TABLE "Applicant";

-- DropTable
DROP TABLE "Application";

-- DropTable
DROP TABLE "Chapter";

-- DropTable
DROP TABLE "Event";

-- DropTable
DROP TABLE "Job";

-- DropTable
DROP TABLE "Roles";

-- DropTable
DROP TABLE "Speciality";

-- DropTable
DROP TABLE "Volunteer";

-- DropTable
DROP TABLE "VolunteerEvent";
