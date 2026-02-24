/*
  Warnings:

  - You are about to drop the column `exerciseId` on the `workout_exercises` table. All the data in the column will be lost.
  - You are about to drop the column `workoutId` on the `workout_exercises` table. All the data in the column will be lost.
  - Added the required column `exercise_id` to the `workout_exercises` table without a default value. This is not possible if the table is not empty.
  - Added the required column `workout_id` to the `workout_exercises` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "workout_exercises" DROP CONSTRAINT "workout_exercises_exerciseId_fkey";

-- DropForeignKey
ALTER TABLE "workout_exercises" DROP CONSTRAINT "workout_exercises_workoutId_fkey";

-- AlterTable
ALTER TABLE "workout_exercises" DROP COLUMN "exerciseId",
DROP COLUMN "workoutId",
ADD COLUMN     "exercise_id" TEXT NOT NULL,
ADD COLUMN     "workout_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "workout_exercises" ADD CONSTRAINT "workout_exercises_exercise_id_fkey" FOREIGN KEY ("exercise_id") REFERENCES "exercises"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "workout_exercises" ADD CONSTRAINT "workout_exercises_workout_id_fkey" FOREIGN KEY ("workout_id") REFERENCES "workouts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
