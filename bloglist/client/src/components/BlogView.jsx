import { useParams } from 'react-router-dom'
import Blog from './Blog'
import { useBlogs, useUser } from '../hooks'

const BlogView = () => {
  const { user } = useUser()
  const { blogs, addLike, removeBlog, addComment } = useBlogs()
  const { id } = useParams()
  if (!blogs) return <p>blog not found</p>
  const blog = blogs.find((b) => b.id === id)

  if (!blog) return <p>blog not found</p>

  return (
    <Blog
      blog={blog}
      addLike={addLike}
      removeBlog={removeBlog}
      addComment={addComment}
      user={user}
    />
  )
}

export default BlogView
