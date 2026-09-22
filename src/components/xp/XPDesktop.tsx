import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import AboutSection from '../AboutSection';
import { blogPosts } from '../BlogSection';
import ContactSection from '../ContactSection';
import JunLeeSection from '../JunLeeSection';
import type { BlogPost } from '../BlogSection';

type InternalWindowId = 'about' | 'home' | 'contact' | 'blogReader';
type ShortcutId = InternalWindowId | 'resume' | 'github' | 'linkedin';
type IconKind = 'about' | 'home' | 'contact' | 'resume' | 'github' | 'linkedin' | 'reader';
type MobileSection = 'about' | 'work' | 'contact';
type SoundName = 'open' | 'close' | 'minimize' | 'maximize' | 'click';

interface WindowDefinition {
  id: InternalWindowId;
  title: string;
  icon: IconKind;
  width: number;
  height: number;
  x: number;
  y: number;
}

interface WindowState {
  id: InternalWindowId;
  open: boolean;
  minimized: boolean;
  maximized: boolean;
  zIndex: number;
  x: number;
  y: number;
  width: number;
  height: number;
  restored: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
}

interface ShortcutDefinition {
  id: ShortcutId;
  label: string;
  icon: IconKind;
  description: string;
  href?: string;
}

interface DesktopWindowProps {
  definition: WindowDefinition;
  state: WindowState;
  children: React.ReactNode;
  onFocus: () => void;
  onClose: () => void;
  onMinimize: () => void;
  onToggleMaximize: () => void;
  onMove: (x: number, y: number) => void;
  onResize: (x: number, y: number, width: number, height: number) => void;
}

type ResizeDirection = 'n' | 's' | 'e' | 'w' | 'ne' | 'nw' | 'se' | 'sw';

const RESIZE_MIN_WIDTH = 320;
const RESIZE_MIN_HEIGHT = 240;
const WORKSPACE_INSET_X = 36;
const WORKSPACE_INSET_Y = 72;

interface DesktopIconProps {
  shortcut: ShortcutDefinition;
  selected: boolean;
  onSelect: () => void;
  onOpen: () => void;
}

interface StartMenuProps {
  shortcuts: ShortcutDefinition[];
  onLaunch: (id: ShortcutId) => void;
}

interface TaskbarProps {
  windows: WindowDefinition[];
  windowStates: Record<InternalWindowId, WindowState>;
  soundEnabled: boolean;
  crtEnabled: boolean;
  startOpen: boolean;
  clock: string;
  onToggleStart: () => void;
  onToggleSound: () => void;
  onToggleCrt: () => void;
  onTaskbarClick: (id: InternalWindowId) => void;
}

interface MobileNavProps {
  activeSection: MobileSection;
  menuOpen: boolean;
  clock: string;
  onChangeSection: (section: MobileSection) => void;
  onToggleMenu: () => void;
}

interface MobilePanelProps {
  title: string;
  icon: IconKind;
  children: React.ReactNode;
  actionLabel?: string;
  onAction?: () => void;
  onClose?: () => void;
}

interface MobileShellProps {
  wallpaper: string;
  panelOpen: boolean;
  onClosePanel: () => void;
  shortcuts: ShortcutDefinition[];
  activeSection: MobileSection;
  soundEnabled: boolean;
  crtEnabled: boolean;
  menuOpen: boolean;
  clock: string;
  renderMobileSection: (section: MobileSection) => React.ReactNode;
  renderBlogReader: () => React.ReactNode;
  isBlogReaderOpen: boolean;
  onCloseBlogReader: () => void;
  onChangeSection: (section: MobileSection) => void;
  onLaunchShortcut: (id: ShortcutId) => void;
  onToggleMenu: () => void;
  onToggleSound: () => void;
  onToggleCrt: () => void;
  onPrimeAudio: () => void;
  onOpenWork: () => void;
}

const MOBILE_BREAKPOINT = 720;
const INITIAL_Z = 40;
const DESKTOP_STATE_STORAGE_KEY = 'junlee-xp-desktop-state-v1';
const CRT_STORAGE_KEY = 'junlee-xp-crt-v1';
const WINDOW_IDS: InternalWindowId[] = ['about', 'home', 'contact', 'blogReader'];
const WALLPAPER_OPTIONS = [
  // '/images/gif/1_day.gif',
  '/images/gif/2_evening.gif',
  '/images/gif/3_night_cityview.gif',
  // '/images/gif/4_night_drive.gif',
  '/images/gif/5_night_totoro.gif',
] as const;
const DEFAULT_WALLPAPER = WALLPAPER_OPTIONS[0];

const WINDOW_DEFINITIONS: Record<InternalWindowId, WindowDefinition> = {
  about: {
    id: 'about',
    title: 'about.txt',
    icon: 'about',
    width: 620,
    height: 580,
    x: 96,
    y: 64,
  },
  home: {
    id: 'home',
    title: 'Jun Lee',
    icon: 'home',
    width: 1060,
    height: 660,
    x: 300,
    y: 72,
  },
  contact: {
    id: 'contact',
    title: 'Contact',
    icon: 'contact',
    width: 520,
    height: 520,
    x: 668,
    y: 124,
  },
  blogReader: {
    id: 'blogReader',
    title: 'Blog Entry',
    icon: 'reader',
    width: 650,
    height: 540,
    x: 360,
    y: 118,
  },
};

const SHORTCUTS: ShortcutDefinition[] = [
  {
    id: 'about',
    label: 'about.txt',
    icon: 'about',
    description: 'Open my profile and current focus.',
  },
  {
    id: 'home',
    label: 'Jun Lee',
    icon: 'home',
    description: 'Browse research and projects.',
  },
  {
    id: 'contact',
    label: 'Contact',
    icon: 'contact',
    description: 'Send a note or open a drafted email.',
  },
  {
    id: 'resume',
    label: 'Resume.pdf',
    icon: 'resume',
    description: 'Open the current resume in a new tab.',
    href: '/documents/Resume.pdf',
  },
  {
    id: 'github',
    label: 'GitHub',
    icon: 'github',
    description: 'Open source work and repositories.',
    href: 'https://github.com/junjslee',
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    icon: 'linkedin',
    description: 'Professional profile and updates.',
    href: 'https://www.linkedin.com/in/junseong-lee',
  },
];

