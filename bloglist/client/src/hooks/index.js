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
    queryFn: blogService.getAll,
    refetchOnWindowFocus: false,
    retry: false
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

  return {
    blogs: result.data,
    isPending: result.isPending,
    isError: result.isError,
    error: result.error,
    addBlog: (object) => newBlogMutation.mutate(object),
  }
}
