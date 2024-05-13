import { FieldValue } from 'firebase/firestore';

export interface User {
  id: string;
  username: string;
  displayName: string;
  pfpUrl: string;
}

export interface UserNotificationTokens {
  userId: string;
  tokens: {
    token: string;
    createdAt: Date | FirestoreTimestamp;
  }[];
}

export interface Group {
  id: string;
  displayName: string;
  fids: number[];
  updatedAt: Date | FirestoreTimestamp;
}

export interface FirestoreTimestamp {
  nanoseconds: number;
  seconds: number;
}

export interface Message {
  id: string;
  roomId: string;
  userId: string;
  body: string;
  createdAt: FirestoreTimestamp | FieldValue | Date | null;
  readBy: number[];
  replyTo: string | null;
}

export interface Room {
  id: string;
  name: string;
  joinedUserIds: string[];
  readerIds: string[];
  writerIds: string[];
  imageUrl: string | null;
}