import { FileText, Pencil, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

const PostCard = ({ post, onDelete }) => {

    if(!post) {
        console.warn("Post is null");
        return null; // 🛑 Prevent rendering and crash
    }


    const { _id, title, createdAt, thumbnail, description } = post;

    return (
        <div className="border p-4 rounded-lg hover:bg-blue-50 transition flex items-center justify-between gap-4">
        <div className="flex items-start gap-4">
            {thumbnail && (
            <img
                src={thumbnail}
                alt="Thumbnail"
                className="w-20 h-20 object-cover rounded-md border"
            />
            )}
            <div>
            <h4 className="font-bold text-xl text-gray-700">{title}</h4>
            <h4 className="font-semibold text-sm text-gray-400">{description.length > 120 ? description.slice(0, 60) + "..." : description}</h4>
            <p className="text-sm text-gray-500">
                Posted on {new Date(createdAt).toLocaleDateString()}
            </p>
            </div>
        </div>

        <div className="flex gap-3 items-center">
            <Link
            to={`/dashboard/edit-blog/${_id}`}
            className="text-blue-600 hover:text-blue-800 transition"
            title="Edit post"
            >
            <Pencil className="w-5 h-5" />
            </Link>
            <button
            onClick={() => onDelete(_id)}
            className="text-red-500 hover:text-red-700 transition"
            title="Delete post"
            >
            <Trash2 className="w-5 h-5" />
            </button>
        </div>
        </div>
    );
    };

export default PostCard;
