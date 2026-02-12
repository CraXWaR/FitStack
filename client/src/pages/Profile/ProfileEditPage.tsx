import React from "react";
import Form from "../../components/Layout/UI/Form/Form.tsx";
import InputField from "../../components/Layout/UI/InputField/InputField.tsx";
import {useProfileEdit} from "../../hooks/useProfileEdit";

const ProfileEditPage: React.FC = () => {
    const {
        userData,
        setUserData,
        profileData,
        setProfileData,
        error,
        submitting,
        handleSubmit,
        formatNumberInput,
    } = useProfileEdit();

    //TODO ADD LOADING COMPONENT
    if (!userData.firstName && !userData.lastName && !profileData) return <div>Loading...</div>;

    return (
        <div className="max-w-xl mx-auto px-4 py-8">
            <Form title="Edit Profile" onSubmit={handleSubmit} submitText="Save Changes" error={error}
                  submitting={submitting}>
                <div className="space-y-6">
                    <InputField label="First Name" value={userData.firstName}
                                onChange={(value: string) => setUserData(prev => ({...prev, firstName: value}))}
                                required/>

                    <InputField label="Last Name" value={userData.lastName}
                                onChange={(value: string) => setUserData(prev => ({...prev, lastName: value}))}/>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <InputField label="Weight (kg)" type="number" value={formatNumberInput(profileData.weight)}
                                    onChange={(value: string | number) => setProfileData(prev => ({
                                        ...prev,
                                        weight: value === "" ? null : Number(value)
                                    }))} min={0}/>

                        <InputField label="Height (cm)" type="number" value={formatNumberInput(profileData.height)}
                                    onChange={(value: string | number) => setProfileData(prev => ({
                                        ...prev,
                                        height: value === "" ? null : Number(value)
                                    }))} min={0}/>
                    </div>

                    <InputField label="Age" type="number" value={formatNumberInput(profileData.age)}
                                onChange={(value: string | number) => setProfileData(prev => ({
                                    ...prev,
                                    age: value === "" ? null : Number(value)
                                }))} min={0}/>

                    <InputField label="Goal" value={profileData.goal ?? ""}
                                onChange={(value: string) => setProfileData(prev => ({
                                    ...prev,
                                    goal: value === "" ? null : value
                                }))}/>
                </div>
            </Form>
        </div>
    );
};

export default ProfileEditPage;