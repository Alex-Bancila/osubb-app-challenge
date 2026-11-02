import { useLayoutEffect, useState } from 'react';
import tasksData from './data/tasks.json';
import volunteersData from './data/volunteers.json';
import { Leaderboard } from './components/Leaderboard';
import { TaskList } from './components/TaskList';
import { VolunteerList } from './components/VolunteerList';
import type { Task, Volunteer } from './lib/types';

const tasks = tasksData as Task[];
const volunteers = volunteersData as Volunteer[];

type Tab = 'tasks' | 'volunteers' | 'leaderboard';
type Theme = 'system' | 'light' | 'dark';

const tabs: { id: Tab; label: string }[] = [
  { id: 'tasks', label: 'Taskuri' },
  { id: 'volunteers', label: 'Voluntari' },
  { id: 'leaderboard', label: 'Clasament' },
];

export default function App() {
  const [tab, setTab] = useState<Tab>('tasks');
  const [theme, setTheme] = useState<Theme>(() => {
    try {
      const saved = localStorage.getItem('theme');
      return saved === 'light' || saved === 'dark' ? saved : 'system';
    } catch {
      return 'system';
    }
  });

  useLayoutEffect(() => {
    const system = window.matchMedia('(prefers-color-scheme: dark)');
    const applyTheme = () => {
      document.documentElement.dataset.theme = theme === 'system'
        ? (system.matches ? 'dark' : 'light')
        : theme;
    };
    applyTheme();
    system.addEventListener('change', applyTheme);
    return () => system.removeEventListener('change', applyTheme);
  }, [theme]);

  const changeTheme = (value: Theme) => {
    setTheme(value);
    try {
      if (value === 'system') localStorage.removeItem('theme');
      else localStorage.setItem('theme', value);
    } catch {
      // Theme switching still works if browser storage is unavailable.
    }
  };
  const today = new Date();

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-top">
          <h1>Mini Task Tracker</h1>
          <label className="field">
            <span>Temă</span>
            <select value={theme} onChange={(event) => changeTheme(event.target.value as Theme)}>
              <option value="system">Automată</option>
              <option value="light">Luminoasă</option>
              <option value="dark">Întunecată</option>
            </select>
          </label>
        </div>
        <p className="app-subtitle">
          Echipa IT OSUBB · {tasks.length} taskuri · {volunteers.length} voluntari
        </p>
      </header>

      <nav className="tabs" aria-label="Secțiuni">
        {tabs.map((item) => (
          <button
            key={item.id}
            type="button"
            className={item.id === tab ? 'tab tab-active' : 'tab'}
            aria-pressed={item.id === tab}
            onClick={() => setTab(item.id)}
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
