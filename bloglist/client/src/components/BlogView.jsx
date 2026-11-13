import { useParams } from 'react-router-dom'
import Blog from './Blog'

const BlogView = ({ blogs, addLike, removeBlog, user }) => {
  const { id } = useParams()
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
