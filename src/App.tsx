import { useState } from 'react';
import tasksData from './data/tasks.json';
import volunteersData from './data/volunteers.json';
import { Leaderboard } from './components/Leaderboard';
import { TaskList } from './components/TaskList';
import { VolunteerList } from './components/VolunteerList';
import type { Task, Volunteer } from './lib/types';

const tasks = tasksData as Task[];
const volunteers = volunteersData as Volunteer[];

type Tab = 'tasks' | 'volunteers' | 'leaderboard';

const tabs: { id: Tab; label: string }[] = [
  { id: 'tasks', label: 'Taskuri' },
  { id: 'volunteers', label: 'Voluntari' },
  { id: 'leaderboard', label: 'Clasamnet' },
];

export default function App() {
  const [tab, setTab] = useState<Tab>('tasks');
  const today = new Date();

  return (
    <div className="app">
      <header className="app-header">
        <h1>Mini Task Tracker</h1>
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
