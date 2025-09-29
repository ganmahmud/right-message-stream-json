import { JSX } from 'react';
import {
  Globe2,
  MessageSquareText,
  Mail,
  Smartphone,
  Bell,
  Database,
  LucideIcon,
} from 'lucide-react';

export type SourceKey = 'shopify' | 'google_ads' | 'facebook_page';
export type ChannelKey = 'email' | 'sms' | 'whatsapp' | 'push';

export type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
};

export const DATA_SOURCES: Record<
  SourceKey,
  { label: string; description: string; icon: LucideIcon }
> = {
  shopify: {
    label: 'Shopify',
    description: 'Orders, customers, products',
    icon: Database,
  },
  google_ads: {
    label: 'Google Ads',
    description: 'Campaigns, conversions, audiences',
    icon: Globe2,
  },
  facebook_page: {
    label: 'Facebook Page',
    description: 'Posts, engagement, followers',
    icon: MessageSquareText,
  },
};

export const CHANNELS: Record<ChannelKey, { label: string; icon: LucideIcon }> =
  {
    email: { label: 'Email', icon: Mail },
    sms: { label: 'SMS', icon: Smartphone },
    whatsapp: {
      label: 'WhatsApp',
      icon: MessageSquareText,
    },
    push: { label: 'Push', icon: Bell },
  };
