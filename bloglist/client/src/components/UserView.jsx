import { useParams } from 'react-router-dom'
import Typography from '@mui/material/Typography'
import { useUsers } from '../hooks'

const UserView = () => {
  const { users } = useUsers()
  const { id } = useParams()
  if (!users) return <Typography>user not found</Typography>
  const user = users.find((u) => u.id === id)
  if (!user) return <Typography>user not found</Typography>

  return (
    <div>
      <Typography variant='h5' component='h2' sx={{ marginBottom: 2 }}>
        {user.name || user.username}
      </Typography>
      <Typography variant='h6' component='h3' gutterBottom>
        added blogs
      </Typography>
      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>
            {blog.title}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default UserView
