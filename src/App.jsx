import { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import axios from './api/axios'
import { REGEX } from './data/consts'

const LOGIN_URL = '/login'

const App = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSetEmail = (e) => {
    setEmail(e.target.value)
  }

  const handleSetPassword = (e) => {
    setPassword(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    const isValid = REGEX.email.test(email) && REGEX.password.test(password)

    if (!isValid) {
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
          />
        </div>
        <div className='login__input-wrapper'>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            value={password}
            onChange={handleSetPassword}
            placeholder='password'
          />
        </div>
        <button type='submit' className='btn btn-primary'>
          Login
        </button>
      </form>
    </div>
  )
}

export default App
