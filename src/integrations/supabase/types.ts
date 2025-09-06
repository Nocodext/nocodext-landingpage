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
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      nocode_saas_asset: {
        Row: {
          color_rgb: string | null
          created_at: string
          icon_url: string | null
          id: number
          name: string | null
        }
        Insert: {
          color_rgb?: string | null
          created_at?: string
          icon_url?: string | null
          id?: number
          name?: string | null
        }
        Update: {
          color_rgb?: string | null
          created_at?: string
          icon_url?: string | null
          id?: number
          name?: string | null
        }
        Relationships: []
      }
      pinnpm_packages: {
        Row: {
          created_at: string | null
          days_since_update: number | null
          description: string | null
          downloads: string | null
          has_typescript: boolean | null
          id: string
          is_deprecated: boolean | null
          keywords: string[] | null
          last_npm_fetch: string | null
          maintenance_last_checked: string | null
          maintenance_score: number | null
          name: string
          npms_final_score: number | null
          pin_count: number | null
          popularity_score: number | null
          quality_score: number | null
          security_details: Json | null
          security_last_checked: string | null
          security_score: number | null
          tag: string
          trust_level: string | null
          trust_score: number | null
          updated_at: string | null
          weekly_downloads: number | null
        }
        Insert: {
          created_at?: string | null
          days_since_update?: number | null
          description?: string | null
          downloads?: string | null
          has_typescript?: boolean | null
          id?: string
          is_deprecated?: boolean | null
          keywords?: string[] | null
          last_npm_fetch?: string | null
          maintenance_last_checked?: string | null
          maintenance_score?: number | null
          name: string
          npms_final_score?: number | null
          pin_count?: number | null
          popularity_score?: number | null
          quality_score?: number | null
          security_details?: Json | null
          security_last_checked?: string | null
          security_score?: number | null
          tag?: string
          trust_level?: string | null
          trust_score?: number | null
          updated_at?: string | null
          weekly_downloads?: number | null
        }
        Update: {
          created_at?: string | null
          days_since_update?: number | null
          description?: string | null
          downloads?: string | null
          has_typescript?: boolean | null
          id?: string
          is_deprecated?: boolean | null
          keywords?: string[] | null
          last_npm_fetch?: string | null
          maintenance_last_checked?: string | null
          maintenance_score?: number | null
          name?: string
          npms_final_score?: number | null
          pin_count?: number | null
          popularity_score?: number | null
          quality_score?: number | null
          security_details?: Json | null
          security_last_checked?: string | null
          security_score?: number | null
          tag?: string
          trust_level?: string | null
          trust_score?: number | null
          updated_at?: string | null
          weekly_downloads?: number | null
        }
        Relationships: []
      }
      pinnpm_user_favorites: {
        Row: {
          comments: string | null
          created_at: string | null
          id: string
          package_id: string
          user_id: string | null
        }
        Insert: {
          comments?: string | null
          created_at?: string | null
          id?: string
          package_id: string
          user_id?: string | null
        }
        Update: {
          comments?: string | null
          created_at?: string | null
          id?: string
          package_id?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "pinnpm_fk_user_favorites_package_id"
            columns: ["package_id"]
            isOneToOne: false
            referencedRelation: "pinnpm_packages"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pinnpm_fk_user_favorites_package_id"
            columns: ["package_id"]
            isOneToOne: false
            referencedRelation: "pinnpm_view_popular_packages"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pinnpm_fk_user_favorites_package_id"
            columns: ["package_id"]
            isOneToOne: false
            referencedRelation: "pinnpm_view_user_favorites"
            referencedColumns: ["package_id"]
          },
        ]
      }
      pinnpm_user_preferences: {
        Row: {
          created_at: string | null
          id: string
          settings: Json
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          settings?: Json
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          settings?: Json
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      stripe_customers: {
        Row: {
          created_at: string | null
          customer_id: string
          deleted_at: string | null
          id: number
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          customer_id: string
          deleted_at?: string | null
          id?: never
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          customer_id?: string
          deleted_at?: string | null
          id?: never
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      stripe_orders: {
        Row: {
          amount_subtotal: number
          amount_total: number
          checkout_session_id: string
          created_at: string | null
          currency: string
          customer_id: string
          deleted_at: string | null
          id: number
          payment_intent_id: string
          payment_status: string
          status: Database["public"]["Enums"]["stripe_order_status"]
          updated_at: string | null
        }
        Insert: {
          amount_subtotal: number
          amount_total: number
          checkout_session_id: string
          created_at?: string | null
          currency: string
          customer_id: string
          deleted_at?: string | null
          id?: never
          payment_intent_id: string
          payment_status: string
          status?: Database["public"]["Enums"]["stripe_order_status"]
          updated_at?: string | null
        }
        Update: {
          amount_subtotal?: number
          amount_total?: number
          checkout_session_id?: string
          created_at?: string | null
          currency?: string
          customer_id?: string
          deleted_at?: string | null
          id?: never
          payment_intent_id?: string
          payment_status?: string
          status?: Database["public"]["Enums"]["stripe_order_status"]
          updated_at?: string | null
        }
        Relationships: []
      }
      stripe_subscriptions: {
        Row: {
          cancel_at_period_end: boolean | null
          created_at: string | null
          current_period_end: number | null
          current_period_start: number | null
          customer_id: string
          deleted_at: string | null
          id: number
          payment_method_brand: string | null
          payment_method_last4: string | null
          price_id: string | null
          status: Database["public"]["Enums"]["stripe_subscription_status"]
          subscription_id: string | null
          updated_at: string | null
        }
        Insert: {
          cancel_at_period_end?: boolean | null
          created_at?: string | null
          current_period_end?: number | null
          current_period_start?: number | null
          customer_id: string
          deleted_at?: string | null
          id?: never
          payment_method_brand?: string | null
          payment_method_last4?: string | null
          price_id?: string | null
          status: Database["public"]["Enums"]["stripe_subscription_status"]
          subscription_id?: string | null
          updated_at?: string | null
        }
        Update: {
          cancel_at_period_end?: boolean | null
          created_at?: string | null
          current_period_end?: number | null
          current_period_start?: number | null
          customer_id?: string
          deleted_at?: string | null
          id?: never
          payment_method_brand?: string | null
          payment_method_last4?: string | null
          price_id?: string | null
          status?: Database["public"]["Enums"]["stripe_subscription_status"]
          subscription_id?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      pinnpm_view_package_stats: {
        Row: {
          avg_pins_per_package: number | null
          max_pins: number | null
          package_count: number | null
          tag: string | null
          total_pins: number | null
        }
        Relationships: []
      }
      pinnpm_view_popular_packages: {
        Row: {
          created_at: string | null
          description: string | null
          downloads: string | null
          id: string | null
          keywords: string[] | null
          name: string | null
          pin_count: number | null
          tag: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          downloads?: string | null
          id?: string | null
          keywords?: string[] | null
          name?: string | null
          pin_count?: number | null
          tag?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          downloads?: string | null
          id?: string | null
          keywords?: string[] | null
          name?: string | null
          pin_count?: number | null
          tag?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      pinnpm_view_user_favorites: {
        Row: {
          description: string | null
          downloads: string | null
          keywords: string[] | null
          maintenance_last_checked: string | null
          maintenance_score: number | null
          package_id: string | null
          package_name: string | null
          package_tag: string | null
          pin_count: number | null
          pinned_at: string | null
          security_last_checked: string | null
          security_score: number | null
          user_id: string | null
        }
        Relationships: []
      }
      stripe_user_orders: {
        Row: {
          amount_subtotal: number | null
          amount_total: number | null
          checkout_session_id: string | null
          currency: string | null
          customer_id: string | null
          order_date: string | null
          order_id: number | null
          order_status:
            | Database["public"]["Enums"]["stripe_order_status"]
            | null
          payment_intent_id: string | null
          payment_status: string | null
        }
        Relationships: []
      }
      stripe_user_subscriptions: {
        Row: {
          cancel_at_period_end: boolean | null
          current_period_end: number | null
          current_period_start: number | null
          customer_id: string | null
          payment_method_brand: string | null
          payment_method_last4: string | null
          price_id: string | null
          subscription_id: string | null
          subscription_status:
            | Database["public"]["Enums"]["stripe_subscription_status"]
            | null
        }
        Relationships: []
      }
    }
    Functions: {
      pinnpm_add_user_favorite: {
        Args: {
          downloads_param: string
          package_name_param: string
          package_tag_param: string
          user_id_param: string
        }
        Returns: {
          downloads: string
          id: string
          package_name: string
          package_tag: string
          pinned_at: string
          user_id: string
        }[]
      }
      pinnpm_get_user_favorites: {
        Args: { user_id_param: string }
        Returns: {
          downloads: string
          id: string
          package_name: string
          package_tag: string
          pinned_at: string
          user_id: string
        }[]
      }
      pinnpm_get_user_preferences: {
        Args: { user_id_param: string }
        Returns: {
          created_at: string
          id: string
          settings: Json
          updated_at: string
          user_id: string
        }[]
      }
      pinnpm_remove_user_favorite: {
        Args: { package_name_param: string; user_id_param: string }
        Returns: boolean
      }
      pinnpm_upsert_user_preferences: {
        Args: { settings_param: Json; user_id_param: string }
        Returns: Json
      }
    }
    Enums: {
      stripe_order_status: "pending" | "completed" | "canceled"
      stripe_subscription_status:
        | "not_started"
        | "incomplete"
        | "incomplete_expired"
        | "trialing"
        | "active"
        | "past_due"
        | "canceled"
        | "unpaid"
        | "paused"
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
      stripe_order_status: ["pending", "completed", "canceled"],
      stripe_subscription_status: [
        "not_started",
        "incomplete",
        "incomplete_expired",
        "trialing",
        "active",
        "past_due",
        "canceled",
        "unpaid",
        "paused",
      ],
    },
  },
} as const
