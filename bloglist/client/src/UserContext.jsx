import { createContext, useState, useEffect } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import { useNavigate } from 'react-router-dom'
import { useNotify } from './hooks'
import { getUser, saveUser, removeUser } from './services/persistentUser'

const UserContext = createContext()

export default UserContext

export const UserContextProvider = (props) => {
  const { notify } = useNotify()
  const navigate = useNavigate()
  const [user, setUser] = useState(() => getUser())

  useEffect(() => {
    blogService.setToken(user ? user.token : null)
  }, [user])

  const handleLogin = async (loginObject) => {
    try {
      const user = await loginService.login(loginObject)

      saveUser(user)
      blogService.setToken(user.token)
      setUser(user)
      navigate('/')
      return true
    } catch {
      notify('wrong credentials', 'error')
      return false
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    removeUser()
    setUser(null)
    blogService.setToken(null)
    navigate('/')
  }

  return (
    <UserContext.Provider value={{ user, handleLogin, handleLogout }}>
      {props.children}
    </UserContext.Provider>
  )
}
