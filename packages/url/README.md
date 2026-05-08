# @rig-lib/url

URL query-string utilities for browser environments.

## Install

```bash
yarn add @rig-lib/url
```

## Usage

### `createAccessForHash(key)`

Creates a getter/setter/remover bound to a single URL search parameter. Changes are reflected in the browser address bar via `history.replaceState`.

```ts
import { createAccessForHash } from '@rig-lib/url';

const page = createAccessForHash('page');

page.set('2');      // ?page=2
page.get();         // '2'
page.remove();      // removes ?page from the URL
```
