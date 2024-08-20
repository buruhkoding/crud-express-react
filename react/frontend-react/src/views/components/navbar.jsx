import { useState, useEffect } from 'react'
import { Link } from "react-router-dom"

export const Navbar = () => {
  const [darkMode, setDarkMode] = useState(false);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Apply dark mode class to the document body
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold text-gray-800 dark:text-white">CRUD App</Link>
          </div>
          <div className="flex items-center">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              {darkMode ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 3v1m4.22 1.46l.7.7m1.42 3.34h1M21 12h1m-1.46 4.22l-.7.7m-3.34 1.42v1M12 21v1m-4.22-1.46l-.7-.7m-1.42-3.34H3m0-4.22H2m1.46-4.22l.7-.7m3.34-1.42V2m4.22 1.46l.7-.7M12 12m-2 0a2 2 0 104 0 2 2 0 00-4 0z"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 3v1m4.22 1.46l.7.7m1.42 3.34h1M21 12h1m-1.46 4.22l-.7.7m-3.34 1.42v1M12 21v1m-4.22-1.46l-.7-.7m-1.42-3.34H3m0-4.22H2m1.46-4.22l.7-.7m3.34-1.42V2m4.22 1.46l.7-.7M12 12m-2 0a2 2 0 104 0 2 2 0 00-4 0z"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
