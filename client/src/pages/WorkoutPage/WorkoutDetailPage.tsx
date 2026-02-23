import React from "react";
import {useNavigate} from "react-router-dom";

import {useGetWorkoutExercises} from "../../hooks/workout/useGetWorkoutExercises.ts";

import Loading from "../../components/Layout/General/Loading/Loading.tsx";
import Hero from "../../components/Workout/Hero/Hero.tsx";
import ExerciseCard from "../../components/Workout/ExerciseCard/ExerciseCard.tsx";

import styles from "./WorkoutDetailPage.module.css";

const WorkoutDetailPage: React.FC = () => {
    const navigate = useNavigate();
    const {workout, loading, error, addSet, newSetIds} = useGetWorkoutExercises()

    if (loading) return <Loading text="Loading workout..."/>;
    if (error) return <div>{error}</div>;
    if (!workout) return <div>Workout not found</div>;

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

                <div className={styles.grid}>
                    {workout.workoutExercises.map((workoutExercise, index) => (
                        <ExerciseCard
                            key={workoutExercise.id} workoutExercise={workoutExercise}
                            index={index}
                            newSetIds={newSetIds}
                            onAddSet={addSet}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default WorkoutDetailPage;