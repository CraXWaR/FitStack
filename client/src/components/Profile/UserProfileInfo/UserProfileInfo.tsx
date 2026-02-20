import React from "react";

import type {IProfile} from "../../../types/profile.ts";

import styles from "./UserProfileInfo.module.css";

const UserProfileInfo: React.FC<IProfile> = ({age, weight, height}) => {
    return (
        <section>
            <p className="text-[11px] sm:text-[12px] md:text-[11px] uppercase tracking-[0.2em] text-[#9AA0A6] mb-3">
                Body Metrics
            </p>

            <div className="grid grid-cols-3 gap-2.5 sm:gap-3">
                {/* Age */}
                <div
                    className="relative bg-[#181B20] border border-[#242830] rounded-xl p-3 sm:p-4 hover:border-[#3DDC97]/25 transition-colors">
                    <div className={styles.infoCardAccent}/>
                    <p className="text-[11px] sm:text-[12px] md:text-[11px] uppercase tracking-widest text-[#9AA0A6] mb-1.5 sm:mb-2">
                        Age
                    </p>
                    <div className="text-2xl sm:text-3xl md:text-2xl font-bold text-[#E6E8EB] leading-none">
                        {age ?? '—'}
                        <span className="text-xs sm:text-sm md:text-xs font-normal text-[#9AA0A6] ml-1">yrs</span>
                    </div>
                </div>

                {/* Weight */}
                <div
                    className="relative bg-[#181B20] border border-[#242830] rounded-xl p-3 sm:p-4 hover:border-[#3DDC97]/25 transition-colors">
                    <div className={styles.infoCardAccent}/>
                    <p className="text-[11px] sm:text-[12px] md:text-[11px] uppercase tracking-widest text-[#9AA0A6] mb-1.5 sm:mb-2">
                        Weight
                    </p>
                    <div className="text-2xl sm:text-3xl md:text-2xl font-bold text-[#E6E8EB] leading-none">
                        {weight ?? '—'}
                        <span className="text-xs sm:text-sm md:text-xs font-normal text-[#9AA0A6] ml-1">kg</span>
                    </div>
                </div>

                {/* Height */}
                <div
                    className="relative bg-[#181B20] border border-[#242830] rounded-xl p-3 sm:p-4 hover:border-[#3DDC97]/25 transition-colors">
                    <div className={styles.infoCardAccent}/>
                    <p className="text-[11px] sm:text-[12px] md:text-[11px] uppercase tracking-widest text-[#9AA0A6] mb-1.5 sm:mb-2">
                        Height
                    </p>
                    <div className="text-2xl sm:text-3xl md:text-2xl font-bold text-[#E6E8EB] leading-none">
                        {height ?? '—'}
                        <span className="text-xs sm:text-sm md:text-xs font-normal text-[#9AA0A6] ml-1">cm</span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default UserProfileInfo;