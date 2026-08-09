export type AppView = 'dashboard' | 'session' | 'goals'

interface BottomNavProps {
  active: AppView
  onChange: (view: AppView) => void
}

const items: { view: AppView; label: string }[] = [
  { view: 'dashboard', label: 'Today' },
  { view: 'session', label: 'Focus' },
  { view: 'goals', label: 'Goals' },
]

export function BottomNav({ active, onChange }: BottomNavProps) {
  return (
    <nav className="bottom-nav">
      {items.map((item) => (
        <button
          key={item.view}
          type="button"
          className={item.view === active ? 'bottom-nav-item active' : 'bottom-nav-item'}
          onClick={() => onChange(item.view)}
        >
          {item.label}
        </button>
      ))}
    </nav>
  )
}
