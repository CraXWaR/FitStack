import React from "react";

import {useProgramWorkouts} from "../../hooks/program/useProgramWorkouts.ts";
import {useGetProgram} from "../../hooks/program/useGetProgram.ts";

import ProgramWorkouts from "../../components/Program/ProgramWorkouts/ProgramWorkouts.tsx";
import ProgramHeader from "../../components/Program/ProgramHeader/ProgramHeader.tsx";
import ProgramBreadcrumb from "../../components/Program/ProgramBreadcrumb/ProgramBreadcrumb.tsx";

import styles from "./ProgramPage.module.css";


const ProgramPage: React.FC = () => {
    const { program, error } = useGetProgram();
    const programId = program?.id

    const { workouts, loading: workoutsLoading, getExerciseCount, getWorkoutExercise } = useProgramWorkouts(programId);

    if (error) return <div>{error}</div>;
    if (!program) return <div>No program found</div>;

    const totalExercises = workouts.reduce((totalExercisesSoFar, currentWorkout) => {
        const exercisesInWorkout = getExerciseCount(currentWorkout);
        return totalExercisesSoFar + exercisesInWorkout;
    }, 0);

    return (
        <div className={styles.page}>
            <div className={styles.bgGrid} aria-hidden="true"/>

            <div className={styles.container}>
                <ProgramBreadcrumb programName={program.name}/>
                <ProgramHeader program={program} workouts={workouts} exerciseCounter={totalExercises}/>
                <ProgramWorkouts workoutsCounter={workouts.length} workouts={workouts} getExercises={getWorkoutExercise}
                                 getExerciseCount={getExerciseCount} loading={workoutsLoading}/>
            </div>
        </div>
    );
};

export default ProgramPage;