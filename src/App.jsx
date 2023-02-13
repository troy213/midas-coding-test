import { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import axios from './api/axios'
import { REGEX } from './data/consts'

const LOGIN_URL = '/login'

const App = () => {
  const [email, setEmail] = useState('')
  const [emailIsValid, setEmailIsValid] = useState(true)
  const [password, setPassword] = useState('')
  const [passwordIsValid, setPasswordIsValid] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const handleSetEmail = (e) => {
    const value = e.target.value

    const isValid = REGEX.email.test(value) && value.length > 0
    setEmailIsValid(isValid)
    setEmail(value)
  }

  const handleSetPassword = (e) => {
    const value = e.target.value

    const isValid = REGEX.password.test(value) && value.length > 0
    setPasswordIsValid(isValid)
    setPassword(value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    if (!emailIsValid || !passwordIsValid) {
      setIsLoading(false)
      return toast.error('Email or Password is not valid')
    }

    try {
      const response = await axios.post(LOGIN_URL, {
        email,
        password,
      })

      if (response?.status >= 200 && response?.status <= 299) {
        setIsLoading(false)
        toast.success(`Logged in, your token is ${response.data?.token}`)
        setIsLoggedIn(true)
      }
    } catch (error) {
      setIsLoading(false)
      toast.error(error.response?.data?.error)
    }
  }

  if (isLoading)
    return (
      <div className='login'>
        <p className='login__loading'>Loading...</p>
      </div>
    )

  if (isLoggedIn)
    return (
      <div className='login'>
        <p className='login__logged-in'>Welcome!</p>
      </div>
    )

  return (
    <div className='login'>
      <ToastContainer position='top-center' />
      <form onSubmit={handleSubmit} className='login__form'>
        <div className='login__input-wrapper'>
          <label htmlFor='email'>Email</label>
          <input
            type='text'
            value={email}
            onChange={handleSetEmail}
            placeholder='john@mail.com'
            className={`${!emailIsValid ? 'error' : ''}`}
          />
          {!emailIsValid && (
            <p className='login__input-helper'>Email format is not valid</p>
          )}
        </div>
        <div className='login__input-wrapper'>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            value={password}
            onChange={handleSetPassword}
            placeholder='password'
            className={`${!passwordIsValid ? 'error' : ''}`}
          />
          {!passwordIsValid && (
            <p className='login__input-helper'>Password format is not valid</p>
          )}
        </div>
        <button type='submit' className='btn btn-primary'>
          Login
        </button>
      </form>
    </div>
  )
}

export default App
