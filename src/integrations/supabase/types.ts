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
      bookings: {
        Row: {
          amount_paid: number | null
          booked_at: string
          created_at: string
          gym_id: string
          id: string
          payment_status: Database["public"]["Enums"]["payment_status"] | null
          status: Database["public"]["Enums"]["booking_status"] | null
          tax_amount: number | null
          time_slot_id: string
          total_amount: number | null
          user_id: string
        }
        Insert: {
          amount_paid?: number | null
          booked_at?: string
          created_at?: string
          gym_id: string
          id?: string
          payment_status?: Database["public"]["Enums"]["payment_status"] | null
          status?: Database["public"]["Enums"]["booking_status"] | null
          tax_amount?: number | null
          time_slot_id: string
          total_amount?: number | null
          user_id: string
        }
        Update: {
          amount_paid?: number | null
          booked_at?: string
          created_at?: string
          gym_id?: string
          id?: string
          payment_status?: Database["public"]["Enums"]["payment_status"] | null
          status?: Database["public"]["Enums"]["booking_status"] | null
          tax_amount?: number | null
          time_slot_id?: string
          total_amount?: number | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "bookings_gym_id_fkey"
            columns: ["gym_id"]
            isOneToOne: false
            referencedRelation: "gyms"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookings_time_slot_id_fkey"
            columns: ["time_slot_id"]
            isOneToOne: false
            referencedRelation: "time_slots"
            referencedColumns: ["id"]
          },
        ]
      }
      gym_time_segments: {
        Row: {
          closing_time: string
          created_at: string
          gym_id: string
          id: string
          opening_time: string
          price_per_slot: number
        }
        Insert: {
          closing_time: string
          created_at?: string
          gym_id: string
          id?: string
          opening_time: string
          price_per_slot: number
        }
        Update: {
          closing_time?: string
          created_at?: string
          gym_id?: string
          id?: string
          opening_time?: string
          price_per_slot?: number
        }
        Relationships: [
          {
            foreignKeyName: "gym_time_segments_gym_id_fkey"
            columns: ["gym_id"]
            isOneToOne: false
            referencedRelation: "gyms"
            referencedColumns: ["id"]
          },
        ]
      }
      gyms: {
        Row: {
          address: string
          amenities: string[] | null
          available_slots: number | null
          city: string
          created_at: string
          description: string | null
          featured: boolean | null
          id: string
          image_url: string | null
          latitude: number | null
          longitude: number | null
          name: string
          opening_hours_from: string | null
          opening_hours_to: string | null
          owner_id: string
          rating: number | null
          status: Database["public"]["Enums"]["gym_status"] | null
          updated_at: string
          zip_code: string | null
        }
        Insert: {
          address: string
          amenities?: string[] | null
          available_slots?: number | null
          city: string
          created_at?: string
          description?: string | null
          featured?: boolean | null
          id?: string
          image_url?: string | null
          latitude?: number | null
          longitude?: number | null
          name: string
          opening_hours_from?: string | null
          opening_hours_to?: string | null
          owner_id: string
          rating?: number | null
          status?: Database["public"]["Enums"]["gym_status"] | null
          updated_at?: string
          zip_code?: string | null
        }
        Update: {
          address?: string
          amenities?: string[] | null
          available_slots?: number | null
          city?: string
          created_at?: string
          description?: string | null
          featured?: boolean | null
          id?: string
          image_url?: string | null
          latitude?: number | null
          longitude?: number | null
          name?: string
          opening_hours_from?: string | null
          opening_hours_to?: string | null
          owner_id?: string
          rating?: number | null
          status?: Database["public"]["Enums"]["gym_status"] | null
          updated_at?: string
          zip_code?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          email: string
          full_name: string | null
          id: string
          phone: string | null
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          email: string
          full_name?: string | null
          id: string
          phone?: string | null
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          email?: string
          full_name?: string | null
          id?: string
          phone?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      time_slots: {
        Row: {
          available_spots: number | null
          created_at: string
          date: string
          duration_minutes: number | null
          end_time: string
          featured: boolean | null
          gym_id: string
          id: string
          price: number
          start_time: string
          total_spots: number | null
        }
        Insert: {
          available_spots?: number | null
          created_at?: string
          date: string
          duration_minutes?: number | null
          end_time: string
          featured?: boolean | null
          gym_id: string
          id?: string
          price: number
          start_time: string
          total_spots?: number | null
        }
        Update: {
          available_spots?: number | null
          created_at?: string
          date?: string
          duration_minutes?: number | null
          end_time?: string
          featured?: boolean | null
          gym_id?: string
          id?: string
          price?: number
          start_time?: string
          total_spots?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "time_slots_gym_id_fkey"
            columns: ["gym_id"]
            isOneToOne: false
            referencedRelation: "gyms"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "gym_user" | "gym_owner"
      booking_status: "confirmed" | "cancelled" | "completed"
      gym_status: "pending" | "approved" | "rejected"
      payment_status: "pending" | "paid" | "refunded"
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
    Enums: {
      app_role: ["gym_user", "gym_owner"],
      booking_status: ["confirmed", "cancelled", "completed"],
      gym_status: ["pending", "approved", "rejected"],
      payment_status: ["pending", "paid", "refunded"],
    },
  },
} as const
