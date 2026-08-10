const CEILING_HOURS = 3.5
const TODAY_HOURS = 2.3
const PROGRESS = Math.min(TODAY_HOURS / CEILING_HOURS, 1)

export function DashboardView() {
  return (
    <div className="dashboard-hero">
      <div className="dashboard-stats">
        <StatPill label="Ceiling" value={`${TODAY_HOURS}h`} />
        <StatPill label="Pilot" value="12%" />
        <StatPill label="Plane" value="79%" />
        <StatPill label="Engineer" value="9%" />
      </div>

      <div className="dashboard-gauge">
        <svg viewBox="0 0 200 110" className="dashboard-gauge-arc">
          <path d="M 15 100 A 85 85 0 0 1 185 100" fill="none" stroke="rgba(255,255,255,0.16)" strokeWidth="3" strokeLinecap="round" />
          <path
            d="M 15 100 A 85 85 0 0 1 185 100"
            fill="none"
            stroke="rgba(255,255,255,0.85)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray="267"
            strokeDashoffset={267 - 267 * PROGRESS}
          />
        </svg>
        <div className="dashboard-gauge-value">
          <span className="dashboard-gauge-number">{TODAY_HOURS}</span>
          <span className="dashboard-gauge-unit">hrs deep work</span>
        </div>
      </div>

      <h2 className="dashboard-headline">Steady climb</h2>
      <p className="dashboard-body">
        You're {Math.round(PROGRESS * 100)}% toward today's ceiling. One more focused
        block keeps the ratio on track without pushing past it.
      </p>
    </div>
  )
}

function StatPill({ label, value }: { label: string; value: string }) {
  return (
    <div className="dashboard-stat-pill">
      <span className="dashboard-stat-value">{value}</span>
      <span className="dashboard-stat-label">{label}</span>
    </div>
  )
}
