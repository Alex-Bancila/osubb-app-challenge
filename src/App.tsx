import { useState } from 'react';
import tasksData from './data/tasks.json';
import volunteersData from './data/volunteers.json';
import { Leaderboard } from './components/Leaderboard';
import { TaskList } from './components/TaskList';
import { VolunteerList } from './components/VolunteerList';
import type { Task, Volunteer } from './lib/types';

const tasks = tasksData as Task[];
const volunteers = volunteersData as Volunteer[];
const FIXED_TODAY = new Date();

type Tab = 'tasks' | 'volunteers' | 'leaderboard';

const tabs: { id: Tab; label: string }[] = [
  { id: 'tasks', label: 'Taskuri' },
  { id: 'volunteers', label: 'Voluntari' },
  { id: 'leaderboard', label: 'Clasament' },
];

export default function App() {
  const [tab, setTab] = useState<Tab>('tasks');
  const [darkMode, setDarkMode] = useState<boolean>(false);

  const toggleTheme = () => {
    const nextMode = !darkMode;
    setDarkMode(nextMode);

    if (nextMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <div>
          <h1>Mini Task Tracker</h1>
          <p className="app-subtitle">
            Echipa IT OSUBB · {tasks.length} taskuri · {volunteers.length} voluntari
          </p>
        </div>
        <button
          type="button"
          className="theme-toggle"
          onClick={toggleTheme}
        >
          {darkMode ? '🌙 Dark' : '☀️ Light'}
        </button>
      </header>

      <nav className="tabs" role="tablist" aria-label="Secțiuni">
        {tabs.map((item) => (
          <button
            key={item.id}
            type="button"
            role="tab"
            className={item.id === tab ? 'tab tab-active' : 'tab'}
            aria-selected={item.id === tab}
            onClick={() => setTab(item.id)}
          >
            {item.label}
          </button>
        ))}
      </nav>

      <main>
        {tab === 'tasks' && <TaskList tasks={tasks} volunteers={volunteers} today={FIXED_TODAY} />}
        {tab === 'volunteers' && <VolunteerList volunteers={volunteers} />}
        {tab === 'leaderboard' && <Leaderboard tasks={tasks} volunteers={volunteers} />}
      </main>
    </div>
  );
}
