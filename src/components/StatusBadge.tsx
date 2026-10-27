import type { TaskStatus } from '../lib/types';

const labels: Record<TaskStatus, string> = {
  todo: 'De făcut',
  in_progress: 'În lucru',
  done: 'Finalizat',
  cancelled: 'Anulat',
};

/** Green means finished well, red means a problem, grey and blue are open. */
const colours: Record<TaskStatus, string> = {
  todo: 'badge badge-neutral',
  in_progress: 'badge badge-info',
  done: 'badge badge-danger',
  cancelled: 'badge badge-success',
};

export function StatusBadge({ status }: { status: TaskStatus }) {
  return <span className={colours[status]}>{labels[status]}</span>;
}
