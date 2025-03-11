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
      Assets: {
        Row: {
          caption: string
          id: string
          name: string | null
          path: string
          size: string | null
          type: string | null
          upload_date: string
        }
        Insert: {
          caption: string
          id?: string
          name?: string | null
          path: string
          size?: string | null
          type?: string | null
          upload_date?: string
        }
        Update: {
          caption?: string
          id?: string
          name?: string | null
          path?: string
          size?: string | null
          type?: string | null
          upload_date?: string
        }
        Relationships: []
      }
      AssetSize: {
        Row: {
          id: number
          size: string
        }
        Insert: {
          id?: number
          size: string
        }
        Update: {
          id?: number
          size?: string
        }
        Relationships: []
      }
      AssetType: {
        Row: {
          id: number
          type: string
        }
        Insert: {
          id?: number
          type: string
        }
        Update: {
          id?: number
          type?: string
        }
        Relationships: []
      }
      Blog: {
        Row: {
          creation_date: string
          id: string
          name: string
          post_count: number | null
        }
        Insert: {
          creation_date?: string
          id?: string
          name: string
          post_count?: number | null
        }
        Update: {
          creation_date?: string
          id?: string
          name?: string
          post_count?: number | null
        }
        Relationships: []
      }
      Posts: {
        Row: {
          content: string | null
          creation_date: string
          header: string | null
          id: string
          owner_email: string | null
          url_pathname: string
        }
        Insert: {
          content?: string | null
          creation_date?: string
          header?: string | null
          id?: string
          owner_email?: string | null
          url_pathname: string
        }
        Update: {
          content?: string | null
          creation_date?: string
          header?: string | null
          id?: string
          owner_email?: string | null
          url_pathname?: string
        }
        Relationships: [
          {
            foreignKeyName: "Posts_owner_email_fkey"
            columns: ["owner_email"]
            isOneToOne: false
            referencedRelation: "User"
            referencedColumns: ["email"]
          },
        ]
      }
      PostTags: {
        Row: {
          id: number
          post_id: string
          tag_id: string
        }
        Insert: {
          id?: number
          post_id?: string
          tag_id?: string
        }
        Update: {
          id?: number
          post_id?: string
          tag_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "PostTag_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "Posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "PostTag_tag_id_fkey"
            columns: ["tag_id"]
            isOneToOne: false
            referencedRelation: "Tag"
            referencedColumns: ["id"]
          },
        ]
      }
      Tag: {
        Row: {
          id: string
          tag_name: string
        }
        Insert: {
          id?: string
          tag_name: string
        }
        Update: {
          id?: string
          tag_name?: string
        }
        Relationships: []
      }
      User: {
        Row: {
          created_at: string
          email: string
          id: string
          name: string
          password: string
          username: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          name: string
          password: string
          username: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          name?: string
          password?: string
          username?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
