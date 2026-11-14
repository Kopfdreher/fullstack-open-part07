import { Link } from 'react-router-dom'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Button from '@mui/material/Button'
import { useUser } from '../hooks'

const Menu = () => {
  const { user, handleLogout } = useUser()
  return (
    <AppBar position='static'>
      <Toolbar>
        <Button color='inherit' component={Link} to='/'>
        blogs
        </Button>
        {user && (
          <Button color='inherit' component={Link} to='/create'>
          new blog
          </Button>
        )}
        {user && (
          <Button color='inherit' onClick={handleLogout}>
          logout
          </Button>
        )}
        {!user && (
          <Button color='inherit' component={Link} to='/login'>
          login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  )
}
export default Menu
