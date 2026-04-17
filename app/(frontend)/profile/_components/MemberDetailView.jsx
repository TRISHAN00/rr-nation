
import { Badge } from "@/app/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function MemberDetailView({ member }) {
    console.log(member?.data?.registrationNumber)
    
    const DataRow = ({ label, value }) => (
        <div className="flex justify-between py-2 border-b border-gray-100 last:border-0">
            <span className="text-gray-500 font-medium">{label}</span>
            <span className="text-gray-900 font-semibold">{value ?? "N/A"}</span>
        </div>
    );

    return (
        <div className="mt-6 space-y-6">
            <Card className="border-gray-200">
                <CardHeader>
                    <div className="flex justify-between items-center">
                        <CardTitle>Member Profile Details</CardTitle>
                        <div className="flex gap-2">
                            <Badge variant="outline">{member?.data?.memberType}</Badge>
                            <Badge variant={member?.data?.paymentStatus === "paid" ? "default" : "secondary"}>
                                {member?.data?.paymentStatus}
                            </Badge>
                        </div>
                    </div>
                </CardHeader>

                <CardContent className="grid md:grid-cols-2 gap-8">
                    {/* Column 1: Personal & Basic Info */}
                    <div className="space-y-4">
                        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Personal Info</h4>
                        <DataRow label="Registration ID" value={member?.data?.registrationNumber} />
                        <DataRow label="Age" value={member?.data?.age} />
                        <DataRow label="Occupation" value={member?.data?.occupation} />
                        <DataRow label="Special Skill" value={member?.data?.specialSkill} />
                        <DataRow label="District" value={member?.data?.district} />
                        <DataRow label="Facebook" value={member?.data?.facebookLink} />
                    </div>

                    {/* Column 2: Event Specifics */}
                    <div className="space-y-4">
                        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Event Data</h4>
                        <DataRow label="Event Type" value={member?.data?.eventType} />
                        <DataRow label="Target Distance" value={`${member?.data?.preferableRunningDistance} km`} />
                        <DataRow label="T-Shirt Size" value={member?.data?.tShirtSize} />
                        <DataRow label="Past Participations" value={member?.data?.eventsParticipatedNumber} />
                        <DataRow label="Event Staff" value={member?.data?.isEventStaff ? "Yes" : "No"} />
                    </div>
                </CardContent>

                <Separator className="my-6" />

                {/* Full Width: Payment & System Info */}
                <CardContent className="space-y-4">
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Payment & System</h4>
                    <div className="grid md:grid-cols-3 gap-4 text-sm">
                        <DataRow label="Gateway" value={member?.data?.paymentGateway} />
                        <DataRow label="Currency" value={member?.data?.currency} />
                        <DataRow label="Admin Approval" value={member?.data?.adminApproval} />
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                        <DataRow label="Delivery Address" value={member?.data?.deliveryAddress} />
                        <DataRow label="Recommendation" value={member?.data?.recommendationMessage} />
                        <DataRow label="Created At" value={new Date(member?.data?.createdAt).toLocaleString()} />
                        <DataRow label="Last Updated" value={new Date(member?.data?.updatedAt).toLocaleString()} />
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}