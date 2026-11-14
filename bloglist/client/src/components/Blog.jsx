import { useState } from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import Link from '@mui/material/Link'

const Blog = ({ blog, addLike, removeBlog, addComment, user }) => {
  const [comment, setComment] = useState('')

  const onLike = async (event) => {
    event.preventDefault()
    await addLike(blog)
  }

  const onRemove = async (event) => {
    event.preventDefault()
    if (confirm(`Remove blog ${blog.title} by ${blog.author}`)) await removeBlog(blog.id)
  }

  const onComment = (event) => {
    event.preventDefault()
    addComment(blog.id, comment)
    setComment('')
  }

  return (
    <Card className='blog' variant='outlined' sx={{ marginTop: 2 }}>
      <CardContent>
        <Typography variant='h5' component='h2'>
          {blog.title}
        </Typography>
        <Typography color='text.secondary' gutterBottom>
          by {blog.author}
        </Typography>
        <Typography className='details'>
          <Link href={blog.url} target='_blank' rel='noreferrer'>
            {blog.url}
          </Link>
        </Typography>
        <Typography sx={{ marginTop: 1 }}>
          Added by {blog.user.username}
        </Typography>
        <Typography>
          {blog.likes} likes{' '}
          {user && (
            <Button size='small' variant='outlined' onClick={onLike}>
              like
            </Button>
          )}
          {user && blog.user.username === user.username && (
            <Button
              color='error'
              variant='outlined'
              size='small'
              onClick={onRemove}
            >
              remove
            </Button>
          )}
        </Typography>

        <Typography variant='h6' component='h3' sx={{ marginTop: 2 }}>
          comments
        </Typography>
        <List>
          {(blog.comments || []).map((text, index) => (
            <ListItem key={`${text}-${index}`} disablePadding>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <form onSubmit={onComment}>
          <TextField
            label='comment'
            value={comment}
            onChange={({ target }) => setComment(target.value)}
            size='small'
          />
          <Button type='submit' variant='outlined' sx={{ marginLeft: 1 }}>
            add comment
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

export default Blog
