'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Copy } from 'lucide-react';
import { useState } from 'react';

export default function JsonStreamPanel({ json }: { json: string }) {
  const [copied, setCopied] = useState(false);
  async function handleCopy() {
    if (!json) return;
    try {
      await navigator.clipboard.writeText(json);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {}
  }

  return (
    <Card className="h-[520px] flex flex-col">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-base">Streaming campaign JSON</CardTitle>
        <Button
          size="sm"
          variant="ghost"
          onClick={handleCopy}
          disabled={!json}
          className="gap-1"
        >
          <Copy className="h-4 w-4" /> {copied ? 'Copied' : 'Copy'}
        </Button>
      </CardHeader>
      <CardContent className="flex-1 overflow-auto">
        <pre className="text-xs md:text-[11px] leading-relaxed bg-secondary/30 rounded-md p-3 overflow-x-auto whitespace-pre-wrap">
          {json ||
            '// The structured payload will stream here after you ask a question.'}
        </pre>
      </CardContent>
    </Card>
  );
}
