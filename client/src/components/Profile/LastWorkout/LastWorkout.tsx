import React, {useState} from "react";
import WorkoutExercise from "../WorkoutExercise/WorkoutExercise";
import styles from "./LastWorkout.module.css";
import type {IWorkout, IWorkoutExercise} from "../../../types/exercise";

interface LastWorkoutProps {
    workout: IWorkout;
}

const LastWorkout: React.FC<LastWorkoutProps> = ({workout}) => {
    const [expandedId, setExpandedId] = useState<string | null>(null);

    return (
        <section className={styles.workoutCard}>
            <h2 className="text-2xl md:text-3xl font-semibold mb-2 text-accent-main">{workout.name}</h2>
            <p className="text-text-secondary mb-5">{new Date(workout.date).toLocaleString()}</p>

            {workout.workoutExercises.map((exercise: IWorkoutExercise) => (
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