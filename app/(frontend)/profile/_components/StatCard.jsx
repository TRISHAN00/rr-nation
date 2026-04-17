
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";

export default function StatCard({ title, value, sub, icon: Icon }) {
    return (
        <Card className="border-gray-200">
            <CardHeader className="pb-3 flex flex-row items-center justify-between space-y-0">
                <CardTitle className="text-sm font-medium text-gray-600">{title}</CardTitle>
                <Icon className="h-4 w-4 text-brand" />
            </CardHeader>
            <CardContent>
                <div className="text-3xl font-bold">{value}</div>
                <p className="text-xs text-gray-600 mt-1">{sub}</p>
            </CardContent>
        </Card>
    )
}
