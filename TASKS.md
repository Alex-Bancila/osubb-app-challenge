# Tasks

Pick the track that fits you. Start with its first task and go as far as you can. If you finish your track, try the next one: moving up is a bonus, never a requirement.

| Track | For you if… |
| --- | --- |
| **A, Testing and bug reports** | you are new to programming, or you are curious about testing, design and how a good bug report looks |
| **B, Fixing bugs and building a feature** | you know some programming (C, C++, Python, anything) but haven't worked on a web app yet |
| **C, A bigger feature and code review** | you have already built web apps |

Everybody starts with **task 0**.

---

## Task 0: get it running (everyone)

Fork, clone, install, run the app and run the tests, following the [README](README.md). Write down anything that was unclear or didn't work for you. That is useful feedback too.

**Done when:** the app opens in your browser and `npm test` runs, even with failing tests.

---

## Track A: testing and bug reports

### A1. Find the bugs you can see

Use the app like a volunteer would. Click every tab, change the filter, read every label. Then make the browser window as narrow as a phone (in Chrome: right click → **Inspect** → the phone icon).

There are **at least four bugs you can see on the screens**, without reading any code. Look at the text, the numbers, the colours and the layout.

### A2. Report them

For each bug, open an **issue in this repository** (not in your fork) using the **Bug report** template. A good bug report has:

- a short title that names the problem;
- the steps to see it;
- what you expected, and what happened instead;
- a screenshot.

Check the existing issues first. If somebody already reported your bug, add a comment with anything new rather than opening a duplicate.

### A3. Fix one or two of them

Pick one or two of the bugs you reported and fix them in your fork. Hints: look at `src/App.tsx`, `src/components/` and `src/styles.css`. Your browser's **Inspect** tool shows which CSS rule styles what.

**Done when:** the bug is gone in your fork, and your Pull Request says which issue it fixes.

---

## Track B: fixing bugs and building a feature

Each bug below has at least one failing test in `src/lib/*.test.ts`. Run `npm run test:watch` while you work, and read the test first: it tells you what the code should do. Fix the code, not the test.

### B1. The dates are wrong

The deadlines on the **Taskuri** screen don't look right. A task due on 5 October shows a different date. Find out why and fix it.

Tests: `formatDate` in `src/lib/dates.test.ts`.

### B2. Tasks without a deadline come first

The task list is sorted by deadline, but the tasks without a deadline are at the top. They should be at the bottom.

Tests: `sortByDeadline` in `src/lib/tasks.test.ts`.

### B3. The leaderboard counts cancelled tasks

On **Clasament**, some volunteers have more points than they earned. A cancelled task should earn nothing.

Tests: `pointsByVolunteer` in `src/lib/points.test.ts`.

### B4. Finished tasks show as late

Some tasks that are already done (or cancelled) show the red **Întârziat** badge. A finished task is never late.

Tests: `isOverdue` in `src/lib/tasks.test.ts`.

### B5. Feature: search volunteers

The **Voluntari** screen has 20 volunteers and no way to find one. Build a search:

1. Write `matchesVolunteer` in `src/lib/search.ts`. It should find a volunteer when the search text appears in their **name or nickname**, ignoring upper and lower case and **diacritics**, so `stefan` finds **Ștefan** and `muresan` finds **Mureșan**. The tests in `src/lib/search.test.ts` describe the rest.
2. Add a search box to the **Voluntari** screen (`src/components/VolunteerList.tsx`) that shows only the matching volunteers as you type. The volunteer count above the list should follow the search.

Hint for the diacritics: look up `String.prototype.normalize`.

**Done when:** every test passes and the search works in the browser.

---

## Track C: a bigger feature and code review

### C1. Feature: the department leaderboard

OSUBB compares its departments by the points their volunteers earn. Add this to the app:

1. A function `pointsByDepartment(volunteers, tasks)` in `src/lib/points.ts`. It returns every department with its total points, most points first. Reuse what is already there, with the same rules as the volunteer leaderboard.
2. **Your own tests** for it, in `src/lib/points.test.ts`. Think about the edge cases.
3. A way to see it in the app: a fourth tab, or a switch on **Clasament**. Your choice; explain it in your Pull Request.

Fixing the Track B bugs first will help, because some of them change the points.

### C2. Review two Track B Pull Requests

After the deadline, pick two Track B Pull Requests and review them on GitHub: comment on specific lines, say what is good, and suggest improvements kindly and concretely. We'll leave a few days for this.

### C3. The real app

Interested in the real OSUBB app? Tell Alex in your Pull Request. There are a few small real issues waiting.

---

## Bonus (any track)

- **Remember the filter.** When you reload the page, the status filter on **Taskuri** goes back to "Toate". Make it remember the last choice (look up `localStorage`).
- **Dark theme.** Make the app follow the system's dark mode (look up `prefers-color-scheme`).
- **Your own test.** Add a test for something the existing tests don't check yet.
- **Your idea.** Something missing or annoying? Build it, and explain why in your Pull Request.
