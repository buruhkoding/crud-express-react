import { Link } from "react-router-dom"
import { Card } from "../../components/Card"
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import api from "../../../../services/api";

export const UsersIndex = () => {
    const [users, setUsers] = useState([]);

    const fetchDataUsers = async () => {
        const token = Cookies.get('token')

        if (token) {
            api.defaults.headers.common['Authorization'] = token;

            try {
                const response = await api.get('/api/admin/users')
                setUsers(response.data.data);
            } catch (error) {
                console.error('There was an error fetching the users!', error)
            }
        } else {
            console.error('Token is not available!');
        }
    }

    useEffect(() => {
        fetchDataUsers()
    }, []);

    const deleteUser = async (id) => {
        const token = Cookies.get('token')

        if (token) {
            api.defaults.headers.common['Authorization'] = token;

            try {
                await api.delete(`/api/admin/users/${id}`)
                fetchDataUsers()
            } catch (error) {
                console.error('There was an error fetching the users!', error)
            }
        } else {
            console.error('Token is not available!');
        }
    }

    return (
        <div className="w-full">
            <Card>
                <div className="flex justify-between items-center p-2 border-b border-gray-300">
                    <h1 className="text-md font-semibold text-gray-700">List Users</h1>
                    <Link
                        to="/admin/users/create"
                        className="bg-green-500 text-white text-sm px-2 py-2 rounded hover:bg-green-600 focus:outline-none">
                        Add User
                    </Link>
                </div>
                <div className="overflow-x-auto py-2">
                    <table className="min-w-full bg-white border-collapse border-slate-400">
                        <thead>
                            <tr className="w-full bg-gray-200 text-gray-700">
                                <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Full Name</th>
                                <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Email Address</th>
                                <th className="text-center py-3 px-4 uppercase font-semibold text-sm">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-700">
                            {
                                users.length > 0
                                    ? users.map((user) => (
                                        <tr key={user.id} className="border-b">
                                            <td className="text-left py-3 px-4">{user.name}</td>
                                            <td className="text-left py-3 px-4">{user.email}</td>
                                            <td className="text-center py-3 px-4">
                                                <Link to={`/admin/users/edit/${user.id}`} className="bg-blue-500 text-white px-3 py-1 rounded mr-2 hover:bg-blue-600">
                                                    Edit
                                                </Link>
                                                <button onClick={ () => deleteUser(user.id)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                    : <tr>
                                        <td colSpan="4" className="text-center text-sm mt-">
                                            Data belum tersedia
                                        </td>
                                    </tr>
                            }
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    )
}
