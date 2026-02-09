import React from "react";
import styles from "./Stats.module.css";
import type {IWorkout} from "../../../types/exercise";
import Button from "../../Layout/UI/Button/Button.tsx";

interface StatsProps {
    workouts: IWorkout[];
}

const Stats: React.FC<StatsProps> = ({workouts}) => {
    const totalWorkouts = workouts.length;
    const totalSets = workouts.flatMap(w => w.workoutExercises.flatMap(e => e.sets)).length;
    const totalWeight = workouts
        .flatMap(w => w.workoutExercises.flatMap(e => e.sets.map(s => (s.reps || 0) * (s.weight || 0))))
        .reduce((a, b) => a + b, 0);

    return (
        <section className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className={styles.statCard}>
                <p className="text-text-secondary text-sm">Total Workouts</p>
                <p className="text-2xl md:text-3xl font-bold text-accent-main">{totalWorkouts}</p>
            </div>
            <div className={styles.statCard}>
                <p className="text-text-secondary text-sm">Total Sets</p>
                <p className="text-2xl md:text-3xl font-bold text-accent-main">{totalSets}</p>
            </div>
            <div className={styles.statCard}>
                <p className="text-text-secondary text-sm">Total Weight</p>
                <p className="text-2xl md:text-3xl font-bold text-accent-main">{totalWeight} kg</p>
            </div>

            <Button to={'/log-workout'} variant={"primary"} className="addWorkoutButton">Add Workout</Button>
        </section>
    );
};

export default Stats;