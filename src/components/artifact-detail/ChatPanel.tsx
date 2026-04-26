"use client";
import { useState } from "react";
import { Send, Mic, Sparkles } from "lucide-react";
import { getDictionary } from "@/lib/dictionaries";

export function ChatPanel({ artifact, locale }: { artifact: any; locale: "en" | "ar" }) {
  const [messages, setMessages] = useState<{role: 'user' | 'ai', content: string}[]>([
    { role: 'ai', content: locale === 'en' ? `Tell me about ${artifact.artifact_name_en}` : `حدثني عن ${artifact.artifact_name_ar}` }
  ]);
  const [input, setInput] = useState("");
  const dict = getDictionary(locale);
  const dir = locale === "ar" ? "rtl" : "ltr";

  const send = (msg: string) => {
    if(!msg.trim()) return;
    setMessages(prev => [...prev, { role: 'user', content: msg }]);
    setInput("");
    setTimeout(() => {
      setMessages(prev => [...prev, { role: 'ai', content: dict.ai.thinking }]);
      setTimeout(() => {
        setMessages(prev => {
          const newMsgs = [...prev];
          newMsgs[newMsgs.length - 1] = { role: 'ai', content: locale === 'en' ? "This is a placeholder response from Alex. I can provide historical context and details." : "هذا رد تجريبي من إسكندر. يمكنني تزويدك بمعلومات تاريخية وتفاصيل أثرية." };
          return newMsgs;
        });
      }, 1000);
    }, 500);
  };

  return (
    <div className="flex flex-col h-[600px] md:h-[calc(100vh)] bg-[var(--color-bg-card)] border-l border-[var(--color-border)] sticky top-0" dir={dir}>
      <div className="p-4 border-b border-[var(--color-border)] flex items-center gap-2">
        <Sparkles className="w-5 h-5 text-[var(--color-gold)]" />
        <h2 className={`font-bold text-[var(--color-gold)] ${locale === 'ar' ? 'font-[family-name:var(--font-noto-naskh)] text-xl' : 'font-[family-name:var(--font-cinzel)]'}`}>
          {dict.detail.askAbout}
        </h2>
      </div>

      <div className="p-4 border-b border-[var(--color-border)] bg-[var(--color-bg-primary)] overflow-x-auto whitespace-nowrap flex gap-2" style={{ scrollbarWidth: 'none' }}>
        <span className="text-xs text-[var(--color-text-secondary)] self-center mr-2">{dict.detail.quickQuestions}</span>
        {[dict.detail.q1, dict.detail.q2, dict.detail.q3].map((q, i) => (
          <button 
            key={i} 
            onClick={() => send(q)}
            className="inline-block px-3 py-1 bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-full text-xs hover:border-[var(--color-gold)] transition-colors text-[var(--color-text-primary)]"
          >
            {q}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
        {messages.map((m, i) => (
          <div key={i} className={`p-3 rounded-lg max-w-[80%] ${
            m.role === 'user'
              ? 'bg-[var(--color-gold)] text-[var(--color-bg-primary)] self-end'
              : `bg-[var(--color-bg-primary)] ${locale === 'ar' ? 'border-r-4' : 'border-l-4'} border-[var(--color-gold)] self-start text-[var(--color-text-primary)]`
          }`}>
            {m.role === 'ai' && <div className="text-[10px] opacity-70 mb-1">{dict.ai.senderName} 🤖</div>}
            <p className={`text-sm ${locale === 'ar' ? 'font-[family-name:var(--font-noto-naskh)]' : 'font-sans'}`}>{m.content}</p>
          </div>
        ))}
      </div>

      <div className="p-4 border-t border-[var(--color-border)] bg-[var(--color-bg-primary)]">
        <div className="flex items-center gap-2">
          <button className="p-2 rounded-full bg-[var(--color-bg-card)] text-[var(--color-text-secondary)] hover:text-[var(--color-gold)]">
            <Mic className="w-5 h-5" />
          </button>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && send(input)}
            placeholder={dict.detail.inputPlaceholder}
            className="flex-1 bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-full px-4 py-2 text-sm focus:outline-none focus:border-[var(--color-gold)] text-[var(--color-text-primary)]"
          />
          <button onClick={() => send(input)} className="p-2 rounded-full bg-[var(--color-gold)] text-[var(--color-bg-primary)]">
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
