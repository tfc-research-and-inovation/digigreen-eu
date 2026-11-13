
export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export type Database = {
  
  "graphql_public": {
          Tables: {
            [_ in never]: never
          }
          Views: {
            [_ in never]: never
          }
          Functions: {
            "graphql":
{ Args: { "extensions"?: Json,"operationName"?: string,"query"?: string,"variables"?: Json }; Returns: Json
                           }
          }
          Enums: {
            [_ in never]: never
          }
          CompositeTypes: {
            [_ in never]: never
          }
        },"public": {
          Tables: {
            "events": {
                  Row: {
                    "created_at": string,"description": string | null,"event_date": string,"event_time": string | null,"event_type": string | null,"id": string,"is_upcoming": boolean,"location": string | null,"registration_url": string | null,"title": string,"updated_at": string,"url": string | null
                  }
                  ComputedFields: never
                  Insert: {
                    "created_at"?: string,"description"?: string | null,"event_date": string,"event_time"?: string | null,"event_type"?: string | null,"id"?: string,"is_upcoming"?: boolean,"location"?: string | null,"registration_url"?: string | null,"title": string,"updated_at"?: string,"url"?: string | null
                  }
                  Update: {
                    "created_at"?: string,"description"?: string | null,"event_date"?: string,"event_time"?: string | null,"event_type"?: string | null,"id"?: string,"is_upcoming"?: boolean,"location"?: string | null,"registration_url"?: string | null,"title"?: string,"updated_at"?: string,"url"?: string | null
                  }
                  Relationships: [
                    
                  ]
                },"news": {
                  Row: {
                    "content": string | null,"created_at": string,"excerpt": string,"id": string,"image_alt": string | null,"image_url": string | null,"is_archived": boolean,"is_published": boolean,"publish_date": string,"tags": (string)[],"title": string,"updated_at": string
                  }
                  ComputedFields: never
                  Insert: {
                    "content"?: string | null,"created_at"?: string,"excerpt": string,"id"?: string,"image_alt"?: string | null,"image_url"?: string | null,"is_archived"?: boolean,"is_published"?: boolean,"publish_date": string,"tags"?: (string)[],"title": string,"updated_at"?: string
                  }
                  Update: {
                    "content"?: string | null,"created_at"?: string,"excerpt"?: string,"id"?: string,"image_alt"?: string | null,"image_url"?: string | null,"is_archived"?: boolean,"is_published"?: boolean,"publish_date"?: string,"tags"?: (string)[],"title"?: string,"updated_at"?: string
                  }
                  Relationships: [
                    
                  ]
                },"organizations": {
                  Row: {
                    "country": string | null,"created_at": string,"description": string | null,"id": string,"is_published": boolean,"logo_url": string | null,"name": string,"sort_order": number,"updated_at": string,"website": string | null
                  }
                  ComputedFields: never
                  Insert: {
                    "country"?: string | null,"created_at"?: string,"description"?: string | null,"id"?: string,"is_published"?: boolean,"logo_url"?: string | null,"name": string,"sort_order"?: number,"updated_at"?: string,"website"?: string | null
                  }
                  Update: {
                    "country"?: string | null,"created_at"?: string,"description"?: string | null,"id"?: string,"is_published"?: boolean,"logo_url"?: string | null,"name"?: string,"sort_order"?: number,"updated_at"?: string,"website"?: string | null
                  }
                  Relationships: [
                    
                  ]
                },"partners": {
                  Row: {
                    "acronym": string,"country": string,"created_at": string,"description": string | null,"id": string,"is_coordinator": boolean,"logo_url": string | null,"name": string,"sort_order": number,"updated_at": string,"website": string | null
                  }
                  ComputedFields: never
                  Insert: {
                    "acronym": string,"country": string,"created_at"?: string,"description"?: string | null,"id"?: string,"is_coordinator"?: boolean,"logo_url"?: string | null,"name": string,"sort_order"?: number,"updated_at"?: string,"website"?: string | null
                  }
                  Update: {
                    "acronym"?: string,"country"?: string,"created_at"?: string,"description"?: string | null,"id"?: string,"is_coordinator"?: boolean,"logo_url"?: string | null,"name"?: string,"sort_order"?: number,"updated_at"?: string,"website"?: string | null
                  }
                  Relationships: [
                    
                  ]
                },"resources": {
                  Row: {
                    "authors": string | null,"belongs_to_project": string | null,"created_at": string,"deliverable_number": string | null,"description": string | null,"file_url": string,"hide_publish_day": boolean,"id": string,"is_published": boolean,"publish_date": string | null,"resource_type": string,"title": string,"updated_at": string,"work_package": string | null
                  }
                  ComputedFields: never
                  Insert: {
                    "authors"?: string | null,"belongs_to_project"?: string | null,"created_at"?: string,"deliverable_number"?: string | null,"description"?: string | null,"file_url": string,"hide_publish_day"?: boolean,"id"?: string,"is_published"?: boolean,"publish_date"?: string | null,"resource_type": string,"title": string,"updated_at"?: string,"work_package"?: string | null
                  }
                  Update: {
                    "authors"?: string | null,"belongs_to_project"?: string | null,"created_at"?: string,"deliverable_number"?: string | null,"description"?: string | null,"file_url"?: string,"hide_publish_day"?: boolean,"id"?: string,"is_published"?: boolean,"publish_date"?: string | null,"resource_type"?: string,"title"?: string,"updated_at"?: string,"work_package"?: string | null
                  }
                  Relationships: [
                    
                  ]
                },"sister_projects": {
                  Row: {
                    "belongs_to_project": string | null,"contact_email": string | null,"contact_name": string | null,"created_at": string,"description": string,"featured_only": boolean,"id": string,"is_coordinator": boolean,"is_featured": boolean,"logo_url": string | null,"name": string,"sort_order": number,"status": string,"tags": (string)[],"updated_at": string,"website": string | null
                  }
                  ComputedFields: never
                  Insert: {
                    "belongs_to_project"?: string | null,"contact_email"?: string | null,"contact_name"?: string | null,"created_at"?: string,"description": string,"featured_only"?: boolean,"id"?: string,"is_coordinator"?: boolean,"is_featured"?: boolean,"logo_url"?: string | null,"name": string,"sort_order"?: number,"status": string,"tags"?: (string)[],"updated_at"?: string,"website"?: string | null
                  }
                  Update: {
                    "belongs_to_project"?: string | null,"contact_email"?: string | null,"contact_name"?: string | null,"created_at"?: string,"description"?: string,"featured_only"?: boolean,"id"?: string,"is_coordinator"?: boolean,"is_featured"?: boolean,"logo_url"?: string | null,"name"?: string,"sort_order"?: number,"status"?: string,"tags"?: (string)[],"updated_at"?: string,"website"?: string | null
                  }
                  Relationships: [
                    
                  ]
                },"tools": {
                  Row: {
                    "created_at": string,"description": string | null,"id": string,"is_published": boolean,"sort_order": number,"title": string,"updated_at": string,"url": string
                  }
                  ComputedFields: never
                  Insert: {
                    "created_at"?: string,"description"?: string | null,"id"?: string,"is_published"?: boolean,"sort_order"?: number,"title": string,"updated_at"?: string,"url": string
                  }
                  Update: {
                    "created_at"?: string,"description"?: string | null,"id"?: string,"is_published"?: boolean,"sort_order"?: number,"title"?: string,"updated_at"?: string,"url"?: string
                  }
                  Relationships: [
                    
                  ]
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

type DatabaseWithoutInternals = Omit<Database, '__InternalSupabase'>

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
    : never = never
> = DefaultSchemaTableNameOrOptions extends { schema: keyof DatabaseWithoutInternals }
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
  ? (DefaultSchema["Tables"] & DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
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
    : never = never
> = DefaultSchemaTableNameOrOptions extends { schema: keyof DatabaseWithoutInternals }
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
    : never = never
> = DefaultSchemaTableNameOrOptions extends { schema: keyof DatabaseWithoutInternals }
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
    : never = never
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof DatabaseWithoutInternals }
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
    : never = never
> = PublicCompositeTypeNameOrOptions extends { schema: keyof DatabaseWithoutInternals }
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
  ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
  : never

export const Constants = {
  "graphql_public": {
          Enums: {
            
          }
        },"public": {
          Enums: {
            
          }
        }
} as const
