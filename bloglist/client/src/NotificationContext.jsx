import { createContext, useReducer } from 'react'

const NotificationContext = createContext()

export default NotificationContext

const notificationReducer = (state, action) => {
  switch (action.type) {
  case 'ADD':
    return state.concat(action.payload)
  case 'REMOVE':
    return state.filter(message => message.id !== action.payload)
  default:
    return state
  }
}

export const NotificationContextProvider = (props) => {
  const [message, dispatch] = useReducer(notificationReducer, [])

  const notify = (text) => {
    const id = crypto.randomUUID()
    dispatch({ type: 'ADD', payload:{ id, text } })
    setTimeout(() => dispatch({ type: 'REMOVE', payload: id }), 5000)
  }

  return (
    <NotificationContext.Provider value={{ message, notify }}>
      {props.children}
    </NotificationContext.Provider>
  )
}
