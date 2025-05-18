import { useEffect, useRef, useState } from 'react';
import type { ChatMessageDTO } from '../types/chatMessageDto';

export function useChat() {
  const channelRef = useRef<BroadcastChannel | null>(null);
  const [messages, setMessages] = useState<ChatMessageDTO[]>([]);

  const sendMessage = (msg: string) => {
    if (channelRef.current) {
      channelRef.current.postMessage(msg);
      setMessages((prev) => [
        ...prev,
        { id: Date.now().toString(), senderId: 'You:', content: msg },
      ]);
    }
  };

  useEffect(() => {
    const channel = new BroadcastChannel('chat');
    channelRef.current = channel;

    channel.onmessage = (e) => {
      setMessages((prev) => [
        ...prev,
        { id: Date.now().toString(), senderId: 'Other:', content: e.data },
      ]);
    };

    return () => {
      channel.close();
    };
  }, []);

  return { messages, sendMessage };
}
