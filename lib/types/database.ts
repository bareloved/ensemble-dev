export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      calendar_connections: {
        Row: {
          access_token: string
          created_at: string | null
          id: string
          last_synced_at: string | null
          provider: string
          provider_calendar_id: string
          refresh_token: string
          sync_enabled: boolean | null
          token_expires_at: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          access_token: string
          created_at?: string | null
          id?: string
          last_synced_at?: string | null
          provider?: string
          provider_calendar_id: string
          refresh_token: string
          sync_enabled?: boolean | null
          token_expires_at: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          access_token?: string
          created_at?: string | null
          id?: string
          last_synced_at?: string | null
          provider?: string
          provider_calendar_id?: string
          refresh_token?: string
          sync_enabled?: boolean | null
          token_expires_at?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      calendar_sync_log: {
        Row: {
          connection_id: string
          external_event_id: string
          gig_id: string | null
          id: string
          sync_direction: string
          synced_at: string | null
        }
        Insert: {
          connection_id: string
          external_event_id: string
          gig_id?: string | null
          id?: string
          sync_direction: string
          synced_at?: string | null
        }
        Update: {
          connection_id?: string
          external_event_id?: string
          gig_id?: string | null
          id?: string
          sync_direction?: string
          synced_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "calendar_sync_log_connection_id_fkey"
            columns: ["connection_id"]
            isOneToOne: false
            referencedRelation: "calendar_connections"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "calendar_sync_log_gig_id_fkey"
            columns: ["gig_id"]
            isOneToOne: false
            referencedRelation: "gigs"
            referencedColumns: ["id"]
          },
        ]
      }
      gig_files: {
        Row: {
          created_at: string
          gig_id: string
          id: string
          label: string
          type: string
          updated_at: string
          url: string
        }
        Insert: {
          created_at?: string
          gig_id: string
          id?: string
          label: string
          type: string
          updated_at?: string
          url: string
        }
        Update: {
          created_at?: string
          gig_id?: string
          id?: string
          label?: string
          type?: string
          updated_at?: string
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "gig_files_gig_id_fkey"
            columns: ["gig_id"]
            isOneToOne: false
            referencedRelation: "gigs"
            referencedColumns: ["id"]
          },
        ]
      }
      gig_invitations: {
        Row: {
          accepted_at: string | null
          created_at: string | null
          email: string
          expires_at: string
          gig_id: string
          gig_role_id: string
          id: string
          status: string | null
          token: string
        }
        Insert: {
          accepted_at?: string | null
          created_at?: string | null
          email: string
          expires_at: string
          gig_id: string
          gig_role_id: string
          id?: string
          status?: string | null
          token: string
        }
        Update: {
          accepted_at?: string | null
          created_at?: string | null
          email?: string
          expires_at?: string
          gig_id?: string
          gig_role_id?: string
          id?: string
          status?: string | null
          token?: string
        }
        Relationships: [
          {
            foreignKeyName: "gig_invitations_gig_id_fkey"
            columns: ["gig_id"]
            isOneToOne: false
            referencedRelation: "gigs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "gig_invitations_gig_role_id_fkey"
            columns: ["gig_role_id"]
            isOneToOne: false
            referencedRelation: "gig_roles"
            referencedColumns: ["id"]
          },
        ]
      }
      gig_role_status_history: {
        Row: {
          changed_at: string | null
          changed_by: string | null
          gig_role_id: string
          id: string
          new_status: string
          notes: string | null
          old_status: string | null
        }
        Insert: {
          changed_at?: string | null
          changed_by?: string | null
          gig_role_id: string
          id?: string
          new_status: string
          notes?: string | null
          old_status?: string | null
        }
        Update: {
          changed_at?: string | null
          changed_by?: string | null
          gig_role_id?: string
          id?: string
          new_status?: string
          notes?: string | null
          old_status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "gig_role_status_history_gig_role_id_fkey"
            columns: ["gig_role_id"]
            isOneToOne: false
            referencedRelation: "gig_roles"
            referencedColumns: ["id"]
          },
        ]
      }
      gig_roles: {
        Row: {
          agreed_fee: number | null
          contact_id: string | null
          created_at: string | null
          currency: string | null
          gig_id: string
          id: string
          invitation_status: string
          musician_id: string | null
          musician_name: string | null
          notes: string | null
          paid_amount: number | null
          paid_at: string | null
          payment_status: string
          player_notes: string | null
          role_name: string
          status_changed_at: string | null
          status_changed_by: string | null
          updated_at: string | null
        }
        Insert: {
          agreed_fee?: number | null
          contact_id?: string | null
          created_at?: string | null
          currency?: string | null
          gig_id: string
          id?: string
          invitation_status?: string
          musician_id?: string | null
          musician_name?: string | null
          notes?: string | null
          paid_amount?: number | null
          paid_at?: string | null
          payment_status?: string
          player_notes?: string | null
          role_name: string
          status_changed_at?: string | null
          status_changed_by?: string | null
          updated_at?: string | null
        }
        Update: {
          agreed_fee?: number | null
          contact_id?: string | null
          created_at?: string | null
          currency?: string | null
          gig_id?: string
          id?: string
          invitation_status?: string
          musician_id?: string | null
          musician_name?: string | null
          notes?: string | null
          paid_amount?: number | null
          paid_at?: string | null
          payment_status?: string
          player_notes?: string | null
          role_name?: string
          status_changed_at?: string | null
          status_changed_by?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "gig_roles_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "musician_contacts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "gig_roles_gig_id_fkey"
            columns: ["gig_id"]
            isOneToOne: false
            referencedRelation: "gigs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "gig_roles_musician_id_fkey"
            columns: ["musician_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      gigs: {
        Row: {
          created_at: string
          date: string
          end_time: string | null
          external_calendar_event_id: string | null
          external_calendar_provider: string | null
          id: string
          imported_from_calendar: boolean | null
          location_address: string | null
          location_name: string | null
          notes: string | null
          project_id: string
          schedule: string | null
          start_time: string | null
          status: string
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          date: string
          end_time?: string | null
          external_calendar_event_id?: string | null
          external_calendar_provider?: string | null
          id?: string
          imported_from_calendar?: boolean | null
          location_address?: string | null
          location_name?: string | null
          notes?: string | null
          project_id: string
          schedule?: string | null
          start_time?: string | null
          status?: string
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          date?: string
          end_time?: string | null
          external_calendar_event_id?: string | null
          external_calendar_provider?: string | null
          id?: string
          imported_from_calendar?: boolean | null
          location_address?: string | null
          location_name?: string | null
          notes?: string | null
          project_id?: string
          schedule?: string | null
          start_time?: string | null
          status?: string
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "gigs_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      musician_contacts: {
        Row: {
          contact_name: string
          created_at: string | null
          default_fee: number | null
          default_roles: string[] | null
          email: string | null
          id: string
          last_worked_date: string | null
          linked_user_id: string | null
          notes: string | null
          phone: string | null
          primary_instrument: string | null
          status: string | null
          times_worked_together: number | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          contact_name: string
          created_at?: string | null
          default_fee?: number | null
          default_roles?: string[] | null
          email?: string | null
          id?: string
          last_worked_date?: string | null
          linked_user_id?: string | null
          notes?: string | null
          phone?: string | null
          primary_instrument?: string | null
          status?: string | null
          times_worked_together?: number | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          contact_name?: string
          created_at?: string | null
          default_fee?: number | null
          default_roles?: string[] | null
          email?: string | null
          id?: string
          last_worked_date?: string | null
          linked_user_id?: string | null
          notes?: string | null
          phone?: string | null
          primary_instrument?: string | null
          status?: string | null
          times_worked_together?: number | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "musician_contacts_linked_user_id_fkey"
            columns: ["linked_user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "musician_contacts_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      notifications: {
        Row: {
          created_at: string | null
          gig_id: string | null
          gig_role_id: string | null
          id: string
          link_url: string | null
          message: string | null
          project_id: string | null
          read_at: string | null
          title: string
          type: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          gig_id?: string | null
          gig_role_id?: string | null
          id?: string
          link_url?: string | null
          message?: string | null
          project_id?: string | null
          read_at?: string | null
          title: string
          type: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          gig_id?: string | null
          gig_role_id?: string | null
          id?: string
          link_url?: string | null
          message?: string | null
          project_id?: string | null
          read_at?: string | null
          title?: string
          type?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "notifications_gig_id_fkey"
            columns: ["gig_id"]
            isOneToOne: false
            referencedRelation: "gigs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notifications_gig_role_id_fkey"
            columns: ["gig_role_id"]
            isOneToOne: false
            referencedRelation: "gig_roles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notifications_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          calendar_ics_token: string | null
          created_at: string
          default_country_code: string | null
          email: string | null
          id: string
          main_instrument: string | null
          name: string | null
          phone: string | null
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          calendar_ics_token?: string | null
          created_at?: string
          default_country_code?: string | null
          email?: string | null
          id: string
          main_instrument?: string | null
          name?: string | null
          phone?: string | null
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          calendar_ics_token?: string | null
          created_at?: string
          default_country_code?: string | null
          email?: string | null
          id?: string
          main_instrument?: string | null
          name?: string | null
          phone?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      projects: {
        Row: {
          cover_image_url: string | null
          created_at: string
          description: string | null
          id: string
          is_personal: boolean | null
          name: string
          owner_id: string
          updated_at: string
        }
        Insert: {
          cover_image_url?: string | null
          created_at?: string
          description?: string | null
          id?: string
          is_personal?: boolean | null
          name: string
          owner_id: string
          updated_at?: string
        }
        Update: {
          cover_image_url?: string | null
          created_at?: string
          description?: string | null
          id?: string
          is_personal?: boolean | null
          name?: string
          owner_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "projects_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      setlist_items: {
        Row: {
          bpm: number | null
          created_at: string | null
          gig_id: string
          id: string
          key: string | null
          notes: string | null
          position: number
          title: string
          updated_at: string | null
        }
        Insert: {
          bpm?: number | null
          created_at?: string | null
          gig_id: string
          id?: string
          key?: string | null
          notes?: string | null
          position: number
          title: string
          updated_at?: string | null
        }
        Update: {
          bpm?: number | null
          created_at?: string | null
          gig_id?: string
          id?: string
          key?: string | null
          notes?: string | null
          position?: number
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "setlist_items_gig_id_fkey"
            columns: ["gig_id"]
            isOneToOne: false
            referencedRelation: "gigs"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      expire_old_invitations: { Args: never; Returns: undefined }
      fn_can_insert_gig: {
        Args: { check_owner_id: string; check_project_id: string }
        Returns: boolean
      }
      fn_can_update_gig_role: {
        Args: {
          check_gig_id: string
          check_musician_id: string
          check_role_id: string
        }
        Returns: boolean
      }
      fn_is_gig_musician: { Args: { check_gig_id: string }; Returns: boolean }
      fn_is_gig_owner: { Args: { check_gig_id: string }; Returns: boolean }
      fn_is_project_owner: {
        Args: { check_project_id: string }
        Returns: boolean
      }
      fn_is_project_participant: {
        Args: { check_project_id: string }
        Returns: boolean
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
