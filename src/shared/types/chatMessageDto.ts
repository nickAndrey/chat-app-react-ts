export type ChatMessageDTO = {
  id: string; // Unique message ID
  // chatId: string; // ID of the conversation/chat thread
  senderId: string; // User ID of the sender
  content: string; // Message content (text)
  // timestamp: string; // ISO string of message creation time
  // status?: 'sent' | 'delivered' | 'read'; // Optional message status
  // type?: 'text' | 'image' | 'file' | 'video'; // Message type
  // replyToMessageId?: string; // Optional: if replying to another message
};
