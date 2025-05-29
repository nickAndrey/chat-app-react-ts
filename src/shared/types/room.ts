import type { PublicUser } from './user';

export type Room = {
  id: string;
  name: string;
  members: PublicUser['id'][];
  createdBy: PublicUser['id'];
  isGroup: boolean;
  createdAt?: string;
  updatedAt?: string;
};
