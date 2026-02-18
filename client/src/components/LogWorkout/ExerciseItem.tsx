import React from "react";

import SelectField from "../Layout/UI/Select/SelectField.tsx";
import InputField from "../Layout/UI/InputField/InputField.tsx";
import Button from "../Layout/UI/Button/Button.tsx";

import type {IExerciseFormItem} from "../../types/exercise.ts";
import type {useWorkoutForm} from "../../hooks/workout/useWorkoutForm.ts";

import {FaPlus, FaTrash} from "react-icons/fa6";

const ExerciseItem: React.FC<{
    exercise: IExerciseFormItem;
    index: number;
    form: ReturnType<typeof useWorkoutForm>;
}> = ({exercise, index, form}) => {
    return (
        <div className="border-b border-gray-700 py-4">
            <div className="flex justify-between items-center">
                <h4 className="font-semibold">Exercise {index + 1}</h4>
                {form.exercises.length > 1 && (
                    <button
                        type="button"
                        className="text-red-500 hover:cursor-pointer hover:underline"
                        onClick={() => form.removeExercise(index)}>
                        Remove
                    </button>)}
            </div>

            <div className="flex gap-2">
                <SelectField
                    label="Category"
                    value={exercise.category}
                    onChange={(value) => form.updateCategory(index, value)}
                    options={form.categories.map((cat) => ({value: cat, label: cat}))}/>

                <SelectField
                    label="Exercise"
                    value={exercise.exerciseId}
                    onChange={(value) => form.updateExercise(index, value)}
                    options={form.filterExercisesByCategory(exercise.category).map((ex) => ({
                        value: ex.id,
                        label: ex.name,
                    }))}
                    disabled={!exercise.category}/>
            </div>

            <div className="flex flex-col gap-2 mt-2">
                {exercise.sets.map((set) => (
                    <div key={set.id} className="flex gap-2 items-center">
                        <InputField
                            label="Reps"
                            type="number"
                            value={set.reps ?? ""}
                            onChange={(value) => form.updateSet(index, set.id, "reps", value === "" ? null : Number(value))}
                            min={0}
                            disabled={!exercise.exerciseId}/>

                        <InputField
                            label="Weight (kg)"
                            type="number"
                            value={set.weight ?? ""}
                            onChange={(value) => form.updateSet(index, set.id, "weight", value === "" ? null : Number(value))}
                            min={0}
                            disabled={!exercise.exerciseId}/>

                        <div className="flex gap-2 my-2">
                            <Button variant="outline" onClick={() => form.addSet(index)}>
                                <FaPlus size={18}/>
                            </Button>
                            <Button
                                variant="remove"
                                disabled={exercise.sets.length === 1}
                                onClick={() => form.removeSet(index, set.id)}>
                                <FaTrash size={18}/>
                            </Button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ExerciseItem;