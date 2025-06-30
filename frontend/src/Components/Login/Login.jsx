import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LogIn } from "lucide-react";
import axios from "axios"
import { Loading } from "../utils/Loading/Loading";
import { Error } from "../utils/Error/Error";
import { Success } from "../utils/Success/Success";
export default function Login() {

    const [email, setEmail ] = useState("")
    const [password , setPassword] = useState("")

    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)
    const [loggedIn, setLoggedIn] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            setError(false)
            setLoading(true)
            const formData = new FormData() 

            formData.append("email", email)
            formData.append("password", password)

            const response = await axios.post('/api/v1/users/login', {
                email: email,
                password: password
            })
            console.log(response)

            const userResponse = await axios.get('/api/v1/users/User')
            const userData = userResponse.data.data
            console.log(userData)

            setLoggedIn(true)
            navigate('/dashboard')
            

        } catch (error) {
            setError(true)
            const message = error.response?.data.message || error?.message || "Something went Wrong"
            setErrorMessage(message)
        } finally {
            setLoading(false)
        }
        

    }


    return (
        <div className="pt-20 flex items-center justify-center bg-blue-50 px-4 pb-20">
        <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
            <div className="mb-6 text-center">
            <LogIn className="w-8 h-8 mx-auto text-blue-600" />
            <h2 className="text-2xl font-bold text-blue-700 mt-2">Welcome Back</h2>
            <p className="text-sm text-gray-500">Log in to your Inkspire account</p>
            </div>


            {loading && <Loading />}
            {error && <Error message={errorMessage}  />}
            {loggedIn && <Success message="Logged In successfully"/>}

            <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
                <label className="block text-sm text-gray-700">Email</label>
                <input
                type="email"
                name="email"
                required
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={email}
                />
            </div>

            <div>
                <label className="block text-sm text-gray-700">Password</label>
                <input
                type="password"
                name="password"
                required
                className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                />
            </div>

            <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
            >
                Login
            </button>
            </form>

            <p className="mt-4 text-sm text-center text-gray-600">
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-600 hover:underline">
                Sign up
            </Link>
            </p>
        </div>
        </div>
    );
    }