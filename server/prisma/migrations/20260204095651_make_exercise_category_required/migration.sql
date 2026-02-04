/*
  Warnings:

  - Made the column `category` on table `exercises` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "exercises" ALTER COLUMN "category" SET NOT NULL;
