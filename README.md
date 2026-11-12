# Full Stack Open — Part 7

Solutions for [Full Stack Open, part 7](https://fullstackopen.com/en/part7).

Parts 0–5 are in [fullstack-open-part00-05](https://github.com/Kopfdreher/fullstack-open-part00-05), which also describes the course. Part 6 is in [fullstack-open-part06](https://github.com/Kopfdreher/fullstack-open-part06).

This part covers several topics. It starts with custom hook functions, then looks at how bundling works in React applications: [esbuild](https://esbuild.github.io/) as a low-level bundler, and how [Vite](https://vite.dev/) can be configured for different scenarios. Toward the end it covers class components and other React topics such as code organization and error boundaries, and recaps the course so far by extending the Blog application with new features.

| Directory | What it covers |
| --- | --- |
| `routed-anecdotes` | Anecdotes with React Router and custom hooks |
| `bloglist` | Blog application extended with the part 7 features |
| `bloglist-tests` | Playwright tests for those bloglist features |

Each app is started from its own directory with `npm install` and `npm run dev`. `routed-anecdotes` also needs json-server (`npm run server`). The bloglist tests expect a client and server under `bloglist/` and a `TEST_MONGODB_URI`; see `bloglist-tests/README.md`.
