import { Badge } from "@/app/components/ui/badge";

export default function OrderDataField({
  label,
  value,
  highlight = false,
  color = "",
}) {
  return (
    <div className="flex flex-col">
      <span className="text-[9px] uppercase text-muted-foreground font-black tracking-tighter">
        {label}
      </span>
      {highlight ? (
        <Badge
          variant="secondary"
          className="w-fit h-5 px-1.5 text-[10px] mt-1 font-bold bg-primary/10 text-primary border-none"
        >
          {value || "N/A"}
        </Badge>
      ) : (
        <span className={`text-xs font-semibold mt-0.5 ${color}`}>
          {value || "N/A"}
        </span>
      )}
    </div>
  );
}
