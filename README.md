# rig-lib

A foundation utility library for TypeScript, supporting both ESM and CommonJS.

## Install

```bash
# Install all modules at once
yarn add rig-lib
# or
npm install rig-lib

# Or install individual modules
yarn add @rig-lib/semaphore
# or
npm install @rig-lib/semaphore
```

## Packages

| Package | npm | Description |
|---|---|---|
| `@rig-lib/semaphore` | [![npm](https://img.shields.io/npm/v/@rig-lib/semaphore)](https://www.npmjs.com/package/@rig-lib/semaphore) | Semaphore concurrency control utility, supports both callback and async/await |
| `@rig-lib/timer` | [![npm](https://img.shields.io/npm/v/@rig-lib/timer)](https://www.npmjs.com/package/@rig-lib/timer) | Lightweight timer helpers, e.g. `sleep(ms)` for promise-based delays |
| `@rig-lib/url` | [![npm](https://img.shields.io/npm/v/@rig-lib/url)](https://www.npmjs.com/package/@rig-lib/url) | URL query-string utilities for browser environments, including `createAccessForHash` for reading/writing URL search params |
| `@rig-lib/networking` | [![npm](https://img.shields.io/npm/v/@rig-lib/networking)](https://www.npmjs.com/package/@rig-lib/networking) | Axios-based HTTP client (`BasicClient`) with interceptor support and a ready-to-use singleton `rClient`; `axios` and `qs` are peer dependencies |

## Usage

```ts
// Via meta package
import { Semaphore } from 'rig-lib';

// Via individual package
import { Semaphore } from '@rig-lib/semaphore';
```

## Development

This is a Yarn Workspaces monorepo.

```bash
# Install dependencies
yarn install

# Build all packages
yarn build

# Build a single package
yarn workspace @rig-lib/semaphore build

# Publish a single package
yarn publish:semaphore
yarn publish:timer
yarn publish:url
yarn publish:networking
yarn publish:core

# Publish all packages
yarn publish:all
```
