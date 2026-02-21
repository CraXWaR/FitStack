import React from "react";

import type {IWorkout} from "../../../types/workout.ts";

import styles from "./ProgramWorkouts.module.css"

// Helper functions
const formatFullDate = (date: string | Date | undefined) => {
    if (!date) return "—";
    return new Date(date).toLocaleDateString("en-GB", {day: "numeric", month: "long", year: "numeric",});
};
const getDayInitial = (dateStr: string): string => {
    const date = new Date(dateStr);
    const options: Intl.DateTimeFormatOptions = {weekday: "short",};
    return date.toLocaleDateString("en-US", options).slice(0, 2).toUpperCase();
};

interface ProgramWorkoutsProps {
    counter: number;
    workouts: IWorkout[];
    getExercises: (workout: IWorkout) => string[];
    getExerciseCount: (workout: IWorkout) => number;
}

const ProgramWorkouts: React.FC<ProgramWorkoutsProps> = ({
                                                             counter, workouts, getExercises, getExerciseCount
                                                         }) => {
    console.log(workouts);
    return (
        <>
            <div className={styles.sectionHeader}>
                <h2 className={styles.sectionTitle}>Workouts</h2>
                <span className={styles.sectionCount}>{counter} sessions</span>
            </div>

            <div className={styles.workoutsGrid}>
                {workouts.map((workout, index) => (
                    <button key={workout.id} className={styles.workoutCard} style={{animationDelay: `${index * 60}ms`}}
                            type="button">
                        <div className={styles.cardTopRow}>
                            <div className={styles.dayPill}>
                                <span className={styles.dayInitial}>{getDayInitial(workout.date)}</span>
                                <span className={styles.dayFull}>{formatFullDate(workout.date)}</span>
                            </div>
                            <svg className={styles.chevron} viewBox="0 0 16 16" fill="none">
                                <path
                                    d="M6 4l4 4-4 4"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"/>
                            </svg>
                        </div>

                        <h3 className={styles.workoutName}>{workout.name}</h3>

                        <div className={styles.workoutExercises}>
                            {getExercises(workout).map((exercise) => (
                                <span key={exercise} className={styles.workoutExerciseTag}>
                                {exercise}
                            </span>))}
                        </div>

                        <div className={styles.cardFooter}>
                            <div className={styles.exerciseCount}>
                                <svg className={styles.footerIcon} viewBox="0 0 16 16" fill="none">
                                    <rect x="2" y="4" width="12" height="1.5" rx="0.75" fill="currentColor"/>
                                    <rect x="2" y="7.25" width="8" height="1.5" rx="0.75" fill="currentColor"/>
                                    <rect x="2" y="10.5" width="10" height="1.5" rx="0.75" fill="currentColor"/>
                                </svg>
                                <span>{getExerciseCount(workout)} exercises</span>
                            </div>
                            <div className={styles.lastPerformed}>
                                <svg className={styles.footerIcon} viewBox="0 0 16 16" fill="none">
                                    <circle cx="8" cy="8" r="5.5" stroke="currentColor" strokeWidth="1.25"/>
                                    <path d="M8 5.5V8l2 1.5" stroke="currentColor" strokeWidth="1.25"
                                          strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                                <span>{formatFullDate(workout.date)}</span>
                            </div>
                        </div>

                        <div className={styles.accentBar}/>
                    </button>
                ))}
            </div>
        </>
    )
}

export default ProgramWorkouts;