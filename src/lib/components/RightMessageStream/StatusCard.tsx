'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function StatusCard({
  sourcesCount,
  channelsCount,
  pinned,
}: {
  sourcesCount: number;
  channelsCount: number;
  pinned: boolean;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Status</CardTitle>
      </CardHeader>
      <CardContent className="text-sm space-y-2">
        <div>Sources connected: {sourcesCount}</div>
        <div>Channels active: {channelsCount}</div>
        <div className="text-muted-foreground">
          Pinned sidebar: {pinned ? 'Yes' : 'No'}
        </div>
      </CardContent>
    </Card>
  );
}
