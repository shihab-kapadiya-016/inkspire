import { Camera, Mail, User } from "lucide-react";

export default function UserCard({
    avatarPreview,
    coverPreview,
    handleAvatarChange,
    handleCoverChange,
    user,
}) {
    return (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Cover Image */}
        <div className="relative h-45 group">
            <label htmlFor="cover-upload" className="absolute inset-0 cursor-pointer z-10">
            <img
                src={coverPreview}
                alt="Cover"
                className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                <Camera className="text-white w-6 h-6" />
            </div>
            </label>
            <input
            id="cover-upload"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleCoverChange}
            />
        </div>

        {/* Avatar */}
        <div className="relative flex justify-start ml-7 -mt-12 z-20">
            <label htmlFor="avatar-upload" className="relative group cursor-pointer">
            <img
                src={avatarPreview}
                alt="Avatar"
                className="w-30 h-30 rounded-full border-4 border-white object-cover shadow-md"
            />
            <div className="absolute inset-0 bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                <Camera className="text-white w-5 h-5" />
            </div>
            </label>
            <input
            id="avatar-upload"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleAvatarChange}
            />
        </div>

        {/* User Info */}
        <div className="p-6 text-left space-y-4">
            {/* Username */}
            <h2 className="text-4xl font-extrabold text-blue-800 flex items-center gap-3">
            <User className="w-8 h-8 text-blue-500" />
            <span className="tracking-tight">{user?.username || "Username"}</span>
            </h2>

            {/* Email */}
            <p className="text-lg font-semibold text-gray-700 flex items-center gap-2 pl-1">
            <Mail className="w-5 h-5 text-gray-500" />
            {user?.email || "user@email.com"}
            </p>

            {/* Bio */}
            {user?.bio && (
            <p className="mt-2 text-base text-gray-800 leading-relaxed border-t pt-4">
                {user.bio}
            </p>
            )}

            {/* Member Since */}
            <p className="text-sm text-gray-500 pt-2">
            Member since <span className="font-medium">{user?.createdAt?.slice(0, 10) || "—"}</span>
            </p>
        </div>
        </div>
    );
}

