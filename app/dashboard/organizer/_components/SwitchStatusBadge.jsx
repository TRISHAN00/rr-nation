export default function SwitchStatusBadge() {
    const styles = {
        pending: "bg-amber-100 text-amber-700 border-amber-200",
        approved: "bg-emerald-100 text-emerald-700 border-emerald-200",
        rejected: "bg-rose-100 text-rose-700 border-rose-200",
    };
    return styles[status?.toLowerCase()] || "bg-gray-100 text-gray-600";
}
