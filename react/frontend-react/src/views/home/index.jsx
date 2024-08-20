import { Link } from "react-router-dom";

export const Home = () => {
    return (
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden flex flex-col items-center px-6 py-6">
            <div className="px-6 py-4 text-center mt-auto">
                <h1 className="text-3xl font-bold text-gray-800">Welcome to Our Platform</h1>
                <p className="text-gray-600 text-sm mt-2">Join us and start your journey today.</p>
            </div>
            <hr className="w-full" />
            <div className="px-6 pt-2 pb-3 flex space-x-2">
                <Link to="/login" className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600">
                    Login
                </Link>
                <Link to="/register" className="bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-600">
                    Register
                </Link>
            </div>
        </div>
    )
}
