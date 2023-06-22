## Conventions

### Naming

- Use singular names for directories (and files where it makes sense). E.g., `src/handler` instead of `src/handlers`, and `src/foundation/type.ts` instead of `src/foundation/types.ts`.
- Use [kebab-case](https://www.theserverside.com/definition/Kebab-case) for file names. E.g., `example-file.ts`.

### Comments

#### Guidelines

- Make a habit of comment on code. Just because code makes sense to you, doesn't mean another developer will instantly understand it when they read it.
- When adding comments about code blocks try to describe `why` the code is doing what it is, instead of `what` it's doing. Often it's fairly easy to work out what some code is doing, but working out why it's doing it can be very hard!
- Comments can act as visual queues to break up code, and can help to quickly get a feel for the structure of a file when skimming through it. Use comments to introduce natural break points for longer files.

#### Styling

Comments are good and emojis are fun. Let's use emojis to denote different types of comments.

- 🎯 TODO.
- 🧠 Thought or observation.
- 👇️ Describing the code block immediately below.

A contrived example:

```typescript
/**
 * Add two numbers together.
 */
const add = (a: number, b: number) => {
  return a + b;
};

/**
 * Subtract one number from another.
 */
const subtract = (a: number, b: number) => {
  // 🎯 TODO: add logic for function
};

// 🧠 We're hard coding the numbers to add here. but maybe it would be better
// pass them in dynamically? It's not an immediate requirement but something to
// thing about later.
const foo = 1;
const bar = 2;

// 👇️ Add the two numbers together. We need to do this because...
const fooBar = add(foo, bar);
```