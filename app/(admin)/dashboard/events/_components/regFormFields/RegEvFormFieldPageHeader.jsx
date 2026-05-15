import { Button } from "@/components/ui/button";

export default function RegEvFormFieldPageHeader() {
    const [open, setOpen] = useState(false);
    return (
        <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Registration Form Fields</h2>

            <Button className={` flex gap-x-1`} onClick={() => setOpen(true)}>
                <Plus />
                Add Field
            </Button>

   
        </div>
    )
}
