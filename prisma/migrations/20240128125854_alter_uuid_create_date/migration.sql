/*
  Warnings:

  - The primary key for the `Students` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "Students" DROP CONSTRAINT "Students_pkey",
ADD COLUMN     "createAT" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Students_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Students_id_seq";
