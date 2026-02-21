import React from "react";

import {useParams} from "react-router";

import {usePrograms} from "../../hooks/program/usePrograms.ts";
import {useProgramWorkouts} from "../../hooks/workout/useWorkoutsByProgram.ts";

import ProgramWorkouts from "../../components/Program/ProgramWorkouts/ProgramWorkouts.tsx";
import Loading from "../../components/Layout/General/Loading/Loading.tsx";

import styles from "./ProgramPage.module.css";
import ProgramHeader from "../../components/Program/ProgramHeader/ProgramHeader.tsx";
import ProgramBreadcrumb from "../../components/Program/ProgramBreadcrumb/ProgramBreadcrumb.tsx";
import {slugify} from "../../helpers/slugify.ts";

const ProgramPage: React.FC = () => {
    const {slug} = useParams<{ slug: string }>();
    const {programs} = usePrograms();

    const program = programs?.find((program) => slugify(program.name) === slug);
    const programId = program?.id;

    const {workouts, loading, error, getExerciseCount, getWorkoutExercise} = useProgramWorkouts(programId);

    if (loading) return <Loading text="Loading program exercises..."/>;

    //Todo not found and error
    if (error) return <div>{error}</div>;
    if (!program) return <div>no program</div>;

    const totalExercises = workouts.reduce((totalExercisesSoFar, currentWorkout) => {
        const exercisesInWorkout = getExerciseCount(currentWorkout);
        return totalExercisesSoFar + exercisesInWorkout;
    }, 0);

    return (
        <div className={styles.page}>
            <div className={styles.bgGrid} aria-hidden="true"/>

            <div className={styles.container}>
                <ProgramBreadcrumb programName={program.name}/>
                <ProgramHeader program={program} workouts={workouts} counter={totalExercises}/>
                <ProgramWorkouts counter={workouts.length} workouts={workouts} getExercises={getWorkoutExercise}
                                 getExerciseCount={getExerciseCount}/>
            </div>
        </div>
    );
};

export default ProgramPage;