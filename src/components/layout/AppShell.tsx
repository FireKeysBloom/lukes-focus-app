import { useState } from 'react'
import { BottomNav, type AppView } from './BottomNav'
import { TopBar } from './TopBar'
import { DashboardView } from '../dashboard/DashboardView'
import { SessionFlowView } from '../session/SessionFlowView'
import { GoalsView } from '../goals/GoalsView'

const VIEW_STORAGE_KEY = 'lukes-focus-app:last-view'

function getInitialView(): AppView {
  const stored = localStorage.getItem(VIEW_STORAGE_KEY)
  if (stored === 'dashboard' || stored === 'session' || stored === 'goals') {
    return stored
  }
  return 'dashboard'
}

const titles: Record<AppView, string> = {
  dashboard: "Today",
  session: 'Focus Session',
  goals: 'Goals',
}

export function AppShell() {
  const [view, setView] = useState<AppView>(getInitialView)

  function handleChange(next: AppView) {
    setView(next)
    localStorage.setItem(VIEW_STORAGE_KEY, next)
  }

  return (
    <div className={`app-shell app-shell--${view}`}>
      <TopBar title={titles[view]} />
      <main className="app-shell-content">
        {view === 'dashboard' && <DashboardView />}
        {view === 'session' && <SessionFlowView />}
        {view === 'goals' && <GoalsView />}
      </main>
      <BottomNav active={view} onChange={handleChange} />
    </div>
  )
}
