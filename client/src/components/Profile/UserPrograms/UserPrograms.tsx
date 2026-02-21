import React from "react";

import type {IProgram} from "../../../types/program.ts";

import {IoChevronForward} from "react-icons/io5";
import {MdOutlineFitnessCenter} from "react-icons/md";
import {
    GiBoxingGlove,
    GiHeartBeats,
    GiMeditation,
    GiMuscleUp,
    GiRun,
    GiTrophy,
    GiWeightLiftingUp
} from "react-icons/gi";

import styles from "./UserPrograms.module.css"
import {Link} from "react-router-dom";

const PROGRAM_ICONS = [
    GiMuscleUp,
    GiWeightLiftingUp,
    GiRun,
    GiBoxingGlove,
    GiMeditation,
    GiHeartBeats,
    GiTrophy,
    MdOutlineFitnessCenter,
];

interface IUserProgramsProps {
    programs: IProgram[];
}

function slugify(name: string) {
    return name.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]/g, "");
}

const UserPrograms: React.FC<IUserProgramsProps> = ({programs}) => {
    return (
        <section>
            <div className="flex items-center justify-between mb-3">
                <p className="text-[11px] sm:text-[12px] md:text-[11px] uppercase tracking-[0.2em] text-[#9AA0A6]">
                    My Programs
                </p>
                <span className="text-[11px] sm:text-[12px] md:text-[11px] tracking-[0.2em] text-[#9AA0A6]">
                    {programs.length} total
                </span>
            </div>

            <div className={styles.programsScroll}>
                {programs.map((program: any, index: number) => {
                    const Icon = PROGRAM_ICONS[index % PROGRAM_ICONS.length];
                    return (
                        <Link to={`/program/${slugify(program.name)}`}
                              key={program.id}
                              className={`bg-[#181B20] border border-[#242830] rounded-2xl px-4 py-3.5 flex items-center gap-4 cursor-pointer hover:border-[#3DDC97]/25 hover:bg-[#1E2228] transition-all shrink-0 ${styles.programCard}`}>
                            <div
                                className="w-9 h-9 rounded-xl bg-[#3DDC97]/8 border border-[#3DDC97]/15 flex items-center justify-center shrink-0">
                                <Icon size={18} color="#3DDC97"/>
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-[#E6E8EB] truncate">
                                    {program.name}
                                </p>
                                <p className="text-xs text-[#9AA0A6] mt-0.5">
                                    {program._count.workouts}x per week
                                </p>
                            </div>
                            <IoChevronForward size={16} className="text-[#9AA0A6] shrink-0"/>
                        </Link>
                    );
                })}
            </div>
        </section>
    );
}

export default UserPrograms;