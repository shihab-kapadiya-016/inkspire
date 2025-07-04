import React, { useState } from "react";

export default function Contact() {
    const [form, setForm] = useState({ name: "", email: "", message: "" });
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form submitted:", form);
        setSubmitted(true);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-white px-4 py-12">
        <div className="max-w-xl w-full bg-white border border-gray-200 p-8 rounded-2xl shadow-md">
            <h1 className="text-3xl font-semibold text-blue-500 mb-6">Contact Us</h1>

            {submitted ? (
            <p className="text-green-600 font-medium">Thank you! We'll get back to you soon.</p>
            ) : (
            <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                    type="text"
                    name="name"
                    required
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    value={form.name}
                    onChange={handleChange}
                />
                </div>

                <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                    type="email"
                    name="email"
                    required
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    value={form.email}
                    onChange={handleChange}
                />
                </div>

                <div>
                <label className="block text-sm font-medium text-gray-700">Message</label>
                <textarea
                    name="message"
                    rows="4"
                    required
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    value={form.message}
                    onChange={handleChange}
                />
                </div>

                <button
                type="submit"
                className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition"
                >
                Send Message
                </button>
            </form>
            )}
        </div>
        </div>
    );
    }
