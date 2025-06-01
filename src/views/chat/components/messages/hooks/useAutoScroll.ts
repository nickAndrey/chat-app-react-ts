import type { Message } from '@/shared/types/message';
import { useEffect, useRef, useState } from 'react';

const useAutoScroll = (messages: Message[]) => {
  const [isAtBottom, setIsAtBottom] = useState(true);
  const [hasNewMessages, setHasNewMessages] = useState(false);

  const ref = useRef<HTMLDivElement>(null);
  const messagesLength = useRef(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onScroll = () => {
      const threshold = 50;
      const atBottom = el.scrollHeight - el.scrollTop - el.clientHeight < threshold;
      setIsAtBottom(atBottom);
      if (atBottom) setHasNewMessages(false);
    };

    el.addEventListener('scroll', onScroll);

    return () => {
      el.removeEventListener('scroll', onScroll);
    };
  }, []);

  useEffect(() => {
    const isNewMessage = messages.length > messagesLength.current;
    messagesLength.current = messages.length;

    if (isAtBottom && ref.current) {
      ref.current.scrollTo({ top: ref.current.scrollHeight, behavior: 'smooth' });
    } else if (isNewMessage) {
      setHasNewMessages(true);
    }
  }, [isAtBottom, messages]);

  const scrollToBottom = () => {
    ref.current?.scrollTo({ top: ref.current.scrollHeight, behavior: 'smooth' });
    setHasNewMessages(false);
  };

  return {
    ref,
    hasNewMessages,
    scrollToBottom,
  };
};

export default useAutoScroll;
