import React, { useEffect, useRef, useState } from 'react';
import AboutSection from '../AboutSection';
import BlogSection, { blogPosts } from '../BlogSection';
import ContactSection from '../ContactSection';
import ProjectsSection from '../ProjectsSection';
import type { BlogPost } from '../BlogPostCard';

type InternalWindowId = 'about' | 'projects' | 'blog' | 'contact' | 'blogReader';
type ShortcutId = InternalWindowId | 'resume' | 'github' | 'linkedin';
type IconKind = 'about' | 'projects' | 'blog' | 'contact' | 'resume' | 'github' | 'linkedin' | 'reader';
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
}

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
  startOpen: boolean;
  clock: string;
  onToggleStart: () => void;
  onToggleSound: () => void;
  onTaskbarClick: (id: InternalWindowId) => void;
}

const MOBILE_BREAKPOINT = 720;
const INITIAL_Z = 40;
const DESKTOP_STATE_STORAGE_KEY = 'junlee-xp-desktop-session-v1';
const WINDOW_IDS: InternalWindowId[] = ['about', 'projects', 'blog', 'contact', 'blogReader'];
const DEFAULT_WALLPAPER = '/images/gif/1_day.gif';
const WALLPAPER_RULES = [
  { startHour: 10, endHour: 16, src: '/images/gif/1_day.gif' },
  { startHour: 16, endHour: 22, src: '/images/gif/2_evening.gif' },
  { startHour: 22, endHour: 24, src: '/images/gif/3_night_cityview.gif' },
  { startHour: 0, endHour: 4, src: '/images/gif/3_night_cityview.gif' },
  { startHour: 4, endHour: 10, src: '/images/gif/4_night_drive.gif' },
] as const;

