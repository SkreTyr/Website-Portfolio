"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface NotificationUser {
  avatarUrl?: string;
  name: string;
  initials?: string;
  color?: string;
}

export interface NotificationItem {
  id: string;
  user: NotificationUser;
  message: string;
  timestamp?: string;
  priority?: "low" | "medium" | "high";
  type?: "info" | "success" | "warning" | "error";
  fadingOut?: boolean;
  href?: string;
}

/** A custom message can be a plain string, or an object with optional link */
export type CustomMessage = string | { text: string; href?: string };

export interface AnimatedNotificationProps {
  maxNotifications?: number;
  autoInterval?: number;
  autoGenerate?: boolean;
  notifications?: NotificationItem[];
  customMessages?: CustomMessage[];
  animationDuration?: number;
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right" | "center";
  width?: number;
  showAvatars?: boolean;
  showTimestamps?: boolean;
  className?: string;
  onNotificationClick?: (notification: NotificationItem) => void;
  onNotificationDismiss?: (notification: NotificationItem) => void;
  allowDismiss?: boolean;
  autoDismissTimeout?: number;
  userApiEndpoint?: string;
  variant?: "default" | "minimal" | "glass" | "bordered";
  fixedUser?: NotificationUser;
}

const defaultMessages = [
  "Just completed a task! ✅",
  "New feature deployed 🚀",
  "Check out our latest update 📱",
  "Server responded with 200 OK ✨",
  "Background job finished 🔄",
  "Data synced successfully! 💾",
  "User logged in successfully 👋",
  "Payment processed 💳",
  "Email sent successfully 📧",
  "Backup completed 🛡️",
];

// Lightweight native ID generator with zero external dependencies
function generateId(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return Math.random().toString(36).substring(2, 9) + Date.now().toString(36);
}

const Avatar: React.FC<{ user: NotificationUser; showAvatar: boolean }> = ({ user, showAvatar }) => {
  if (!showAvatar) return null;
  return (
    <div
      className="flex-shrink-0 w-10 h-10 max-[360px]:w-8 max-[360px]:h-8 rounded-full overflow-hidden bg-gradient-to-br from-primary/20 to-primary/40 flex items-center justify-center transition-transform duration-300 hover:scale-110"
      style={{ backgroundColor: user.color }}
    >
      {user.avatarUrl ? (
        <img src={user.avatarUrl} alt={`${user.name} avatar`} className="w-full h-full object-cover" loading="lazy" decoding="async" />
      ) : (
        <span className="text-xs font-bold text-[#f3f3f3] drop-shadow-sm">
          {user.initials || user.name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()}
        </span>
      )}
    </div>
  );
};

