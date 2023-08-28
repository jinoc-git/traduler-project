export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      book_mark: {
        Row: {
          created_at: string;
          id: string;
          plan_id: string;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          plan_id: string;
          user_id: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          plan_id?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'book_mark_plan_id_fkey';
            columns: ['plan_id'];
            referencedRelation: 'plans';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'book_mark_user_id_fkey';
            columns: ['user_id'];
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
      comments: {
        Row: {
          content: string;
          created_at: string;
          id: string;
          plan_id: string;
          user_id: string;
        };
        Insert: {
          content: string;
          created_at: string;
          id: string;
          plan_id: string;
          user_id: string;
        };
        Update: {
          content?: string;
          created_at?: string;
          id?: string;
          plan_id?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'comments_plan_id_fkey';
            columns: ['plan_id'];
            referencedRelation: 'plans';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'comments_user_id_fkey';
            columns: ['user_id'];
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
      pins: {
        Row: {
          contents: Json[];
          date: string;
          id: string;
          plan_id: string;
        };
        Insert: {
          contents: Json[];
          date: string;
          id?: string;
          plan_id: string;
        };
        Update: {
          contents?: Json[];
          date?: string;
          id?: string;
          plan_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'pins_plan_id_fkey';
            columns: ['plan_id'];
            referencedRelation: 'plans';
            referencedColumns: ['id'];
          },
        ];
      };
      plans: {
        Row: {
          created_at: string;
          dates: string[];
          id: string;
          isDeleted: boolean;
          pictures: string[];
          plan_state: 'planning' | 'traveling' | 'end';
          title: string;
          total_cost: number;
          users_id: string;
        };
        Insert: {
          created_at?: string;
          dates: string[];
          id: string;
          isDeleted: boolean;
          pictures?: string[];
          plan_state: 'planning' | 'traveling' | 'end';
          title: string;
          total_cost: number;
          users_id: string;
        };
        Update: {
          created_at?: string;
          dates?: string[];
          id?: string;
          isDeleted?: boolean;
          pictures?: string[];
          plan_state?: 'planning' | 'traveling' | 'end';
          title?: string;
          total_cost?: number;
          users_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'plans_users_id_fkey';
            columns: ['users_id'];
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
      users: {
        Row: {
          avatar_url: string | null;
          created_at: string;
          email: string;
          id: string;
          nickname: string;
        };
        Insert: {
          avatar_url?: string | null;
          created_at?: string;
          email: string;
          id: string;
          nickname: string;
        };
        Update: {
          avatar_url?: string | null;
          created_at?: string;
          email?: string;
          id?: string;
          nickname?: string;
        };

        Relationships: [
          {
            foreignKeyName: 'users_id_fkey';
            columns: ['id'];
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}

export type PinType = Database['public']['Tables']['pins']['Update'];
export type UserType = Database['public']['Tables']['users']['Row'];
export type PlanType = Database['public']['Tables']['plans']['Insert'];
export type BookMarkType = Database['public']['Tables']['plans']['Insert'];
