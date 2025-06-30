import { Link } from "react-router-dom";
import { PenLine, ArrowRight, Flame, BookOpen, Sparkles } from "lucide-react";

export default function Home() {

    const user = null


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
            <section className="max-w-6xl mx-auto px-4 py-16">
            <h2 className="text-2xl font-semibold text-blue-700 mb-6 text-center flex justify-center items-center gap-2">
            <Flame className="w-5 h-5 text-orange-500" />
            Featured Blogs
            </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Replace with dynamic blog cards later */}
            <div className="p-4 border rounded-md shadow-sm hover:shadow-md transition">
                <h3 className="text-lg font-semibold text-blue-600 flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                Blog Title
                </h3>
                <p className="text-sm text-gray-600 mt-2">
                Short preview of the blog post goes here...
                </p>
            </div>
            <div className="p-4 border rounded-md shadow-sm hover:shadow-md transition">
                <h3 className="text-lg font-semibold text-blue-600 flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                Another Blog
                </h3>
                <p className="text-sm text-gray-600 mt-2">
                A quick glimpse into another inspiring post...
                </p>
            </div>
            <div className="p-4 border rounded-md shadow-sm hover:shadow-md transition">
                <h3 className="text-lg font-semibold text-blue-600 flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                Last Highlight
                </h3>
                <p className="text-sm text-gray-600 mt-2">
                Catchy description of something awesome.
                </p>
            </div>
            </div>
        </section>
        </main>
    );
    }