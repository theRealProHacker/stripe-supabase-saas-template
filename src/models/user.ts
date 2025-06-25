export interface UserMemory {
  vocab: Record<string, {
    strength: number; // 0-5
    practiced: number; // timestamp
    language: string;
  }>;
  grammar: Record<string, {
    strength: number; // 0-5
    practiced: number; // timestamp
    concept: string;
  }>;
  summary: string;
  topics: string[];
  preferences: {
    learningStyle?: 'visual' | 'auditory' | 'kinesthetic';
    sessionLength?: number; // preferred minutes
    difficulty?: 'beginner' | 'intermediate' | 'advanced';
  };
  stats: {
    totalSessions: number;
    totalMinutes: number;
    streak: number;
    lastSession: number; // timestamp
  };
}

export interface User {
  id: string;
  name: string;
  email: string;
  plan: string;
  stripe_id: string;
  target_language?: string;
  native_language?: string;
  memory?: UserMemory;
  created_at?: string;
  updated_at?: string;
}

export interface Session {
  id: string;
  user_id: string;
  start_time: number;
  end_time?: number;
  duration_minutes?: number;
  language: string;
  session_type: 'practice' | 'conversation' | 'lesson';
  summary?: string;
  vocabulary_learned?: string[];
  grammar_practiced?: string[];
  created_at: string;
}

export interface UsageTracking {
  id: string;
  user_id: string;
  date: string; // YYYY-MM-DD
  minutes_used: number;
  sessions_count: number;
  plan_limit: number;
}