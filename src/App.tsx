import { useEffect, useLayoutEffect, useState } from 'react';
import { Monitor, Moon, Sun } from 'lucide-react';
import tasksData from './data/tasks.json';
import volunteersData from './data/volunteers.json';
import { Leaderboard } from './components/Leaderboard';
import { TaskList } from './components/TaskList';
import { VolunteerList } from './components/VolunteerList';
import { readPreference, savePreference } from './lib/preferences';
import type { Task, Volunteer } from './lib/types';

const tasks = tasksData as Task[];
const volunteers = volunteersData as Volunteer[];

type Tab = 'tasks' | 'volunteers' | 'leaderboard';
const tabKey = 'osubb-active-tab';

const themes = [
  { id: 'light', label: 'Temă luminoasă', icon: Sun },
  { id: 'dark', label: 'Temă întunecată', icon: Moon },
  { id: 'system', label: 'Tema sistemului', icon: Monitor },
] as const;

type Theme = typeof themes[number]['id'];
const themeKey = 'osubb-theme';
const systemTheme = window.matchMedia('(prefers-color-scheme: dark)');

function readTheme(): Theme {
  try {
    const saved = localStorage.getItem(themeKey);
    return saved === 'dark' || saved === 'light' ? saved : 'system';
  } catch {
    return 'system';
  }
}

const tabs: { id: Tab; label: string }[] = [
  { id: 'tasks', label: 'Taskuri' },
  { id: 'volunteers', label: 'Voluntari' },
  { id: 'leaderboard', label: 'Clasamnet' },
];

export default function App() {
  const [tab, setTab] = useState<Tab>(() => {
    const saved = readPreference(tabKey);
    return tabs.find((item) => item.id === saved)?.id ?? 'tasks';
  });
  const [theme, setTheme] = useState(readTheme);
  const [systemDark, setSystemDark] = useState(systemTheme.matches);
  const dark = theme === 'system' ? systemDark : theme === 'dark';
  const today = new Date();

  useEffect(() => {
    const update = () => setSystemDark(systemTheme.matches);
    systemTheme.addEventListener('change', update);
    update();
    return () => systemTheme.removeEventListener('change', update);
  }, []);

  useLayoutEffect(() => {
    document.documentElement.dataset.theme = dark ? 'dark' : 'light';
  }, [dark]);

  function chooseTab(next: Tab) {
    setTab(next);
    savePreference(tabKey, next);
  }

  function chooseTheme(next: Theme) {
    setTheme(next);
    try {
      localStorage.setItem(themeKey, next);
    } catch {
      // The choice still applies for this visit if storage is unavailable.
    }
  }

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-row">
          <h1>Mini Task Tracker</h1>
          <div className="theme-options" role="group" aria-label="Temă">
            {themes.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                type="button"
                className="theme-button"
                aria-label={label}
                title={label}
                aria-pressed={theme === id}
                onClick={() => chooseTheme(id)}
              >
                <Icon size={18} aria-hidden="true" />
              </button>
            ))}
          </div>
        </div>
        <p className="app-subtitle">
          Echipa IT OSUBB · {tasks.length} taskuri · {tasks.length} voluntari
        </p>
      </header>

      <nav className="tabs" aria-label="Secțiuni">
        {tabs.map((item) => (
          <button
            key={item.id}
            type="button"
            className={item.id === tab ? 'tab tab-active' : 'tab'}
            aria-pressed={item.id === tab}
            onClick={() => chooseTab(item.id)}
          >
            {item.label}
          </button>
        ))}
      </nav>

      <main>
        {tab === 'tasks' && <TaskList tasks={tasks} volunteers={volunteers} today={today} />}
        {tab === 'volunteers' && <VolunteerList volunteers={volunteers} />}
        {tab === 'leaderboard' && <Leaderboard tasks={tasks} volunteers={volunteers} />}
      </main>
    </div>
  );
}
