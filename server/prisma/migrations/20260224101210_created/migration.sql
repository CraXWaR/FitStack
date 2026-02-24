-- CreateTable
CREATE TABLE "today_added_sets" (
    "id" TEXT NOT NULL,
    "set_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "workout_exercise_id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "today_added_sets_pkey" PRIMARY KEY ("id")
);
