import { useAuth } from './context/AuthContext'
import { LoginScreen } from './components/auth/LoginScreen'
import { AppShell } from './components/layout/AppShell'

function App() {
  const { session, loading } = useAuth()

  if (loading) return null
  if (!session) return <LoginScreen />
  return <AppShell />
}

export default App
