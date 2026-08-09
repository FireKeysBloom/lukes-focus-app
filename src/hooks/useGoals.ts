import { useCallback, useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import type { Database } from '../lib/database.types'

export type Goal = Database['public']['Tables']['goals']['Row']

export function useGoals() {
  const [goals, setGoals] = useState<Goal[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const refresh = useCallback(async () => {
    setLoading(true)
    setError(null)
    const { data, error: fetchError } = await supabase
      .from('goals')
      .select('*')
      .eq('status', 'active')
      .order('created_at', { ascending: false })

    if (fetchError) {
      setError(fetchError.message)
    } else {
      setGoals(data ?? [])
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    void refresh()
  }, [refresh])

  async function createGoal(title: string) {
    const trimmed = title.trim()
    if (!trimmed) return { error: 'Title is required' }

    const { data, error: insertError } = await supabase
      .from('goals')
      .insert({ title: trimmed })
      .select()
      .single()

    if (insertError) return { error: insertError.message }
    if (data) setGoals((prev) => [data, ...prev])
    return { error: null }
  }

  return { goals, loading, error, createGoal, refresh }
}
