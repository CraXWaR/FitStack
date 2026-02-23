import React, {useState} from "react";
import {useNavigate} from "react-router-dom";

import type {ISet} from "../../types/exercise.ts";
import type {IWorkout} from "../../types/workout.ts";

import Hero from "../../components/Workout/Hero/Hero.tsx";
import ExerciseCard from "../../components/Workout/ExerciseCard/ExerciseCard.tsx";

import styles from "./WorkoutDetailPage.module.css";

// ─── Dummy Data ───────────────────────────────────────────────────────────────
//TODO MAKE FETCH WITH REAL WORKOUT DATA
const DUMMY_WORKOUT: IWorkout = {
    id: "ff8b73bc-97a5-4ec6-a578-a28d64bd7e5d",
    name: "Upper Body Power",
    date: "2026-02-19T09:00:00.000Z",
    programId: "f68078a7-1c68-4e84-b83a-44e80e733b71",
    workoutExercises: [
        {
            id: "we-001",
            exercise: {id: "bench-press-id", name: "Bench Press", category: "Chest"},
            sets: [
                {id: "s-001", reps: 8, weight: 80, createdAt: "2026-02-19T09:05:00.000Z"},
                {id: "s-002", reps: 6, weight: 90, createdAt: "2026-02-19T09:08:00.000Z"},
                {id: "s-003", reps: 5, weight: 100, createdAt: "2026-02-19T09:12:00.000Z"},
                {id: "s-004", reps: 4, weight: 105, createdAt: "2026-02-19T09:15:00.000Z"},
            ],
        },
        {
            id: "we-002",
            exercise: {id: "overhead-press-id", name: "Overhead Press", category: "Shoulders"},
            sets: [
                {id: "s-005", reps: 10, weight: 50, createdAt: "2026-02-19T09:25:00.000Z"},
                {id: "s-006", reps: 8, weight: 55, createdAt: "2026-02-19T09:29:00.000Z"},
                {id: "s-007", reps: 6, weight: 60, createdAt: "2026-02-19T09:33:00.000Z"},
            ],
        },
        {
            id: "we-003",
            exercise: {id: "pull-up-id", name: "Pull-Up", category: "Back"},
            sets: [
                {id: "s-008", reps: 12, weight: 0, createdAt: "2026-02-19T09:42:00.000Z"},
                {id: "s-009", reps: 10, weight: 0, createdAt: "2026-02-19T09:46:00.000Z"},
                {id: "s-010", reps: 8, weight: 10, createdAt: "2026-02-19T09:50:00.000Z"},
            ],
        },
        {
            id: "we-004",
            exercise: {id: "tricep-dip-id", name: "Tricep Dip", category: "Triceps"},
            sets: [
                {id: "s-011", reps: 15, weight: 0, createdAt: "2026-02-19T09:58:00.000Z"},
                {id: "s-012", reps: 12, weight: 10, createdAt: "2026-02-19T10:02:00.000Z"},
            ],
        },
    ],
};

// ─── Page ─────────────────────────────────────────────────────────────────────
const WorkoutDetailPage: React.FC = () => {
    const navigate = useNavigate();
    const [workout, setWorkout] = useState<IWorkout>(DUMMY_WORKOUT);

    // Track where the "new session" sets start for each exercise (original set count at page load)
    const [newSetsFrom] = useState<Record<string, number>>(() =>
        Object.fromEntries(
            DUMMY_WORKOUT.workoutExercises.map((workoutExercise) => [workoutExercise.id, workoutExercise.sets.length])
        )
    );

    const handleAddSet = (workoutExerciseId: string, reps: number, weight: number) => {
        const newSet: ISet = {
            id: crypto.randomUUID(),
            reps,
            weight,
            createdAt: new Date().toISOString(),
        };
        setWorkout((prev) => ({
            ...prev,
            workoutExercises: prev.workoutExercises.map((workoutExercise) =>
                workoutExercise.id === workoutExerciseId ? {...workoutExercise, sets: [...workoutExercise.sets, newSet]} : workoutExercise
            ),
        }));
    };

    return (
        <div className={styles.page}>
            <div className={styles.bgGlow}/>
            <div className={styles.wrap}>
                <nav className={styles.nav}>
                    <button type="button" className={styles.back} onClick={() => navigate(-1)}>
                        <svg viewBox="0 0 16 16" fill="none" width="14" height="14">
                            <path d="M10 13L5 8l5-5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"
                                  strokeLinejoin="round"/>
                        </svg>
                        Back
                    </button>
                </nav>

                <Hero workout={workout}/>

                {/* Cards grid */}
                <div className={styles.grid}>
                    {workout.workoutExercises.map((workoutExercise, index) => (
                        <ExerciseCard
                            key={workoutExercise.id} workoutExercise={workoutExercise}
                            index={index}
                            newSetsFrom={newSetsFrom[workoutExercise.id] ?? workoutExercise.sets.length}
                            onAddSet={handleAddSet}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default WorkoutDetailPage;