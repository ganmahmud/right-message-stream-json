'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle2, CircleDashed } from 'lucide-react';
import { DATA_SOURCES, SourceKey } from './streamConfig';

export default function SourcesPanel({
  sources,
  toggleSource,
}: {
  sources: Record<SourceKey, boolean>;
  toggleSource: (k: SourceKey) => void;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Connect data sources</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {(Object.keys(DATA_SOURCES) as SourceKey[]).map((k) => {
          const IconComponent = DATA_SOURCES[k].icon;
          return (
            <div key={k} className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <IconComponent className="size-4" />
                <div>
                  <div className="text-sm font-medium">
                    {DATA_SOURCES[k].label}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {DATA_SOURCES[k].description}
                  </div>
                </div>
              </div>
              <Button
                size="sm"
                variant={sources[k] ? 'secondary' : 'default'}
                onClick={() => toggleSource(k)}
              >
                {sources[k] ? (
                  <span className="inline-flex items-center gap-1">
                    <CheckCircle2 className="h-4 w-4" /> Connected
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1">
                    <CircleDashed className="h-4 w-4" /> Connect
                  </span>
                )}
              </Button>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
