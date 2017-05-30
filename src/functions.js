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

  resolveAndTick(fn) {
    return new Promise((resolve, reject) => {
      Promise.resolve().then(() => {
        process.nextTick(() => {
          const result = fn();
          if (result === undefined) {
            resolve();
          } else {
            result
              .then(x => resolve(x))
              .catch(e => reject(e))
          }
        });
      });
    })
  }
};