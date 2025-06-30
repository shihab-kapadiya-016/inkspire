import { CheckCircle2 } from "lucide-react";

export function Success({ message = "Action completed successfully!" }) {
    return (
        <div className="flex items-center gap-2 bg-green-100 text-green-700 px-4 py-3 rounded-md shadow-sm">
        <CheckCircle2 className="w-5 h-5" />
        <p className="text-sm">{message}</p>
        </div>
    );
}
