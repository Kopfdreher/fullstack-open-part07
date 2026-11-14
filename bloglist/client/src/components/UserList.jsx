import Typography from '@mui/material/Typography'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import { Link } from 'react-router-dom'
import { useUsers } from '../hooks'

const UserList = () => {
  const { users, isPending, isError } = useUsers()

  if (isPending) return <div>loading data...</div>
  if (isError) {
    return <div>users not available due to problems on the server</div>
  }

  return (
    <div>
      <Typography variant='h5' component='h2' sx={{ marginBottom: 2 }}>
      Users
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Username</TableCell>
            <TableCell>Blogs created</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell><Link to={`/users/${user.id}`}>{user.name}</Link></TableCell>
              <TableCell>{user.username}</TableCell>
              <TableCell>{user.blogs.length}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default UserList
