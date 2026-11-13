import { useState, useEffect } from 'react'
import anecdoteService from '../services/anecdotes'

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (e) => setValue(e.target.value)

  const reset = () => setValue('')

  return { type, value, onChange, reset }
}

export const useAnecdotes = () => {
  const [anecdotes, setAnecdotes] = useState([])

  useEffect(() => {
    anecdoteService.getAll().then(data => setAnecdotes(data))
  }, [])

  const addAnecdote = async (object) => {
    const newObject = await anecdoteService.createNew(object)
    setAnecdotes(anecdotes.concat(newObject))
  }

  return { anecdotes, addAnecdote }
}
