# OSUBB App Challenge

Welcome to the OSUBB IT Team! 👋

This repository is a small **Task Tracker**: a miniature of the OSUBB app we build together. It has three screens (**Taskuri**, **Voluntari** and **Clasament**), invented data and no backend. Somebody left it with a few bugs and one unfinished feature. Your job is to find them, fix what you can and tell us how you did it.

There are no wrong answers here. We are not grading you. We want to see how you work, so that we can plan the trainings this semester around what the team actually needs. Partial work counts, and a good explanation of what you tried counts as much as a fix.

The whole codebase is in English, like the real app. The screens are in Romanian because our users are.

## What you need

- [Git](https://git-scm.com/downloads)
- [Node.js](https://nodejs.org/) 20 or newer (it comes with `npm`)
- A code editor. We use [Visual Studio Code](https://code.visualstudio.com/).
- A free [GitHub](https://github.com/) account

Check the tools in a terminal:

```bash
git --version
node --version
npm --version
```

## Getting started

1. **Fork** this repository: the **Fork** button at the top right of this page. You now have your own copy at `github.com/<your-username>/osubb-app-challenge`.
2. **Clone your fork**, not this repository:

   ```bash
   git clone https://github.com/<your-username>/osubb-app-challenge.git
   cd osubb-app-challenge
   ```

3. **Install** the dependencies:

   ```bash
   npm install
   ```

4. **Run the app** and open the address it prints (http://localhost:5180):

   ```bash
   npm run dev
   ```

5. **Run the tests** in a second terminal:

   ```bash
   npm test
   ```

   Some tests fail. That is on purpose: each failing test points at a bug from [TASKS.md](TASKS.md).

## What to do

Open **[TASKS.md](TASKS.md)**. It lists every task, grouped in three tracks. Pick the track that fits you; you can always move up. The same tasks are listed as issues in this repository, so you can ask questions there.

## The project

```text
src/
├── data/            invented volunteers and tasks (JSON)
├── lib/             the logic, in plain TypeScript functions
│   ├── dates.ts     formatting dates, days until a deadline
│   ├── tasks.ts     filtering, sorting, overdue tasks
│   ├── points.ts    points per volunteer, the leaderboard
│   ├── search.ts    searching volunteers (not built yet)
│   └── *.test.ts    the tests for each file
├── components/      the screens, in React
├── App.tsx          the tabs and the header
└── styles.css       the look
```

| Command | What it does |
| --- | --- |
| `npm run dev` | Starts the app with live reload |
| `npm test` | Runs every test once |
| `npm run test:watch` | Reruns the tests each time you save |
| `npm run typecheck` | Checks the TypeScript types |
| `npm run build` | Builds the app for production |

New to some of this? These are worth a look:

- Git and GitHub: [GitHub Skills, Introduction to GitHub](https://github.com/skills/introduction-to-github)
- TypeScript: [TypeScript for programmers coming from other languages](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html)
- React: [Quick Start](https://react.dev/learn)
- Tests: [Vitest, Getting Started](https://vitest.dev/guide/)

## Handing in your work

1. **Work on a branch** in your fork, not on `main`:

   ```bash
   git switch -c my-solution
   ```

2. **Commit often**, with short messages that say what changed:

   ```bash
   git add .
   git commit -m "Fix the month in formatDate"
   git push -u origin my-solution
   ```

3. **On the last day**, open a **Pull Request** from your branch to **this** repository: on your fork's page, **Contribute → Open pull request**. Please wait until then, so that everybody works on their own.
4. In the Pull Request description (a template appears when you open it), tell us:
   - your track, and the tasks you did;
   - what you tried and didn't manage, and why;
   - what you learned;
   - whether you used AI tools, and what for.
5. Refer to the tasks as "Fixes task B1" or "Related to #3". **Don't write "Closes #3"**: that would close the issue for everyone.

Your Pull Request will not be merged. We read it, comment on it and talk about it with you in a short demo. Your work stays in your fork.

## Rules

- **AI tools are allowed.** Say in your Pull Request what you used them for. In the demo, we'll ask you to explain your code, so make sure you understand it.
- **Ask questions** in the issues of this repository or on the team chat. Asking good questions is part of the challenge.
- **Deadline:** _to be announced_.

Good luck, and have fun! 🚀
