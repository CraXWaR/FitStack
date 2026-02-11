import React from "react";
import styles from "./UserInfo.module.css";
import {Link} from "react-router-dom";
import type {IUserInfoProps} from "../../../types/props.ts";

const UserInfo: React.FC<IUserInfoProps> = ({firstName, lastName, email, profile}) => {
    return (
        <section
            className={`flex flex-col items-center text-center md:flex-row md:items-center md:justify-between md:text-left ${styles.profileCard}`}>
            <Link to="/profile/edit" className={styles.editLink}>
                Edit Profile
            </Link>

            <div className="w-full flex flex-col items-start">
                <h1 className="text-3xl md:text-5xl font-extrabold text-accent-main">
                    {firstName} {lastName}
                </h1>

                <p className="text-text-secondary mt-2 break-all">
                    {email}
                </p>

                {profile?.goal && (
                    <span className={styles.goalBadge}>
                        {profile.goal}
                    </span>
                )}
            </div>

            {profile && (
                <div className="mt-6 w-full flex justify-between md:w-auto md:gap-10 md:mt-0 text-center">
                    <div>
                        <p className="text-text-secondary text-sm">Weight</p>
                        <div className="flex items-baseline justify-center md:justify-start gap-1">
                            <span className="font-bold text-xl text-accent-main">
                              {profile.weight ?? "-"}
                            </span>
                            <span className="text-sm text-text-secondary">kg</span>
                        </div>
                    </div>

                    <div>
                        <p className="text-text-secondary text-sm">Height</p>
                        <div className="flex items-baseline justify-center md:justify-start gap-1">
                            <span className="font-bold text-xl text-accent-main">
                              {profile.height ?? "-"}
                            </span>
                            <span className="text-sm text-text-secondary">cm</span>
                        </div>
                    </div>

                    <div className="col-span-2 md:col-span-1">
                        <p className="text-text-secondary text-sm">Age</p>
                        <p className="font-bold text-xl text-accent-main">
                            {profile.age ?? "-"}
                        </p>
                    </div>
                </div>
            )}
        </section>
    );
};

export default UserInfo;
