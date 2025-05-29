export type Message = {
  id: string;
  roomId: string;
  senderId: string;
  content: string;
  type: 'text' | 'image' | 'file';
  createdAt?: string;
  updatedAt?: string;
};
