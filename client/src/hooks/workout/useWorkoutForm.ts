import {useState} from "react";
import type {IExercise, IExerciseFormItem, ISet} from "../../types/exercise.ts";

export const useWorkoutForm = (availableExercises: IExercise[]) => {
    const [name, setName] = useState("");
    const [date, setDate] = useState("");

    const [exercises, setExercises] = useState<IExerciseFormItem[]>([
        {id: generateId(), exerciseId: "", category: "", sets: [createEmptySet()]},
    ]);

    function generateId() {
        return `${Date.now()}-${Math.floor(Math.random() * 1000000)}`;
    }

    function createEmptySet(): ISet {
        return {id: generateId(), reps: null, weight: null};
    }

    function createEmptyExercise(): IExerciseFormItem {
        return {id: generateId(), exerciseId: "", category: "", sets: [createEmptySet()]};
    }

    const categories = Array.from(new Set(availableExercises.map((ex) => ex.category)));

    const filterExercisesByCategory = (category: string) =>
        availableExercises.filter((exercise) => exercise.category === category);

    const resetForm = () => {
        setName("");
        setDate("");
        setExercises([createEmptyExercise()]);
    };

    const addExercise = () => setExercises((prev) => [...prev, createEmptyExercise()]);

    const removeExercise = (exerciseIndex: number) =>
        setExercises((prev) => prev.filter((_, currentIndex) => currentIndex !== exerciseIndex));

    const updateCategory = (exerciseIndex: number, category: string) =>
        setExercises((prev) =>
            prev.map((exercise, currentIndex) =>
                currentIndex === exerciseIndex
                    ? {...exercise, category, exerciseId: ""}
                    : exercise
            )
        );

    const updateExercise = (exerciseIndex: number, exerciseId: string) =>
        setExercises((prev) =>
            prev.map((exercise, currentIndex) =>
                currentIndex === exerciseIndex ? {...exercise, exerciseId} : exercise
            )
        );

    const addSet = (exerciseIndex: number) =>
        setExercises((prev) =>
            prev.map((exercise, currentIndex) =>
                currentIndex === exerciseIndex
                    ? {...exercise, sets: [...exercise.sets, createEmptySet()]}
                    : exercise
            )
        );

    const updateSet = (
        exerciseIndex: number,
        setId: string,
        field: "reps" | "weight",
        value: number | null
    ) =>
        setExercises((prev) =>
            prev.map((exercise, currentIndex) =>
                currentIndex === exerciseIndex
                    ? {
                        ...exercise,
                        sets: exercise.sets.map((set) =>
                            set.id === setId ? {...set, [field]: value} : set
                        ),
                    }
                    : exercise
            )
        );

    const removeSet = (exerciseIndex: number, setId: string) =>
        setExercises((prev) =>
            prev.map((exercise, currentIndex) =>
                currentIndex === exerciseIndex
                    ? {...exercise, sets: exercise.sets.filter((set) => set.id !== setId)}
                    : exercise
            )
        );

    return {
        name,
        setName,
        date,
        setDate,
        exercises,
        addExercise,
        removeExercise,
        updateCategory,
        updateExercise,
        addSet,
        removeSet,
        updateSet,
        filterExercisesByCategory,
        categories,
        resetForm,
    };
};
