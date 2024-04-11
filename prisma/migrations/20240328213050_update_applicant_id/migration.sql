/*
  Warnings:

  - The primary key for the `VolunteerApplicant` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "VolunteerApplicant" DROP CONSTRAINT "VolunteerApplicant_pkey",
ALTER COLUMN "applicantId" DROP DEFAULT,
ALTER COLUMN "applicantId" SET DATA TYPE TEXT,
ADD CONSTRAINT "VolunteerApplicant_pkey" PRIMARY KEY ("applicantId");
DROP SEQUENCE "VolunteerApplicant_applicantId_seq";
