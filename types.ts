export interface EventDetails {
  title: string;
  startTime: string; // ISO 8601 format (YYYY-MM-DDTHH:mm:ssZ)
  endTime?: string; // Optional: ISO 8601 format
  location: string;
  description?: string; // Optional
}

export interface Group {
    id: string;
    group_id: string;
    name: string;
    phone_number: string;
    type: string;
    description: string;
    image_url: string | null;
    creator_user_id: string;
    created_at: number;
    updated_at: number;
    muted_until: number | null;
    office_mode: boolean;
    share_url: string | null;
    share_qr_code_url: string | null;
    members_count: number;
    max_members: number;
    theme_name: string | null;
    like_icon: {
        type: string;
        pack_id: number;
        pack_index: number;
    } | null;
    requires_approval: boolean;
    show_join_question: boolean;
    join_question: any; // Type according to actual structure if known
    message_deletion_period: number;
    message_deletion_mode: string;
}

export interface Message {
  id: string;
  source_guid: string;
  created_at: number;
  user_id: string;
  group_id: string;
  name: string;
  avatar_url: string | null;
  text: string | null;
  system: boolean;
  favorited_by: string[];
  attachments: any[]; // Define a more specific type if you handle attachments
}
