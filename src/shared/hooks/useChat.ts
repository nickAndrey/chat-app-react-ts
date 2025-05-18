import { useEffect, useRef, useState } from 'react';

export function useChat() {
  const channelRef = useRef<BroadcastChannel | null>(null);
  const [messages, setMessages] = useState<string[]>([]);

  const sendMessage = (msg: string) => {
    if (channelRef.current) {
      channelRef.current.postMessage(msg);
      setMessages((prev) => [...prev, `You: ${msg}`]);
    }
  };

  useEffect(() => {
    const channel = new BroadcastChannel('chat');
    channelRef.current = channel;

    channel.onmessage = (e) => {
      setMessages((prev) => [...prev, `Other: ${e.data}`]);
    };

    return () => {
      channel.close();
    };
  }, []);

  return { messages, sendMessage };
}
