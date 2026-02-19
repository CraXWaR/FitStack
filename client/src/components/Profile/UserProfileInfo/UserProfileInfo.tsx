import React from "react";

import type {IProfile} from "../../../types/profile.ts";

import styles from "./UserProfileInfo.module.css";

const UserProfileInfo: React.FC<IProfile> = ({age, weight, height}) => {
    return (
        <section>
            <p className="text-[10px] uppercase tracking-[0.2em] text-[#9AA0A6] mb-3">
                Body Metrics
            </p>

            <div className="grid grid-cols-3 gap-2.5">
                <div
                    className="relative bg-[#181B20] border border-[#242830] rounded-xl p-4 hover:border-[#3DDC97]/25 transition-colors">
                    <div className={styles.infoCardAccent}/>
                    <p className="text-[10px] uppercase tracking-widest text-[#9AA0A6] mb-2">
                        Age
                    </p>
                    <div className="text-2xl font-bold text-[#E6E8EB] leading-none">
                        {age ?? '—'}
                        <span className="text-xs font-normal text-[#9AA0A6] ml-1">yrs</span>
                    </div>
                </div>

                <div
                    className="relative bg-[#181B20] border border-[#242830] rounded-xl p-4 hover:border-[#3DDC97]/25 transition-colors">
                    <div className={styles.infoCardAccent}/>
                    <p className="text-[10px] uppercase tracking-widest text-[#9AA0A6] mb-2">
                        Weight
                    </p>
                    <div className="text-2xl font-bold text-[#E6E8EB] leading-none">
                        {weight ?? '—'}
                        <span className="text-xs font-normal text-[#9AA0A6] ml-1">kg</span>
                    </div>
                </div>

                <div
                    className="relative bg-[#181B20] border border-[#242830] rounded-xl p-4 hover:border-[#3DDC97]/25 transition-colors">
                    <div className={styles.infoCardAccent}/>
                    <p className="text-[10px] uppercase tracking-widest text-[#9AA0A6] mb-2">
                        Height
                    </p>
                    <div className="text-2xl font-bold text-[#E6E8EB] leading-none">
                        {height ?? '—'}
                        <span className="text-xs font-normal text-[#9AA0A6] ml-1">cm</span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default UserProfileInfo;