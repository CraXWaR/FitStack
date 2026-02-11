import React, {useState} from "react";
import Form from "../../components/Layout/UI/Form/Form.tsx";
import InputField from "../../components/Layout/UI/InputField/InputField.tsx";
import type {IProfile} from "../../types/profile.ts";
import type {IUserResponse} from "../../types/user.ts";

const ProfileEditPage: React.FC = () => {
    const existingUser: IUserResponse = {
        id: "123",
        firstName: "John",
        lastName: "Doe",
        email: "john@example.com",
        profile: {
            weight: 75,
            height: 180,
            age: 29,
            goal: "Build Muscle",
        },
        workouts: [],
    };

    const [userData, setUserData] = useState({
        firstName: existingUser.firstName,
        lastName: existingUser.lastName ?? "",
    });

    const [profileData, setProfileData] = useState<IProfile>({
        weight: existingUser.profile?.weight ?? 0,
        height: existingUser.profile?.height ?? 0,
        age: existingUser.profile?.age ?? 0,
        goal: existingUser.profile?.goal ?? "",
    });

    const [error, setError] = useState<React.ReactNode>(null);
    const [success, setSuccess] = useState<React.ReactNode>(null);
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);
        setSubmitting(true);

        try {
            const updatedData = {
                ...userData,
                profile: profileData,
            };

            console.log("Updating profile:", updatedData);

            setSuccess("Profile updated successfully.");
        } catch (err) {
            setError("Something went wrong. Please try again.");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="max-w-xl mx-auto px-4 py-8">
            <Form title="Edit Profile" onSubmit={handleSubmit} submitText="Save Changes" error={error} success={success}
                  submitting={submitting}>
                <div className="space-y-6">
                    <InputField
                        label="First Name"
                        value={userData.firstName}
                        onChange={(value) =>
                            setUserData((prev) => ({...prev, firstName: value}))} required/>

                    <InputField
                        label="Last Name"
                        value={userData.lastName}
                        onChange={(value) => setUserData((prev) => ({...prev, lastName: value}))} required/>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <InputField
                            label="Weight (kg)"
                            type="number"
                            value={profileData.weight ?? ""}
                            onChange={(value) => setProfileData((prev) => ({
                                ...prev,
                                weight: value === "" ? 0 : Number(value),
                            }))} min={0}/>

                        <InputField
                            label="Height (cm)"
                            type="number"
                            value={profileData.height ?? ""}
                            onChange={(value) => setProfileData((prev) => ({
                                ...prev,
                                height: value === "" ? 0 : Number(value),
                            }))} min={0}/>
                    </div>

                    <InputField
                        label="Age"
                        type="number"
                        value={profileData.age ?? ""}
                        onChange={(value) => setProfileData((prev) => ({
                            ...prev,
                            age: value === "" ? 0 : Number(value),
                        }))} min={0}/>

                    <InputField
                        label="Goal"
                        value={profileData.goal ?? ""}
                        onChange={(value) => setProfileData((prev) => ({...prev, goal: value}))}/>
                </div>
            </Form>
        </div>
    );
};

export default ProfileEditPage;