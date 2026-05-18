export default function HeaderPageOrg({ title, desc }) {
    return (
        <div className="flex flex-col gap-1">
            <h1 className="font-display text-2xl font-bold text-foreground">
                {title}
            </h1>

            <p className="text-muted-foreground">
                {desc}
            </p>
        </div>
    );
}