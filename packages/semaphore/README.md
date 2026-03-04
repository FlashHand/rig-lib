# Semaphore

A concurrency control utility based on [abrkn/semaphore.js](https://github.com/abrkn/semaphore.js), rewritten in TypeScript, supporting both callback and async/await styles.

## Installation

```bash
yarn add rig-foundation
```

## Quick Start

```typescript
import { Semaphore } from 'rig-foundation';

// Create a semaphore with max concurrency of 3
const sem = new Semaphore(3);

// async/await style
const doWork = async () => {
  await sem.takeAsync();
  try {
    // Execute concurrency-limited operations...
  } finally {
    sem.leave();
  }
};
```

## API

### `new Semaphore(capacity?)`

Create a semaphore instance.

| Parameter | Type | Default | Description |
|---|---|---|---|
| `capacity` | `number` | `1` | Maximum concurrency, minimum is 1. When capacity is 1, it's equivalent to a mutex |

---

### Properties

| Property | Type | Description |
|---|---|---|
| `capacity` | `number` (readonly) | Total capacity |
| `current` | `number` (getter) | Current available slots |
| `queueLength` | `number` (getter) | Number of tasks in the waiting queue |

---

### `take(fn)` / `take(n, fn)`

Acquire slots, calling callback function `fn` when slots are available. If insufficient slots, queue and wait.

| Parameter | Type | Default | Description |
|---|---|---|---|
| `n` | `number` | `1` | Number of slots to acquire |
| `fn` | `() => void` | - | Callback after successful acquisition |

```typescript
const sem = new Semaphore(2);

// Acquire 1 slot
sem.take(() => {
  console.log('acquired 1 slot');
  sem.leave();
});

// Acquire 2 slots
sem.take(2, () => {
  console.log('acquired 2 slots');
  sem.leave(2);
});
```

---

### `takeAsync(n?)`

Promise-style slot acquisition, returns `Promise<void>`, resolves when slots are available.

| Parameter | Type | Default | Description |
|---|---|---|---|
| `n` | `number` | `1` | Number of slots to acquire |

```typescript
const sem = new Semaphore(3);

const task = async () => {
  await sem.takeAsync();
  try {
    await fetch('https://api.example.com/data');
  } finally {
    sem.leave();
  }
};

// Execute 10 tasks concurrently, but max 3 at a time
await Promise.all(Array.from({ length: 10 }, () => task()));
```

---

### `leave(n?)`

Release slots and automatically schedule waiting tasks in the queue.

| Parameter | Type | Default | Description |
|---|---|---|---|
| `n` | `number` | `1` | Number of slots to release |

> **Note**: After `leave` releases slots, `current` will not exceed `capacity`.

---

### `available(n?)`

Check if there are enough available slots.

| Parameter | Type | Default | Description |
|---|---|---|---|
| `n` | `number` | `1` | Number of slots to check |

Returns `boolean`.

```typescript
if (sem.available(2)) {
  console.log('At least 2 slots available');
}
```

---

### `drain(fn)`

Acquire full capacity. Calls `fn` when all slots are available. Suitable for scenarios requiring exclusive access.

```typescript
sem.drain(() => {
  console.log('Exclusive access to all slots');
  // Execute exclusive operations...
  sem.leave(sem.capacity);
});
```

---

### `drainAsync()`

Promise-style drain, returns `Promise<void>`.

```typescript
await sem.drainAsync();
try {
  // Exclusive access
} finally {
  sem.leave(sem.capacity);
}
```

## Common Use Cases

### Limiting HTTP Concurrent Requests

```typescript
const sem = new Semaphore(5); // Max 5 concurrent requests

const fetchWithLimit = async (url: string) => {
  await sem.takeAsync();
  try {
    return await fetch(url);
  } finally {
    sem.leave();
  }
};

const urls = ['url1', 'url2', /* ... */ 'url100'];
const results = await Promise.all(urls.map(fetchWithLimit));
```

### Mutex

```typescript
const mutex = new Semaphore(); // capacity defaults to 1

const criticalSection = async () => {
  await mutex.takeAsync();
  try {
    // Only one task can enter at a time
  } finally {
    mutex.leave();
  }
};
```

### Read-Write Lock Pattern

```typescript
const sem = new Semaphore(10);

// Read operation: occupies 1 slot, allows multiple concurrent reads
const read = async () => {
  await sem.takeAsync(1);
  try {
    // Read...
  } finally {
    sem.leave(1);
  }
};

// Write operation: occupies all slots, exclusive access
const write = async () => {
  await sem.drainAsync();
  try {
    // Write...
  } finally {
    sem.leave(sem.capacity);
  }
};
```