const Notification: React.FC<{
  notification: NotificationItem;
  showAvatars: boolean;
  showTimestamps: boolean;
  variant: string;
  onDismiss?: () => void;
  onClick?: () => void;
  allowDismiss: boolean;
  consumeDragClick?: () => boolean;
}> = ({ notification, showAvatars, showTimestamps, variant, onDismiss, onClick, allowDismiss, consumeDragClick }) => {
  const getVariantStyles = () => {
    switch (variant) {
      case "minimal":
        return "bg-[#151515] border border-border/50";
      case "glass":
        return "bg-[#151515] border border-white/20 dark:border-gray-800/20 shadow-2xl";
      case "bordered":
        return "bg-[#151515] border-2 border-primary/30 shadow-xl";
      default:
        return "bg-[#151515] border border-white/20 shadow-2xl";
    }
  };

  const getPriorityStyles = () => {
    switch (notification.priority) {
      case "high":
        return "border-l-4 border-l-red-500 shadow-red-500/20 dark:border-l-red-500 dark:shadow-red-500/20";
      case "medium":
        return "border-l-4 border-l-yellow-500 shadow-yellow-500/20 dark:border-l-yellow-500 dark:shadow-yellow-500/20";
      case "low":
        return "border-l-4 border-l-blue-500 shadow-[0_4px_15px_color-mix(in_srgb,var(--primarylw)_20%,transparent)] dark:border-l-blue-500 dark:shadow-[0_4px_15px_color-mix(in_srgb,var(--primarylw)_20%,transparent)]";
      default:
        return "border-l-4 border-l-primary/50 shadow-primary/20 dark:border-l-primary/50 dark:shadow-primary/20";
    }
  };

  return (
    <div
      className={cn(
        "group relative transition-transform duration-300 ease-out hover:scale-[1.02] hover:-translate-y-0.5",
        "rounded-xl p-4 max-[360px]:p-3 flex items-start gap-3 max-[360px]:gap-2 w-full max-w-80 cursor-pointer select-none",
        getVariantStyles(),
        getPriorityStyles()
      )}
      onClick={() => {
        // Ignore the click that fires right after a swipe/drag gesture
        if (consumeDragClick?.()) return;
        if (notification.href) {
          if (notification.href.startsWith("http")) {
            window.open(notification.href, "_blank", "noopener,noreferrer");
          } else {
            window.location.href = notification.href;
          }
        } else {
          onClick?.();
        }
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl pointer-events-none" />
      <Avatar user={notification.user} showAvatar={showAvatars} />
      <div className="flex-1 min-w-0 space-y-1">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-sm text-[#f3f3f3] truncate">{notification.user.name}</h3>
          {showTimestamps && notification.timestamp && (
            <span className="text-xs text-muted-foreground/70 font-mono">{notification.timestamp}</span>
          )}
        </div>
        <p className="text-sm text-muted-foreground/80 line-clamp-2 leading-relaxed">{notification.message}</p>
      </div>

      {allowDismiss && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDismiss?.();
          }}
          className="flex-shrink-0 w-5 h-5 text-muted-foreground/50 hover:text-muted-foreground transition-[transform,opacity] duration-200 hover:scale-110 opacity-0 group-hover:opacity-100"
          aria-label="dismiss notification"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};

async function fetchRandomUser(apiEndpoint?: string): Promise<NotificationUser> {
  try {
    const endpoint = apiEndpoint || "https://randomuser.me/api/";
    const res = await fetch(endpoint);
    const data = await res.json();
    const user = data.results[0];
    return {
      avatarUrl: user.picture?.large,
      name: `${user.name.first} ${user.name.last}`,
      color: `hsl(${Math.floor(Math.random() * 360)}, 70%, 80%)`,
    };
  } catch {
    const names = ["John Doe", "Jane Smith", "Alex Johnson", "Sarah Wilson", "Mike Brown"];
    const randomName = names[Math.floor(Math.random() * names.length)];
    return {
      name: randomName,
      color: `hsl(${Math.floor(Math.random() * 360)}, 70%, 80%)`,
    };
  }
}

async function generateNotification(
  customMessages?: CustomMessage[],
  userApiEndpoint?: string,
  fixedUser?: NotificationUser,
  pickedIndex = 0
): Promise<NotificationItem> {
  const user = fixedUser || (await fetchRandomUser(userApiEndpoint));
  const messages: CustomMessage[] =
    customMessages && customMessages.length > 0 ? customMessages : defaultMessages;
  const picked = messages[pickedIndex % messages.length];
  const text = typeof picked === "string" ? picked : picked.text;
  const href = typeof picked === "string" ? undefined : picked.href;
  return {
    id: generateId(),
    user,
    message: text,
    href,
    timestamp: new Date().toLocaleTimeString(),
    priority: (["low", "medium", "high"] as const)[Math.floor(Math.random() * 3)],
  };
}

export const AnimatedNotification: React.FC<AnimatedNotificationProps> = ({
  maxNotifications = 3,
  autoInterval = 3500,
  autoGenerate = true,
  notifications = [],
  customMessages,
  animationDuration = 400,
  position = "center",
  width = 320,
  showAvatars = true,
  showTimestamps = true,
  className,
  onNotificationClick,
  onNotificationDismiss,
  allowDismiss = true,
  autoDismissTimeout = 3000,
  userApiEndpoint,
  variant = "glass",
  fixedUser,
}) => {
  const [notes, setNotes] = useState<NotificationItem[]>(notifications);
  const intervalRef = useRef<number | null>(null);
  const dismissTimeouts = useRef<Map<string, number>>(new Map());
  const isGenerating = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const dragMoved = useRef(false);
  const messageIndexRef = useRef(0);

  // Clear a specific note's auto-dismiss timer
  const clearNoteTimeout = useCallback((id: string) => {
    const t = dismissTimeouts.current.get(id);
    if (t) {
      window.clearTimeout(t);
      dismissTimeouts.current.delete(id);
    }
  }, []);

  // Dismiss a notification smoothly
  const dismissNotification = useCallback(
    (id: string) => {
      clearNoteTimeout(id);
      setNotes((prev) => {
        const note = prev.find((n) => n.id === id);
        if (note && onNotificationDismiss) {
          onNotificationDismiss(note);
        }
        return prev.filter((n) => n.id !== id);
      });
    },
    [clearNoteTimeout, onNotificationDismiss]
  );

  // Add a newly generated note
  const addGeneratedNote = useCallback(async () => {
    if (!autoGenerate || isGenerating.current) return;
    isGenerating.current = true;
    try {
      // Rotate through messages in order (no immediate repeats)
      const pool = customMessages && customMessages.length > 0 ? customMessages : defaultMessages;
      const pickedIndex = messageIndexRef.current % pool.length;
      messageIndexRef.current = (pickedIndex + 1) % pool.length;
      const newNote = await generateNotification(
        customMessages,
        userApiEndpoint,
        fixedUser,
        pickedIndex
      );

      setNotes((prev) => {
        let updated = [...prev];
        // Prune: if at or exceeding maxNotifications, dismiss oldest
        if (updated.length >= maxNotifications) {
          const removed = updated.shift();
          if (removed) {
            clearNoteTimeout(removed.id);
            onNotificationDismiss?.(removed);
          }
        }
        updated.push(newNote);

        // Schedule auto-dismiss for new note if timeout > 0
        if (autoDismissTimeout > 0) {
          const timeoutId = window.setTimeout(() => {
            dismissNotification(newNote.id);
          }, autoDismissTimeout);
          dismissTimeouts.current.set(newNote.id, timeoutId);
        }
        return updated;
      });
    } finally {
      isGenerating.current = false;
    }
  }, [
    autoGenerate,
    customMessages,
    userApiEndpoint,
    fixedUser,
    maxNotifications,
    autoDismissTimeout,
    clearNoteTimeout,
    onNotificationDismiss,
    dismissNotification,
  ]);

  // Pause auto-generation while the toast area is off-screen
  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.01 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  // Start interval generator (only while the toast area is on-screen)
  useEffect(() => {
    if (autoGenerate && isVisible) {
      intervalRef.current = window.setInterval(() => {
        void addGeneratedNote();
      }, autoInterval);

      const first = window.setTimeout(() => void addGeneratedNote(), 800);

      return () => {
        if (intervalRef.current) {
          window.clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
        window.clearTimeout(first);
      };
    } else {
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }
  }, [autoGenerate, autoInterval, addGeneratedNote, isVisible]);

  // Sync external notifications prop
  useEffect(() => {
    if (notifications && notifications.length > 0) {
      dismissTimeouts.current.forEach((t) => window.clearTimeout(t));
      dismissTimeouts.current.clear();
      setNotes(notifications);

      if (autoDismissTimeout > 0) {
        notifications.forEach((n) => {
          const id = window.setTimeout(() => dismissNotification(n.id), autoDismissTimeout);
          dismissTimeouts.current.set(n.id, id);
        });
      }
    }
  }, [notifications, autoDismissTimeout, dismissNotification]);

  // Cleanup all timers on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) window.clearInterval(intervalRef.current);
      dismissTimeouts.current.forEach((t) => window.clearTimeout(t));
      dismissTimeouts.current.clear();
    };
  }, []);

  const getPositionStyles = () => {
    switch (position) {
      case "top-left":
        return "fixed top-6 left-6 z-50";
      case "top-right":
        return "fixed top-6 right-6 z-50";
      case "bottom-left":
        return "fixed bottom-6 left-6 z-50";
      case "bottom-right":
        return "fixed bottom-6 right-6 z-50";
      default:
        return "flex items-center justify-center min-h-auto p-6";
    }
  };

  const animDurationSec = animationDuration / 1000;

  return (
    <div ref={containerRef} className={cn("animated-notification", getPositionStyles(), className)}>
      <div className="flex flex-col gap-3 items-center max-w-[calc(100vw-3rem)]" style={{ width }}>
        <AnimatePresence initial={false}>
          {notes.map((note) => (
            <motion.div
              key={note.id}
              drag="x"
              dragSnapToOrigin
              dragElastic={0.6}
              onDragStart={() => {
                dragMoved.current = true;
              }}
              onDragEnd={(_, info) => {
                if (Math.abs(info.offset.x) > 80 || Math.abs(info.velocity.x) > 500) {
                  dismissNotification(note.id);
                }
                // Reset after the click that immediately follows the drag fires
                window.setTimeout(() => {
                  dragMoved.current = false;
                }, 0);
              }}
              initial={{ opacity: 0, y: 20, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.94 }}
              transition={{
                duration: animDurationSec,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="w-full flex justify-center will-change-transform"
              style={{ touchAction: "pan-y" }}
            >
              <Notification
                notification={note}
                showAvatars={showAvatars}
                showTimestamps={showTimestamps}
                variant={variant}
                allowDismiss={allowDismiss}
                consumeDragClick={() => dragMoved.current}
                onClick={() => onNotificationClick?.(note)}
                onDismiss={() => dismissNotification(note.id)}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AnimatedNotification;
