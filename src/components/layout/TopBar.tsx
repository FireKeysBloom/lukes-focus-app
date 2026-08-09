interface TopBarProps {
  title: string
}

export function TopBar({ title }: TopBarProps) {
  return (
    <header className="top-bar">
      <span className="top-bar-title">{title}</span>
    </header>
  )
}
