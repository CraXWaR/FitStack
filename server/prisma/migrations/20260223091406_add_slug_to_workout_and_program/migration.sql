/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `workout_programs` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[slug]` on the table `workouts` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `workout_programs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `workouts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "workout_programs" ADD COLUMN     "slug" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "workouts" ADD COLUMN     "slug" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "workout_programs_slug_key" ON "workout_programs"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "workouts_slug_key" ON "workouts"("slug");
