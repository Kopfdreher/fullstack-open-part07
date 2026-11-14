import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import { NotificationContextProvider } from './NotificationContext'
import { UserContextProvider } from './UserContext'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <NotificationContextProvider>
      <Router>
        <UserContextProvider>
          <App />
        </UserContextProvider>
      </Router>
    </NotificationContextProvider>
  </QueryClientProvider>
)