const WINDOW_DEFINITIONS: Record<InternalWindowId, WindowDefinition> = {
  about: {
    id: 'about',
    title: 'about.txt',
    icon: 'about',
    width: 520,
    height: 520,
    x: 88,
    y: 84,
  },
  projects: {
    id: 'projects',
    title: 'Projects',
    icon: 'projects',
    width: 720,
    height: 540,
    x: 392,
    y: 92,
  },
  blog: {
    id: 'blog',
    title: 'Blog',
    icon: 'blog',
    width: 640,
    height: 480,
    x: 224,
    y: 188,
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
    id: 'projects',
    label: 'Projects',
    icon: 'projects',
    description: 'View software, research, and experiments.',
  },
  {
    id: 'blog',
    label: 'Blog',
    icon: 'blog',
    description: 'Open reflections and long-form writing.',
  },
  {
    id: 'contact',
    label: 'Contact',
    icon: 'contact',
    description: 'Send a note or open social links.',
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
    projects: createWindowState('projects', INITIAL_Z + 2),
    blog: createWindowState('blog', INITIAL_Z + 3),
    contact: createWindowState('contact', INITIAL_Z + 4),
    blogReader: createWindowState('blogReader', INITIAL_Z + 5),
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

function readDesktopSessionState(): PersistedDesktopState | null {
  try {
    const rawState = window.sessionStorage.getItem(DESKTOP_STATE_STORAGE_KEY);
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
    window.sessionStorage.setItem(DESKTOP_STATE_STORAGE_KEY, JSON.stringify(state));
  } catch (error) {
    console.error('Failed to write desktop session state.', error);
  }
}

function clearDesktopSessionState(): void {
  try {
    window.sessionStorage.removeItem(DESKTOP_STATE_STORAGE_KEY);
  } catch (error) {
    console.error('Failed to clear desktop session state.', error);
  }
}

function formatClock(date: Date): string {
  return date.toLocaleTimeString([], {
    hour: 'numeric',
    minute: '2-digit',
  });
}

function getWallpaperForDate(date: Date): string {
  const hour = date.getHours();
  const activeWallpaper = WALLPAPER_RULES.find((rule) => hour >= rule.startHour && hour < rule.endHour);
  return activeWallpaper?.src ?? '/images/gif/4_night_drive.gif';
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
    case 'projects':
      return (
        <svg viewBox="0 0 48 48" className="xp-desktop-glyph" aria-hidden="true">
          <path d="M6 16h15l4 4h17v18a4 4 0 0 1-4 4H10a4 4 0 0 1-4-4Z" fill="#f2ca45" stroke="#8a5f00" strokeWidth="2" />
          <path d="M6 16a4 4 0 0 1 4-4h10l4 4h14a4 4 0 0 1 4 4H6Z" fill="#ffe07a" stroke="#8a5f00" strokeWidth="2" />
          <rect x="10" y="23" width="12" height="3" fill="#8a5f00" opacity="0.65" />
        </svg>
      );
    case 'blog':
      return (
        <svg viewBox="0 0 48 48" className="xp-desktop-glyph" aria-hidden="true">
          <rect x="9" y="7" width="28" height="34" rx="4" fill="#ffe598" stroke="#935f00" strokeWidth="2" />
          <rect x="15" y="14" width="16" height="3" fill="#935f00" />
          <rect x="15" y="21" width="12" height="2" fill="#935f00" opacity="0.72" />
          <rect x="15" y="26" width="15" height="2" fill="#935f00" opacity="0.72" />
          <path d="m33 34 6 6" stroke="#0d3f86" strokeWidth="4" strokeLinecap="round" />
          <circle cx="31" cy="32" r="6" fill="#91d5ff" stroke="#0d3f86" strokeWidth="2" />
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
              <strong>Jun Lee</strong>
              <p>Windows XP Edition</p>
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
  startOpen,
  clock,
  onToggleStart,
  onToggleSound,
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
}: DesktopWindowProps): React.ReactElement {
  const windowRef = useRef<HTMLDivElement | null>(null);
  const dragPosition = useRef<{ offsetX: number; offsetY: number } | null>(null);

  useEffect(() => {
    const handlePointerMove = (event: MouseEvent) => {
      if (!dragPosition.current || state.maximized) {
        return;
      }

      const nextX = Math.max(16, event.clientX - dragPosition.current.offsetX);
      const nextY = Math.max(16, event.clientY - dragPosition.current.offsetY);

      onMove(nextX, nextY);
    };

    const handlePointerUp = () => {
      dragPosition.current = null;
    };

    window.addEventListener('mousemove', handlePointerMove);
    window.addEventListener('mouseup', handlePointerUp);

    return () => {
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('mouseup', handlePointerUp);
    };
  }, [onMove, state.maximized]);

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
    </div>
  );
}

function MobileFallback({
  wallpaper,
  soundEnabled,
  onToggleSound,
}: {
  wallpaper: string;
  soundEnabled: boolean;
  onToggleSound: () => void;
}): React.ReactElement {
  return (
    <div className="xp-mobile-shell" style={{ backgroundImage: `url(${wallpaper})` }}>
      <div className="window xp-mobile-window">
        <div className="title-bar">
          <div className="title-bar-text">Jun Lee on Windows XP</div>
          <div className="title-bar-controls">
            <button type="button" aria-label="Help" onClick={onToggleSound} />
          </div>
        </div>
        <div className="window-body">
          <div className="xp-mobile-card">
            <img src="/images/hero.jpg" alt="Junseong Lee" className="xp-mobile-avatar" />
            <div>
              <h1>Desktop Recommended</h1>
              <p>
                This build follows the desktop-first XP layout from the inspiration site. Use a laptop
                or desktop for the full experience.
              </p>
              <p>
                You can still reach the important links from here while the full desktop waits on a
                larger screen.
              </p>
            </div>
          </div>
          <div className="xp-mobile-actions">
            <a href="/documents/Resume.pdf" target="_blank" rel="noopener noreferrer">
              Resume.pdf
            </a>
            <a href="mailto:junseong.lee652@gmail.com">Email</a>
            <a href="https://github.com/junjslee" target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
            <a href="https://www.linkedin.com/in/junseong-lee" target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
          </div>
          <button type="button" className="xp-mobile-sound" onClick={onToggleSound}>
            {soundEnabled ? 'Mute UI Sounds' : 'Enable UI Sounds'}
          </button>
        </div>
      </div>
    </div>
  );
}

function BootScreen(): React.ReactElement {
  return (
    <div className="xp-boot-screen">
      <div className="window xp-boot-window">
        <div className="title-bar">
          <div className="title-bar-text">Windows XP Portfolio</div>
        </div>
        <div className="window-body xp-boot-body">
          <strong>Starting up...</strong>
          <p>Loading your desktop, wallpaper, and open windows.</p>
          <div className="xp-boot-progress" aria-hidden="true">
            <span className="xp-boot-progress-bar" />
          </div>
        </div>
      </div>
    </div>
  );
}

const XPDesktop: React.FC = () => {
  const [windowStates, setWindowStates] = useState<Record<InternalWindowId, WindowState>>(createDefaultWindowStates);
  const [selectedShortcut, setSelectedShortcut] = useState<ShortcutId | null>(null);
  const [startOpen, setStartOpen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [clock, setClock] = useState('--:--');
  const [wallpaper, setWallpaper] = useState(DEFAULT_WALLPAPER);
  const [isMobile, setIsMobile] = useState(false);
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
    setWallpaper(getWallpaperForDate(initialNow));
    setHasMountedClient(true);

    const timer = window.setInterval(() => {
      const now = new Date();
      setClock(formatClock(now));
      setWallpaper(getWallpaperForDate(now));
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
          accumulator[id] = restoreWindowState(id, parsedState.windowStates?.[id], INITIAL_Z + index + 1);
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

    if (!windowState.open) {
      openWindow(id);
      return;
    }

    if (windowState.minimized) {
      openWindow(id);
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
      case 'projects':
      case 'blog':
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

  const renderWindowContent = (id: InternalWindowId) => {
    switch (id) {
      case 'about':
        return <AboutSection />;
      case 'projects':
        return <ProjectsSection />;
      case 'blog':
        return <BlogSection onOpenPost={openBlogPost} />;
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

  const visibleWindows = Object.values(windowStates)
    .filter((windowState) => windowState.open && !windowState.minimized)
    .sort((left, right) => left.zIndex - right.zIndex);

  if (!hasMountedClient || !hasHydratedDesktopState) {
    return <BootScreen />;
  }

  if (isMobile) {
    return (
      <MobileFallback
        wallpaper={wallpaper}
        soundEnabled={soundEnabled}
        onToggleSound={() => setSoundEnabled((value) => !value)}
      />
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
          {SHORTCUTS.map((shortcut) => (
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
        onTaskbarClick={toggleTaskbarWindow}
      />
    </div>
  );
};

export default XPDesktop;
