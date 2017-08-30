'use strict';
const expect = require('chai').expect;

module.exports = {
  asyncTest: (fn) => {
    return (done) => {
      (async () => {
        try {
          await fn();
          done();
        } catch (err) {
          done(err);
        }
      })();
    };
  },

  asyncThrows: async (fn, not=false) => {
    let error;
    try {
      await fn();
    } catch (e) {
      error = e;
    }
    if (not) {
      expect(error, `Did not expect async error ${error}`).not.to.exist;
    } else {
      expect(error, 'Expected async error').to.exist;
    }
    return error;
  },

  resolveAndTick(fn, opts={}) {
    const restore = opts.restore || (() => {});
    return new Promise((resolve, reject) => {
      Promise.resolve().then(() => {
        process.nextTick(() => {
          const result = typeof fn === 'function' ? fn() : undefined;
          if (result === undefined) {
            resolve();
            restore();
          } else {
            result
              .then(x => {resolve(x); restore();})
              .catch(e => {reject(e); restore(); })
          }
        });
      });
    })
  }
};