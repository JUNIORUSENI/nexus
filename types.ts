export enum MissionType {
  CONTACT = 'CONTACT',
  DONATION = 'DONATION',
  VOLUNTEER = 'VOLUNTEER',
  INFO = 'INFO'
}

export interface FormData {
  name: string;
  email: string;
  mission: MissionType;
  // Specific fields
  message?: string; // For Contact, Info
  donationAmount?: number; // For Donation
  donationFrequency?: 'ONE_TIME' | 'MONTHLY'; // For Donation
  skills?: string[]; // For Volunteer
  availability?: string; // For Volunteer
}

export interface EchoResponse {
  message: string;
  yearProject: string;
  prophecy?: string;
  moodEmoji?: string;
}

export interface AxolotlState {
  mood: 'idle' | 'thinking' | 'speaking' | 'celebrating';
  message: string;
  isStreaming: boolean;
}

export interface ChatMessage {
  role: 'user' | 'axolotl';
  content: string;
  timestamp: Date;
}

export type AxolotlMood = 'idle' | 'thinking' | 'speaking' | 'celebrating';
