import PersonalInformationForm from "@/app/components/profile/PersonalInformationForm";
import UpdateProfilePhoto from "@/app/components/profile/UpdateProfilePhoto";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";

export default function SettingsTab({ user }) {
    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle>Profile Photo</CardTitle>
                </CardHeader>
                <CardContent>
                    <UpdateProfilePhoto initialImage={user?.image} />
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                </CardHeader>
                <CardContent>
                    <PersonalInformationForm user={user} />
                </CardContent>
            </Card>
        </>
    );
}