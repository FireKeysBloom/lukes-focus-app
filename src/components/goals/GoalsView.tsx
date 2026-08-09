import { useState, type FormEvent } from 'react'
import { useGoals } from '../../hooks/useGoals'

export function GoalsView() {
  const { goals, loading, error, createGoal } = useGoals()
  const [title, setTitle] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setSubmitting(true)
    setFormError(null)
    const { error: createError } = await createGoal(title)
    setSubmitting(false)
    if (createError) {
      setFormError(createError)
    } else {
      setTitle('')
    }
  }

  return (
    <div className="goals-view">
      <form className="goal-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="New goal"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button type="submit" disabled={submitting || !title.trim()}>
          Add
        </button>
      </form>
      {formError && <p className="login-error">{formError}</p>}

      {loading && <p className="goals-empty">Loading…</p>}
      {error && <p className="login-error">{error}</p>}
      {!loading && !error && goals.length === 0 && (
        <p className="goals-empty">No goals yet — add one above.</p>
      )}

      <ul className="goal-list">
        {goals.map((goal) => (
          <li key={goal.id} className="goal-list-item">
            {goal.title}
          </li>
        ))}
      </ul>
    </div>
  )
}
