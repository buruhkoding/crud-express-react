import { useContext } from "react"
import AppRoutes from "./routes"
import { Navbar } from "./views/components/navbar"
import { Sidebar } from "./views/components/sidebar"
import { AuthContext } from "./context/AuthContext"

function App() {

    const { isAuthenticated } = useContext(AuthContext)

    return (
        <div className="bg-gray-100 min-h-screen flex flex-col font-inter">
            {isAuthenticated ? <Navbar /> : null }
            <div className="container flex mx-auto my-6 max-w-7xl px-4 sm:px-6 lg:px-8">
                {isAuthenticated ? <Sidebar /> : null }
                <AppRoutes />
            </div>
        </div>
    )
}

export default App
