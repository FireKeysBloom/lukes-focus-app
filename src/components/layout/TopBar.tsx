import { useAuth } from '../../context/AuthContext'

interface TopBarProps {
  title: string
}

export function TopBar({ title }: TopBarProps) {
  const { signOut } = useAuth()

  return (
    <header className="top-bar">
      <span className="top-bar-spacer" />
      <span className="top-bar-title">{title}</span>
      <button type="button" className="top-bar-sign-out" onClick={() => void signOut()}>
        Sign out
      </button>
    </header>
  )
}
