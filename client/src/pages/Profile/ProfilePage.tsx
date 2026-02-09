import React, { useEffect, useState, useRef } from "react";
import styles from "./ProfilePage.module.css";

type Set = { id: string; reps: number; weight: number };
type Exercise = { id: string; name: string; category: string };
type WorkoutExercise = { id: string; exercise: Exercise; sets: Set[] };
type Workout = { id: string; name: string; date: string; workoutExercises: WorkoutExercise[] };
type UserProfile = { weight?: number; height?: number; age?: number; goal?: string };
type User = { id: string; firstName: string; lastName?: string; email: string; profile?: UserProfile; workouts: Workout[] };

const fetchUserData = async (): Promise<User> => ({
    id: "1",
    firstName: "John",
    lastName: "Doe",
    email: "john@example.com",
    profile: { weight: 75, height: 180, age: 28, goal: "Build muscle" },
    workouts: [
        {
            id: "w1",
            name: "Chest Day",
            date: new Date().toISOString(),
            workoutExercises: [
                { id: "we1", exercise: { id: "e1", name: "Bench Press", category: "Chest" }, sets: [{ id: "s1", reps: 10, weight: 60 }, { id: "s2", reps: 8, weight: 70 }] },
                { id: "we2", exercise: { id: "e2", name: "Incline Dumbbell Press", category: "Chest" }, sets: [{ id: "s3", reps: 12, weight: 25 }, { id: "s4", reps: 10, weight: 30 }] },
            ],
        },
        {
            id: "w2",
            name: "Back Day",
            date: new Date().toISOString(),
            workoutExercises: [
                {
                    id: "we3",
                    exercise: { id: "e3", name: "Pull Ups", category: "Back" },
                    sets: [
                        { id: "s5", reps: 8, weight: 0 },
                        { id: "s6", reps: 6, weight: 0 }
                    ]
                },
                {
                    id: "we4",
                    exercise: { id: "e4", name: "Barbell Rows", category: "Back" },
                    sets: [
                        { id: "s7", reps: 10, weight: 60 },
                        { id: "s8", reps: 8, weight: 70 }
                    ]
                },
                {
                    id: "we5",
                    exercise: { id: "e5", name: "Lat Pulldown", category: "Back" },
                    sets: [
                        { id: "s9", reps: 12, weight: 45 },
                        { id: "s10", reps: 10, weight: 50 }
                    ]
                },
                {
                    id: "we6",
                    exercise: { id: "e6", name: "Seated Cable Rows", category: "Back" },
                    sets: [
                        { id: "s11", reps: 12, weight: 40 },
                        { id: "s12", reps: 10, weight: 45 }
                    ]
                },
                {
                    id: "we7",
                    exercise: { id: "e7", name: "Dumbbell Deadlifts", category: "Back" },
                    sets: [
                        { id: "s13", reps: 10, weight: 30 },
                        { id: "s14", reps: 8, weight: 35 }
                    ]
                }
            ]
        }

    ],
});

const ProfilePage: React.FC = () => {
    const [user, setUser] = useState<User | null>(null);
    const [expandedWorkoutId, setExpandedWorkoutId] = useState<string | null>(null);
    const contentRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

    useEffect(() => {
        fetchUserData().then(setUser);
    }, []);

    // Precalculate all data
    const lastWorkout = user?.workouts[user.workouts.length - 1] || null;
    const totalWorkouts = user?.workouts.length || 0;
    const totalSets = user?.workouts.flatMap(w => w.workoutExercises.flatMap(we => we.sets)).length || 0;
    const totalWeight = user?.workouts.flatMap(w => w.workoutExercises.flatMap(we => we.sets.map(s => s.reps * s.weight))).reduce((a, b) => a + b, 0) || 0;

    // Precompute exercises array for JSX
    const workoutExercisesDisplay = lastWorkout?.workoutExercises.map(we => {
        const isOpen = expandedWorkoutId === we.id;
        const height = contentRefs.current[we.id]?.scrollHeight || 0;

        return (
            <div key={we.id} className="mb-5 border-b border-border-subtle pb-3">
                <button
                    className={styles.workoutExerciseButton}
                    onClick={() => setExpandedWorkoutId(isOpen ? null : we.id)}
                >
                    <span>{we.exercise.name} ({we.exercise.category})</span>
                    <span className="text-accent-main text-2xl">{isOpen ? "−" : "+"}</span>
                </button>

                <div
                    ref={el => { contentRefs.current[we.id] = el; }}
                    style={{ height: isOpen ? `${height}px` : "0px" }}
                    className="overflow-hidden transition-[height] duration-400 ease-in-out">
                    <ul className={styles.setList}>
                        {we.sets.map(s => <li key={s.id}>{s.reps} reps × {s.weight} kg</li>)}
                    </ul>
                </div>
            </div>
        );
    }) || [];

    return (
        <div className="p-6 max-w-7xl mx-auto space-y-10">

            {/* Profile Section */}
            <section className={`flex flex-col md:flex-row items-center justify-between ${styles.profileCard}`}>
                <div>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-accent-main">{user?.firstName} {user?.lastName}</h1>
                    <p className="text-text-secondary mt-2">{user?.email}</p>
                    {user?.profile?.goal && <span className={styles.goalBadge}>{user.profile.goal}</span>}
                </div>
                {user?.profile && (
                    <div className="mt-6 md:mt-0 flex gap-8 text-center">
                        <div>
                            <p className="text-text-secondary text-sm">Weight</p>
                            <p className="font-bold text-xl text-accent-main">{user.profile.weight ?? "-"} kg</p>
                        </div>
                        <div>
                            <p className="text-text-secondary text-sm">Height</p>
                            <p className="font-bold text-xl text-accent-main">{user.profile.height ?? "-"} cm</p>
                        </div>
                        <div>
                            <p className="text-text-secondary text-sm">Age</p>
                            <p className="font-bold text-xl text-accent-main">{user.profile.age ?? "-"}</p>
                        </div>
                    </div>
                )}
            </section>

            {/* Stats Section */}
            <section className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className={`${styles.statCard}`}>
                    <p className="text-text-secondary text-sm">Total Workouts</p>
                    <p className="text-2xl md:text-3xl font-bold text-accent-main">{totalWorkouts}</p>
                </div>
                <div className={`${styles.statCard}`}>
                    <p className="text-text-secondary text-sm">Total Sets</p>
                    <p className="text-2xl md:text-3xl font-bold text-accent-main">{totalSets}</p>
                </div>
                <div className={`${styles.statCard}`}>
                    <p className="text-text-secondary text-sm">Total Weight</p>
                    <p className="text-2xl md:text-3xl font-bold text-accent-main">{totalWeight} kg</p>
                </div>
                <button className={`${styles.addWorkoutButton}`}>Add Workout</button>
            </section>

            {/* Last Workout */}
            {lastWorkout && (
                <section className={`${styles.workoutCard}`}>
                    <h2 className="text-2xl md:text-3xl font-semibold mb-2 text-accent-main">{lastWorkout.name}</h2>
                    <p className="text-text-secondary mb-5">{new Date(lastWorkout.date).toLocaleString()}</p>
                    {workoutExercisesDisplay}
                </section>
            )}

        </div>
    );
};

export default ProfilePage;
