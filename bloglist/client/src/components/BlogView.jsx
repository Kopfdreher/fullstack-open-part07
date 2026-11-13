import { useParams } from 'react-router-dom'
import Blog from './Blog'
import { useBlogs } from '../hooks'

const BlogView = ({ user }) => {
  const { blogs, addLike, removeBlog } = useBlogs()
  const { id } = useParams()
  if (!blogs) return <p>blog not found</p>
  const blog = blogs.find((b) => b.id === id)

  if (!blog) return <p>blog not found</p>

  return (
    <Blog
      blog={blog}
      addLike={addLike}
      removeBlog={removeBlog}
      user={user}
    />
  )
}

export default BlogView
