import { useState, useEffect } from "react";
import { ChevronDown, ChevronUp, Clock, Cone, X } from "lucide-react";
import api from "../../axios";

const RepliesViewer = ({ parentId, currentUser, replies, onDeleteReply}) => {
    // const [replies, setReplies] = useState([]);
    const [showReplies, setShowReplies] = useState(false);
    const [loading, setLoading] = useState(true);
    const [authors, setAuthors] = useState([])


    useEffect(() => {
        (async () => {
        try {
            const response = await api.get(`/comment/get-replies/${parentId}`);
        } catch (err) {
            console.error("Failed to fetch replies", err);
        } finally {
            setLoading(false);
        }
        })();
    }, [parentId]);

    const fetchAuthor = async (userId) => {
            const response = await api.get(`/users/get-user-by-id/${userId}`)
            // console.log(response)
            return response.data.data
    }

    const handleDeleteReply = async (id) => {
        try {
            await api.delete(`/comment/delete-comment/${id}`)
            onDeleteReply(parentId,id)    
        } catch (error) {
            console.log(error)
        }        
        
        // console.log(response)

    }


    useEffect(() => {
    if (!Array.isArray(replies)) return;

    (async () => {
    const result = await Promise.all(
        replies.map((reply) => fetchAuthor(reply.authorId))
    );
    setAuthors(result);
    })();
}, [replies]);


        return (
            <div className="mt-2 ml-10">
        {/* Loading State */}
        {loading && (
        <p className="text-sm text-gray-400">Loading replies...</p>
        )}

        {/* No Replies */}
        {!loading && replies?.length === 0 && null}

        {/* Toggle & Replies */}
        {!loading && replies?.length > 0 && (
        <>
            {/* Toggle Button */}
            <button
            onClick={() => setShowReplies((prev) => !prev)}
            className="text-blue-600 hover:underline text-sm flex items-center gap-1"
            >
            {showReplies ? (
                <>
                <ChevronUp className="w-4 h-4" />
                Hide replies
                </>
            ) : (
                <>
                <ChevronDown className="w-4 h-4" />
                View {replies.length} repl{replies.length === 1 ? "y" : "ies"}
                </>
            )}
            </button>

            {/* Replies List */}
            {showReplies && (
            <div className="mt-3 space-y-4">
                {replies.map((reply) => {
                const author = authors.find((a) => a._id === reply.authorId);

                return (
                    <div key={reply._id} className="flex gap-3 items-start group">
                    <img
                        src={author?.avatar}
                        alt="avatar"
                        className="w-8 h-8 rounded-full object-cover"
                    />
                    <div className="flex-1">
                        <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-sm">
                            <span className="font-semibold text-gray-800">
                            {author?.username || "User"}
                            </span>
                            <span className="text-xs text-gray-400 flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {new Date(reply.createdAt).toLocaleDateString()}
                            </span>
                        </div>
                        {currentUser?._id === reply.authorId && (
                            <button
                            onClick={() => handleDeleteReply(reply._id)}
                            className="text-gray-400 hover:text-red-500 transition p-1 cursor-pointer"
                            title="Delete reply"
                            >
                            <X className="w-4 h-4" />
                            </button>
                        )}
                        </div>
                        <p className="text-sm text-gray-700 mt-1">{reply.content}</p>
                    </div>
                    </div>
                );
                })}
            </div>
            )}
        </>
        )}
    </div>
    );

};

export default RepliesViewer;
