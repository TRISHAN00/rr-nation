import { TabsList } from "@/app/components/ui/tabs";
import {
    Calendar,
    Lock,
    User
} from "lucide-react";
import TabActionItem from "./TabActionItem";

export default function TabActions() {
    return (
        <TabsList className="w-full justify-start border-b bg-transparent p-0 h-auto overflow-x-auto flex-nowrap">
            <TabActionItem value={'me'} icon={<Calendar className="h-4 w-4 mr-2" />} name={'My Events'} />
            <TabActionItem value={'settings'} icon={<User className="h-4 w-4 mr-2" />} name={'Settings'} />
            <TabActionItem value={'security'} icon={<Lock className="h-4 w-4 mr-2" />} name={'Security'} />
            <TabActionItem value={'member'} icon={<User className="h-4 w-4 mr-2" />} name={'Member'} />
        </TabsList>
    )
}
