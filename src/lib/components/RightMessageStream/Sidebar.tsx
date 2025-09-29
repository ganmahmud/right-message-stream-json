'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  Bot,
  Pin,
  PinOff,
  Home,
  MessageSquareText,
  Database,
  Bell,
  Globe2,
  Search,
  Plus,
} from 'lucide-react';
import { Dispatch, SetStateAction } from 'react';

export default function Sidebar({
  sidebarOpen,
  pinned,
  setPinned,
  setHovered,
}: {
  sidebarOpen: boolean;
  pinned: boolean;
  setPinned: Dispatch<SetStateAction<boolean>>;
  setHovered: (v: boolean) => void;
}) {
  return (
    <aside
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`transition-all duration-300 border-r border-border/60 bg-secondary/30 ${
        sidebarOpen ? 'w-64' : 'w-14'
      }`}
    >
      <div className="h-14 flex items-center justify-center px-3">
        <div
          className={cn(
            'flex items-center',
            sidebarOpen ? 'gap-2' : 'gap-0 justify-center'
          )}
        >
          <Bot className="h-5 w-5" />
          <span
            className={cn(
              'font-medium whitespace-nowrap overflow-hidden transition-all duration-300 origin-left',
              sidebarOpen
                ? 'opacity-100 translate-x-0'
                : 'size-0 opacity-0 -translate-x-2 pointer-events-none'
            )}
          >
            Right Message Stream
          </span>
        </div>
        {sidebarOpen && (
          <Button
            size="icon"
            variant="ghost"
            onClick={() => setPinned((p) => !p)}
            aria-label="Pin sidebar"
            className={pinned ? 'text-primary' : undefined}
          >
            {pinned ? (
              <PinOff className="h-4 w-4" />
            ) : (
              <Pin className="h-4 w-4" />
            )}
          </Button>
        )}
      </div>

      <div className="px-2 space-y-1">
        {[
          [Home, 'Dashboard'],
          [MessageSquareText, 'Campaigns'],
          [Database, 'Sources'],
          [Bell, 'Channels'],
          [Globe2, 'Audiences'],
          [Search, 'Settings'],
        ].map(([Icon, label], i) => (
          <Button key={i} variant="ghost" className="w-full justify-start">
            {/* @ts-ignore */}
            <Icon className="h-4 w-4 mr-2" />
            {sidebarOpen && label}
          </Button>
        ))}
      </div>

      <div className="mt-4 px-3">
        {sidebarOpen && (
          <p className="text-xs uppercase text-muted-foreground mb-2 transition-opacity duration-300">
            Quick actions
          </p>
        )}
        <div className="flex flex-col gap-2">
          <Button
            variant="secondary"
            className={cn(
              'transition-all duration-300',
              sidebarOpen ? 'justify-start' : 'justify-center'
            )}
          >
            <span
              className={cn(
                'inline-flex items-center transition-all duration-300',
                sidebarOpen ? 'gap-2 opacity-100' : 'gap-0 opacity-100'
              )}
            >
              <Plus className="h-4 w-4 transition-all duration-300" />
              <span
                className={cn(
                  'whitespace-nowrap overflow-hidden transition-all duration-300 origin-left',
                  sidebarOpen
                    ? 'opacity-100 translate-x-0 w-auto'
                    : 'w-0 opacity-0 -translate-x-2'
                )}
              >
                New Campaign
              </span>
            </span>
          </Button>

          <Button
            variant="secondary"
            className={cn(
              'transition-all duration-300',
              sidebarOpen ? 'justify-start' : 'justify-center'
            )}
          >
            <span
              className={cn(
                'inline-flex items-center transition-all duration-300'
              )}
            >
              <span className="text-sm font-medium">S</span>
              <span
                className={cn(
                  'whitespace-nowrap overflow-hidden transition-all duration-300 origin-left',
                  sidebarOpen
                    ? 'opacity-100 translate-x-0 w-auto'
                    : 'w-0 opacity-0 -translate-x-2'
                )}
              >
                hopify Connect
              </span>
            </span>
          </Button>

          <Button
            variant="secondary"
            className={cn(
              'transition-all duration-300',
              sidebarOpen ? 'justify-start' : 'justify-center'
            )}
          >
            <span
              className={cn(
                'inline-flex items-center transition-all duration-300'
              )}
            >
              <span className="text-sm font-medium">A</span>
              <span
                className={cn(
                  'whitespace-nowrap overflow-hidden transition-all duration-300 origin-left',
                  sidebarOpen
                    ? 'opacity-100 translate-x-0 w-auto'
                    : 'w-0 opacity-0 -translate-x-2'
                )}
              >
                udiences Import
              </span>
            </span>
          </Button>
        </div>
      </div>
    </aside>
  );
}
