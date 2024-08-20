import AppRoutes from "./routes"
import { Navbar } from "./views/components/navbar"

function App() {

  return (
    <div className="bg-gray-100 min-h-screen font-inter">
      <Navbar />
      <div className="container mx-auto my-6">
        <AppRoutes />
      </div>
    </div>
  )
}

export default App
