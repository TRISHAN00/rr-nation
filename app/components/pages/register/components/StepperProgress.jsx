
export default function StepperProgress({ steps, step }) {
    return (
        <div className="flex justify-between mb-6">
            {steps.map((s, i) => (
                <div key={i} className="flex-1 text-center">
                    <p className={`text-xs ${i <= step ? "text-brand font-semibold" : "text-gray-400"}`}>
                        {s}
                    </p>
                    <div className={`h-1 mt-1 ${i <= step ? "bg-brand" : "bg-gray-200"}`} />
                </div>
            ))}
        </div>
    )
}
