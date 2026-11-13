import { useNotify } from '../hooks'
import Alert from '@mui/material/Alert'

const Notification = () => {
  const { message } = useNotify()
  if (message.length === 0) return null

  return (
    <>
      {message.map(message => (
        <Alert key={message.id} severity='error' sx={{ margin: 1 }}>
          {message.text}
        </Alert>
      ))}
    </>
  )
}

export default Notification
