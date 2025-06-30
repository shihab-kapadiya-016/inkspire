import { Edit3, Key, Mail, User } from "lucide-react";
import { Link } from "react-router-dom";

export default function AccountSettings() {
return (
        <div className="bg-white rounded-lg shadow p-6 space-y-4">
        <h3 className="text-xl font-semibold text-blue-700 flex items-center gap-2 mb-4">
            <Edit3 className="w-5 h-5" /> Account Settings
        </h3>

        <div className="space-y-3">
            {/* Change Username */}
            <Link
            to="/settings/username"
            className="flex items-center justify-between p-4 bg-blue-50 rounded-md hover:bg-blue-100 transition"
            >
            <div className="flex items-center gap-3">
                <User className="text-blue-600 w-5 h-5" />
                <span className="text-sm font-medium text-gray-800">Change Username</span>
            </div>
            <Edit3 className="text-gray-400 w-4 h-4" />
            </Link>

            {/* Change Email */}
            <Link
            to="/settings/email"
            className="flex items-center justify-between p-4 bg-blue-50 rounded-md hover:bg-blue-100 transition"
            >
            <div className="flex items-center gap-3">
                <Mail className="text-blue-600 w-5 h-5" />
                <span className="text-sm font-medium text-gray-800">Change Email</span>
            </div>
            <Edit3 className="text-gray-400 w-4 h-4" />
            </Link>

            {/* Change Password */}
            <Link
            to="/settings/password"
            className="flex items-center justify-between p-4 bg-blue-50 rounded-md hover:bg-blue-100 transition"
            >
            <div className="flex items-center gap-3">
                <Key className="text-blue-600 w-5 h-5" />
                <span className="text-sm font-medium text-gray-800">Change Password</span>
            </div>
            <Edit3 className="text-gray-400 w-4 h-4" />
            </Link>
        </div>
        </div>
    );
}
