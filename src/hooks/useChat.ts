import { useState } from 'react';
import { ChatMessage, AIResponse } from '@/types';
import { getDictionary } from '@/lib/dictionaries';

export function useChat(artifact: any, locale: 'en' | 'ar') {
  const dict = getDictionary(locale);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { 
      role: 'ai', 
      content: locale === 'en' 
        ? `Tell me about ${artifact.artifact_name_en}` 
        : `حدثني عن ${artifact.artifact_name_ar}` 
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async (msg: string) => {
    if (!msg.trim() || isLoading) return;
    
    setMessages(prev => [...prev, { role: 'user', content: msg }]);
    setInput('');
    setIsLoading(true);

    // Placeholder simulated response, to be connected to FastAPI later via src/lib/ai
    setTimeout(() => {
      setMessages(prev => [...prev, { role: 'ai', content: dict.ai.thinking }]);
      setTimeout(() => {
        setMessages(prev => {
          const newMsgs = [...prev];
          newMsgs[newMsgs.length - 1] = { 
            role: 'ai', 
            content: locale === 'en' 
              ? "This is a placeholder response from Alex. I can provide historical context and details." 
              : "هذا رد تجريبي من إسكندر. يمكنني تزويدك بمعلومات تاريخية وتفاصيل أثرية." 
          };
          return newMsgs;
        });
        setIsLoading(false);
      }, 1000);
    }, 500);
  };

  return {
    messages,
    input,
    setInput,
    sendMessage,
    isLoading,
    dict,
    dir: locale === 'ar' ? 'rtl' : 'ltr'
  };
}
