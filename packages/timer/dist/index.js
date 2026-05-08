'use strict';

// src/timer.helper.ts
var sleep = (ms) => {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, ms);
  });
};

exports.sleep = sleep;
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map