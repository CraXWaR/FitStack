import React from "react";

import styles from "./ProfileStats.module.css";

interface ProfileStatsProps {
    workouts?: number;
    counter?: number;
    counterText: string;
}

const ProfileStats: React.FC<ProfileStatsProps> = ({workouts, counter, counterText}) => {
    return (
        <>
            <div className={`bg-[#181B20] py-6 px-4 text-center ${styles.statCell}`}>
                <div className="text-4xl font-bold text-[#3DDC97] leading-none">
                    {workouts}
                </div>
                <div className="text-[10px] uppercase tracking-widest text-[#9AA0A6] mt-2">
                    Total Workouts
                </div>
            </div>
            <div className={`bg-[#181B20] py-6 px-4 text-center ${styles.statCell}`}>
                <div className="text-4xl font-bold text-[#3DDC97] leading-none">
                    {counter}
                </div>
                <div className="text-[10px] uppercase tracking-widest text-[#9AA0A6] mt-2">

                    {counterText}
                </div>
            </div>
        </>
    );
};

export default ProfileStats;