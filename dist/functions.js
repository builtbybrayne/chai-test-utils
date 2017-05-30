'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var expect = require('chai').expect;

module.exports = {
  asyncTest: function asyncTest(fn) {
    return function (done) {
      _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return fn();

              case 3:
                done();
                _context.next = 9;
                break;

              case 6:
                _context.prev = 6;
                _context.t0 = _context['catch'](0);

                done(_context.t0);

              case 9:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, undefined, [[0, 6]]);
      }))();
    };
  },

  asyncThrows: function () {
    var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(fn) {
      var not = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var error;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              error = void 0;
              _context2.prev = 1;
              _context2.next = 4;
              return fn();

            case 4:
              _context2.next = 9;
              break;

            case 6:
              _context2.prev = 6;
              _context2.t0 = _context2['catch'](1);

              error = _context2.t0;

            case 9:
              if (not) {
                expect(error, 'Did not expect async error ' + error).not.to.exist;
              } else {
                expect(error, 'Expected async error').to.exist;
              }
              return _context2.abrupt('return', error);

            case 11:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, undefined, [[1, 6]]);
    }));

    return function asyncThrows(_x) {
      return _ref2.apply(this, arguments);
    };
  }(),

  resolveAndTick: function resolveAndTick(fn) {
    return new Promise(function (resolve, reject) {
      Promise.resolve().then(function () {
        process.nextTick(function () {
          var result = fn();
          if (result === undefined) {
            resolve();
          } else {
            result.then(function (x) {
              return resolve(x);
            }).catch(function (e) {
              return reject(e);
            });
          }
        });
      });
    });
  }
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9mdW5jdGlvbnMuanMiXSwibmFtZXMiOlsiZXhwZWN0IiwicmVxdWlyZSIsIm1vZHVsZSIsImV4cG9ydHMiLCJhc3luY1Rlc3QiLCJmbiIsImRvbmUiLCJhc3luY1Rocm93cyIsIm5vdCIsImVycm9yIiwidG8iLCJleGlzdCIsInJlc29sdmVBbmRUaWNrIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJ0aGVuIiwicHJvY2VzcyIsIm5leHRUaWNrIiwicmVzdWx0IiwidW5kZWZpbmVkIiwieCIsImNhdGNoIiwiZSJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7QUFDQSxJQUFNQSxTQUFTQyxRQUFRLE1BQVIsRUFBZ0JELE1BQS9COztBQUVBRSxPQUFPQyxPQUFQLEdBQWlCO0FBQ2ZDLGFBQVcsbUJBQUNDLEVBQUQsRUFBUTtBQUNqQixXQUFPLFVBQUNDLElBQUQsRUFBVTtBQUNmLGdEQUFDO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsdUJBRVNELElBRlQ7O0FBQUE7QUFHR0M7QUFISDtBQUFBOztBQUFBO0FBQUE7QUFBQTs7QUFLR0E7O0FBTEg7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsT0FBRDtBQVFELEtBVEQ7QUFVRCxHQVpjOztBQWNmQztBQUFBLDBEQUFhLGtCQUFPRixFQUFQO0FBQUEsVUFBV0csR0FBWCx1RUFBZSxLQUFmO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNQQyxtQkFETztBQUFBO0FBQUE7QUFBQSxxQkFHSEosSUFIRzs7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBOztBQUtUSTs7QUFMUztBQU9YLGtCQUFJRCxHQUFKLEVBQVM7QUFDUFIsdUJBQU9TLEtBQVAsa0NBQTRDQSxLQUE1QyxFQUFxREQsR0FBckQsQ0FBeURFLEVBQXpELENBQTREQyxLQUE1RDtBQUNELGVBRkQsTUFFTztBQUNMWCx1QkFBT1MsS0FBUCxFQUFjLHNCQUFkLEVBQXNDQyxFQUF0QyxDQUF5Q0MsS0FBekM7QUFDRDtBQVhVLGdEQVlKRixLQVpJOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBQWI7O0FBQUE7QUFBQTtBQUFBO0FBQUEsS0FkZTs7QUE2QmZHLGdCQTdCZSwwQkE2QkFQLEVBN0JBLEVBNkJJO0FBQ2pCLFdBQU8sSUFBSVEsT0FBSixDQUFZLFVBQUNDLE9BQUQsRUFBVUMsTUFBVixFQUFxQjtBQUN0Q0YsY0FBUUMsT0FBUixHQUFrQkUsSUFBbEIsQ0FBdUIsWUFBTTtBQUMzQkMsZ0JBQVFDLFFBQVIsQ0FBaUIsWUFBTTtBQUNyQixjQUFNQyxTQUFTZCxJQUFmO0FBQ0EsY0FBSWMsV0FBV0MsU0FBZixFQUEwQjtBQUN4Qk47QUFDRCxXQUZELE1BRU87QUFDTEssbUJBQ0dILElBREgsQ0FDUTtBQUFBLHFCQUFLRixRQUFRTyxDQUFSLENBQUw7QUFBQSxhQURSLEVBRUdDLEtBRkgsQ0FFUztBQUFBLHFCQUFLUCxPQUFPUSxDQUFQLENBQUw7QUFBQSxhQUZUO0FBR0Q7QUFDRixTQVREO0FBVUQsT0FYRDtBQVlELEtBYk0sQ0FBUDtBQWNEO0FBNUNjLENBQWpCIiwiZmlsZSI6ImZ1bmN0aW9ucy5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcbmNvbnN0IGV4cGVjdCA9IHJlcXVpcmUoJ2NoYWknKS5leHBlY3Q7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBhc3luY1Rlc3Q6IChmbikgPT4ge1xuICAgIHJldHVybiAoZG9uZSkgPT4ge1xuICAgICAgKGFzeW5jICgpID0+IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBhd2FpdCBmbigpO1xuICAgICAgICAgIGRvbmUoKTtcbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgZG9uZShlcnIpO1xuICAgICAgICB9XG4gICAgICB9KSgpO1xuICAgIH07XG4gIH0sXG5cbiAgYXN5bmNUaHJvd3M6IGFzeW5jIChmbiwgbm90PWZhbHNlKSA9PiB7XG4gICAgbGV0IGVycm9yO1xuICAgIHRyeSB7XG4gICAgICBhd2FpdCBmbigpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIGVycm9yID0gZTtcbiAgICB9XG4gICAgaWYgKG5vdCkge1xuICAgICAgZXhwZWN0KGVycm9yLCBgRGlkIG5vdCBleHBlY3QgYXN5bmMgZXJyb3IgJHtlcnJvcn1gKS5ub3QudG8uZXhpc3Q7XG4gICAgfSBlbHNlIHtcbiAgICAgIGV4cGVjdChlcnJvciwgJ0V4cGVjdGVkIGFzeW5jIGVycm9yJykudG8uZXhpc3Q7XG4gICAgfVxuICAgIHJldHVybiBlcnJvcjtcbiAgfSxcblxuICByZXNvbHZlQW5kVGljayhmbikge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBQcm9taXNlLnJlc29sdmUoKS50aGVuKCgpID0+IHtcbiAgICAgICAgcHJvY2Vzcy5uZXh0VGljaygoKSA9PiB7XG4gICAgICAgICAgY29uc3QgcmVzdWx0ID0gZm4oKTtcbiAgICAgICAgICBpZiAocmVzdWx0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmVzdWx0XG4gICAgICAgICAgICAgIC50aGVuKHggPT4gcmVzb2x2ZSh4KSlcbiAgICAgICAgICAgICAgLmNhdGNoKGUgPT4gcmVqZWN0KGUpKVxuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9KVxuICB9XG59OyJdfQ==