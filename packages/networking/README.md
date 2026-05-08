# @rig-lib/networking

Axios-based HTTP client with interceptor support for TypeScript.

## Install

```bash
yarn add @rig-lib/networking axios qs
```

> `axios` and `qs` are peer dependencies and must be installed separately.

## Usage

### Singleton `rClient`

A pre-built `BasicClient` instance ready to use out of the box.

```ts
import { rClient } from '@rig-lib/networking';

rClient.setBaseURL('https://api.example.com');

const data = await rClient.get('/users');
const result = await rClient.post('/users', { name: 'Alice' });
```

### Custom instance

```ts
import { BasicClient } from '@rig-lib/networking';

const client = new BasicClient(
  { baseURL: 'https://api.example.com', timeout: 10000 },
  {
    requestInterceptors: [
      {
        fullfilled: async (config) => {
          config.headers['Authorization'] = `Bearer ${token}`;
          return config;
        },
        rejected: (err) => console.error(err),
      },
    ],
    responseInterceptors: [],
  }
);
```

### Available methods

| Method | Description |
|---|---|
| `get(url, params?, config?)` | GET request |
| `post(url, params?, config?)` | POST with JSON body |
| `postBody(url, body, params?, config?)` | POST with separate body and query params |
| `postForm(url, params, config?)` | POST with `x-www-form-urlencoded` |
| `put(url, body, params?, config?)` | PUT request |
| `patch(url, body, params?, config?)` | PATCH request |
| `delete(url, params?, config?)` | DELETE request |
