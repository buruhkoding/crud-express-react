import { Link, useNavigate } from "react-router-dom"
import Cookies from "js-cookie"
import { useContext } from "react"
import { AuthContext } from "../../context/AuthContext"

export const Sidebar = () => {

    const navigate = useNavigate()
    const { setIsAuthenticated } = useContext(AuthContext)
    const logout = () =>{
        Cookies.remove('token')
        Cookies.remove('user')
        setIsAuthenticated(false)
        navigate('/login', { replace: true })
    }

    return (
        <div className="w-64 h-64 rounded mx flex flex-col bg-white shadow-lg">
            <div className="p-6">
                <h2 className="text-xl font-bold text-gray-800">Main Menu</h2>
                <ul className="mt-4">
                    <li>
                        <Link to="/admin/dashboard" className="block p-3 text-gray-600 rounded hover:bg-blue-100 hover:text-blue-500">
                            Dashboard
                        </Link>
                    </li>
                    <li>
                        <Link to="/admin/users" className="block p-3 mt-2 text-gray-600 rounded hover:bg-blue-100 hover:text-blue-500">
                            Users
                        </Link>
                    </li>
                    <li>
                        <a onClick={logout} className="block cursor-pointer p-3 mt-2 text-gray-600 rounded hover:bg-blue-100 hover:text-blue-500">
                            Logout
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    )
}