const DESKTOP_SHORTCUT_IDS: ShortcutId[] = ['about', 'home', 'resume', 'contact', 'github', 'linkedin'];
const DESKTOP_SHORTCUTS = SHORTCUTS.filter((shortcut) => DESKTOP_SHORTCUT_IDS.includes(shortcut.id));

interface PersistedDesktopState {
  windowStates: Partial<Record<InternalWindowId, Partial<WindowState>>>;
  selectedBlogPostSlug?: string;
}

function createWindowState(id: InternalWindowId, zIndex: number): WindowState {
  const definition = WINDOW_DEFINITIONS[id];

  return {
    id,
    open: id === 'about',
    minimized: false,
    maximized: false,
    zIndex,
    x: definition.x,
    y: definition.y,
    width: definition.width,
    height: definition.height,
    restored: {
      x: definition.x,
      y: definition.y,
      width: definition.width,
      height: definition.height,
    },
  };
}

function createDefaultWindowStates(): Record<InternalWindowId, WindowState> {
  return {
    about: createWindowState('about', INITIAL_Z + 1),
    home: createWindowState('home', INITIAL_Z + 2),
    contact: createWindowState('contact', INITIAL_Z + 3),
    blogReader: createWindowState('blogReader', INITIAL_Z + 4),
  };
}

function restoreWindowState(
  id: InternalWindowId,
  state: Partial<WindowState> | undefined,
  zIndex: number
): WindowState {
  const base = createWindowState(id, zIndex);

  return {
    ...base,
    open: typeof state?.open === 'boolean' ? state.open : base.open,
    minimized: typeof state?.minimized === 'boolean' ? state.minimized : base.minimized,
    maximized: typeof state?.maximized === 'boolean' ? state.maximized : base.maximized,
    zIndex: typeof state?.zIndex === 'number' ? state.zIndex : base.zIndex,
    x: typeof state?.x === 'number' ? state.x : base.x,
    y: typeof state?.y === 'number' ? state.y : base.y,
    width: typeof state?.width === 'number' ? state.width : base.width,
    height: typeof state?.height === 'number' ? state.height : base.height,
    restored: {
      x: typeof state?.restored?.x === 'number' ? state.restored.x : base.restored.x,
      y: typeof state?.restored?.y === 'number' ? state.restored.y : base.restored.y,
      width: typeof state?.restored?.width === 'number' ? state.restored.width : base.restored.width,
      height: typeof state?.restored?.height === 'number' ? state.restored.height : base.restored.height,
    },
  };
}

/* Saved window geometry is replayed into whatever viewport the visitor has
   now, which is not the one it was saved in. Without this, a window stored
   from a wide monitor opens off-screen on a laptop with no way to drag it
   back.

   Position only. Clamping width and height here was a mistake: the clamped
   values are what the persistence effect writes back, so a single visit at a
   narrow width permanently shrank every window — a phone-sized visit left the
   About window stuck at 524px on a 1400px desktop. Size is the visitor's to
   choose and is already bounded by the resize handles. */
function clampWindowToViewport(state: WindowState): WindowState {
  if (typeof window === 'undefined') {
    return state;
  }

  const workspaceWidth = Math.max(RESIZE_MIN_WIDTH, window.innerWidth - WORKSPACE_INSET_X);
  const workspaceHeight = Math.max(RESIZE_MIN_HEIGHT, window.innerHeight - WORKSPACE_INSET_Y);

  /* Keep at least this much of the title bar reachable so the window can
     always be dragged back into view. */
  const MIN_VISIBLE = 96;

  return {
    ...state,
    x: Math.max(0, Math.min(state.x, Math.max(0, workspaceWidth - MIN_VISIBLE))),
    y: Math.max(0, Math.min(state.y, Math.max(0, workspaceHeight - MIN_VISIBLE))),
  };
}

function readDesktopSessionState(): PersistedDesktopState | null {
  try {
    const rawState = window.localStorage.getItem(DESKTOP_STATE_STORAGE_KEY);
    if (!rawState) {
      return null;
    }

    return JSON.parse(rawState) as PersistedDesktopState;
  } catch (error) {
    console.error('Failed to read desktop session state.', error);
    return null;
  }
}

function writeDesktopSessionState(state: PersistedDesktopState): void {
  try {
    window.localStorage.setItem(DESKTOP_STATE_STORAGE_KEY, JSON.stringify(state));
  } catch (error) {
    console.error('Failed to write desktop session state.', error);
  }
}

function clearDesktopSessionState(): void {
  try {
    window.localStorage.removeItem(DESKTOP_STATE_STORAGE_KEY);
  } catch (error) {
    console.error('Failed to clear desktop session state.', error);
  }
}

function readCrtChoice(): boolean {
  try {
    return window.localStorage.getItem(CRT_STORAGE_KEY) === 'true';
  } catch {
    return false;
  }
}

function writeCrtChoice(enabled: boolean): void {
  try {
    window.localStorage.setItem(CRT_STORAGE_KEY, String(enabled));
  } catch {
    // ignore
  }
}

function formatClock(date: Date): string {
  return date.toLocaleTimeString([], {
    hour: 'numeric',
    minute: '2-digit',
  });
}

function chooseDailyWallpaper(): string {
  const now = new Date();
  const dayIndex = Math.floor(
    Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()) / 86400000
  );
  const index = ((dayIndex % WALLPAPER_OPTIONS.length) + WALLPAPER_OPTIONS.length) % WALLPAPER_OPTIONS.length;
  return WALLPAPER_OPTIONS[index] ?? DEFAULT_WALLPAPER;
}

function warmWallpaperCache(src: string): void {
  const image = new Image();
  image.src = src;
}

function playToneSequence(context: AudioContext, tones: Array<{ frequency: number; length: number; delay: number }>): void {
  tones.forEach(({ frequency, length, delay }) => {
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    const start = context.currentTime + delay;

    oscillator.type = 'triangle';
    oscillator.frequency.value = frequency;

    gain.gain.setValueAtTime(0.0001, start);
    gain.gain.exponentialRampToValueAtTime(0.05, start + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.0001, start + length);

    oscillator.connect(gain);
    gain.connect(context.destination);
    oscillator.start(start);
    oscillator.stop(start + length + 0.03);
  });
}

