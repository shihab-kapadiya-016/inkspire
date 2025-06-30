import { AlertTriangle } from "lucide-react";

export function Error({ message = "Something went wrong." }) {
    return (
        <div className="flex items-center gap-2 bg-red-100 text-red-700 px-4 py-3 rounded-md shadow-sm">
        <AlertTriangle className="w-5 h-5" />
        <p className="text-sm">{message}</p>
        </div>
    );
}
