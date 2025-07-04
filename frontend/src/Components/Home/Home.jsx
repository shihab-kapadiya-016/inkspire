import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { PenLine, ArrowRight, Flame, BookOpen, Sparkles, User, AppWindow} from "lucide-react";
import { useSelector } from "react-redux";
import api from "../axios.js"

export default function Home() {

    const [user, setUser] = useState(null)
    const [featuredBlogs, setFeaturedBlogs] = useState([])

    // const {user} = useSelector((state) => Satellite)

    useEffect(() => {
        ;(async () => {
            const response = await api.get("/post/featured")
            setFeaturedBlogs(response.data.data)
        })()
    },[])

    console.log(featuredBlogs)

    const splitTitle  = (title) => {
        const words = title.split(" ")
        const chunksize = Math.ceil(words.length / 3)

        return [
            words.slice(0, chunksize).join(" ") , 
            words.slice(chunksize, chunksize * 2).join(" "), 
            words.slice(chunksize * 2).join(" ")
        ]
    }



    return (
    <main className="bg-white min-h-screen">
      {/* Hero / Welcome Section */}
        <section className="py-20 px-4 text-center bg-blue-50">
        <div className="max-w-3xl mx-auto">
            {user ? (
                <>
                <h1 className="text-4xl sm:text-5xl font-bold text-blue-700 mb-4 flex justify-center items-center gap-3">
                    <Sparkles className="w-6 h-6 text-blue-500" />
                    Welcome back, {user.name}!
                </h1>
                <p className="text-lg text-blue-600 mb-8">
                    Ready to share something new today?
                </p>
                <div className="flex justify-center space-x-4">
                    <Link
                    to="/write"
                    className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition flex items-center gap-2"
                    >
                    <Pencil className="w-5 h-5" />
                    Write a Post
                    </Link>
                    <Link
                    to="/blogs"
                    className="px-6 py-3 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50 transition flex items-center gap-2"
                    >
                    <BookOpen className="w-5 h-5" />
                    Read Blogs
                    </Link>
                </div>
                </>
            ) : (
                <>
                <h1 className="text-4xl sm:text-5xl font-bold text-blue-700 mb-4 flex justify-center items-center gap-3">
                    <PenLine className="w-8 h-8 text-blue-600" />
                    Welcome to Inkspire
                </h1>
                <p className="text-lg text-blue-600 mb-8 flex justify-center items-center gap-2">
                    <Sparkles className="w-5 h-5 text-blue-400" />
                    A place to write, share, and explore stories from around the world.
                </p>
                <div className="flex justify-center space-x-4">
                    <Link
                    to="/blogs"
                    className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition flex items-center gap-2"
                    >
                    <BookOpen className="w-5 h-5" />
                    Explore Blogs
                    </Link>
                    <Link
                    to="/register"
                    className="px-6 py-3 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50 transition flex items-center gap-2"
                    >
                    Get Started
                    <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
                </>
            )}
            </div>
        </section>

        {/* Featured Blogs (always show) */}
            <section className="max-w-6xl mx-auto px-4 py-20">
                <h2 className="text-3xl font-bold text-blue-700 mb-10 text-center flex justify-center items-center gap-2">
                    <Flame className="w-6 h-6 text-orange-500" />
                    Featured Blogs
                </h2>

                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {featuredBlogs.map((blog, index) => (
                    <Link
                        to={`/blogs/${blog._id}`}
                        key={index}
                        className="bg-white rounded-2xl overflow-hidden border   shadow hover:shadow-lg transition duration-300"
                    >
                        <div className="h-48 w-full overflow-hidden">
                        <img
                            src={blog.thumbnail || "/default-thumbnail.jpg"}
                            alt={blog.title}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                        </div>

                        <div className="p-5">
                        <h3 className="text-lg font-semibold text-gray-700 leading-tight space-y-1">
                            {splitTitle(blog.title).map((line, idx) => (
                            <span key={idx} className="block">
                            {line}
                            </span>
                        ))}
                        </h3>

                        <p className="text-sm text-gray-600 mt-2 line-clamp-3">
                            {blog.description}
                        </p>
                        </div>
                    </Link>
                    ))}
                </div>
                </section>

        </main>
    );
    }