function createSoundSequence(name: SoundName): Array<{ frequency: number; length: number; delay: number }> {
  switch (name) {
    case 'open':
      return [
        { frequency: 523.25, length: 0.08, delay: 0 },
        { frequency: 659.25, length: 0.09, delay: 0.06 },
      ];
    case 'close':
      return [
        { frequency: 659.25, length: 0.08, delay: 0 },
        { frequency: 493.88, length: 0.08, delay: 0.05 },
      ];
    case 'minimize':
      return [
        { frequency: 440, length: 0.06, delay: 0 },
        { frequency: 349.23, length: 0.07, delay: 0.04 },
      ];
    case 'maximize':
      return [
        { frequency: 493.88, length: 0.08, delay: 0 },
        { frequency: 659.25, length: 0.08, delay: 0.04 },
      ];
    case 'click':
    default:
      return [{ frequency: 740, length: 0.045, delay: 0 }];
  }
}

function DesktopGlyph({ icon }: { icon: IconKind }): React.ReactElement {
  switch (icon) {
    case 'about':
      return (
        <svg viewBox="0 0 48 48" className="xp-desktop-glyph" aria-hidden="true">
          <rect x="8" y="6" width="28" height="34" rx="3" fill="#fffef7" stroke="#143f86" strokeWidth="2" />
          <rect x="14" y="12" width="16" height="3" fill="#1e7ad9" />
          <rect x="14" y="20" width="14" height="2" fill="#6c7a8a" />
          <rect x="14" y="25" width="12" height="2" fill="#6c7a8a" />
          <path d="M36 34c4 0 6 2 6 5H30c0-3 2-5 6-5Z" fill="#f0a33b" stroke="#143f86" strokeWidth="2" />
          <circle cx="36" cy="28" r="5" fill="#ffd186" stroke="#143f86" strokeWidth="2" />
        </svg>
      );
    case 'home':
      return (
        <svg viewBox="0 0 48 48" className="xp-desktop-glyph" aria-hidden="true">
          <path d="M6 16h15l4 4h17v18a4 4 0 0 1-4 4H10a4 4 0 0 1-4-4Z" fill="#f2ca45" stroke="#8a5f00" strokeWidth="2" />
          <path d="M6 16a4 4 0 0 1 4-4h10l4 4h14a4 4 0 0 1 4 4H6Z" fill="#ffe07a" stroke="#8a5f00" strokeWidth="2" />
          <circle cx="31" cy="30" r="6" fill="#87c95e" stroke="#245d12" strokeWidth="2" />
          <path d="M31 25v10M26 30h10" stroke="#f8fff0" strokeWidth="2" />
        </svg>
      );
    case 'contact':
      return (
        <svg viewBox="0 0 48 48" className="xp-desktop-glyph" aria-hidden="true">
          <rect x="6" y="11" width="36" height="25" rx="3" fill="#f7f4ec" stroke="#143f86" strokeWidth="2" />
          <path d="m6 15 18 12 18-12" fill="none" stroke="#1b69d5" strokeWidth="2" />
          <path d="m6 36 12-11" fill="none" stroke="#b7c9e7" strokeWidth="2" />
          <path d="m42 36-12-11" fill="none" stroke="#b7c9e7" strokeWidth="2" />
        </svg>
      );
    case 'resume':
      return (
        <svg viewBox="0 0 48 48" className="xp-desktop-glyph" aria-hidden="true">
          <path d="M11 6h18l8 8v26a2 2 0 0 1-2 2H11a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2Z" fill="#fffef7" stroke="#143f86" strokeWidth="2" />
          <path d="M29 6v8h8" fill="#d9efff" stroke="#143f86" strokeWidth="2" />
          <rect x="15" y="18" width="16" height="3" fill="#d74242" />
          <rect x="15" y="25" width="14" height="2" fill="#5f6f82" />
          <rect x="15" y="30" width="12" height="2" fill="#5f6f82" />
        </svg>
      );
    case 'github':
      return (
        <svg viewBox="0 0 48 48" className="xp-desktop-glyph" aria-hidden="true">
          <circle cx="24" cy="24" r="15" fill="#1f2d3d" />
          <path d="M18 34c0-3-1-4-1-4-3 1-4-2-4-2 0-2 2-2 2-2 2 0 3 2 3 2 2 3 6 2 7 2l1-2c-5-1-10-2-10-9 0-2 1-4 2-5 0-1 0-3 1-4 0 0 2 0 5 2 3-1 6-1 10 0 3-2 5-2 5-2 1 1 1 3 1 4 1 1 2 3 2 5 0 7-5 8-10 9l1 2c0 2 0 4 0 6" fill="none" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case 'linkedin':
      return (
        <svg viewBox="0 0 48 48" className="xp-desktop-glyph" aria-hidden="true">
          <rect x="8" y="8" width="32" height="32" rx="5" fill="#0a66c2" />
          <rect x="14" y="20" width="5" height="14" fill="#fff" />
          <circle cx="16.5" cy="15.5" r="2.5" fill="#fff" />
          <path d="M24 20h5v2c1-2 3-3 5-3 4 0 6 3 6 8v7h-5v-7c0-2-1-4-3-4-3 0-3 2-3 4v7h-5Z" fill="#fff" />
        </svg>
      );
    case 'reader':
      return (
        <svg viewBox="0 0 48 48" className="xp-desktop-glyph" aria-hidden="true">
          <rect x="8" y="8" width="28" height="32" rx="2" fill="#fefcf2" stroke="#143f86" strokeWidth="2" />
          <rect x="13" y="14" width="18" height="3" fill="#0d5db4" />
          <rect x="13" y="21" width="14" height="2" fill="#6c7a8a" />
          <rect x="13" y="26" width="16" height="2" fill="#6c7a8a" />
          <path d="M36 14h4v20h-4" fill="#d95a3c" stroke="#143f86" strokeWidth="2" />
        </svg>
      );
  }
}

function DesktopIcon({ shortcut, selected, onSelect, onOpen }: DesktopIconProps): React.ReactElement {
  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={shortcut.description}
      className={`xp-desktop-icon${selected ? ' is-selected' : ''}`}
      onClick={(event) => {
        event.stopPropagation();
        onSelect();
      }}
      onDoubleClick={(event) => {
        event.stopPropagation();
        onOpen();
      }}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          onOpen();
        }
      }}
    >
      <div className={`xp-icon-badge xp-icon-${shortcut.icon}`}>
        <DesktopGlyph icon={shortcut.icon} />
      </div>
      <span className="xp-icon-label">{shortcut.label}</span>
    </div>
  );
}

