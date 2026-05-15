import { Input } from "@/app/components/ui/input";
import { Button } from "@/components/ui/button";
import { Hash, Send } from "lucide-react";

export default function BIBInput({item}) {
    return (
        <div className="mb-6 p-4 rounded-lg border-2 border-dashed border-primary/20 bg-primary/5">
            <div className="flex items-center gap-2 mb-3">
                <Hash className="h-3.5 w-3.5 text-primary" />
                <h5 className="text-[11px] font-bold text-primary uppercase tracking-wider">
                    BIB Assignment
                </h5>
            </div>
            <div className="flex gap-2">
                <Input
                    placeholder="Enter BIB Number"
                    className="h-9 bg-background text-sm"
                    defaultValue={item.participant?.bibNumber || ""}
                />
                <Button size="sm" className="h-9 px-3 flex gap-1.5 shadow-sm">
                    <Send className="h-3 w-3" />
                    <span className="text-xs">Send</span>
                </Button>
            </div>
            <p className="text-[9px] text-muted-foreground mt-2 leading-relaxed italic">
                Sending will notify {item.participant?.name} via SMS & Email.
            </p>
        </div>
    )
}
