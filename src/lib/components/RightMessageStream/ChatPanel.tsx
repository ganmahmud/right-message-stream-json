'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { RefObject } from 'react';
import { Message } from './streamConfig';

export default function ChatPanel({
  messages,
  streamed,
  input,
  setInput,
  onSend,
  scrollRef,
}: {
  messages: Message[];
  streamed: string;
  input: string;
  setInput: (v: string) => void;
  onSend: () => void;
  scrollRef: RefObject<HTMLDivElement>;
}) {
  return (
    <Card className="h-[520px] flex flex-col">
      <CardHeader>
        <CardTitle className="text-base">Chat</CardTitle>
      </CardHeader>
      <CardContent
        ref={scrollRef}
        className="flex-1 overflow-auto space-y-4 pr-2"
      >
        {messages.length === 0 && (
          <div className="text-sm text-muted-foreground">
            Ask a question to generate a multi-channel campaign.
          </div>
        )}
        {messages.map((m) => (
          <div
            key={m.id}
            className={`text-sm leading-relaxed ${
              m.role === 'user' ? 'text-foreground' : 'text-muted-foreground'
            }`}
          >
            {m.content}
          </div>
        ))}
        {streamed && (
          <div className="text-sm leading-relaxed whitespace-pre-wrap">
            {streamed}
          </div>
        )}
      </CardContent>
      <div className="p-4 border-t">
        <div className="flex items-end gap-2">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your prompt…"
            className="min-h-[44px] resize-none"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) onSend();
            }}
          />
          <Button onClick={onSend}>Send</Button>
        </div>
      </div>
    </Card>
  );
}
