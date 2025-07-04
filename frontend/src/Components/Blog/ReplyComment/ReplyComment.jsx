import { useState } from "react";
import api from "../../axios";

const ReplyComponent = ({ commentId, onReplySuccess, parentId, }) => {
    const [reply, setReply] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            setLoading(true)
            const response = await api.post(`/comment/reply-comment/${commentId}`, {
                content: reply
            })
            
            console.log(response)
        
            onReplySuccess(response.data.data)
            setReply("")

        } catch (error) {
            console.log("Error while replying", error);
            
        } finally {
            setLoading(false)
        }
    }


    return (
    <form className="mt-4 w-full space-y-3" onSubmit={handleSubmit}>
        <input
            type="text"
            value={reply}
            onChange={(e) => setReply(e.target.value)}
            
            placeholder="Add a public reply..."
            className="w-full h-10 px-4 py-2 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm placeholder-gray-400"
            style={{resize: "none"}}
        />
        <div className="flex gap-2">
            <button
                type="submit"
                disabled={loading}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition ${
                    loading
                        ? "bg-blue-300 text-white cursor-not-allowed"
                        : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
            >
                {loading ? "Replying..." : "Reply"}
            </button>
        </div>
    </form>
);

};

export default ReplyComponent;
