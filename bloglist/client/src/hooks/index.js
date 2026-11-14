import { useContext } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import blogService from '../services/blogs'
import userService from '../services/users'
import { useNavigate } from 'react-router-dom'

import NotificationContext from '../NotificationContext'
import UserContext from '../UserContext'

export const useNotify = () => useContext(NotificationContext)

export const useUser = () => useContext(UserContext)

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

  const commentMutation = useMutation({
    mutationFn: ({ id, comment }) => blogService.addComment(id, comment),
    onSuccess: (updatedBlog) => {
      const blogs = queryClient.getQueryData(['blogs'])
      queryClient.setQueryData(['blogs'], blogs.map(b =>
        b.id === updatedBlog.id ? updatedBlog : b
      ))
      notify(`comment added to '${updatedBlog.title}'`)
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
    addComment: (id, comment) => commentMutation.mutate({ id, comment }),
  }
}

export const useUsers = () => {

  const result = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const fetchedUsers = await userService.getAll()
      return fetchedUsers
    },
    refetchOnWindowFocus: false,
    retry: false,
  })

  return {
    users: result.data,
    isPending: result.isPending,
    isError: result.isError,
    error: result.error,
  }
}
