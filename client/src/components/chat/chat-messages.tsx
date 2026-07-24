import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot } from "lucide-react";
import { MarkdownRenderer } from "./markdown-renderer";

export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  isStreaming?: boolean;
}

export interface ChatMessagesProps {
  messages: Message[];
  isTyping: boolean;
  onSend?: (message: string) => void;
}

export function ChatMessages({
  messages,
  isTyping,
  onSend,
}: ChatMessagesProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  if (messages.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
        <div className="w-16 h-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mb-6 shadow-sm">
          <Bot size={32} className="stroke-[1.5]" />
        </div>
        <h2 className="text-2xl font-medium mb-2">
          What can I help you with today?
        </h2>
        <p className="text-muted-foreground mb-8 max-w-md">
          I can explain complex topics, write code, or help you brainstorm
          ideas.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full max-w-2xl">
          <button
            onClick={() =>
              onSend?.("Explain quantum computing in simple terms")
            }
            className="text-left p-4 rounded-xl border border-border bg-card hover:bg-muted/50 transition-colors flex flex-col"
          >
            <span className="font-medium text-sm mb-1">
              Explain quantum computing
            </span>
            <span className="text-xs text-muted-foreground">
              in simple terms
            </span>
          </button>
          <button
            onClick={() =>
              onSend?.("Write a Python script to scrape a website")
            }
            className="text-left p-4 rounded-xl border border-border bg-card hover:bg-muted/50 transition-colors flex flex-col"
          >
            <span className="font-medium text-sm mb-1">
              Write a Python script
            </span>
            <span className="text-xs text-muted-foreground">
              to scrape a website
            </span>
          </button>
          <button
            onClick={() =>
              onSend?.("Draft an email to decline a meeting politely")
            }
            className="text-left p-4 rounded-xl border border-border bg-card hover:bg-muted/50 transition-colors flex flex-col"
          >
            <span className="font-medium text-sm mb-1">Draft an email</span>
            <span className="text-xs text-muted-foreground">
              to decline a meeting politely
            </span>
          </button>
          <button
            onClick={() => onSend?.("Help me debug a React useEffect loop")}
            className="text-left p-4 rounded-xl border border-border bg-card hover:bg-muted/50 transition-colors flex flex-col"
          >
            <span className="font-medium text-sm mb-1">Help me debug</span>
            <span className="text-xs text-muted-foreground">
              a React useEffect loop
            </span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto p-4 md:p-8 custom-scrollbar">
      <div className="max-w-3xl mx-auto space-y-8 pb-12">
        <AnimatePresence initial={false}>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex gap-4 ${message.role === "user" ? "flex-row-reverse" : "flex-row"}`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                  message.role === "user"
                    ? "bg-primary/20 text-primary font-medium text-sm"
                    : "bg-primary text-primary-foreground"
                }`}
              >
                {message.role === "user" ? "JD" : <Bot size={18} />}
              </div>

              <div
                className={`flex flex-col ${message.role === "user" ? "items-end" : "items-start"} max-w-[85%]`}
              >
                <div className="font-medium text-xs text-muted-foreground mb-1 px-1">
                  {message.role === "user" ? "You" : "Assistant"}
                </div>
                {message.role === "user" ? (
                  <div className="bg-muted px-4 py-3 rounded-2xl rounded-tr-sm text-sm whitespace-pre-wrap leading-relaxed shadow-sm">
                    {message.content}
                  </div>
                ) : (
                  <div className="w-full text-sm">
                    <MarkdownRenderer content={message.content} />
                    {message.isStreaming && (
                      <motion.span
                        className="inline-block w-[2px] h-[1.1em] bg-foreground/70 ml-0.5 align-text-bottom rounded-full"
                        animate={{ opacity: [1, 0] }}
                        transition={{
                          duration: 0.6,
                          repeat: Infinity,
                          repeatType: "reverse",
                          ease: "linear",
                        }}
                      />
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {isTyping && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex gap-4 flex-row"
          >
            <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center shrink-0">
              <Bot size={18} />
            </div>
            <div className="flex flex-col items-start">
              <div className="font-medium text-xs text-muted-foreground mb-1 px-1">
                Assistant
              </div>
              <div className="bg-muted/50 px-4 py-3 rounded-2xl rounded-tl-sm flex items-center gap-1">
                <motion.div
                  className="w-2 h-2 bg-primary/40 rounded-full"
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{
                    duration: 1.4,
                    repeat: Infinity,
                    times: [0, 0.5, 1],
                  }}
                />
                <motion.div
                  className="w-2 h-2 bg-primary/60 rounded-full"
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{
                    duration: 1.4,
                    repeat: Infinity,
                    times: [0, 0.5, 1],
                    delay: 0.2,
                  }}
                />
                <motion.div
                  className="w-2 h-2 bg-primary rounded-full"
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{
                    duration: 1.4,
                    repeat: Infinity,
                    times: [0, 0.5, 1],
                    delay: 0.4,
                  }}
                />
              </div>
            </div>
          </motion.div>
        )}
        <div ref={bottomRef} />
      </div>
    </div>
  );
}
