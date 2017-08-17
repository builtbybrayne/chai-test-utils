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
    var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    var restore = opts.restore || function () {};
    return new Promise(function (resolve, reject) {
      Promise.resolve().then(function () {
        process.nextTick(function () {
          var result = fn();
          if (result === undefined) {
            resolve();
            restore();
          } else {
            result.then(function (x) {
              resolve(x);restore();
            }).catch(function (e) {
              reject(e);restore();
            });
          }
        });
      });
    });
  }
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9mdW5jdGlvbnMuanMiXSwibmFtZXMiOlsiZXhwZWN0IiwicmVxdWlyZSIsIm1vZHVsZSIsImV4cG9ydHMiLCJhc3luY1Rlc3QiLCJmbiIsImRvbmUiLCJhc3luY1Rocm93cyIsIm5vdCIsImVycm9yIiwidG8iLCJleGlzdCIsInJlc29sdmVBbmRUaWNrIiwib3B0cyIsInJlc3RvcmUiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsInRoZW4iLCJwcm9jZXNzIiwibmV4dFRpY2siLCJyZXN1bHQiLCJ1bmRlZmluZWQiLCJ4IiwiY2F0Y2giLCJlIl0sIm1hcHBpbmdzIjoiQUFBQTs7OztBQUNBLElBQU1BLFNBQVNDLFFBQVEsTUFBUixFQUFnQkQsTUFBL0I7O0FBRUFFLE9BQU9DLE9BQVAsR0FBaUI7QUFDZkMsYUFBVyxtQkFBQ0MsRUFBRCxFQUFRO0FBQ2pCLFdBQU8sVUFBQ0MsSUFBRCxFQUFVO0FBQ2YsZ0RBQUM7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSx1QkFFU0QsSUFGVDs7QUFBQTtBQUdHQztBQUhIO0FBQUE7O0FBQUE7QUFBQTtBQUFBOztBQUtHQTs7QUFMSDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxPQUFEO0FBUUQsS0FURDtBQVVELEdBWmM7O0FBY2ZDO0FBQUEsMERBQWEsa0JBQU9GLEVBQVA7QUFBQSxVQUFXRyxHQUFYLHVFQUFlLEtBQWY7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ1BDLG1CQURPO0FBQUE7QUFBQTtBQUFBLHFCQUdISixJQUhHOztBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUE7O0FBS1RJOztBQUxTO0FBT1gsa0JBQUlELEdBQUosRUFBUztBQUNQUix1QkFBT1MsS0FBUCxrQ0FBNENBLEtBQTVDLEVBQXFERCxHQUFyRCxDQUF5REUsRUFBekQsQ0FBNERDLEtBQTVEO0FBQ0QsZUFGRCxNQUVPO0FBQ0xYLHVCQUFPUyxLQUFQLEVBQWMsc0JBQWQsRUFBc0NDLEVBQXRDLENBQXlDQyxLQUF6QztBQUNEO0FBWFUsZ0RBWUpGLEtBWkk7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsS0FBYjs7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQWRlOztBQTZCZkcsZ0JBN0JlLDBCQTZCQVAsRUE3QkEsRUE2QmE7QUFBQSxRQUFUUSxJQUFTLHVFQUFKLEVBQUk7O0FBQzFCLFFBQU1DLFVBQVVELEtBQUtDLE9BQUwsSUFBaUIsWUFBTSxDQUFFLENBQXpDO0FBQ0EsV0FBTyxJQUFJQyxPQUFKLENBQVksVUFBQ0MsT0FBRCxFQUFVQyxNQUFWLEVBQXFCO0FBQ3RDRixjQUFRQyxPQUFSLEdBQWtCRSxJQUFsQixDQUF1QixZQUFNO0FBQzNCQyxnQkFBUUMsUUFBUixDQUFpQixZQUFNO0FBQ3JCLGNBQU1DLFNBQVNoQixJQUFmO0FBQ0EsY0FBSWdCLFdBQVdDLFNBQWYsRUFBMEI7QUFDeEJOO0FBQ0FGO0FBQ0QsV0FIRCxNQUdPO0FBQ0xPLG1CQUNHSCxJQURILENBQ1EsYUFBSztBQUFDRixzQkFBUU8sQ0FBUixFQUFZVDtBQUFXLGFBRHJDLEVBRUdVLEtBRkgsQ0FFUyxhQUFLO0FBQUNQLHFCQUFPUSxDQUFQLEVBQVdYO0FBQVksYUFGdEM7QUFHRDtBQUNGLFNBVkQ7QUFXRCxPQVpEO0FBYUQsS0FkTSxDQUFQO0FBZUQ7QUE5Q2MsQ0FBakIiLCJmaWxlIjoiZnVuY3Rpb25zLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuY29uc3QgZXhwZWN0ID0gcmVxdWlyZSgnY2hhaScpLmV4cGVjdDtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGFzeW5jVGVzdDogKGZuKSA9PiB7XG4gICAgcmV0dXJuIChkb25lKSA9PiB7XG4gICAgICAoYXN5bmMgKCkgPT4ge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGF3YWl0IGZuKCk7XG4gICAgICAgICAgZG9uZSgpO1xuICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICBkb25lKGVycik7XG4gICAgICAgIH1cbiAgICAgIH0pKCk7XG4gICAgfTtcbiAgfSxcblxuICBhc3luY1Rocm93czogYXN5bmMgKGZuLCBub3Q9ZmFsc2UpID0+IHtcbiAgICBsZXQgZXJyb3I7XG4gICAgdHJ5IHtcbiAgICAgIGF3YWl0IGZuKCk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgZXJyb3IgPSBlO1xuICAgIH1cbiAgICBpZiAobm90KSB7XG4gICAgICBleHBlY3QoZXJyb3IsIGBEaWQgbm90IGV4cGVjdCBhc3luYyBlcnJvciAke2Vycm9yfWApLm5vdC50by5leGlzdDtcbiAgICB9IGVsc2Uge1xuICAgICAgZXhwZWN0KGVycm9yLCAnRXhwZWN0ZWQgYXN5bmMgZXJyb3InKS50by5leGlzdDtcbiAgICB9XG4gICAgcmV0dXJuIGVycm9yO1xuICB9LFxuXG4gIHJlc29sdmVBbmRUaWNrKGZuLCBvcHRzPXt9KSB7XG4gICAgY29uc3QgcmVzdG9yZSA9IG9wdHMucmVzdG9yZSB8fCAoKCkgPT4ge30pO1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBQcm9taXNlLnJlc29sdmUoKS50aGVuKCgpID0+IHtcbiAgICAgICAgcHJvY2Vzcy5uZXh0VGljaygoKSA9PiB7XG4gICAgICAgICAgY29uc3QgcmVzdWx0ID0gZm4oKTtcbiAgICAgICAgICBpZiAocmVzdWx0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICAgIHJlc3RvcmUoKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmVzdWx0XG4gICAgICAgICAgICAgIC50aGVuKHggPT4ge3Jlc29sdmUoeCk7IHJlc3RvcmUoKTt9KVxuICAgICAgICAgICAgICAuY2F0Y2goZSA9PiB7cmVqZWN0KGUpOyByZXN0b3JlKCk7IH0pXG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH0pXG4gIH1cbn07Il19