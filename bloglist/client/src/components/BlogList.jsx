import { Link } from 'react-router-dom'
import { useBlogs } from '../hooks'

const BlogList = () => {
  const { blogs, isPending, isError } = useBlogs()

  if (isPending) return <div>loading data...</div>
  if (isError) {
    return <div>blogs not available due to problems on the server</div>
  }

  return (
    <div>
      <h2>blogs</h2>
      <ul>
        {blogs.map((blog) => (
          <li key={blog.id}>
            <Link to={`/blogs/${blog.id}`}>{blog.title} by {blog.author}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default BlogList
