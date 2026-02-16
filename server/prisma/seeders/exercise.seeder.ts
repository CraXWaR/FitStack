import type {PrismaClient} from "@prisma/index.js";

export async function seedExercises(prisma: PrismaClient) {
    console.log("Seeding exercises...");

    await prisma.exercise.createMany({
        data: [
            // CHEST
            {name: "Bench Press", category: "Chest"},
            {name: "Incline Bench Press", category: "Chest"},
            {name: "Decline Bench Press", category: "Chest"},
            {name: "Dumbbell Bench Press", category: "Chest"},
            {name: "Incline Dumbbell Press", category: "Chest"},
            {name: "Chest Fly (Dumbbell)", category: "Chest"},
            {name: "Chest Fly (Machine)", category: "Chest"},
            {name: "Cable Fly", category: "Chest"},
            {name: "Push Ups", category: "Chest"},
            {name: "Dips (Chest)", category: "Chest"},

            // BACK
            {name: "Deadlift", category: "Back"},
            {name: "Barbell Row", category: "Back"},
            {name: "Dumbbell Row", category: "Back"},
            {name: "Pull Ups", category: "Back"},
            {name: "Chin Ups", category: "Back"},
            {name: "Lat Pulldown", category: "Back"},
            {name: "Seated Cable Row", category: "Back"},
            {name: "T-Bar Row", category: "Back"},
            {name: "Straight Arm Pulldown", category: "Back"},
            {name: "Back Extension", category: "Back"},

            // SHOULDERS
            {name: "Military Press", category: "Shoulders"},
            {name: "Overhead Press", category: "Shoulders"},
            {name: "Seated Barbell Press", category: "Shoulders"},
            {name: "Dumbbell Shoulder Press", category: "Shoulders"},
            {name: "Arnold Press", category: "Shoulders"},
            {name: "Lateral Raises", category: "Shoulders"},
            {name: "Front Raises", category: "Shoulders"},
            {name: "Rear Delt Fly", category: "Shoulders"},
            {name: "Face Pulls", category: "Shoulders"},
            {name: "Upright Row", category: "Shoulders"},
            {name: "Shrugs", category: "Shoulders"},

            // LEGS
            {name: "Squat", category: "Legs"},
            {name: "Front Squat", category: "Legs"},
            {name: "Leg Press", category: "Legs"},
            {name: "Hack Squat", category: "Legs"},
            {name: "Romanian Deadlift", category: "Legs"},
            {name: "Leg Curl", category: "Legs"},
            {name: "Leg Extension", category: "Legs"},
            {name: "Walking Lunges", category: "Legs"},
            {name: "Bulgarian Split Squat", category: "Legs"},
            {name: "Step Ups", category: "Legs"},
            {name: "Standing Calf Raise", category: "Legs"},
            {name: "Seated Calf Raise", category: "Legs"},

            // BICEPS
            {name: "Barbell Curl", category: "Biceps"},
            {name: "Dumbbell Curl", category: "Biceps"},
            {name: "Incline Dumbbell Curl", category: "Biceps"},
            {name: "Hammer Curl", category: "Biceps"},
            {name: "Preacher Curl", category: "Biceps"},
            {name: "Cable Curl", category: "Biceps"},
            {name: "Concentration Curl", category: "Biceps"},

            // TRICEPS
            {name: "Close Grip Bench Press", category: "Triceps"},
            {name: "Tricep Dips", category: "Triceps"},
            {name: "Skull Crushers", category: "Triceps"},
            {name: "Overhead Tricep Extension", category: "Triceps"},
            {name: "Cable Pushdown", category: "Triceps"},
            {name: "Kickbacks", category: "Triceps"},

            // CORE
            {name: "Plank", category: "Core"},
            {name: "Hanging Leg Raises", category: "Core"},
            {name: "Crunches", category: "Core"},
            {name: "Cable Crunch", category: "Core"},
            {name: "Russian Twist", category: "Core"},
            {name: "Ab Wheel Rollout", category: "Core"},
            {name: "Sit Ups", category: "Core"},

            // FULL BODY / CONDITIONING
            {name: "Clean", category: "Full Body"},
            {name: "Clean & Press", category: "Full Body"},
            {name: "Snatch", category: "Full Body"},
            {name: "Farmer's Walk", category: "Full Body"},
            {name: "Kettlebell Swing", category: "Full Body"},
            {name: "Burpees", category: "Full Body"},
        ],
        skipDuplicates: true,
    });

    console.log("Exercises seeded...");
}