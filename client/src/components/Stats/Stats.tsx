import React from "react";

import styles from "./ProfileStats.module.css";

interface StatsProps {
    leftText: string;
    rightText: string;
    leftCounter?: number | string;
    rightCounter?: number | string;

}
const ProfileStats: React.FC<StatsProps> = ({leftText, rightText, leftCounter, rightCounter}) => {
    return (
        <>
            <div className={`bg-[#181B20] py-6 px-4 text-center ${styles.statCell}`}>
                <div className="text-4xl font-bold text-[#3DDC97] leading-none">
                    {leftCounter}
                </div>
                <div className="text-[10px] uppercase tracking-widest text-[#9AA0A6] mt-2">
                    {leftText}
                </div>
            </div>
            <div className={`bg-[#181B20] py-6 px-4 text-center ${styles.statCell}`}>
                <div className="text-4xl font-bold text-[#3DDC97] leading-none">
                    {rightCounter}
                </div>
                <div className="text-[10px] uppercase tracking-widest text-[#9AA0A6] mt-2">
                    {rightText}
                </div>
            </div>
        </>
    );
};

export default ProfileStats;