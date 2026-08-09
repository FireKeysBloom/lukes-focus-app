// Hand-authored to match supabase/migrations/*.sql exactly.
// If the schema changes, update this file (and consider switching to
// `supabase gen types typescript` once the Supabase CLI is set up).

export type GoalStatus = 'active' | 'paused' | 'completed' | 'archived'
export type SessionEntryMode = 'full' | 'quick_log'
export type SessionStatus = 'planned' | 'active' | 'completed' | 'abandoned'
export type SessionCategory = 'pilot' | 'plane' | 'engineer'

export interface Database {
  public: {
    Tables: {
      goals: {
        Row: {
          id: string
          user_id: string
          title: string
          description: string | null
          status: GoalStatus
          color: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id?: string
          title: string
          description?: string | null
          status?: GoalStatus
          color?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          description?: string | null
          status?: GoalStatus
          color?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      sessions: {
        Row: {
          id: string
          user_id: string
          goal_id: string | null
          entry_mode: SessionEntryMode
          status: SessionStatus
          category: SessionCategory | null
          goal_statement: string | null
          resources_needed: string | null
          playlist_url: string | null
          checklist_no_clash: boolean
          checklist_notified_others: boolean
          checklist_freedom_enabled: boolean
          checklist_notifications_off: boolean
          planned_duration_minutes: number
          started_at: string | null
          ended_at: string | null
          ended_early: boolean
          end_reason: string | null
          actual_duration_minutes: number | null
          estimated_duration_minutes: number | null
          focus_quality_rating: number | null
          flow_rating: number | null
          what_worked: string | null
          what_got_in_the_way: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id?: string
          goal_id?: string | null
          entry_mode?: SessionEntryMode
          status?: SessionStatus
          category?: SessionCategory | null
          goal_statement?: string | null
          resources_needed?: string | null
          playlist_url?: string | null
          checklist_no_clash?: boolean
          checklist_notified_others?: boolean
          checklist_freedom_enabled?: boolean
          checklist_notifications_off?: boolean
          planned_duration_minutes?: number
          started_at?: string | null
          ended_at?: string | null
          ended_early?: boolean
          end_reason?: string | null
          estimated_duration_minutes?: number | null
          focus_quality_rating?: number | null
          flow_rating?: number | null
          what_worked?: string | null
          what_got_in_the_way?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          goal_id?: string | null
          entry_mode?: SessionEntryMode
          status?: SessionStatus
          category?: SessionCategory | null
          goal_statement?: string | null
          resources_needed?: string | null
          playlist_url?: string | null
          checklist_no_clash?: boolean
          checklist_notified_others?: boolean
          checklist_freedom_enabled?: boolean
          checklist_notifications_off?: boolean
          planned_duration_minutes?: number
          started_at?: string | null
          ended_at?: string | null
          ended_early?: boolean
          end_reason?: string | null
          estimated_duration_minutes?: number | null
          focus_quality_rating?: number | null
          flow_rating?: number | null
          what_worked?: string | null
          what_got_in_the_way?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      user_settings: {
        Row: {
          user_id: string
          daily_ceiling_minutes: number
          accountability_partner_name: string | null
          accountability_partner_phone: string | null
          default_playlist_url: string | null
          ios_shortcut_name: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          user_id: string
          daily_ceiling_minutes?: number
          accountability_partner_name?: string | null
          accountability_partner_phone?: string | null
          default_playlist_url?: string | null
          ios_shortcut_name?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          user_id?: string
          daily_ceiling_minutes?: number
          accountability_partner_name?: string | null
          accountability_partner_phone?: string | null
          default_playlist_url?: string | null
          ios_shortcut_name?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: Record<string, never>
    Functions: Record<string, never>
  }
}
