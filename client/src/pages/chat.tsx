import { useState, useEffect, useRef } from "react";
import { Sidebar } from "@/components/chat/sidebar";
import { ChatMessages, type Message } from "@/components/chat/chat-messages";
import { ChatInput } from "@/components/chat/chat-input";
import { PanelLeftOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { MOCK_RESPONSES } from "@/lib/mock-data";

export default function ChatPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const streamIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Check for mobile screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleSend = (content: string) => {
    // Clear any in-progress stream
    if (streamIntervalRef.current) {
      clearInterval(streamIntervalRef.current);
      streamIntervalRef.current = null;
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content,
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);

    // Brief initial delay to mimic network latency, then stream
    setTimeout(() => {
      const fullText =
        MOCK_RESPONSES[Math.floor(Math.random() * MOCK_RESPONSES.length)];
      const aiId = (Date.now() + 1).toString();

      // Add an empty streaming message
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        { id: aiId, role: "assistant", content: "", isStreaming: true },
      ]);

      let charIndex = 0;
      // Stream ~3 chars per tick at 18ms → ~167 chars/sec, feels like a fast LLM
      streamIntervalRef.current = setInterval(() => {
        charIndex += 3;
        const revealed = fullText.slice(0, charIndex);
        const done = charIndex >= fullText.length;

        setMessages((prev) =>
          prev.map((m) =>
            m.id === aiId ? { ...m, content: revealed, isStreaming: !done } : m,
          ),
        );

        if (done && streamIntervalRef.current) {
          clearInterval(streamIntervalRef.current);
          streamIntervalRef.current = null;
        }
      }, 18);
    }, 600);
  };

  return (
    <div className="flex h-[100dvh] w-full bg-background overflow-hidden">
      <Sidebar
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
        isMobile={isMobile}
        onNewChat={() => {
          setMessages([]);
          if (isMobile) setSidebarOpen(false);
        }}
      />

      <main className="flex-1 flex flex-col relative min-w-0">
        <header className="absolute top-0 left-0 right-0 z-10 p-2 flex items-center bg-gradient-to-b from-background via-background/90 to-transparent pb-6 pointer-events-none">
          <div className="pointer-events-auto">
            <AnimatePresence>
              {!sidebarOpen && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                >
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setSidebarOpen(true)}
                    className="h-10 w-10 text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-xl bg-background/50 backdrop-blur-sm"
                  >
                    <PanelLeftOpen size={18} />
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </header>

        <ChatMessages
          messages={messages}
          isTyping={isTyping}
          onSend={handleSend}
        />

        <div className="bg-gradient-to-t from-background via-background/95 to-transparent pt-6">
          <ChatInput onSend={handleSend} disabled={isTyping} />
        </div>
      </main>
    </div>
  );
}
