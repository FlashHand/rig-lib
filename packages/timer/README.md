# @rig-lib/timer

Lightweight timer helpers for TypeScript.

## Install

```bash
yarn add @rig-lib/timer
```

## Usage

### `sleep(ms)`

Returns a `Promise` that resolves after the given number of milliseconds.

```ts
import { sleep } from '@rig-lib/timer';

await sleep(1000); // pause for 1 second
```
