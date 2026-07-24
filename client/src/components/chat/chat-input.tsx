import React, { useRef, useEffect } from 'react';
import { Send, Paperclip } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled: boolean;
}

export function ChatInput({ onSend, disabled }: ChatInputProps) {
  const [input, setInput] = React.useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const adjustHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${Math.min(textarea.scrollHeight, 200)}px`;
    }
  };

  useEffect(() => {
    adjustHeight();
  }, [input]);

  const handleSend = () => {
    if (input.trim() && !disabled) {
      onSend(input.trim());
      setInput('');
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="p-4 bg-background">
      <div className="max-w-3xl mx-auto relative flex items-end shadow-sm border border-border bg-card rounded-2xl p-2 transition-shadow focus-within:ring-1 focus-within:ring-ring focus-within:border-ring">
        <Button 
          variant="ghost" 
          size="icon" 
          className="shrink-0 h-10 w-10 text-muted-foreground hover:text-foreground rounded-xl"
          disabled={disabled}
        >
          <Paperclip size={18} />
        </Button>
        
        <textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Message Assistant..."
          className="flex-1 max-h-[200px] min-h-[40px] resize-none bg-transparent px-3 py-2.5 text-sm focus:outline-none custom-scrollbar m-0 placeholder:text-muted-foreground/60"
          rows={1}
          disabled={disabled}
        />
        
        <Button 
          onClick={handleSend}
          disabled={disabled || !input.trim()}
          size="icon"
          className="shrink-0 h-10 w-10 rounded-xl transition-all"
          variant={input.trim() ? 'default' : 'secondary'}
        >
          <Send size={18} className={input.trim() ? "translate-x-0.5" : ""} />
        </Button>
      </div>
      <div className="text-center mt-2">
        <span className="text-[10px] text-muted-foreground/60 font-sans">
          Assistant can make mistakes. Consider verifying important information.
        </span>
      </div>
    </div>
  );
}
