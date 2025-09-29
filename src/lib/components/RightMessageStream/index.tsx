'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sun, Moon } from 'lucide-react';
import Sidebar from './Sidebar';
import HeroSearch from './HeroSearch';
import SourcesPanel from './SourcesPanel';
import ChannelsPanel from './ChannelsPanel';
import StatusCard from './StatusCard';
import ChatPanel from './ChatPanel';
import JsonStreamPanel from './JsonStreamPanel';
import {
  CHANNELS,
  DATA_SOURCES,
  ChannelKey,
  Message,
  SourceKey,
} from './streamConfig';
import { useStreamedText, useTheme } from './hooks';

export default function RightMessageStream() {
  // Sidebar
  const [pinned, setPinned] = useState(false);
  const [hovered, setHovered] = useState(false);
  const sidebarOpen = pinned || hovered;

  // Connections
  const [sources, setSources] = useState<Record<SourceKey, boolean>>({
    shopify: false,
    google_ads: false,
    facebook_page: false,
  });
  const [channels, setChannels] = useState<Record<ChannelKey, boolean>>({
    email: true,
    sms: false,
    whatsapp: false,
    push: true,
  });
  const [audience, setAudience] = useState('new_customers');

  // Chat
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [assistantBuffer, setAssistantBuffer] = useState('');
  const [campaignJSON, setCampaignJSON] = useState('');
  const streamed = useStreamedText(assistantBuffer, 24);
  const chatScrollRef = useRef<HTMLDivElement>(null!);

  // Theme
  const { theme, toggle } = useTheme();

  const activeChannels = useMemo(
    () =>
      Object.entries(channels)
        .filter(([, v]) => v)
        .map(([k]) => k) as ChannelKey[],
    [channels]
  );
  const connectedSources = useMemo(
    () =>
      Object.entries(sources)
        .filter(([, v]) => v)
        .map(([k]) => k) as SourceKey[],
    [sources]
  );

  useEffect(() => {
    chatScrollRef.current?.scrollTo({
      top: chatScrollRef.current.scrollHeight,
      behavior: 'smooth',
    });
  }, [messages.length, streamed]);

  // Handlers
  const toggleSource = (k: SourceKey) =>
    setSources((s) => ({ ...s, [k]: !s[k] }));
  const toggleChannel = (k: ChannelKey) =>
    setChannels((s) => ({ ...s, [k]: !s[k] }));

  function buildCampaign(query: string) {
    const now = new Date().toISOString();
    return {
      version: '1.0',
      generated_at: now,
      query,
      audience: {
        key: audience,
        name:
          audience === 'new_customers'
            ? 'New Customers (last 30d)'
            : audience === 'churn_risk'
            ? 'Churn Risk (no purchase 60d)'
            : 'High LTV (top 10%)',
        source_signals: connectedSources,
      },
      channels: activeChannels.map((ch) => ({
        channel: ch,
        objective:
          ch === 'email'
            ? 'nurture'
            : ch === 'push'
            ? 'retention'
            : 'conversion',
        timing: {
          schedule: 'best_time',
          timezone: 'user_local',
          constraints: {
            days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
            window: '09:00-20:00',
          },
        },
        message: {
          subject:
            ch === 'email' ? 'Personalized picks just for you' : undefined,
          body_template:
            'Hi {{first_name}}, based on your recent activity we picked items you may love. {{cta}}',
          cta: {
            label: 'Shop Now',
            url: 'https://images.unsplash.com/photo-1520975922171-5b6d6da2f6d4?auto=format&fit=crop&w=1200&q=60',
          },
        },
        experiment: {
          type: 'multivariate',
          variants: [
            { id: 'A', weight: 0.5 },
            { id: 'B', weight: 0.5 },
          ],
        },
        attribution: { model: 'last_touch', conversion_window_days: 7 },
      })),
      data_sources: connectedSources,
      safeguards: { frequency_cap_per_user_per_day: 2 },
    };
  }

  function handleSend() {
    const q = input.trim();
    if (!q) return;
    setInput('');
    setCampaignJSON('');

    setMessages((m) => [
      ...m,
      { id: crypto.randomUUID(), role: 'user', content: q },
    ]);

    const plan = buildCampaign(q);
    const pretty = JSON.stringify(plan, null, 2);

    const narrative =
      `Generating campaign using ${
        connectedSources.length || 'no'
      } data sources across ${activeChannels.length} channels.\n` +
      `Audience: ${plan.audience.name}.\n` +
      `Optimizing send-time per user and adding safeguards.`;

    setMessages((m) => [
      ...m,
      { id: crypto.randomUUID(), role: 'assistant', content: '' },
    ]);
    setAssistantBuffer(narrative);

    let i = 0;
    const chunk = 120;
    const t = setInterval(() => {
      i += chunk;
      setCampaignJSON(pretty.slice(0, Math.min(i, pretty.length)));
      if (i >= pretty.length) clearInterval(t);
    }, 30);
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex">
      <Sidebar
        sidebarOpen={pinned || hovered}
        pinned={pinned}
        setPinned={setPinned}
        setHovered={setHovered}
      />

      <main className="flex-1">
        <div className="max-w-5xl mx-auto px-4 md:px-8">
          <div className="pt-4 flex justify-end">
            <Button
              size="icon"
              variant="ghost"
              aria-label="Toggle theme"
              onClick={toggle}
            >
              {theme === 'dark' ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </Button>
          </div>

          <HeroSearch input={input} setInput={setInput} onSend={handleSend} />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <SourcesPanel sources={sources} toggleSource={toggleSource} />
            <ChannelsPanel
              channels={channels}
              toggleChannel={toggleChannel}
              audience={audience}
              setAudience={setAudience}
            />
            <StatusCard
              sourcesCount={connectedSources.length}
              channelsCount={activeChannels.length}
              pinned={pinned}
            />
          </div>

          <div className="mt-6 grid md:grid-cols-2 gap-4">
            <ChatPanel
              messages={messages}
              streamed={streamed}
              input={input}
              setInput={setInput}
              onSend={handleSend}
              scrollRef={chatScrollRef}
            />
            <JsonStreamPanel json={campaignJSON} />
          </div>

          <div className="py-8 text-center text-xs text-muted-foreground">
            Hover the left edge to open the sidebar, click the pin to keep it
            open.
          </div>
        </div>
      </main>
    </div>
  );
}
