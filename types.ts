export interface BookData {
  id: string;
  title: string;
  author: string;
  color: string;
  textColor?: string;
  icon?: 'star' | 'music' | 'burger' | 'jellyfish' | 'anchor' | 'money' | 'pen' | 'lightbulb' | 'hammer' | 'scissors' | 'briefcase';
  characterRole?: string; // For cast members (e.g., "사장")
  isLeader?: boolean; // Replaces icon with Crown
  roleDescription?: string; // New field for character description
  imageUrl?: string; // Character photo URL
  cohort?: string;
  department?: string;
  studentId?: string;
}

export interface Monologue {
  title: string;
  content: string;
}

export interface ShelfData {
  id: string;
  categoryEnglish: string; // e.g., "DIRECTOR"
  categoryKorean: string; // e.g., "연출"
  defaultIcon?: 'star' | 'music' | 'burger' | 'jellyfish' | 'anchor' | 'money' | 'pen' | 'lightbulb' | 'hammer' | 'scissors' | 'briefcase'; // Unified icon for the team
  books: BookData[];
  monologues?: Monologue[];
  groupPhotoUrl?: string; // URL for the group photo
}

export interface ScheduleItem {
  round: string;
  date: string;
  time: string;
}

export interface AppData {
  title: string;
  synopsis: string;
  shelves: ShelfData[];
  specialThanks: string[];
  schedule: ScheduleItem[];
}