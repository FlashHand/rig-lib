# rig-lib

A foundation utility library for TypeScript, supporting both ESM and CommonJS.

## Install

```bash
# Install all modules at once
yarn add rig-lib

# Or install individual modules
yarn add @rig-lib/semaphore
```

## Packages

| Package | npm | Description |
|---|---|---|
| `rig-lib` | [![npm](https://img.shields.io/npm/v/rig-lib)](https://www.npmjs.com/package/rig-lib) | Meta package — re-exports all modules |
| `@rig-lib/semaphore` | [![npm](https://img.shields.io/npm/v/@rig-lib/semaphore)](https://www.npmjs.com/package/@rig-lib/semaphore) | 信号量并发控制工具，支持 callback 和 async/await |

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
yarn workspace @rig-lib/semaphore publish:npm

# Publish all packages
yarn workspaces run publish:npm
```
