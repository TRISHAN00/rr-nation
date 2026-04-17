import ChangePasswordForm from "@/app/components/profile/ChangePasswordForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";

export default function SecurityTab() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Change Password</CardTitle>
            </CardHeader>
            <CardContent>
                <ChangePasswordForm />
            </CardContent>
        </Card>
    );
}