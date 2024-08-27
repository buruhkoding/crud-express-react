import { useNavigate, useParams } from "react-router-dom";
import { Card } from "../../components/Card"
import { useEffect, useState } from "react";
import api from "../../../../services/api";
import Cookies from "js-cookie";
import _ from 'lodash';

export const UsersEdit = () => {
    const navigate = useNavigate()
    const token = Cookies.get('token');
    const { id } = useParams()

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [passwordConfirmation, setPasswordConfirmation] = useState("")
    const [validation, setValidation] = useState("")

    const fetchDetailUser = async () => {
        api.defaults.headers.common['Authorization'] = token;

        if (token) {
            try {
                const response = await api.get(`/api/admin/users/${id}`)
                setName(response.data.data.name)
                setEmail(response.data.data.email)
            } catch (error) {
                console.log('Error fetching data users!', error);
            }
        } else {
            console.error('Invalid token!')
        }
    }

    useEffect(() => {
        fetchDetailUser()
    }, [])

    const updateUser = async (e) => {
        e.preventDefault();

        try {
            api.defaults.headers.common['Authorization'] = token;

            let payload = {
                name: name,
                email: email,
                password: password,
                passwordConfirmation: passwordConfirmation
            }

            payload = _.omitBy(payload, _.isEmpty)
            console.log(payload);

            await api.put(`/api/admin/users/${id}`, payload)

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
                    <h1 className="text-md font-semibold text-gray-700">Edit Users</h1>
                </div>

                <form onSubmit={updateUser} className='space-y-4 py-8 px-10'>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            type='email'
                            name='email'
                            id='email'
                            value={email}
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
                            value={name}
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
                            name='password'
                            id='password'
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
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password Confirmation
                        </label>
                        <input
                            type='password'
                            name='password_confirmation'
                            id='password_confirmation'
                            onChange={(e) => setPasswordConfirmation(e.target.value)}
                            className={getInputClassName('passwordConfirmation')}
                            placeholder='********'
                        />
                        {validation.errors?.some(error => error.path === 'passwordConfirmation') && (
                            <p className="mt-2 text-sm text-red-600">
                                {validation.errors.find(error => error.path === 'passwordConfirmation')?.msg}
                            </p>
                        )}
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="w-40 bg-blue-500 text-white py-2 text-sm rounded-lg hover:bg-blue-600 transition duration-300">
                            Update User
                        </button>
                    </div>
                </form>
            </Card>
        </div>
    )
}
