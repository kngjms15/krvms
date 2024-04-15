-- AlterTable
ALTER TABLE "Volunteer" ALTER COLUMN "primaryPhone" SET DATA TYPE VARCHAR(15),
ALTER COLUMN "emergencyContactPhone" SET DATA TYPE VARCHAR(15);

-- AlterTable
ALTER TABLE "VolunteerApplicant" ALTER COLUMN "primaryPhone" SET DATA TYPE VARCHAR(15),
ALTER COLUMN "emergencyContactPhone" SET DATA TYPE VARCHAR(15);
