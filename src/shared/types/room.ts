import type { PublicUser } from './user';

export type RoomDto = {
  name: string;
  isGroup: boolean;
  members: PublicUser['id'][];
  createdBy: PublicUser['id'];
  createdAt?: string;
  updatedAt?: string;
  id: string;
};

export type Room = {
  name: string;
  isGroup: boolean;
  members: PublicUser[];
  createdBy: PublicUser;
  createdAt?: string;
  updatedAt?: string;
  id: string;
};
