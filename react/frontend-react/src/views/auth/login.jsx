import { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../../../services/api'
import Cookies from 'js-cookie'
import Alert from '../components/alert'
import { AuthContext } from '../../context/AuthContext'



export const Login = () => {
    const navigate = useNavigate()
    const { setIsAuthenticated } = useContext(AuthContext)

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [validation, setValidation] = useState([]);
    const [loginFailed, setLoginFailed] = useState([]);
    const [showAlert, setShowAlert] = useState(true);

    const handleClose = () => {
        setShowAlert(false)
    }

    const getInputClassName = (inputName) => {
        return `mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm
        ${validation.errors?.some(error => error.path === inputName) ? 'border-red-500' : 'border-gray-300'}`;
    }

    const login = async (e) => {
        e.preventDefault()

        await api.post('/api/login', {
            email: email,
            password: password
        })
            .then(response => {
                Cookies.set('token', response.data.data.token)
                Cookies.set('user', JSON.stringify(response.data.data.user))

                setIsAuthenticated(true)

                navigate('/admin/dashboard', { replace: true })
            })
            .catch(error => {
                setValidation(error.response.data)
                setLoginFailed(error.response.data)
            })
    }

    return (
        <div>
            <div className=" flex flex-col items-center px-6 py-6">
                <div className="px-6 py-4 text-center mt-auto">
                    <h2 className="text-4xl font-bold text-gray-800">Sign in</h2>
                    <p className="text-gray-600 text-sm mt-2">
                        Doesn&apos;t have an account yet?&nbsp;
                        <Link className='underline font-semibold text-blue-600'>Sign Up</Link>
                    </p>
                </div>
                {
                    loginFailed.message && showAlert && (
                        <Alert
                            type="error"
                            message={loginFailed.message}
                            onClose={handleClose}
                        />
                    )

                }
            </div>
            <div className='max-w-lg mx-auto bg-white shadow-lg rounded-lg overflow-hidden'>
                <form onSubmit={login} className='space-y-4 py-8 px-10'>
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
                            Sign in
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