function StartMenu({ shortcuts, onLaunch }: StartMenuProps): React.ReactElement {
  return (
    <div
      className="window xp-start-menu"
      role="menu"
      onMouseDown={(event) => event.stopPropagation()}
    >
      <div className="xp-start-layout">
        <div className="xp-start-ribbon">
          <span className="xp-start-ribbon-label">Junseong Lee</span>
        </div>
        <div className="xp-start-main">
          <div className="xp-start-profile">
            <img src="/images/hero.jpg" alt="Junseong Lee" className="xp-start-avatar" />
            <div>
              <strong>Junseong Lee</strong>
              <p>Research and projects</p>
            </div>
          </div>
          <div className="xp-start-items">
            {shortcuts.map((shortcut) => (
              <button
                key={shortcut.id}
                type="button"
                className="xp-start-item"
                onClick={() => onLaunch(shortcut.id)}
              >
                <div className={`xp-icon-badge xp-icon-${shortcut.icon} xp-start-icon`}>
                  <DesktopGlyph icon={shortcut.icon} />
                </div>
                <span>
                  <strong>{shortcut.label}</strong>
                  <small>{shortcut.description}</small>
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Taskbar({
  windows,
  windowStates,
  soundEnabled,
  crtEnabled,
  startOpen,
  clock,
  onToggleStart,
  onToggleSound,
  onToggleCrt,
  onTaskbarClick,
}: TaskbarProps): React.ReactElement {
  const openWindows = windows.filter((window) => windowStates[window.id].open);

  return (
    <div className="xp-taskbar">
      <button
        type="button"
        className={`xp-start-button${startOpen ? ' is-open' : ''}`}
        onClick={onToggleStart}
      >
        Start
      </button>
      <div className="xp-taskbar-buttons">
        {openWindows.map((window) => {
          const state = windowStates[window.id];
          const isActive = !state.minimized;

          return (
            <button
              key={window.id}
              type="button"
              className={`xp-taskbar-button${isActive ? ' is-active' : ''}`}
              onClick={() => onTaskbarClick(window.id)}
            >
              <span className={`xp-icon-badge xp-icon-${window.icon} xp-taskbar-icon`}>
                <DesktopGlyph icon={window.icon} />
              </span>
              <span>{window.title}</span>
            </button>
          );
        })}
      </div>
      <div className="xp-system-tray">
        <button type="button" className="xp-tray-toggle" onClick={onToggleCrt}>
          {crtEnabled ? 'CRT ●' : 'CRT'}
        </button>
        <button type="button" className="xp-tray-toggle" onClick={onToggleSound}>
          {soundEnabled ? 'Sound On' : 'Sound Off'}
        </button>
        <span className="xp-clock">{clock}</span>
      </div>
    </div>
  );
}

function DesktopWindow({
  definition,
  state,
  children,
  onFocus,
  onClose,
  onMinimize,
  onToggleMaximize,
  onMove,
  onResize,
}: DesktopWindowProps): React.ReactElement {
  const windowRef = useRef<HTMLDivElement | null>(null);
  const dragPosition = useRef<{ offsetX: number; offsetY: number } | null>(null);
  const resizeRef = useRef<{
    dir: ResizeDirection;
    startX: number;
    startY: number;
    startW: number;
    startH: number;
    startLeft: number;
    startTop: number;
  } | null>(null);

  useEffect(() => {
    const handlePointerMove = (event: MouseEvent) => {
      if (state.maximized) {
        return;
      }

      if (resizeRef.current) {
        const { dir, startX, startY, startW, startH, startLeft, startTop } = resizeRef.current;
        const dx = event.clientX - startX;
        const dy = event.clientY - startY;
        let nextW = startW;
        let nextH = startH;
        let nextLeft = startLeft;
        let nextTop = startTop;

        if (dir.includes('e')) nextW = Math.max(RESIZE_MIN_WIDTH, startW + dx);
        if (dir.includes('s')) nextH = Math.max(RESIZE_MIN_HEIGHT, startH + dy);
        if (dir.includes('w')) {
          nextW = Math.max(RESIZE_MIN_WIDTH, startW - dx);
          nextLeft = startLeft + (startW - nextW);
        }
        if (dir.includes('n')) {
          nextH = Math.max(RESIZE_MIN_HEIGHT, startH - dy);
          nextTop = startTop + (startH - nextH);
        }

        onResize(nextLeft, nextTop, nextW, nextH);
        return;
      }

      if (dragPosition.current) {
        const nextX = Math.max(16, event.clientX - dragPosition.current.offsetX);
        const nextY = Math.max(16, event.clientY - dragPosition.current.offsetY);
        onMove(nextX, nextY);
      }
    };

    const handlePointerUp = () => {
      dragPosition.current = null;
      resizeRef.current = null;
    };

    window.addEventListener('mousemove', handlePointerMove);
    window.addEventListener('mouseup', handlePointerUp);

    return () => {
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('mouseup', handlePointerUp);
    };
  }, [onMove, onResize, state.maximized]);

  const beginResize = (dir: ResizeDirection) => (event: React.MouseEvent) => {
    if (state.maximized) return;
    event.preventDefault();
    event.stopPropagation();
    onFocus();
    resizeRef.current = {
      dir,
      startX: event.clientX,
      startY: event.clientY,
      startW: state.width,
      startH: state.height,
      startLeft: state.x,
      startTop: state.y,
    };
  };

  const style = state.maximized
    ? { zIndex: state.zIndex }
    : {
        zIndex: state.zIndex,
        width: `${state.width}px`,
        height: `${state.height}px`,
        left: `${state.x}px`,
        top: `${state.y}px`,
      };

  return (
    <div
      ref={windowRef}
      className={`window xp-window${state.maximized ? ' xp-window-maximized' : ''}`}
      style={style}
      onMouseDown={onFocus}
    >
      <div
        className="title-bar"
        onMouseDown={(event) => {
          if (state.maximized) {
            return;
          }

          const target = event.target as HTMLElement;
          if (target.closest('button')) {
            return;
          }

          const rect = windowRef.current?.getBoundingClientRect();
          if (!rect) {
            return;
          }

          onFocus();
          dragPosition.current = {
            offsetX: event.clientX - rect.left,
            offsetY: event.clientY - rect.top,
          };
        }}
      >
        <div className="title-bar-text">
          <span className={`xp-icon-badge xp-icon-${definition.icon} xp-title-icon`}>
            <DesktopGlyph icon={definition.icon} />
          </span>
          <span>{definition.title}</span>
        </div>
        <div className="title-bar-controls">
          <button
            type="button"
            aria-label="Minimize"
            onClick={(event) => {
              event.stopPropagation();
              onMinimize();
            }}
          />
          <button
            type="button"
            aria-label={state.maximized ? 'Restore' : 'Maximize'}
            onClick={(event) => {
              event.stopPropagation();
              onToggleMaximize();
            }}
          />
          <button
            type="button"
            aria-label="Close"
            onClick={(event) => {
              event.stopPropagation();
              onClose();
            }}
          />
        </div>
      </div>
      <div className="window-body xp-window-body">
        <div className="xp-window-content">{children}</div>
      </div>
      {!state.maximized && (
        <>
          <div className="xp-resize-handle xp-resize-n" onMouseDown={beginResize('n')} />
          <div className="xp-resize-handle xp-resize-s" onMouseDown={beginResize('s')} />
          <div className="xp-resize-handle xp-resize-e" onMouseDown={beginResize('e')} />
          <div className="xp-resize-handle xp-resize-w" onMouseDown={beginResize('w')} />
          <div className="xp-resize-handle xp-resize-nw" onMouseDown={beginResize('nw')} />
          <div className="xp-resize-handle xp-resize-ne" onMouseDown={beginResize('ne')} />
          <div className="xp-resize-handle xp-resize-sw" onMouseDown={beginResize('sw')} />
          <div className="xp-resize-handle xp-resize-se" onMouseDown={beginResize('se')}>
            <svg viewBox="0 0 10 10" aria-hidden="true">
              <path d="M2 9 L9 2 M5 9 L9 5 M8 9 L9 8" stroke="#7d90a8" strokeWidth="1" strokeLinecap="round" />
            </svg>
          </div>
        </>
      )}
    </div>
  );
}

function MobileTaskbar({
  activeSection,
  menuOpen,
  clock,
  onChangeSection,
  onToggleMenu,
}: MobileNavProps): React.ReactElement {
  const navItems: Array<{ id: MobileSection; label: string; icon: IconKind }> = [
    { id: 'about', label: 'About', icon: 'about' },
    { id: 'work', label: 'Work', icon: 'home' },
    { id: 'contact', label: 'Contact', icon: 'contact' },
  ];

  return (
    <div className="xp-mobile-taskbar">
      <div className="xp-mobile-taskbar-buttons">
        {navItems.map((item) => (
          <button
            key={item.id}
            type="button"
            className={`xp-mobile-taskbar-button${activeSection === item.id ? ' is-active' : ''}`}
            onClick={() => onChangeSection(item.id)}
          >
            <span className={`xp-icon-badge xp-icon-${item.icon} xp-taskbar-icon`}>
              <DesktopGlyph icon={item.icon} />
            </span>
            <span>{item.label}</span>
          </button>
        ))}
        <button
          type="button"
          className={`xp-mobile-taskbar-button${menuOpen ? ' is-active' : ''}`}
          onClick={onToggleMenu}
        >
          <span className="xp-icon-badge xp-icon-resume xp-taskbar-icon">
            <DesktopGlyph icon="resume" />
          </span>
          <span>More</span>
        </button>
      </div>
      <div className="xp-mobile-system">
        <span className="xp-clock">{clock}</span>
      </div>
    </div>
  );
}

function MobileWindowPanel({
  title,
  icon,
  children,
  actionLabel,
  onAction,
  onClose,
}: MobilePanelProps): React.ReactElement {
  return (
    <div className="window xp-mobile-panel" onClick={(event) => event.stopPropagation()}>
      <div className="title-bar">
        <div className="title-bar-text">
          <span className={`xp-icon-badge xp-icon-${icon} xp-title-icon`}>
            <DesktopGlyph icon={icon} />
          </span>
          <span>{title}</span>
        </div>
        <div className="xp-mobile-panel-actions">
          {actionLabel && onAction ? (
            <button type="button" onClick={onAction}>
              {actionLabel}
            </button>
          ) : null}
          {onClose ? (
            <button
              type="button"
              className="xp-mobile-close"
              aria-label={`Close ${title}`}
              onClick={onClose}
            >
              &#10005;
            </button>
          ) : null}
        </div>
      </div>
      <div className="window-body xp-window-body xp-mobile-window-body">
        <div className="xp-window-content">{children}</div>
      </div>
    </div>
  );
}

function MobileShell({
  wallpaper,
  panelOpen,
  onClosePanel,
  shortcuts,
  activeSection,
  soundEnabled,
  crtEnabled,
  menuOpen,
  clock,
  renderMobileSection,
  renderBlogReader,
  isBlogReaderOpen,
  onCloseBlogReader,
  onChangeSection,
  onLaunchShortcut,
  onToggleMenu,
  onToggleSound,
  onToggleCrt,
  onPrimeAudio,
  onOpenWork,
}: MobileShellProps): React.ReactElement {
  const menuShortcuts = shortcuts.filter(
    (shortcut) => shortcut.id === 'resume' || shortcut.id === 'github' || shortcut.id === 'linkedin'
  );
  const activePanel =
    activeSection === 'about'
      ? { title: 'about.txt', icon: 'about' as const, actionLabel: 'Open Work', onAction: onOpenWork }
      : activeSection === 'work'
        ? { title: 'Jun Lee', icon: 'home' as const, actionLabel: undefined, onAction: undefined }
        : { title: 'Contact', icon: 'contact' as const, actionLabel: undefined, onAction: undefined };

  return (
    <div
      className="xp-mobile-shell"
      onClick={() => {
        onPrimeAudio();
        if (menuOpen) {
          onToggleMenu();
        }
      }}
    >
      {/* The shell scrolls, so painting the wallpaper on it stretched the
          image over the whole document height. A fixed layer keeps it
          scaled to the viewport instead. */}
      <div className="xp-mobile-wallpaper" style={{ backgroundImage: `url(${wallpaper})` }} aria-hidden="true" />
      <div className={`xp-mobile-workspace${panelOpen ? '' : ' is-empty'}`}>
        {panelOpen ? (
          <MobileWindowPanel
            key={activeSection}
            title={activePanel.title}
            icon={activePanel.icon}
            actionLabel={activePanel.actionLabel}
            onAction={activePanel.onAction}
            onClose={onClosePanel}
          >
            {renderMobileSection(activeSection)}
          </MobileWindowPanel>
        ) : null}

        {menuOpen ? (
          <div className="window xp-mobile-launcher" onClick={(event) => event.stopPropagation()}>
            <div className="title-bar">
              <div className="title-bar-text">More</div>
            </div>
            <div className="window-body xp-mobile-launcher-body">
              <div className="xp-mobile-launch-section">
                <strong>Links</strong>
                {menuShortcuts.map((shortcut) => (
                  <button
                    key={shortcut.id}
                    type="button"
                    className="xp-mobile-launch-item"
                    onClick={() => onLaunchShortcut(shortcut.id)}
                  >
                    <span className={`xp-icon-badge xp-icon-${shortcut.icon} xp-start-icon`}>
                      <DesktopGlyph icon={shortcut.icon} />
                    </span>
                    <span className="xp-mobile-launch-copy">
                      <strong>{shortcut.label}</strong>
                      <small>{shortcut.description}</small>
                    </span>
                  </button>
                ))}
              </div>

              <div className="xp-mobile-launch-section">
                <strong>Settings</strong>
                <button type="button" className="xp-mobile-launch-item" onClick={onToggleSound}>
                  <span className="xp-icon-badge xp-icon-about xp-start-icon">
                    <DesktopGlyph icon="about" />
                  </span>
                  <span className="xp-mobile-launch-copy">
                    <strong>{soundEnabled ? 'Mute sounds' : 'Enable sounds'}</strong>
                    <small>Toggle interface sound effects.</small>
                  </span>
                </button>
                <button type="button" className="xp-mobile-launch-item" onClick={onToggleCrt}>
                  <span className="xp-icon-badge xp-icon-about xp-start-icon">
                    <DesktopGlyph icon="about" />
                  </span>
                  <span className="xp-mobile-launch-copy">
                    <strong>{crtEnabled ? 'CRT scanlines: On' : 'CRT scanlines: Off'}</strong>
                    <small>Toggle retro CRT display effect.</small>
                  </span>
                </button>
              </div>
            </div>
          </div>
        ) : null}

        {isBlogReaderOpen ? (
          <div className="xp-mobile-overlay" onClick={onCloseBlogReader}>
            <div className="xp-mobile-overlay-panel" onClick={(event) => event.stopPropagation()}>
              <MobileWindowPanel title="Writing" icon="reader" onClose={onCloseBlogReader}>
                {renderBlogReader()}
              </MobileWindowPanel>
            </div>
          </div>
        ) : null}
      </div>

      <MobileTaskbar
        activeSection={activeSection}
        menuOpen={menuOpen}
        clock={clock}
        onChangeSection={onChangeSection}
        onToggleMenu={onToggleMenu}
      />
    </div>
  );
}

/* Pre-hydration ground.
   The XP shell is entirely client-rendered, which used to leave the static
   HTML with no readable content at all — bad for anyone without JS and bad
   for crawlers. This shim is the real pre-hydration state: it carries the
   page's h1, summary and primary links. It fades in only after a short delay,
   so a normal visitor never sees it flash before the desktop mounts. */
function DesktopShim(): React.ReactElement {
  return (
    <div className="xp-desktop-shim">
      <div className="xp-desktop-shim-card">
        <h1>Junseong Lee</h1>
        <p>
          AI researcher working on medical AI, human–AI interaction, and biomedical knowledge
          graphs. Most recently a research intern at the Laboratory of Medical Imaging and
          Computation, Massachusetts General Hospital and Harvard Medical School, where I built
          BiomeTrail — a provenance-gated biomedical knowledge graph. Studying Data Science and
          Finance at the University of Illinois Urbana-Champaign.
        </p>
        <p>
          The full site is an interactive Windows XP desktop and needs JavaScript. These pages
          carry the same content as plain documents:
        </p>
        <ul>
          <li>
<Link href="/research/">Research</Link> — publications and studies in medical AI
          </li>
          <li>
<Link href="/projects/">Projects</Link> — software, benchmarks, and knowledge-graph work
          </li>
          <li>
            <a href="/documents/Resume.pdf">Resume (PDF)</a>
          </li>
          <li>
            <a href="https://github.com/junjslee">GitHub</a> ·{' '}
            <a href="https://www.linkedin.com/in/junseong-lee">LinkedIn</a>
          </li>
        </ul>
      </div>
    </div>
  );
}

const XPDesktop: React.FC = () => {
  const [windowStates, setWindowStates] = useState<Record<InternalWindowId, WindowState>>(createDefaultWindowStates);
  const [selectedShortcut, setSelectedShortcut] = useState<ShortcutId | null>(null);
  const [startOpen, setStartOpen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [crtEnabled, setCrtEnabled] = useState(false);
  const [clock, setClock] = useState('--:--');
  const [wallpaper, setWallpaper] = useState('');
  const [isMobile, setIsMobile] = useState(false);
  const [mobileSection, setMobileSection] = useState<MobileSection>('about');
  // Closing the mobile panel reveals the desktop, the way closing a window does.
  const [mobilePanelOpen, setMobilePanelOpen] = useState(true);
  const [selectedBlogPost, setSelectedBlogPost] = useState<BlogPost>(blogPosts[0]);
  const [hasMountedClient, setHasMountedClient] = useState(false);
  const [hasHydratedDesktopState, setHasHydratedDesktopState] = useState(false);
  const zCounter = useRef(INITIAL_Z + 10);
  const audioContextRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    const handleChange = (event: MediaQueryListEvent | MediaQueryList) => {
      setIsMobile(event.matches);
    };

    handleChange(mediaQuery);
    mediaQuery.addEventListener('change', handleChange);

    const initialNow = new Date();
    setClock(formatClock(initialNow));
    setHasMountedClient(true);
    setCrtEnabled(readCrtChoice());

    const selectedWallpaper = chooseDailyWallpaper();
    setWallpaper(selectedWallpaper);
    warmWallpaperCache(selectedWallpaper);

    const timer = window.setInterval(() => {
      const now = new Date();
      setClock(formatClock(now));
    }, 1000);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
      window.clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    const parsedState = readDesktopSessionState();
    if (!parsedState) {
      setHasHydratedDesktopState(true);
      return;
    }

    try {
      const restoredWindowStates = WINDOW_IDS.reduce(
        (accumulator, id, index) => {
          accumulator[id] = clampWindowToViewport(
            restoreWindowState(id, parsedState.windowStates?.[id], INITIAL_Z + index + 1)
          );
          return accumulator;
        },
        {} as Record<InternalWindowId, WindowState>
      );
      const restoredBlogPost = blogPosts.find((post) => post.slug === parsedState.selectedBlogPostSlug) ?? blogPosts[0];
      const highestZIndex = Math.max(...Object.values(restoredWindowStates).map((windowState) => windowState.zIndex));

      setWindowStates(restoredWindowStates);
      setSelectedBlogPost(restoredBlogPost);
      zCounter.current = Math.max(INITIAL_Z + 10, highestZIndex) + 1;
    } catch (error) {
      console.error('Failed to restore desktop state.', error);
      clearDesktopSessionState();
    } finally {
      setHasHydratedDesktopState(true);
    }
  }, []);

  useEffect(() => {
    if (!hasHydratedDesktopState) {
      return;
    }

    const persistedState: PersistedDesktopState = {
      windowStates: WINDOW_IDS.reduce(
        (accumulator, id) => {
          accumulator[id] = windowStates[id];
          return accumulator;
        },
        {} as PersistedDesktopState['windowStates']
      ),
      selectedBlogPostSlug: selectedBlogPost.slug,
    };

    writeDesktopSessionState(persistedState);
  }, [hasHydratedDesktopState, selectedBlogPost.slug, windowStates]);

  const toggleCrt = () => {
    setCrtEnabled((prev) => {
      const next = !prev;
      writeCrtChoice(next);
      return next;
    });
  };

  const primeAudio = () => {
    const AudioContextClass =
      window.AudioContext ||
      (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass || audioContextRef.current) {
      return;
    }

    audioContextRef.current = new AudioContextClass();
    audioContextRef.current.resume().catch(() => undefined);
  };

  const playSound = (name: SoundName) => {
    if (!soundEnabled) {
      return;
    }

    primeAudio();

    const context = audioContextRef.current;
    if (!context) {
      return;
    }

    if (context.state === 'suspended') {
      context.resume().catch(() => undefined);
    }

    playToneSequence(context, createSoundSequence(name));
  };

  const bringToFront = (id: InternalWindowId) => {
    setWindowStates((current) => ({
      ...current,
      [id]: {
        ...current[id],
        zIndex: ++zCounter.current,
      },
    }));
  };

  const openWindow = (id: InternalWindowId) => {
    playSound('open');
    setSelectedShortcut(id);
    setStartOpen(false);
    setWindowStates((current) => ({
      ...current,
      [id]: {
        ...current[id],
        open: true,
        minimized: false,
        zIndex: ++zCounter.current,
      },
    }));
  };

  const closeWindow = (id: InternalWindowId) => {
    playSound('close');
    setWindowStates((current) => ({
      ...current,
      [id]: {
        ...current[id],
        open: false,
        minimized: false,
      },
    }));
  };

  const minimizeWindow = (id: InternalWindowId) => {
    playSound('minimize');
    setWindowStates((current) => ({
      ...current,
      [id]: {
        ...current[id],
        minimized: true,
      },
    }));
  };

  const toggleMaximize = (id: InternalWindowId) => {
    setWindowStates((current) => {
      const windowState = current[id];
      const nextMaximized = !windowState.maximized;
      playSound(nextMaximized ? 'maximize' : 'click');

      if (nextMaximized) {
        return {
          ...current,
          [id]: {
            ...windowState,
            maximized: true,
            minimized: false,
            zIndex: ++zCounter.current,
            restored: {
              x: windowState.x,
              y: windowState.y,
              width: windowState.width,
              height: windowState.height,
            },
          },
        };
      }

      return {
        ...current,
        [id]: {
          ...windowState,
          maximized: false,
          minimized: false,
          zIndex: ++zCounter.current,
          x: windowState.restored.x,
          y: windowState.restored.y,
          width: windowState.restored.width,
          height: windowState.restored.height,
        },
      };
    });
  };

  const resizeWindow = (
    id: InternalWindowId,
    x: number,
    y: number,
    width: number,
    height: number
  ) => {
    setWindowStates((current) => {
      const maxX = Math.max(16, window.innerWidth - width - 20);
      const maxY = Math.max(16, window.innerHeight - height - 70);
      const clampedX = Math.max(16, Math.min(x, maxX));
      const clampedY = Math.max(16, Math.min(y, maxY));
      return {
        ...current,
        [id]: {
          ...current[id],
          x: clampedX,
          y: clampedY,
          width,
          height,
          restored: {
            x: clampedX,
            y: clampedY,
            width,
            height,
          },
        },
      };
    });
  };

  const moveWindow = (id: InternalWindowId, x: number, y: number) => {
    setWindowStates((current) => {
      const windowState = current[id];
      const width = windowState.width;
      const height = windowState.height;
      const maxX = Math.max(16, window.innerWidth - width - 20);
      const maxY = Math.max(16, window.innerHeight - height - 70);

      return {
        ...current,
        [id]: {
          ...windowState,
          x: Math.min(x, maxX),
          y: Math.min(y, maxY),
          restored: {
            ...windowState.restored,
            x: Math.min(x, maxX),
            y: Math.min(y, maxY),
          },
        },
      };
    });
  };

  const toggleTaskbarWindow = (id: InternalWindowId) => {
    const windowState = windowStates[id];
    const activeWindow =
      [...WINDOW_IDS]
        .map((windowId) => windowStates[windowId])
        .filter((entry) => entry.open && !entry.minimized)
        .sort((left, right) => right.zIndex - left.zIndex)[0] ?? null;

    if (!windowState.open) {
      openWindow(id);
      return;
    }

    if (windowState.minimized) {
      openWindow(id);
      return;
    }

    if (activeWindow?.id !== id) {
      bringToFront(id);
      return;
    }

    minimizeWindow(id);
  };

  const openExternalShortcut = (id: Extract<ShortcutId, 'resume' | 'github' | 'linkedin'>) => {
    const shortcut = SHORTCUTS.find((entry) => entry.id === id);
    if (!shortcut?.href) {
      return;
    }

    playSound('open');
    setSelectedShortcut(id);
    setStartOpen(false);
    window.open(shortcut.href, '_blank', 'noopener,noreferrer');
  };

  const launchShortcut = (id: ShortcutId) => {
    switch (id) {
      case 'about':
      case 'home':
      case 'contact':
        openWindow(id);
        return;
      case 'resume':
      case 'github':
      case 'linkedin':
        openExternalShortcut(id);
        return;
    }
  };

  const openBlogPost = (post: BlogPost) => {
    setSelectedBlogPost(post);
    setStartOpen(false);
    setWindowStates((current) => ({
      ...current,
      blogReader: {
        ...current.blogReader,
        open: true,
        minimized: false,
        zIndex: ++zCounter.current,
      },
    }));
    playSound('open');
  };

  const closeBlogReader = () => {
    closeWindow('blogReader');
  };

  const renderWindowContent = (id: InternalWindowId) => {
    switch (id) {
      case 'about':
        return <AboutSection onOpenHome={() => openWindow('home')} />;
      case 'home':
        return <JunLeeSection onOpenPost={openBlogPost} />;
      case 'contact':
        return <ContactSection />;
      case 'blogReader':
        return (
          <section className="xp-content xp-blog-reader">
            <div className="xp-pane">
              <h1>{selectedBlogPost.title}</h1>
              <time>{selectedBlogPost.date}</time>
            </div>
            <div className="xp-pane xp-blog-reader-body">
              {selectedBlogPost.content.split(/\n\s*\n/).map((paragraph, index) => (
                <p key={`${selectedBlogPost.slug}-${index}`}>{paragraph.trim()}</p>
              ))}
            </div>
          </section>
        );
    }
  };

  const renderMobileSection = (section: MobileSection) => {
    switch (section) {
      case 'about':
        return (
          <AboutSection
            onOpenHome={() => {
              playSound('open');
              setMobileSection('work');
              setStartOpen(false);
            }}
          />
        );
      case 'work':
        return <JunLeeSection onOpenPost={openBlogPost} />;
      case 'contact':
        return <ContactSection />;
    }
  };

  const visibleWindows = WINDOW_IDS
    .map((id) => windowStates[id])
    .filter((windowState) => windowState.open && !windowState.minimized);

  if (!hasMountedClient || !hasHydratedDesktopState) {
    return <DesktopShim />;
  }

  if (isMobile) {
    return (
      <>
        <MobileShell
          wallpaper={wallpaper}
          shortcuts={SHORTCUTS}
          activeSection={mobileSection}
          panelOpen={mobilePanelOpen}
          onClosePanel={() => {
            playSound('close');
            setMobilePanelOpen(false);
          }}
          soundEnabled={soundEnabled}
          crtEnabled={crtEnabled}
          menuOpen={startOpen}
          clock={clock}
          renderMobileSection={renderMobileSection}
          renderBlogReader={() => renderWindowContent('blogReader')}
          isBlogReaderOpen={windowStates.blogReader.open && !windowStates.blogReader.minimized}
          onCloseBlogReader={closeBlogReader}
          onChangeSection={(section) => {
            playSound('click');
            setMobileSection(section);
            setMobilePanelOpen(true);
            setStartOpen(false);
          }}
          onLaunchShortcut={launchShortcut}
          onToggleMenu={() => {
            playSound('click');
            setStartOpen((value) => !value);
          }}
          onToggleSound={() => {
            playSound('click');
            setSoundEnabled((value) => !value);
          }}
          onToggleCrt={() => {
            playSound('click');
            toggleCrt();
          }}
          onPrimeAudio={primeAudio}
          onOpenWork={() => {
            playSound('open');
            setMobileSection('work');
            setMobilePanelOpen(true);
            setStartOpen(false);
          }}
        />
        {crtEnabled && <div className="xp-crt-overlay" />}
      </>
    );
  }

  return (
    <div className="xp-desktop" style={{ backgroundImage: `url(${wallpaper})` }}>
      <div
        className="xp-desktop-workspace"
        onMouseDown={() => {
          setSelectedShortcut(null);
          setStartOpen(false);
          primeAudio();
        }}
      >
        <div className="xp-shortcuts" aria-label="Desktop shortcuts">
          {DESKTOP_SHORTCUTS.map((shortcut) => (
            <DesktopIcon
              key={shortcut.id}
              shortcut={shortcut}
              selected={selectedShortcut === shortcut.id}
              onSelect={() => setSelectedShortcut(shortcut.id)}
              onOpen={() => launchShortcut(shortcut.id)}
            />
          ))}
        </div>

        {visibleWindows.map((windowState) => (
          <DesktopWindow
            key={windowState.id}
            definition={WINDOW_DEFINITIONS[windowState.id]}
            state={windowState}
            onFocus={() => bringToFront(windowState.id)}
            onClose={() => closeWindow(windowState.id)}
            onMinimize={() => minimizeWindow(windowState.id)}
            onToggleMaximize={() => toggleMaximize(windowState.id)}
            onMove={(x, y) => moveWindow(windowState.id, x, y)}
            onResize={(x, y, w, h) => resizeWindow(windowState.id, x, y, w, h)}
          >
            {renderWindowContent(windowState.id)}
          </DesktopWindow>
        ))}

        {startOpen ? (
          <StartMenu
            shortcuts={SHORTCUTS}
            onLaunch={(id) => {
              playSound('click');
              launchShortcut(id);
            }}
          />
        ) : null}
      </div>

      <Taskbar
        windows={Object.values(WINDOW_DEFINITIONS)}
        windowStates={windowStates}
        soundEnabled={soundEnabled}
        crtEnabled={crtEnabled}
        startOpen={startOpen}
        clock={clock}
        onToggleStart={() => {
          playSound('click');
          setStartOpen((value) => !value);
        }}
        onToggleSound={() => {
          playSound('click');
          setSoundEnabled((value) => !value);
        }}
        onToggleCrt={() => {
          playSound('click');
          toggleCrt();
        }}
        onTaskbarClick={toggleTaskbarWindow}
      />
      {crtEnabled && <div className="xp-crt-overlay" />}
    </div>
  );
};

export default XPDesktop;
