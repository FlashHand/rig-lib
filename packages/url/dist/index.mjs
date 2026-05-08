// src/url.helper.ts
var replaceQuery = (search) => {
  const parser = new URLSearchParams();
  for (let k in search) {
    parser.append(k, search[k]);
  }
  const query = parser.toString();
  const { pathname, hash } = window.location;
  window.history.replaceState(null, "", `${pathname}?${query}${hash}`);
};
var hashArgs = {
  search: {},
  replaceQuery,
  getAll() {
    updateArgs();
    return hashArgs.search;
  },
  remove(key) {
    updateArgs();
    delete hashArgs.search[key];
    replaceQuery(hashArgs.search);
  }
};
var updateArgs = () => {
  const { hash, pathname, search } = window.location;
  Object.assign(hashArgs, { hash, pathname });
  if (search) {
    const sp = new URLSearchParams(search.replace("?", ""));
    const so = {};
    for (const [key, value] of sp) {
      so[key] = value;
    }
    hashArgs.search = so;
  } else {
    hashArgs.search = {};
  }
};
var createAccessForHash = (key) => {
  let get = () => {
    updateArgs();
    return hashArgs.search[key];
  };
  let set = (value) => {
    updateArgs();
    hashArgs.search[key] = value;
    hashArgs.replaceQuery(hashArgs.search);
  };
  let remove = () => {
    hashArgs.remove(key);
  };
  return { set, get, remove };
};

export { createAccessForHash };
//# sourceMappingURL=index.mjs.map
//# sourceMappingURL=index.mjs.map