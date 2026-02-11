import React, {useState} from "react";
import WorkoutExercise from "../WorkoutExercise/WorkoutExercise";
import styles from "./LastWorkout.module.css";
import type {ILastWorkoutProps} from "../../../types/props.ts";
import type {IWorkoutExerciseDisplay} from "../../../types/exercise.ts";

const LastWorkout: React.FC<ILastWorkoutProps> = ({workout}) => {
    const [expandedId, setExpandedId] = useState<string | null>(null);

    return (
        <section className={styles.workoutCard}>
            <h2 className="text-2xl md:text-3xl font-semibold mb-2 text-accent-main">{workout.name}</h2>
            <p className="text-text-secondary mb-5">{new Date(workout.date).toLocaleString()}</p>

            {workout.workoutExercises.map((exercise: IWorkoutExerciseDisplay) => (
                <WorkoutExercise
                    key={exercise.id}
                    exerciseData={exercise}
                    isOpen={expandedId === exercise.id}
                    onToggle={() => setExpandedId(expandedId === exercise.id ? null : exercise.id)}
                />
            ))}
        </section>
    );
};

export default LastWorkout;