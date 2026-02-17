export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      activity_logs: {
        Row: {
          id: string
          organization_id: string
          user_id: string | null
          action: string
          resource_type: string | null
          resource_id: string | null
          details: Json | null
          created_at: string
        }
        Insert: {
          id?: string
          organization_id: string
          user_id?: string | null
          action: string
          resource_type?: string | null
          resource_id?: string | null
          details?: Json | null
          created_at?: string
        }
        Update: {
          id?: string
          organization_id?: string
          user_id?: string | null
          action?: string
          resource_type?: string | null
          resource_id?: string | null
          details?: Json | null
          created_at?: string
        }
      }
      deliverable_templates: {
        Row: {
          id: string
          organization_id: string | null
          package_tier: 'bronze' | 'silver' | 'gold' | 'platinum' | 'custom' | null
          title: string
          description: string | null
          days_before_event: number | null
          priority: 'low' | 'medium' | 'high' | 'critical' | null
          is_active: boolean | null
          created_at: string
        }
        Insert: {
          id?: string
          organization_id?: string | null
          package_tier?: 'bronze' | 'silver' | 'gold' | 'platinum' | 'custom' | null
          title: string
          description?: string | null
          days_before_event?: number | null
          priority?: 'low' | 'medium' | 'high' | 'critical' | null
          is_active?: boolean | null
          created_at?: string
        }
        Update: {
          id?: string
          organization_id?: string | null
          package_tier?: 'bronze' | 'silver' | 'gold' | 'platinum' | 'custom' | null
          title?: string
          description?: string | null
          days_before_event?: number | null
          priority?: 'low' | 'medium' | 'high' | 'critical' | null
          is_active?: boolean | null
          created_at?: string
        }
      }
      deliverables: {
        Row: {
          id: string
          sponsor_id: string
          title: string
          description: string | null
          due_date: string
          status: 'pending' | 'in_progress' | 'completed' | 'overdue' | 'blocked' | 'cancelled'
          priority: 'low' | 'medium' | 'high' | 'critical' | null
          assigned_to: string | null
          completion_notes: string | null
          completion_evidence_url: string | null
          reminder_sent_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          sponsor_id: string
          title: string
          description?: string | null
          due_date: string
          status?: 'pending' | 'in_progress' | 'completed' | 'overdue' | 'blocked' | 'cancelled'
          priority?: 'low' | 'medium' | 'high' | 'critical' | null
          assigned_to?: string | null
          completion_notes?: string | null
          completion_evidence_url?: string | null
          reminder_sent_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          sponsor_id?: string
          title?: string
          description?: string | null
          due_date?: string
          status?: 'pending' | 'in_progress' | 'completed' | 'overdue' | 'blocked' | 'cancelled'
          priority?: 'low' | 'medium' | 'high' | 'critical' | null
          assigned_to?: string | null
          completion_notes?: string | null
          completion_evidence_url?: string | null
          reminder_sent_at?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      events: {
        Row: {
          id: string
          organization_id: string
          name: string
          description: string | null
          event_date: string | null
          location: string | null
          status: string | null
          created_by: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          organization_id: string
          name: string
          description?: string | null
          event_date?: string | null
          location?: string | null
          status?: string | null
          created_by?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          organization_id?: string
          name?: string
          description?: string | null
          event_date?: string | null
          location?: string | null
          status?: string | null
          created_by?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      organization_subscriptions: {
        Row: {
          id: string
          organization_id: string
          plan_id: string | null
          stripe_subscription_id: string | null
          status: 'active' | 'inactive' | 'past_due' | 'canceled' | 'trialing' | null
          current_period_start: string | null
          current_period_end: string | null
          trial_end: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          organization_id: string
          plan_id?: string | null
          stripe_subscription_id?: string | null
          status?: 'active' | 'inactive' | 'past_due' | 'canceled' | 'trialing' | null
          current_period_start?: string | null
          current_period_end?: string | null
          trial_end?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          organization_id?: string
          plan_id?: string | null
          stripe_subscription_id?: string | null
          status?: 'active' | 'inactive' | 'past_due' | 'canceled' | 'trialing' | null
          current_period_start?: string | null
          current_period_end?: string | null
          trial_end?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      organizations: {
        Row: {
          id: string
          name: string
          slug: string
          description: string | null
          website: string | null
          logo_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          description?: string | null
          website?: string | null
          logo_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          description?: string | null
          website?: string | null
          logo_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      profiles: {
        Row: {
          id: string
          organization_id: string | null
          email: string
          full_name: string | null
          avatar_url: string | null
          role: string | null
          is_active: boolean | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          organization_id?: string | null
          email: string
          full_name?: string | null
          avatar_url?: string | null
          role?: string | null
          is_active?: boolean | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          organization_id?: string | null
          email?: string
          full_name?: string | null
          avatar_url?: string | null
          role?: string | null
          is_active?: boolean | null
          created_at?: string
          updated_at?: string
        }
      }
      reminder_settings: {
        Row: {
          id: string
          organization_id: string
          deliverable_template_id: string | null
          days_before_due: number[] | null
          email_template: string | null
          is_active: boolean | null
          created_at: string
        }
        Insert: {
          id?: string
          organization_id: string
          deliverable_template_id?: string | null
          days_before_due?: number[] | null
          email_template?: string | null
          is_active?: boolean | null
          created_at?: string
        }
        Update: {
          id?: string
          organization_id?: string
          deliverable_template_id?: string | null
          days_before_due?: number[] | null
          email_template?: string | null
          is_active?: boolean | null
          created_at?: string
        }
      }
      sponsor_package_templates: {
        Row: {
          id: string
          organization_id: string
          name: string
          tier: 'bronze' | 'silver' | 'gold' | 'platinum' | 'custom'
          price: number | null
          description: string | null
          benefits: Json | null
          deliverables_template: Json | null
          is_active: boolean | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          organization_id: string
          name: string
          tier: 'bronze' | 'silver' | 'gold' | 'platinum' | 'custom'
          price?: number | null
          description?: string | null
          benefits?: Json | null
          deliverables_template?: Json | null
          is_active?: boolean | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          organization_id?: string
          name?: string
          tier?: 'bronze' | 'silver' | 'gold' | 'platinum' | 'custom'
          price?: number | null
          description?: string | null
          benefits?: Json | null
          deliverables_template?: Json | null
          is_active?: boolean | null
          created_at?: string
          updated_at?: string
        }
      }
      sponsors: {
        Row: {
          id: string
          organization_id: string
          event_id: string
          company_name: string
          contact_name: string | null
          contact_email: string | null
          contact_phone: string | null
          website: string | null
          logo_url: string | null
          package_template_id: string | null
          custom_package_details: Json | null
          contract_value: number | null
          payment_status: string | null
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          organization_id: string
          event_id: string
          company_name: string
          contact_name?: string | null
          contact_email?: string | null
          contact_phone?: string | null
          website?: string | null
          logo_url?: string | null
          package_template_id?: string | null
          custom_package_details?: Json | null
          contract_value?: number | null
          payment_status?: string | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          organization_id?: string
          event_id?: string
          company_name?: string
          contact_name?: string | null
          contact_email?: string | null
          contact_phone?: string | null
          website?: string | null
          logo_url?: string | null
          package_template_id?: string | null
          custom_package_details?: Json | null
          contract_value?: number | null
          payment_status?: string | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      subscription_plans: {
        Row: {
          id: string
          name: string
          description: string | null
          price_monthly: number
          price_yearly: number | null
          max_events: number | null
          max_sponsors: number | null
          max_users: number | null
          features: Json | null
          is_active: boolean | null
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          price_monthly: number
          price_yearly?: number | null
          max_events?: number | null
          max_sponsors?: number | null
          max_users?: number | null
          features?: Json | null
          is_active?: boolean | null
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          price_monthly?: number
          price_yearly?: number | null
          max_events?: number | null
          max_sponsors?: number | null
          max_users?: number | null
          features?: Json | null
          is_active?: boolean | null
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_deliverable_risk_status: {
        Args: {
          due_date: string
          status: 'pending' | 'in_progress' | 'completed' | 'overdue' | 'blocked' | 'cancelled'
        }
        Returns: string
      }
    }
    Enums: {
      deliverable_status: 'pending' | 'in_progress' | 'completed' | 'overdue' | 'blocked' | 'cancelled'
      package_tier: 'bronze' | 'silver' | 'gold' | 'platinum' | 'custom'
      priority_level: 'low' | 'medium' | 'high' | 'critical'
      subscription_status: 'active' | 'inactive' | 'past_due' | 'canceled' | 'trialing'
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}