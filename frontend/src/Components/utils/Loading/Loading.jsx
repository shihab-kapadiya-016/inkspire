import { Loader2 } from "lucide-react";

export function Loading() {
return (
        <div className="flex items-center justify-center py-8">
        <Loader2 className="animate-spin h-6 w-6 text-blue-600" />
        <span className="ml-2 text-blue-600 font-medium">Loading...</span>
        </div>
);
}