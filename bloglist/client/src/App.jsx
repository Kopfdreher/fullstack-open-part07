import { Routes, Route } from 'react-router-dom'
import Container from '@mui/material/Container'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Menu from './components/Menu'
import BlogList from './components/BlogList'
import BlogView from './components/BlogView'
import UserList from './components/UserList'
import ErrorBoundary from './components/ErrorBoundary'

const App = () => {
  return (
    <div>
      <Notification />
      <Menu />
      <ErrorBoundary>
        <Container sx={{ paddingTop: 2, paddingBottom: 4 }}>
          <Routes>
            <Route path='/' element={<BlogList />} />
            <Route path='/login' element={ <LoginForm />} />
            <Route path='/users' element={ <UserList />} />
            <Route path='/create' element={<BlogForm />} />
            <Route path='/blogs/:id' element={<BlogView />} />
            <Route path='*' element={<h2>404 – Page not found</h2>} />
          </Routes>
        </Container>
      </ErrorBoundary>
    </div>
  )
}

export default App
