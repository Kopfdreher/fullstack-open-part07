import { useContext } from 'react'
import NotificationContext from '../NotificationContext'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import blogService from '../services/blogs'
import { useNavigate } from 'react-router-dom'

export const useNotify = () => useContext(NotificationContext)

export const useBlogs = () => {
  const queryClient = useQueryClient()
  const { notify } = useNotify()
  const navigate = useNavigate()

  const result = useQuery({
    queryKey: ['blogs'],
    queryFn: async () => {
      const fetchedBlogs = await blogService.getAll()
      return fetchedBlogs.sort((a, b) => b.likes - a.likes)
    },
    refetchOnWindowFocus: false,
    retry: false,
  })

  const newBlogMutation = useMutation({
    mutationFn: blogService.create,
    onSuccess: (newBlog) => {
      const blogs = queryClient.getQueryData(['blogs'])
      queryClient.setQueryData(['blogs'], blogs.concat(newBlog))
      notify(`blog '${newBlog.title}' created`)
      navigate('/')
    }
  })

  const updateBlogMutation = useMutation({
    mutationFn: blogService.update,
    onSuccess: (updatedBlog) => {
      const blogs = queryClient.getQueryData(['blogs'])
      queryClient.setQueryData(['blogs'], blogs
        .map(b => b.id === updatedBlog.id
          ? updatedBlog
          : b
        )
        .sort((a, b) => b.likes - a.likes)
      )
      notify(`blog '${updatedBlog.title}' liked`)
    }
  })

  const removeBlogMutation = useMutation({
    mutationFn: blogService.remove,
    onSuccess: (id) => {
      const blogs = queryClient.getQueryData(['blogs'])
      queryClient.setQueryData(['blogs'], blogs
        .filter((blog) => blog.id !== id))
      navigate('/')
    }
  })

  return {
    blogs: result.data,
    isPending: result.isPending,
    isError: result.isError,
    error: result.error,
    addBlog: (object) => newBlogMutation.mutate(object),
    addLike: (blog) => updateBlogMutation
      .mutate({ ...blog, likes: blog.likes + 1 }),
    removeBlog: (id) => removeBlogMutation.mutate(id),
  }
}
