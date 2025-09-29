'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ChannelKey, CHANNELS } from './streamConfig';

export default function ChannelsPanel({
  channels,
  toggleChannel,
  audience,
  setAudience,
}: {
  channels: Record<ChannelKey, boolean>;
  toggleChannel: (k: ChannelKey) => void;
  audience: string;
  setAudience: (v: string) => void;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Select channels</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {(Object.keys(CHANNELS) as ChannelKey[]).map((k) => {
          const IconComponent = CHANNELS[k].icon;
          return (
            <div key={k} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <IconComponent className="h-4 w-4" />
                <span className="text-sm">{CHANNELS[k].label}</span>
              </div>
              <Switch
                checked={channels[k]}
                onCheckedChange={() => toggleChannel(k)}
              />
            </div>
          );
        })}
        <div className="pt-2">
          <p className="text-xs text-muted-foreground mb-1">Audience segment</p>
          <Select value={audience} onValueChange={setAudience}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Choose audience" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="new_customers">New Customers</SelectItem>
              <SelectItem value="churn_risk">Churn Risk</SelectItem>
              <SelectItem value="high_ltv">High LTV</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
}
