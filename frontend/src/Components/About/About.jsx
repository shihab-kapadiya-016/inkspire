import { Users, PenLine, Heart, Sparkles } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen bg-blue-50 px-4 py-10 text-gray-800">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl overflow-hidden">
        <div className="px-6 py-10">
          <h1 className="text-3xl font-bold text-blue-700 mb-2">About Inkspire</h1>
          <p className="text-gray-600 mb-6">
            <span className="font-medium text-blue-600">Inkspire</span> is a modern blogging platform designed to empower creators, writers, and dreamers to share their stories with the world.
          </p>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <Users className="text-blue-500 w-6 h-6 mt-1" />
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Community First</h3>
                <p className="text-gray-600">
                  Built for humans, Inkspire encourages authentic conversations, thoughtful content, and respectful discussions.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <PenLine className="text-blue-500 w-6 h-6 mt-1" />
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Simple & Elegant</h3>
                <p className="text-gray-600">
                  We focus on clean design and minimal distractions — just you, your thoughts, and the world.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Sparkles className="text-blue-500 w-6 h-6 mt-1" />
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Open for Creators</h3>
                <p className="text-gray-600">
                  Whether you're a poet, a tech blogger, or just ranting at midnight — Inkspire is your safe space to be heard.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Heart className="text-blue-500 w-6 h-6 mt-1" />
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Made with 💙</h3>
                <p className="text-gray-600">
                  Inkspire is built by passionate developers and writers — like you. And yeah, by Shihab 😌.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-10 text-center text-sm text-gray-400">
            &copy; {new Date().getFullYear()} Inkspire. All rights reserved.
          </div>
        </div>
      </div>
    </div>
  );
}