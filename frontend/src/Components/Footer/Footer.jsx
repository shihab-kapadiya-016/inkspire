import { Link } from "react-router-dom";
import { Github } from "lucide-react";

export  function Footer() {
    return (
        <footer className="bg-white border-t mt-10 ">
        <div className="max-w-7xl mx-auto px-4 py-8  flex flex-col md:flex-row items-center justify-between gap-6 text-gray-600">
            {/* Left: Branding */}
            <p className="text-sm text-center md:text-left">
            Built by <span className="text-blue-600 font-semibold">Shihab</span>
            </p>

            {/* Right: Nav Links + GitHub */}
            <div className="flex items-center space-x-6 text-sm">
            <Link to="/about" className="hover:text-blue-600 transition">
                About
            </Link>
            <Link to="/blogs" className="hover:text-blue-600 transition">
                Blog
            </Link>
            <Link to="/contact" className="hover:text-blue-600 transition">
                Contact
            </Link>
            <Link to="/privacy" className="hover:text-blue-600 transition">
                Privacy
            </Link>

            {/* GitHub External Link */}
            <a
                href="https://github.com/your-username/your-repo"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-600 transition"
            >
                <Github className="w-5 h-5" />
                <span className="sr-only">GitHub</span>
            </a>
            </div>
        </div>
        </footer>
    );
}
