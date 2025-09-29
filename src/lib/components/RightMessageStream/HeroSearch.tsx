'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

export default function HeroSearch({
  input,
  setInput,
  onSend,
}: {
  input: string;
  setInput: (v: string) => void;
  onSend: () => void;
}) {
  return (
    <div className="py-10 md:py-14 text-center">
      <h1 className="text-4xl md:text-6xl font-semibold tracking-tight">
        Right Message Stream
      </h1>
      <div className="mt-8 mx-auto max-w-3xl">
        <div className="rounded-2xl border border-border bg-secondary/20 backdrop-blur p-2 flex items-center gap-2">
          <Button size="icon" variant="secondary" aria-label="Search">
            <Search className="h-4 w-4" />
          </Button>
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask anything about your data & channels..."
            className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) onSend();
            }}
          />
          <Button onClick={onSend} className="ml-auto">
            Send
          </Button>
        </div>
      </div>
      <div className="mt-4 flex gap-2 justify-center flex-wrap">
        <span className="text-xs text-muted-foreground">
          Try: "Plan Black Friday reactivation across Email, SMS and Push"
        </span>
      </div>
    </div>
  );
}
