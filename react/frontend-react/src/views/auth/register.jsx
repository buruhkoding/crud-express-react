import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../../services/api'
import Alert from '../components/alert'

export const Register = () => {
    const navigate = useNavigate()

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [validation, setValidation] = useState("")
    const [showAlert, setShowAlert] = useState(true);

    const handleClose = () => {
        setShowAlert(false)
    }

    const getInputClassName = (inputName) => {
        return `mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm
        ${validation.errors?.some(error => error.path === inputName) ? 'border-red-500' : 'border-gray-300'}`;
    }

    const register = async (e) => {
        e.preventDefault()

        await api.post('/api/register', {
            name: name,
            email: email,
            password: password
        }).then(() => {
            navigate('/login')
        }).catch((error => {
            setValidation(error.response.data)
        }))
    }

    return (
        <div>
            <div className=" flex flex-col items-center px-6 py-6">
                <div className="px-6 py-4 text-center mt-auto">
                    <h2 className="text-4xl font-bold text-gray-800">Create a new account.</h2>
                    <p className="text-gray-600 text-sm mt-2">or login to your account.</p>
                </div>
                {
                    validation.errors && showAlert && (
                        <Alert
                            type="error"
                            message="Registration failed, please input again."
                            onClose={handleClose}
                        />
                    )

                }
            </div>
            <div className='max-w-lg mx-auto bg-white shadow-lg rounded-lg overflow-hidden'>
                <form onSubmit={register} className='space-y-4 py-8 px-10'>
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
                            className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition duration-300">
                            Register
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
