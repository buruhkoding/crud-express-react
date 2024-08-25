import { useState } from "react"
import { Card } from "../../components/Card"
import { useNavigate } from "react-router-dom"
import api from "../../../../services/api"
import Cookies from "js-cookie"

export const UsersCreate = () => {
    const navigate = useNavigate()
    const token = Cookies.get('token');

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [validation, setValidation] = useState("")


    const storeUser = async (e) => {
        e.preventDefault();

        try {
            api.defaults.headers.common['Authorization'] = token;

            await api.post('/api/admin/users', {
                name: name,
                email: email,
                password: password
            })

            navigate('/admin/users')

        } catch (error) {
            setValidation(error.response.data)
        }

    }

    const getInputClassName = (inputName) => {
        return `mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm
        ${validation.errors?.some(error => error.path === inputName) ? 'border-red-500' : 'border-gray-300'}`;
    }
    return (
        <div className="w-full">
            <Card>
                <div className="flex justify-between items-center p-2 border-b border-gray-300">
                    <h1 className="text-md font-semibold text-gray-700">Create Users</h1>
                </div>

                {/* <div className='max-w-lg mx-auto bg-white shadow-lg rounded-lg overflow-hidden'> */}
                    <form onSubmit={storeUser} className='space-y-4 py-8 px-10'>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email
                            </label>
                            <input
                                type='email'
                                name='email'
                                id='email'
                                onChange={(e) => setEmail(e.target.value)}
                                className={getInputClassName('email')}
                                placeholder='johndoe@example.com'
                            />

                            {validation.errors?.some(error => error.path === 'email') && (
                                <p className="mt-2 text-sm text-red-600">
                                    {validation.errors.find(error => error.path === 'email')?.msg}
                                </p>
                            )}
                        </div>
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                Fullname
                            </label>
                            <input
                                type='text'
                                name='name'
                                id='name'
                                onChange={(e) => setName(e.target.value)}
                                className={getInputClassName('name')}
                                placeholder='John Doe'
                            />
                            {validation.errors?.some(error => error.path === 'name') && (
                                <p className="mt-2 text-sm text-red-600">
                                    {validation.errors.find(error => error.path === 'name')?.msg}
                                </p>
                            )}
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <input
                                type='password'
                                name='name'
                                id='name'
                                onChange={(e) => setPassword(e.target.value)}
                                className={getInputClassName('password')}
                                placeholder='********'
                            />
                            {validation.errors?.some(error => error.path === 'password') && (
                                <p className="mt-2 text-sm text-red-600">
                                    {validation.errors.find(error => error.path === 'password')?.msg}
                                </p>
                            )}
                        </div>
                        <div>
                            <button
                                type="submit"
                                className="w-40 bg-blue-500 text-white py-2 text-sm rounded-lg hover:bg-blue-600 transition duration-300">
                                Add User
                            </button>
                        </div>
                    </form>
                {/* </div> */}
            </Card>
        </div>
    )
}
