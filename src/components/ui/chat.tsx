// src/components/ui/chat.tsx
"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Message = {
  id: string;
  role: "user" | "bot";
  content: string;
  createdAt?: number;
  typing?: boolean;
};

type ChatHeaderProps = {
  title?: string;
  subtitle?: string;
  avatar?: string;
  rightAction?: React.ReactNode;
};

const uid = () =>
  Date.now().toString(36) + Math.random().toString(36).slice(2, 8);

const tryExtractCode = (text: string) => {
  const match = text.match(/```(\w*)\n([\s\S]*?)```/);
  if (!match) return null;
  return { lang: match[1] || "text", code: match[2] };
};

export default function ChatBox({
  header = { title: "DevUI Chat", subtitle: "Interactive messaging demo" },
}: {
  header?: ChatHeaderProps;
}) {
  const [messages, setMessages] = React.useState<Message[]>([
    { id: uid(), role: "bot", content: "👋 Hi, how can I help you today?", createdAt: Date.now() },
  ]);
  const [input, setInput] = React.useState("");
  const scrollRef = React.useRef<HTMLDivElement | null>(null);
  const textareaRef = React.useRef<HTMLTextAreaElement | null>(null);
  const typingPlaceholderId = React.useRef<string | null>(null);

  // Autoscroll on messages change
  React.useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    // slight delay to allow DOM update
    setTimeout(() => el.scrollTo({ top: el.scrollHeight, behavior: "smooth" }), 60);
  }, [messages]);

  // autosize textarea up to 4 lines
  React.useLayoutEffect(() => {
    const ta = textareaRef.current;
    if (!ta) return;
    ta.style.height = "auto";
    const lineHeight = 20;
    const maxHeight = 4 * lineHeight + 12;
    ta.style.height = Math.min(ta.scrollHeight, maxHeight) + "px";
  }, [input]);

  const pushMessage = (msg: Message) =>
    setMessages((s) => [...s, { ...msg, createdAt: Date.now() }]);

  const insertTypingPlaceholder = (): string => {
    const id = uid();
    typingPlaceholderId.current = id;
    setMessages((s) => [...s, { id, role: "bot", content: "", typing: true, createdAt: Date.now() }]);
    return id;
  };

  const replaceTypingWithMessage = (id: string, content: string) => {
    setMessages((prev) => prev.map((m) => (m.id === id ? { ...m, content, typing: false } : m)));
    typingPlaceholderId.current = null;
  };

  const sendMessage = () => {
    const text = input.trim();
    if (!text) return;
    pushMessage({ id: uid(), role: "user", content: text });
    setInput("");

    // Insert placeholder (bot typing)
    const placeholderId = insertTypingPlaceholder();

    // simulate reply
    setTimeout(() => {
      let reply = `I heard: "${text}" — this is a demo reply.`;
      if (/\bcode\b|\bsnippet\b|\bexample\b/i.test(text)) {
        reply = "```js\nconsole.log('Hello from DevUI chat demo!')\n```";
      } else if (/\bbutton\b/i.test(text)) {
        reply = "You can inspect the `Button` component on the components list.";
      }
      replaceTypingWithMessage(placeholderId, reply);
    }, 700 + Math.random() * 700);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      // optionally: small UI feedback
    } catch {}
  };

  return (
    <div className="bg-card text-card-foreground flex flex-col rounded-xl border shadow-md w-98 max-w-xl mx-auto">
      {/* --- inline small CSS for animations --- */}
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(6px) scale(.995); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .msg-entry {
          animation: fadeUp 220ms cubic-bezier(.2,.9,.2,1);
        }
        .typing-dot {
          animation: typing-dot 1s infinite steps(1, end);
        }
        @keyframes typing-dot {
          0% { opacity: 1; }
          33% { opacity: 0.4; }
          66% { opacity: 0.8; }
          100% { opacity: 1; }
        }
      `}</style>

      {/* Header */}
      <div className="px-4 py-3 border-b flex items-center justify-between bg-muted/10 rounded-t-xl">
        <div className="flex items-center gap-3">
          <img
            src={header?.avatar || "https://ui.shadcn.com/avatars/01.png"}
            alt={header?.title ?? "Chat"}
            className="w-9 h-9 rounded-full border"
          />
          <div className="flex flex-col min-w-0">
            <h2 className="text-sm font-semibold truncate">{header?.title ?? "DevUI Chat"}</h2>
            {header?.subtitle ? <p className="text-xs text-muted-foreground truncate">{header.subtitle}</p> : null}
          </div>
        </div>
        {header?.rightAction ?? null}
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="px-4 pt-3 pb-2 flex-1 overflow-y-auto max-h-[420px] flex flex-col gap-3" aria-live="polite"> 
        {messages.map((m) => {
          const code = tryExtractCode(m.content);
          const isUser = m.role === "user";
          // we put msg-entry class to animate on mount
          return (
            <div key={m.id} className={cn("msg-entry flex items-end", isUser ? "justify-end" : "justify-start")}>
              {!isUser && (
                <div className="mr-2 flex-shrink-0">
                  <img src={header?.avatar || "https://ui.shadcn.com/avatars/01.png"} alt="Bot" className="w-7 h-7 rounded-full border" />
                </div>
              )}

              <div
                className={cn(
                  "rounded-2xl px-4 py-2 text-sm shadow-sm",
                  "max-w-[82%] leading-relaxed whitespace-pre-wrap",
                  "min-h-[40px] flex items-center",
                  isUser ? "bg-primary text-primary-foreground rounded-br-sm" : "bg-muted/80 text-foreground rounded-bl-sm"
                )}
              >
                {m.typing ? (
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1 w-12">
                      <span className="inline-block w-2 h-2 rounded-full bg-muted-foreground/70 animate-pulse" />
                      <span className="inline-block w-2 h-2 rounded-full bg-muted-foreground/70 animate-pulse" style={{ animationDelay: "120ms" }} />
                      <span className="inline-block w-2 h-2 rounded-full bg-muted-foreground/70 animate-pulse" style={{ animationDelay: "240ms" }} />
                    </div>
                  </div>
                ) : code ? (
                  <div className="space-y-2 w-full">
                    <div className="flex items-start justify-between gap-2">
                      <div className="text-xs text-muted-foreground">{isUser ? "You (code)" : "Bot (code)"}</div>
                      <div>
                        <Button onClick={() => handleCopy(code.code)} className="text-xs rounded px-2 py-0.5 bg-accent/10" aria-label="Copy code">
                          Copy
                        </Button>
                      </div>
                    </div>
                    <pre className="rounded bg-muted p-2 text-xs overflow-auto max-h-48 whitespace-pre-wrap">
                      <code>{code.code}</code>
                    </pre>
                  </div>
                ) : (
                  <div>{m.content}</div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Input */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          sendMessage();
        }}
        className="border-t px-4 py-3"
        aria-label="Send message"
      >
        <div className="relative flex items-center gap-3">
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder="Type a message..."
            rows={1}
            className="min-h-[38px] max-h-[120px] resize-none overflow-auto w-full rounded-md border px-3 py-2 text-sm bg-transparent focus:outline-none focus:ring-2 focus:ring-ring/30"
            aria-label="Message"
          />
          <Button type="submit" size="icon" className="self-end" aria-label="Send message">
            ➤
          </Button>
        </div>
      </form>
    </div>
  );
}