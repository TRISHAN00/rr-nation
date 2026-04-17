import { TabsTrigger } from "@/app/components/ui/tabs";

export default function TabActionItem({ value, icon, name }) {
    return (
        <TabsTrigger value={value} className="tab-style cursor-pointer">
            {icon} <span>{name}</span>
        </TabsTrigger>
    )
}
