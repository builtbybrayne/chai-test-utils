'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var chai = require("chai");
var expect = chai.expect;
var isAFunction = require('lodash.isfunction');
var setProp = require('lodash.set');
var getProp = require('lodash.get');
var unset = require('lodash.unset');
var omit = require('lodash.omit');
var moment = require('moment');

var _require = require('./functions'),
    asyncThrows = _require.asyncThrows;

function resolve(input) {
  return isAFunction(input) ? input() : input;
}
function resolveArray(input) {
  return Array.isArray(resolve(input)) ? input : [input];
}

function assignUndefined(good, bad, opts) {
  good = resolveArray(good);
  bad = resolveArray(bad);
  if (opts.allowFalsy) {
    good.push(undefined);
  } else if (opts.required) {
    bad.push(undefined);
  } else {
    good.push(undefined);
  }
  return [good, bad];
}

function assignAndTest(input, fieldName, testFn) {
  return function (value) {
    setProp(input, fieldName, value);
    testFn(input);
  };
}

function allowFalsy(good, bad, allow) {
  var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

  var falsies = [];
  if (!options.noZero) falsies.push(0);
  if (!options.noFalse) falsies.push(false);
  if (!options.noNull) falsies.push(null);
  if (!options.noEmptyString) falsies.push('');
  if (!options.noNaN) falsies.push(NaN);

  if (allow) {
    good = [].concat(_toConsumableArray(good), falsies);
  } else {
    bad = [].concat(_toConsumableArray(bad), falsies);
  }
  return { good: good, bad: bad };
}

function testGood(good, testFn) {
  good.forEach(function (good) {
    expect(function () {
      return testFn(good);
    }).not.to.throw();
  });
}
function testBad(bad, testFn) {
  bad.forEach(function (bad) {
    expect(function () {
      return testFn(bad);
    }).to.throw();
  });
}

function testGoodAsync(good, testFn) {
  var _this = this;

  return Promise.all(good.map(function () {
    var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(good) {
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return asyncThrows(_asyncToGenerator(regeneratorRuntime.mark(function _callee() {
                return regeneratorRuntime.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        _context.next = 2;
                        return testFn(good);

                      case 2:
                        return _context.abrupt('return', _context.sent);

                      case 3:
                      case 'end':
                        return _context.stop();
                    }
                  }
                }, _callee, _this);
              })), true);

            case 2:
              return _context2.abrupt('return', _context2.sent);

            case 3:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, _this);
    }));

    return function (_x2) {
      return _ref.apply(this, arguments);
    };
  }()));
}
function testBadAsync(bad, testFn) {
  var _this2 = this;

  return Promise.all(bad.map(function () {
    var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee4(bad) {
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return asyncThrows(_asyncToGenerator(regeneratorRuntime.mark(function _callee3() {
                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                  while (1) {
                    switch (_context3.prev = _context3.next) {
                      case 0:
                        _context3.next = 2;
                        return testFn(bad);

                      case 2:
                        return _context3.abrupt('return', _context3.sent);

                      case 3:
                      case 'end':
                        return _context3.stop();
                    }
                  }
                }, _callee3, _this2);
              })));

            case 2:
              return _context4.abrupt('return', _context4.sent);

            case 3:
            case 'end':
              return _context4.stop();
          }
        }
      }, _callee4, _this2);
    }));

    return function (_x3) {
      return _ref3.apply(this, arguments);
    };
  }()));
}

var Tests = function () {
  function Tests() {
    _classCallCheck(this, Tests);
  }

  _createClass(Tests, null, [{
    key: 'defaultsField',
    value: function defaultsField(input, fieldName, expected, test) {
      var check = void 0;
      if (typeof expected == 'function') {
        check = function check(input) {
          return expect(expected(getProp(test(input), fieldName))).to.be.true;
        };
      } else {
        check = function check(input) {
          return expect(getProp(test(input), fieldName)).eql(expected);
        };
      }

      setProp(input, fieldName, undefined);
      check(input);

      unset(input, fieldName);
      check(input);
    }
  }, {
    key: 'goodAndBad',
    value: function goodAndBad(good, bad, testFn) {
      var opts = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

      opts = Object.assign({ required: true }, opts);

      var _assignUndefined = assignUndefined(good, bad, opts);

      var _assignUndefined2 = _slicedToArray(_assignUndefined, 2);

      good = _assignUndefined2[0];
      bad = _assignUndefined2[1];


      if (opts.async) {
        if (typeof opts.async !== 'function') throw Error('opts.async must be a function');
        Promise.all([testGoodAsync(good, testFn), testBadAsync(bad, testFn)]).then(function () {
          return opts.async();
        }).catch(function (e) {
          return opts.async(e);
        });
      } else {
        testGood(good, testFn);
        testBad(bad, testFn);
      }
    }
  }, {
    key: 'goodAndBadField',
    value: function goodAndBadField(input, fieldName, good, bad, testFn) {
      var opts = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : {};

      opts = Object.assign({ required: true }, opts);

      var _assignUndefined3 = assignUndefined(good, bad, opts);

      var _assignUndefined4 = _slicedToArray(_assignUndefined3, 2);

      good = _assignUndefined4[0];
      bad = _assignUndefined4[1];

      Tests.goodAndBad(good, bad, assignAndTest(input, fieldName, testFn), opts);
    }
  }, {
    key: 'requiresField',
    value: function requiresField(input, fieldName, good, testFn) {
      input = resolve(input);
      setProp(input, fieldName, good);
      expect(function () {
        return testFn(input);
      }).not.to.throw();
      setProp(input, fieldName, undefined);
      expect(function () {
        return testFn(input);
      }).to.throw();
      unset(input, fieldName);
      expect(function () {
        return testFn(input);
      }).to.throw();
    }
  }, {
    key: 'allowsAdditionalFields',
    value: function allowsAdditionalFields(input, testFn) {
      var opts = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      opts = Object.assign({ root: '', value: true }, opts);
      var field = opts.root.length ? opts.root + '.askdhaskdhasdakshdkjashdkjashdkjasdh' : 'askdhaskdhasdakshdkjashdkjashdkjasdh';
      setProp(input, field, opts.value);
      expect(function () {
        return testFn(input);
      }).not.to.throw();
    }
  }, {
    key: 'isAnObject',
    value: function isAnObject(testFn) {
      var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      var good = [{}];
      var bad = [true, 1, -1, 'string', [], function () {}];

      var _allowFalsy = allowFalsy(good, bad, opts.allowFalsy);

      good = _allowFalsy.good;
      bad = _allowFalsy.bad;


      Tests.goodAndBad(good, bad, testFn, opts);
    }
  }, {
    key: 'fieldIsAnObject',
    value: function fieldIsAnObject(input, fieldName, testFn) {
      var opts = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

      Tests.isAnObject(assignAndTest(input, fieldName, testFn), opts);
    }
  }, {
    key: 'isAFunction',
    value: function isAFunction(testFn) {
      var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      var good = [function () {}];
      var bad = [true, false, 0, 1, -1, '', 'string', NaN, null, [], {}];

      Tests.goodAndBad(good, bad, testFn, opts);
    }
  }, {
    key: 'fieldIsAFunction',
    value: function fieldIsAFunction(input, field, testFn) {
      var opts = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

      Tests.isAFunction(assignAndTest(input, field, testFn), opts);
    }
  }, {
    key: 'isABoolean',
    value: function isABoolean(test) {
      var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      opts = Object.assign({ required: true, allowStrings: false }, opts);

      var good = [true, false];
      var bad = [0, 1, -1, '', 'string', NaN, null, [], function () {}, {}];
      if (opts.allowStrings) {
        good = [].concat(_toConsumableArray(good), ['true', 'false']);
      } else {
        bad = [].concat(_toConsumableArray(bad), ['true', 'false']);
      }

      Tests.goodAndBad(good, bad, test, opts);
    }
  }, {
    key: 'fieldIsABoolean',
    value: function fieldIsABoolean(input, fieldName, testFn) {
      var opts = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

      Tests.isABoolean(assignAndTest(input, fieldName, testFn), opts);
    }
  }, {
    key: 'isAString',
    value: function isAString(testFn) {
      var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      opts = Object.assign({ required: true, testString: 'string', emptyString: false }, opts);

      var good = [opts.testString];
      var bad = [1, true, [], function () {}, {}];

      var _allowFalsy2 = allowFalsy(good, bad, opts.allowFalsy, { noEmptyString: true });

      good = _allowFalsy2.good;
      bad = _allowFalsy2.bad;

      if (opts.emptyString || opts.allowFalsy) {
        good.push('');
      } else {
        bad.push('');
      }

      Tests.goodAndBad(good, bad, testFn, opts);
    }
  }, {
    key: 'fieldIsAString',
    value: function fieldIsAString(input, fieldName, testFn) {
      var opts = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

      Tests.isAString(assignAndTest(input, fieldName, testFn), opts);
    }
  }, {
    key: 'isAStringOrStringArray',
    value: function isAStringOrStringArray(testFn) {
      var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      opts = Object.assign({ required: true, testString: 'string', emptyArray: false, emptyString: false }, opts);

      var good = [opts.testString, [opts.testString]];
      var bad = [1, true, function () {}, {}];
      if (opts.emptyArray) {
        good.push([]);
      } else {
        bad.push([]);
      }

      var _allowFalsy3 = allowFalsy(good, bad, opts.allowFalsy, { noEmptyString: true });

      good = _allowFalsy3.good;
      bad = _allowFalsy3.bad;

      if (opts.emptyString || opts.allowFalsy) {
        good.push('');
        good.push(['']);
      } else {
        bad.push('');
        bad.push(['']);
      }

      Tests.goodAndBad(good, bad, testFn, opts);
    }
  }, {
    key: 'fieldIsAStringOrStringArray',
    value: function fieldIsAStringOrStringArray(input, fieldName, testFn) {
      var opts = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

      Tests.isAString(assignAndTest(input, fieldName, testFn), opts);
    }
  }, {
    key: 'isThisString',
    value: function isThisString(allowed, testFn) {
      var opts = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      var good = resolveArray(allowed);
      opts = Object.assign({ required: true }, opts);
      var bad = [1, 'string', true, [], function () {}, {}, new Date()];

      var _allowFalsy4 = allowFalsy(good, bad, opts.allowFalsy);

      good = _allowFalsy4.good;
      bad = _allowFalsy4.bad;

      Tests.goodAndBad(good, bad, testFn, opts);
    }
  }, {
    key: 'fieldIsThisString',
    value: function fieldIsThisString(input, fieldName, allowed, testFn) {
      var opts = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};

      Tests.isThisString(allowed, assignAndTest(input, fieldName, testFn), opts);
    }
  }, {
    key: 'isADateString',
    value: function isADateString(testFn) {
      var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      opts = Object.assign({ required: true, emptyString: false }, opts);
      var good = [moment().toISOString()];
      var bad = [1, 'string', true, [], function () {}, {}, new Date(), moment()];

      var _allowFalsy5 = allowFalsy(good, bad, opts.allowFalsy, { noEmptyString: true });

      good = _allowFalsy5.good;
      bad = _allowFalsy5.bad;

      if (opts.emptyString || opts.allowFalsy) {
        good.push('');
      } else {
        bad.push('');
      }
      Tests.goodAndBad(good, bad, testFn, opts);
    }
  }, {
    key: 'fieldIsADateString',
    value: function fieldIsADateString(input, fieldName, testFn) {
      var opts = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

      Tests.isADateString(assignAndTest(input, fieldName, testFn), opts);
    }
  }, {
    key: 'isANumber',
    value: function isANumber(testFn) {
      var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      opts = Object.assign({ required: true, integer: false, positive: false, nonzero: false, min: false, max: false }, opts);

      var good = [];
      var bad = [true, false, '', 'string', NaN, null, [], function () {}, {}];

      good.push(1);
      good.push('1');

      if (opts.nonzero) {
        bad.push(0);
        bad.push('0');
      } else {
        good.push(0);
        good.push('0');
      }

      if (opts.integer) {
        bad.push(1.1);
        bad.push('1.1');
      } else {
        good.push(1.1);
        good.push('1.1');
      }

      if (opts.positive) {
        bad.push(-1);
        bad.push('-1');
      } else {
        good.push(-1);
        good.push('-1');
      }

      Tests.goodAndBad(good, bad, testFn, opts);
    }
  }, {
    key: 'fieldIsANumber',
    value: function fieldIsANumber(input, fieldName, testFn) {
      var opts = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

      Tests.isANumber(assignAndTest(input, fieldName, testFn), opts);
    }
  }, {
    key: 'isANumberInRange',
    value: function isANumberInRange(testFn) {
      var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      opts = Object.assign({ required: true, integer: false, min: false, max: false }, opts);
      var good = [];
      var bad = [true, false, '', 'string', NaN, null, [], function () {}, {}];
      var _opts = opts,
          min = _opts.min,
          max = _opts.max;


      if (max === false && min === false) {
        throw new Error('Cannot test for a number in range without either a min or max option');
      }

      if (min !== false && max !== false) {
        if (min > max) {
          throw new Error('Cannot test for a number in range when min > max');
        }
        good.push(min);
        good.push(max);
        bad.push(min - 1);
        bad.push(max + 1);
        if (opts.integer) {
          good.push(Math.floor((min + max) / 2));
          bad.push((min + max) / 2 + 0.000000000001);
        } else {
          good.push((min + max) / 2 + 0.00000000001);
        }
      } else if (max !== false) {
        good.push(max);
        bad.push(max + 1);
        if (opts.integer) {
          good.push(max - 1);
          bad.push(max - 1.000000000001);
        } else {
          good.push(max - 1.000000000001);
        }
      } else if (min !== false) {
        good.push(min);
        bad.push(min - 1);
        if (opts.integer) {
          good.push(min + 1);
          bad.push(min + 0.000000001);
        } else {
          good.push(min + 0.000000001);
        }
      }

      Tests.goodAndBad(good, bad, testFn, opts);
    }
  }, {
    key: 'fieldIsANumberInRange',
    value: function fieldIsANumberInRange(input, fieldName, testFn) {
      var opts = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

      Tests.isANumberInRange(assignAndTest(input, fieldName, testFn), opts);
    }
  }, {
    key: 'matchesTheContract',
    value: function matchesTheContract(functions, testFn) {
      var opts = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      var good = [];
      var bad = [true, 1, -1, 'string', [], function () {}, {}];

      var _allowFalsy6 = allowFalsy(good, bad, opts.allowFalsy);

      good = _allowFalsy6.good;
      bad = _allowFalsy6.bad;


      var goodObj = {};
      if (Array.isArray(functions)) {
        functions.forEach(function (fn) {
          goodObj[fn] = function () {};
        });
        var fn = void 0;
        while (fn = functions.pop()) {
          bad.push(omit(goodObj, fn));
        }
      } else if (typeof functions === 'string') {
        goodObj[functions] = function () {};
      } else if ((typeof functions === 'undefined' ? 'undefined' : _typeof(functions)) === 'object') {
        var keys = Object.keys(functions);
        keys.forEach(function (key) {
          goodObj[key] = functions[key];
        });
        var key = void 0;
        while (key = keys.pop()) {
          bad.push(omit(goodObj, key));
        }
      } else {
        throw Error('bad functions definition', functions);
      }
      good.push(goodObj);

      Tests.goodAndBad(good, bad, testFn, opts);
    }
  }, {
    key: 'fieldMatchesTheContract',
    value: function fieldMatchesTheContract(input, field, functions, testFn) {
      var opts = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};

      Tests.matchesTheContract(functions, assignAndTest(input, field, testFn), opts);
    }
  }]);

  return Tests;
}();

module.exports = Tests;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy90ZXN0cy5qcyJdLCJuYW1lcyI6WyJjaGFpIiwicmVxdWlyZSIsImV4cGVjdCIsImlzQUZ1bmN0aW9uIiwic2V0UHJvcCIsImdldFByb3AiLCJ1bnNldCIsIm9taXQiLCJtb21lbnQiLCJhc3luY1Rocm93cyIsInJlc29sdmUiLCJpbnB1dCIsInJlc29sdmVBcnJheSIsIkFycmF5IiwiaXNBcnJheSIsImFzc2lnblVuZGVmaW5lZCIsImdvb2QiLCJiYWQiLCJvcHRzIiwiYWxsb3dGYWxzeSIsInB1c2giLCJ1bmRlZmluZWQiLCJyZXF1aXJlZCIsImFzc2lnbkFuZFRlc3QiLCJmaWVsZE5hbWUiLCJ0ZXN0Rm4iLCJ2YWx1ZSIsImFsbG93Iiwib3B0aW9ucyIsImZhbHNpZXMiLCJub1plcm8iLCJub0ZhbHNlIiwibm9OdWxsIiwibm9FbXB0eVN0cmluZyIsIm5vTmFOIiwiTmFOIiwidGVzdEdvb2QiLCJmb3JFYWNoIiwibm90IiwidG8iLCJ0aHJvdyIsInRlc3RCYWQiLCJ0ZXN0R29vZEFzeW5jIiwiUHJvbWlzZSIsImFsbCIsIm1hcCIsInRlc3RCYWRBc3luYyIsIlRlc3RzIiwiZXhwZWN0ZWQiLCJ0ZXN0IiwiY2hlY2siLCJiZSIsInRydWUiLCJlcWwiLCJPYmplY3QiLCJhc3NpZ24iLCJhc3luYyIsIkVycm9yIiwidGhlbiIsImNhdGNoIiwiZSIsImdvb2RBbmRCYWQiLCJyb290IiwiZmllbGQiLCJsZW5ndGgiLCJpc0FuT2JqZWN0IiwiYWxsb3dTdHJpbmdzIiwiaXNBQm9vbGVhbiIsInRlc3RTdHJpbmciLCJlbXB0eVN0cmluZyIsImlzQVN0cmluZyIsImVtcHR5QXJyYXkiLCJhbGxvd2VkIiwiRGF0ZSIsImlzVGhpc1N0cmluZyIsInRvSVNPU3RyaW5nIiwiaXNBRGF0ZVN0cmluZyIsImludGVnZXIiLCJwb3NpdGl2ZSIsIm5vbnplcm8iLCJtaW4iLCJtYXgiLCJpc0FOdW1iZXIiLCJNYXRoIiwiZmxvb3IiLCJpc0FOdW1iZXJJblJhbmdlIiwiZnVuY3Rpb25zIiwiZ29vZE9iaiIsImZuIiwicG9wIiwia2V5cyIsImtleSIsIm1hdGNoZXNUaGVDb250cmFjdCIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7OztBQUNBLElBQU1BLE9BQU9DLFFBQVEsTUFBUixDQUFiO0FBQ0EsSUFBTUMsU0FBU0YsS0FBS0UsTUFBcEI7QUFDQSxJQUFNQyxjQUFjRixRQUFRLG1CQUFSLENBQXBCO0FBQ0EsSUFBTUcsVUFBVUgsUUFBUSxZQUFSLENBQWhCO0FBQ0EsSUFBTUksVUFBVUosUUFBUSxZQUFSLENBQWhCO0FBQ0EsSUFBTUssUUFBUUwsUUFBUSxjQUFSLENBQWQ7QUFDQSxJQUFNTSxPQUFPTixRQUFRLGFBQVIsQ0FBYjtBQUNBLElBQU1PLFNBQVNQLFFBQVEsUUFBUixDQUFmOztlQUVzQkEsUUFBUSxhQUFSLEM7SUFBZlEsVyxZQUFBQSxXOztBQUVQLFNBQVNDLE9BQVQsQ0FBaUJDLEtBQWpCLEVBQXdCO0FBQ3RCLFNBQVFSLFlBQVlRLEtBQVosQ0FBRCxHQUF1QkEsT0FBdkIsR0FBaUNBLEtBQXhDO0FBQ0Q7QUFDRCxTQUFTQyxZQUFULENBQXNCRCxLQUF0QixFQUE2QjtBQUMzQixTQUFRRSxNQUFNQyxPQUFOLENBQWNKLFFBQVFDLEtBQVIsQ0FBZCxDQUFELEdBQWtDQSxLQUFsQyxHQUEwQyxDQUFDQSxLQUFELENBQWpEO0FBQ0Q7O0FBRUQsU0FBU0ksZUFBVCxDQUF5QkMsSUFBekIsRUFBK0JDLEdBQS9CLEVBQW9DQyxJQUFwQyxFQUEwQztBQUN4Q0YsU0FBT0osYUFBYUksSUFBYixDQUFQO0FBQ0FDLFFBQU1MLGFBQWFLLEdBQWIsQ0FBTjtBQUNBLE1BQUlDLEtBQUtDLFVBQVQsRUFBcUI7QUFDbkJILFNBQUtJLElBQUwsQ0FBVUMsU0FBVjtBQUNELEdBRkQsTUFFTyxJQUFJSCxLQUFLSSxRQUFULEVBQW1CO0FBQ3hCTCxRQUFJRyxJQUFKLENBQVNDLFNBQVQ7QUFDRCxHQUZNLE1BRUE7QUFDTEwsU0FB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LFNBQVAsS0FBcUIsUUFBekIsRUFBbUM7QUFDeENDLGdCQUFRRCxTQUFSLElBQXFCLFlBQU0sQ0FBRSxDQUE3QjtBQUVELE9BSE0sTUFHQSxJQUFJLFFBQU9BLFNBQVAseUNBQU9BLFNBQVAsT0FBcUIsUUFBekIsRUFBbUM7QUFDeEMsWUFBTUksT0FBT3BDLE9BQU9vQyxJQUFQLENBQVlKLFNBQVosQ0FBYjtBQUNBSSxhQUFLckQsT0FBTCxDQUFhLGVBQU87QUFDbEJrRCxrQkFBUUksR0FBUixJQUFlTCxVQUFVSyxHQUFWLENBQWY7QUFDRCxTQUZEO0FBR0EsWUFBSUEsWUFBSjtBQUNBLGVBQU9BLE1BQU1ELEtBQUtELEdBQUwsRUFBYixFQUF5QjtBQUN2QnhFLGNBQUlHLElBQUosQ0FBU2IsS0FBS2dGLE9BQUwsRUFBY0ksR0FBZCxDQUFUO0FBQ0Q7QUFFRixPQVZNLE1BVUE7QUFDTCxjQUFNbEMsTUFBTSwwQkFBTixFQUFrQzZCLFNBQWxDLENBQU47QUFDRDtBQUNEdEUsV0FBS0ksSUFBTCxDQUFVbUUsT0FBVjs7QUFFQXhDLFlBQU1jLFVBQU4sQ0FBaUI3QyxJQUFqQixFQUF1QkMsR0FBdkIsRUFBNEJRLE1BQTVCLEVBQW9DUCxJQUFwQztBQUNEOzs7NENBRThCUCxLLEVBQU9vRCxLLEVBQU91QixTLEVBQVc3RCxNLEVBQWlCO0FBQUEsVUFBVFAsSUFBUyx1RUFBSixFQUFJOztBQUN2RTZCLFlBQU02QyxrQkFBTixDQUF5Qk4sU0FBekIsRUFBb0MvRCxjQUFjWixLQUFkLEVBQXFCb0QsS0FBckIsRUFBNEJ0QyxNQUE1QixDQUFwQyxFQUF5RVAsSUFBekU7QUFDRDs7Ozs7O0FBR0gyRSxPQUFPQyxPQUFQLEdBQWlCL0MsS0FBakIiLCJmaWxlIjoidGVzdHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5jb25zdCBjaGFpID0gcmVxdWlyZShcImNoYWlcIik7XG5jb25zdCBleHBlY3QgPSBjaGFpLmV4cGVjdDtcbmNvbnN0IGlzQUZ1bmN0aW9uID0gcmVxdWlyZSgnbG9kYXNoLmlzZnVuY3Rpb24nKTtcbmNvbnN0IHNldFByb3AgPSByZXF1aXJlKCdsb2Rhc2guc2V0Jyk7XG5jb25zdCBnZXRQcm9wID0gcmVxdWlyZSgnbG9kYXNoLmdldCcpO1xuY29uc3QgdW5zZXQgPSByZXF1aXJlKCdsb2Rhc2gudW5zZXQnKTtcbmNvbnN0IG9taXQgPSByZXF1aXJlKCdsb2Rhc2gub21pdCcpO1xuY29uc3QgbW9tZW50ID0gcmVxdWlyZSgnbW9tZW50Jyk7XG5cbmNvbnN0IHthc3luY1Rocm93c30gPSByZXF1aXJlKCcuL2Z1bmN0aW9ucycpO1xuXG5mdW5jdGlvbiByZXNvbHZlKGlucHV0KSB7XG4gIHJldHVybiAoaXNBRnVuY3Rpb24oaW5wdXQpKSA/IGlucHV0KCkgOiBpbnB1dDtcbn1cbmZ1bmN0aW9uIHJlc29sdmVBcnJheShpbnB1dCkge1xuICByZXR1cm4gKEFycmF5LmlzQXJyYXkocmVzb2x2ZShpbnB1dCkpKSA/IGlucHV0IDogW2lucHV0XTtcbn1cblxuZnVuY3Rpb24gYXNzaWduVW5kZWZpbmVkKGdvb2QsIGJhZCwgb3B0cykge1xuICBnb29kID0gcmVzb2x2ZUFycmF5KGdvb2QpO1xuICBiYWQgPSByZXNvbHZlQXJyYXkoYmFkKTtcbiAgaWYgKG9wdHMuYWxsb3dGYWxzeSkge1xuICAgIGdvb2QucHVzaCh1bmRlZmluZWQpO1xuICB9IGVsc2UgaWYgKG9wdHMucmVxdWlyZWQpIHtcbiAgICBiYWQucHVzaCh1bmRlZmluZWQpO1xuICB9IGVsc2Uge1xuICAgIGdvb2QucHVzaCh1bmRlZmluZWQpO1xuICB9XG4gIHJldHVybiBbZ29vZCwgYmFkXTtcbn1cblxuZnVuY3Rpb24gYXNzaWduQW5kVGVzdChpbnB1dCwgZmllbGROYW1lLCB0ZXN0Rm4pIHtcbiAgcmV0dXJuIHZhbHVlID0+IHtcbiAgICBzZXRQcm9wKGlucHV0LCBmaWVsZE5hbWUsIHZhbHVlKTtcbiAgICB0ZXN0Rm4oaW5wdXQpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGFsbG93RmFsc3koZ29vZCwgYmFkLCBhbGxvdywgb3B0aW9ucz17fSkge1xuICBjb25zdCBmYWxzaWVzID0gW107XG4gIGlmICghb3B0aW9ucy5ub1plcm8pXG4gICAgZmFsc2llcy5wdXNoKDApO1xuICBpZiAoIW9wdGlvbnMubm9GYWxzZSlcbiAgICBmYWxzaWVzLnB1c2goZmFsc2UpO1xuICBpZiAoIW9wdGlvbnMubm9OdWxsKVxuICAgIGZhbHNpZXMucHVzaChudWxsKTtcbiAgaWYgKCFvcHRpb25zLm5vRW1wdHlTdHJpbmcpXG4gICAgZmFsc2llcy5wdXNoKCcnKTtcbiAgaWYgKCFvcHRpb25zLm5vTmFOKVxuICAgIGZhbHNpZXMucHVzaChOYU4pO1xuXG4gIGlmIChhbGxvdykge1xuICAgIGdvb2QgPSBbLi4uZ29vZCwgLi4uZmFsc2llc107XG4gIH0gZWxzZSB7XG4gICAgYmFkID0gWy4uLmJhZCwgLi4uZmFsc2llc107XG4gIH1cbiAgcmV0dXJuIHtnb29kLCBiYWR9O1xufVxuXG5mdW5jdGlvbiB0ZXN0R29vZChnb29kLCB0ZXN0Rm4pIHtcbiAgZ29vZC5mb3JFYWNoKGdvb2QgPT4ge1xuICAgIGV4cGVjdCgoKSA9PiB0ZXN0Rm4oZ29vZCkpLm5vdC50by50aHJvdygpO1xuICB9KTtcbn1cbmZ1bmN0aW9uIHRlc3RCYWQoYmFkLCB0ZXN0Rm4pIHtcbiAgYmFkLmZvckVhY2goYmFkID0+IHtcbiAgICBleHBlY3QoKCkgPT4gdGVzdEZuKGJhZCkpLnRvLnRocm93KCk7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiB0ZXN0R29vZEFzeW5jKGdvb2QsIHRlc3RGbikge1xuICByZXR1cm4gUHJvbWlzZS5hbGwoZ29vZC5tYXAoYXN5bmMgZ29vZCA9PiB7XG4gICAgcmV0dXJuIGF3YWl0IGFzeW5jVGhyb3dzKGFzeW5jICgpID0+IGF3YWl0IHRlc3RGbihnb29kKSwgdHJ1ZSk7XG4gIH0pKVxufVxuZnVuY3Rpb24gdGVzdEJhZEFzeW5jKGJhZCwgdGVzdEZuKSB7XG4gIHJldHVybiBQcm9taXNlLmFsbChiYWQubWFwKGFzeW5jIGJhZCA9PiB7XG4gICAgcmV0dXJuIGF3YWl0IGFzeW5jVGhyb3dzKGFzeW5jICgpID0+IGF3YWl0IHRlc3RGbihiYWQpKTtcbiAgfSkpO1xufVxuXG5cblxuY2xhc3MgVGVzdHMge1xuXG4gIHN0YXRpYyBkZWZhdWx0c0ZpZWxkKGlucHV0LCBmaWVsZE5hbWUsIGV4cGVjdGVkLCB0ZXN0KSB7XG4gICAgbGV0IGNoZWNrO1xuICAgIGlmICh0eXBlb2YgZXhwZWN0ZWQgPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgY2hlY2sgPSAoaW5wdXQpID0+IGV4cGVjdChleHBlY3RlZChnZXRQcm9wKHRlc3QoaW5wdXQpLCBmaWVsZE5hbWUpKSkudG8uYmUudHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgY2hlY2sgPSAoaW5wdXQpID0+IGV4cGVjdChnZXRQcm9wKHRlc3QoaW5wdXQpLCBmaWVsZE5hbWUpKS5lcWwoZXhwZWN0ZWQpO1xuICAgIH1cblxuICAgIHNldFByb3AoaW5wdXQsIGZpZWxkTmFtZSwgdW5kZWZpbmVkKTtcbiAgICBjaGVjayhpbnB1dCk7XG5cbiAgICB1bnNldChpbnB1dCwgZmllbGROYW1lKTtcbiAgICBjaGVjayhpbnB1dCk7XG4gIH1cblxuICBzdGF0aWMgZ29vZEFuZEJhZChnb29kLCBiYWQsIHRlc3RGbiwgb3B0cz17fSkge1xuICAgIG9wdHMgPSBPYmplY3QuYXNzaWduKHtyZXF1aXJlZDogdHJ1ZX0sIG9wdHMpO1xuICAgIChbZ29vZCwgYmFkXSA9IGFzc2lnblVuZGVmaW5lZChnb29kLCBiYWQsIG9wdHMpKTtcblxuICAgIGlmIChvcHRzLmFzeW5jKSB7XG4gICAgICBpZiAodHlwZW9mIG9wdHMuYXN5bmMgIT09ICdmdW5jdGlvbicpXG4gICAgICAgIHRocm93IEVycm9yKCdvcHRzLmFzeW5jIG11c3QgYmUgYSBmdW5jdGlvbicpO1xuICAgICAgUHJvbWlzZS5hbGwoW1xuICAgICAgICB0ZXN0R29vZEFzeW5jKGdvb2QsIHRlc3RGbiksXG4gICAgICAgIHRlc3RCYWRBc3luYyhiYWQsIHRlc3RGbilcbiAgICAgIF0pLnRoZW4oKCkgPT4gb3B0cy5hc3luYygpKS5jYXRjaChlID0+IG9wdHMuYXN5bmMoZSkpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0ZXN0R29vZChnb29kLCB0ZXN0Rm4pO1xuICAgICAgdGVzdEJhZChiYWQsIHRlc3RGbik7XG4gICAgfVxuICB9XG5cbiAgc3RhdGljIGdvb2RBbmRCYWRGaWVsZChpbnB1dCwgZmllbGROYW1lLCBnb29kLCBiYWQsIHRlc3RGbiwgb3B0cz17fSkge1xuICAgIG9wdHMgPSBPYmplY3QuYXNzaWduKHtyZXF1aXJlZDogdHJ1ZX0sIG9wdHMpO1xuICAgIChbZ29vZCwgYmFkXSA9IGFzc2lnblVuZGVmaW5lZChnb29kLCBiYWQsIG9wdHMpKTtcbiAgICBUZXN0cy5nb29kQW5kQmFkKGdvb2QsIGJhZCwgYXNzaWduQW5kVGVzdChpbnB1dCwgZmllbGROYW1lLCB0ZXN0Rm4pLCBvcHRzKTtcbiAgfVxuXG4gIHN0YXRpYyByZXF1aXJlc0ZpZWxkKGlucHV0LCBmaWVsZE5hbWUsIGdvb2QsIHRlc3RGbikge1xuICAgIGlucHV0ID0gcmVzb2x2ZShpbnB1dCk7XG4gICAgc2V0UHJvcChpbnB1dCwgZmllbGROYW1lLCBnb29kKTtcbiAgICBleHBlY3QoKCkgPT4gdGVzdEZuKGlucHV0KSkubm90LnRvLnRocm93KCk7XG4gICAgc2V0UHJvcChpbnB1dCwgZmllbGROYW1lLCB1bmRlZmluZWQpO1xuICAgIGV4cGVjdCgoKSA9PiB0ZXN0Rm4oaW5wdXQpKS50by50aHJvdygpO1xuICAgIHVuc2V0KGlucHV0LCBmaWVsZE5hbWUpO1xuICAgIGV4cGVjdCgoKSA9PiB0ZXN0Rm4oaW5wdXQpKS50by50aHJvdygpO1xuICB9XG5cbiAgc3RhdGljIGFsbG93c0FkZGl0aW9uYWxGaWVsZHMoaW5wdXQsIHRlc3RGbiwgb3B0cz17fSkge1xuICAgIG9wdHMgPSBPYmplY3QuYXNzaWduKHtyb290OiAnJywgdmFsdWU6IHRydWV9LCBvcHRzKTtcbiAgICBjb25zdCBmaWVsZCA9IChvcHRzLnJvb3QubGVuZ3RoKSA/IGAke29wdHMucm9vdH0uYXNrZGhhc2tkaGFzZGFrc2hka2phc2hka2phc2hka2phc2RoYCA6ICdhc2tkaGFza2RoYXNkYWtzaGRramFzaGRramFzaGRramFzZGgnO1xuICAgIHNldFByb3AoaW5wdXQsIGZpZWxkLCBvcHRzLnZhbHVlKTtcbiAgICBleHBlY3QoKCkgPT4gdGVzdEZuKGlucHV0KSkubm90LnRvLnRocm93KCk7XG4gIH1cblxuICBzdGF0aWMgaXNBbk9iamVjdCh0ZXN0Rm4sIG9wdHM9e30pIHtcbiAgICBsZXQgZ29vZCA9IFt7fV07XG4gICAgbGV0IGJhZCA9IFt0cnVlLDEsLTEsJ3N0cmluZycsW10sKCk9Pnt9XTtcbiAgICAoe2dvb2QsIGJhZH0gPSBhbGxvd0ZhbHN5KGdvb2QsIGJhZCwgb3B0cy5hbGxvd0ZhbHN5KSk7XG5cbiAgICBUZXN0cy5nb29kQW5kQmFkKGdvb2QsIGJhZCwgdGVzdEZuLCBvcHRzKTtcbiAgfVxuICBcbiAgc3RhdGljIGZpZWxkSXNBbk9iamVjdChpbnB1dCwgZmllbGROYW1lLCB0ZXN0Rm4sIG9wdHM9e30pIHtcbiAgICBUZXN0cy5pc0FuT2JqZWN0KGFzc2lnbkFuZFRlc3QoaW5wdXQsIGZpZWxkTmFtZSwgdGVzdEZuKSwgb3B0cyk7XG4gIH1cblxuICBzdGF0aWMgaXNBRnVuY3Rpb24odGVzdEZuLCBvcHRzPXt9KSB7XG4gICAgbGV0IGdvb2QgPSBbKCk9Pnt9XTtcbiAgICBsZXQgYmFkID0gW3RydWUsZmFsc2UsMCwxLC0xLCcnLCdzdHJpbmcnLE5hTixudWxsLFtdLHt9XTtcblxuICAgIFRlc3RzLmdvb2RBbmRCYWQoZ29vZCwgYmFkLCB0ZXN0Rm4sIG9wdHMpO1xuICB9XG5cbiAgc3RhdGljIGZpZWxkSXNBRnVuY3Rpb24oaW5wdXQsIGZpZWxkLCB0ZXN0Rm4sIG9wdHM9e30pIHtcbiAgICBUZXN0cy5pc0FGdW5jdGlvbihhc3NpZ25BbmRUZXN0KGlucHV0LCBmaWVsZCwgdGVzdEZuKSwgb3B0cyk7XG4gIH1cblxuICBzdGF0aWMgaXNBQm9vbGVhbih0ZXN0LCBvcHRzPXt9KSB7XG4gICAgb3B0cyA9IE9iamVjdC5hc3NpZ24oe3JlcXVpcmVkOiB0cnVlLCBhbGxvd1N0cmluZ3M6IGZhbHNlfSwgb3B0cyk7XG5cbiAgICBsZXQgZ29vZCA9IFt0cnVlLCBmYWxzZV07XG4gICAgbGV0IGJhZCA9IFswLDEsLTEsJycsJ3N0cmluZycsTmFOLG51bGwsW10sKCk9Pnt9LHt9XTtcbiAgICBpZiAob3B0cy5hbGxvd1N0cmluZ3MpIHtcbiAgICAgIGdvb2QgPSBbLi4uZ29vZCwgJ3RydWUnLCAnZmFsc2UnXTtcbiAgICB9IGVsc2Uge1xuICAgICAgYmFkID0gWy4uLmJhZCwgJ3RydWUnLCAnZmFsc2UnXTtcbiAgICB9XG5cbiAgICBUZXN0cy5nb29kQW5kQmFkKGdvb2QsIGJhZCwgdGVzdCwgb3B0cyk7XG4gIH1cblxuICBzdGF0aWMgZmllbGRJc0FCb29sZWFuKGlucHV0LCBmaWVsZE5hbWUsIHRlc3RGbiwgb3B0cz17fSkge1xuICAgIFRlc3RzLmlzQUJvb2xlYW4oYXNzaWduQW5kVGVzdChpbnB1dCwgZmllbGROYW1lLCB0ZXN0Rm4pLCBvcHRzKTtcbiAgfVxuXG4gIHN0YXRpYyBpc0FTdHJpbmcodGVzdEZuLCBvcHRzPXt9KSB7XG4gICAgb3B0cyA9IE9iamVjdC5hc3NpZ24oe3JlcXVpcmVkOiB0cnVlLCB0ZXN0U3RyaW5nOiAnc3RyaW5nJywgZW1wdHlTdHJpbmc6IGZhbHNlfSwgb3B0cyk7XG5cbiAgICBsZXQgZ29vZCA9IFtvcHRzLnRlc3RTdHJpbmddO1xuICAgIGxldCBiYWQgPSBbMSx0cnVlLFtdLCgpPT57fSx7fV07XG4gICAgKHtnb29kLCBiYWR9ID0gYWxsb3dGYWxzeShnb29kLCBiYWQsIG9wdHMuYWxsb3dGYWxzeSwge25vRW1wdHlTdHJpbmc6IHRydWV9KSk7XG4gICAgaWYgKG9wdHMuZW1wdHlTdHJpbmcgfHwgb3B0cy5hbGxvd0ZhbHN5KSB7XG4gICAgICBnb29kLnB1c2goJycpO1xuICAgIH0gZWxzZSB7XG4gICAgICBiYWQucHVzaCgnJyk7XG4gICAgfVxuXG4gICAgVGVzdHMuZ29vZEFuZEJhZChnb29kLCBiYWQsIHRlc3RGbiwgb3B0cyk7XG4gIH1cblxuICBzdGF0aWMgZmllbGRJc0FTdHJpbmcoaW5wdXQsIGZpZWxkTmFtZSwgdGVzdEZuLCBvcHRzPXt9KSB7XG4gICAgVGVzdHMuaXNBU3RyaW5nKGFzc2lnbkFuZFRlc3QoaW5wdXQsIGZpZWxkTmFtZSwgdGVzdEZuKSwgb3B0cyk7XG4gIH1cblxuICBzdGF0aWMgaXNBU3RyaW5nT3JTdHJpbmdBcnJheSh0ZXN0Rm4sIG9wdHM9e30pIHtcbiAgICBvcHRzID0gT2JqZWN0LmFzc2lnbih7cmVxdWlyZWQ6IHRydWUsIHRlc3RTdHJpbmc6ICdzdHJpbmcnLCBlbXB0eUFycmF5OiBmYWxzZSwgZW1wdHlTdHJpbmc6IGZhbHNlfSwgb3B0cyk7XG5cbiAgICBsZXQgZ29vZCA9IFtvcHRzLnRlc3RTdHJpbmcsIFtvcHRzLnRlc3RTdHJpbmddXTtcbiAgICBsZXQgYmFkID0gWzEsdHJ1ZSwoKT0+e30se31dO1xuICAgIGlmIChvcHRzLmVtcHR5QXJyYXkpIHtcbiAgICAgIGdvb2QucHVzaChbXSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGJhZC5wdXNoKFtdKTtcbiAgICB9XG4gICAgKHtnb29kLCBiYWR9ID0gYWxsb3dGYWxzeShnb29kLCBiYWQsIG9wdHMuYWxsb3dGYWxzeSwge25vRW1wdHlTdHJpbmc6IHRydWV9KSk7XG4gICAgaWYgKG9wdHMuZW1wdHlTdHJpbmcgfHwgb3B0cy5hbGxvd0ZhbHN5KSB7XG4gICAgICBnb29kLnB1c2goJycpO1xuICAgICAgZ29vZC5wdXNoKFsnJ10pO1xuICAgIH0gZWxzZSB7XG4gICAgICBiYWQucHVzaCgnJyk7XG4gICAgICBiYWQucHVzaChbJyddKTtcbiAgICB9XG5cbiAgICBUZXN0cy5nb29kQW5kQmFkKGdvb2QsIGJhZCwgdGVzdEZuLCBvcHRzKTtcbiAgfVxuXG4gIHN0YXRpYyBmaWVsZElzQVN0cmluZ09yU3RyaW5nQXJyYXkoaW5wdXQsIGZpZWxkTmFtZSwgdGVzdEZuLCBvcHRzPXt9KSB7XG4gICAgVGVzdHMuaXNBU3RyaW5nKGFzc2lnbkFuZFRlc3QoaW5wdXQsIGZpZWxkTmFtZSwgdGVzdEZuKSwgb3B0cyk7XG4gIH1cblxuXG4gIHN0YXRpYyBpc1RoaXNTdHJpbmcoYWxsb3dlZCwgdGVzdEZuLCBvcHRzPXt9KSB7XG4gICAgbGV0IGdvb2QgPSByZXNvbHZlQXJyYXkoYWxsb3dlZCk7XG4gICAgb3B0cyA9IE9iamVjdC5hc3NpZ24oe3JlcXVpcmVkOiB0cnVlfSwgb3B0cyk7XG4gICAgbGV0IGJhZCA9IFsxLCdzdHJpbmcnLHRydWUsW10sKCk9Pnt9LHt9LG5ldyBEYXRlKCldO1xuICAgICh7Z29vZCwgYmFkfSA9IGFsbG93RmFsc3koZ29vZCwgYmFkLCBvcHRzLmFsbG93RmFsc3kpKTtcbiAgICBUZXN0cy5nb29kQW5kQmFkKGdvb2QsIGJhZCwgdGVzdEZuLCBvcHRzKTtcbiAgfVxuXG4gIHN0YXRpYyBmaWVsZElzVGhpc1N0cmluZyhpbnB1dCwgZmllbGROYW1lLCBhbGxvd2VkLCB0ZXN0Rm4sIG9wdHM9e30pIHtcbiAgICBUZXN0cy5pc1RoaXNTdHJpbmcoYWxsb3dlZCwgYXNzaWduQW5kVGVzdChpbnB1dCwgZmllbGROYW1lLCB0ZXN0Rm4pLCBvcHRzKTtcbiAgfVxuXG4gIHN0YXRpYyBpc0FEYXRlU3RyaW5nKHRlc3RGbiwgb3B0cz17fSkge1xuICAgIG9wdHMgPSBPYmplY3QuYXNzaWduKHtyZXF1aXJlZDogdHJ1ZSwgZW1wdHlTdHJpbmc6IGZhbHNlfSwgb3B0cyk7XG4gICAgbGV0IGdvb2QgPSBbbW9tZW50KCkudG9JU09TdHJpbmcoKV07XG4gICAgbGV0IGJhZCA9IFsxLCdzdHJpbmcnLHRydWUsW10sKCk9Pnt9LHt9LG5ldyBEYXRlKCksbW9tZW50KCldO1xuICAgICh7Z29vZCwgYmFkfSA9IGFsbG93RmFsc3koZ29vZCwgYmFkLCBvcHRzLmFsbG93RmFsc3ksIHtub0VtcHR5U3RyaW5nOiB0cnVlfSkpO1xuICAgIGlmIChvcHRzLmVtcHR5U3RyaW5nIHx8IG9wdHMuYWxsb3dGYWxzeSkge1xuICAgICAgZ29vZC5wdXNoKCcnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYmFkLnB1c2goJycpO1xuICAgIH1cbiAgICBUZXN0cy5nb29kQW5kQmFkKGdvb2QsIGJhZCwgdGVzdEZuLCBvcHRzKTtcbiAgfVxuXG4gIHN0YXRpYyBmaWVsZElzQURhdGVTdHJpbmcoaW5wdXQsIGZpZWxkTmFtZSwgdGVzdEZuLCBvcHRzPXt9KSB7XG4gICAgVGVzdHMuaXNBRGF0ZVN0cmluZyhhc3NpZ25BbmRUZXN0KGlucHV0LCBmaWVsZE5hbWUsIHRlc3RGbiksIG9wdHMpO1xuICB9XG5cblxuICBzdGF0aWMgaXNBTnVtYmVyKHRlc3RGbiwgb3B0cz17fSkge1xuICAgIG9wdHMgPSBPYmplY3QuYXNzaWduKHtyZXF1aXJlZDogdHJ1ZSwgaW50ZWdlcjogZmFsc2UsIHBvc2l0aXZlOiBmYWxzZSwgbm9uemVybzogZmFsc2UsIG1pbjogZmFsc2UsIG1heDogZmFsc2V9LCBvcHRzKTtcblxuICAgIGxldCBnb29kID0gW107XG4gICAgbGV0IGJhZCA9IFt0cnVlLGZhbHNlLCcnLCdzdHJpbmcnLE5hTixudWxsLFtdLCgpPT57fSx7fV07XG5cblxuICAgIGdvb2QucHVzaCgxKTtcbiAgICBnb29kLnB1c2goJzEnKTtcblxuICAgIGlmIChvcHRzLm5vbnplcm8pIHtcbiAgICAgIGJhZC5wdXNoKDApO1xuICAgICAgYmFkLnB1c2goJzAnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZ29vZC5wdXNoKDApO1xuICAgICAgZ29vZC5wdXNoKCcwJyk7XG4gICAgfVxuXG4gICAgaWYgKG9wdHMuaW50ZWdlcikge1xuICAgICAgYmFkLnB1c2goMS4xKTtcbiAgICAgIGJhZC5wdXNoKCcxLjEnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZ29vZC5wdXNoKDEuMSk7XG4gICAgICBnb29kLnB1c2goJzEuMScpO1xuICAgIH1cblxuICAgIGlmIChvcHRzLnBvc2l0aXZlKSB7XG4gICAgICBiYWQucHVzaCgtMSk7XG4gICAgICBiYWQucHVzaCgnLTEnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZ29vZC5wdXNoKC0xKTtcbiAgICAgIGdvb2QucHVzaCgnLTEnKTtcbiAgICB9XG5cbiAgICBUZXN0cy5nb29kQW5kQmFkKGdvb2QsIGJhZCwgdGVzdEZuLCBvcHRzKTtcbiAgfVxuXG4gIHN0YXRpYyBmaWVsZElzQU51bWJlcihpbnB1dCwgZmllbGROYW1lLCB0ZXN0Rm4sIG9wdHM9e30pIHtcbiAgICBUZXN0cy5pc0FOdW1iZXIoYXNzaWduQW5kVGVzdChpbnB1dCwgZmllbGROYW1lLCB0ZXN0Rm4pLCBvcHRzKTtcbiAgfVxuXG5cblxuICBzdGF0aWMgaXNBTnVtYmVySW5SYW5nZSh0ZXN0Rm4sIG9wdHM9e30pIHtcbiAgICBvcHRzID0gT2JqZWN0LmFzc2lnbih7cmVxdWlyZWQ6IHRydWUsIGludGVnZXI6IGZhbHNlLCBtaW46IGZhbHNlLCBtYXg6IGZhbHNlfSwgb3B0cyk7XG4gICAgbGV0IGdvb2QgPSBbXTtcbiAgICBsZXQgYmFkID0gW3RydWUsZmFsc2UsJycsJ3N0cmluZycsTmFOLG51bGwsW10sKCk9Pnt9LHt9XTtcbiAgICBjb25zdCB7bWluLCBtYXh9ID0gb3B0cztcblxuICAgIGlmIChtYXggPT09IGZhbHNlICYmIG1pbiA9PT0gZmFsc2UpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignQ2Fubm90IHRlc3QgZm9yIGEgbnVtYmVyIGluIHJhbmdlIHdpdGhvdXQgZWl0aGVyIGEgbWluIG9yIG1heCBvcHRpb24nKTtcbiAgICB9XG5cbiAgICBpZiAobWluICE9PSBmYWxzZSAmJiBtYXggIT09IGZhbHNlKSB7XG4gICAgICBpZiAobWluID4gbWF4KSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignQ2Fubm90IHRlc3QgZm9yIGEgbnVtYmVyIGluIHJhbmdlIHdoZW4gbWluID4gbWF4Jyk7XG4gICAgICB9XG4gICAgICBnb29kLnB1c2gobWluKTtcbiAgICAgIGdvb2QucHVzaChtYXgpO1xuICAgICAgYmFkLnB1c2gobWluIC0gMSk7XG4gICAgICBiYWQucHVzaChtYXggKyAxKTtcbiAgICAgIGlmIChvcHRzLmludGVnZXIpIHtcbiAgICAgICAgZ29vZC5wdXNoKE1hdGguZmxvb3IoKG1pbiArIG1heCkgLyAyKSk7XG4gICAgICAgIGJhZC5wdXNoKCgobWluICsgbWF4KSAvIDIpICsgMC4wMDAwMDAwMDAwMDEpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZ29vZC5wdXNoKCgobWluICsgbWF4KSAvIDIpICsgMC4wMDAwMDAwMDAwMSk7XG4gICAgICB9XG5cbiAgICB9IGVsc2UgIGlmIChtYXggIT09IGZhbHNlKSB7XG4gICAgICBnb29kLnB1c2gobWF4KTtcbiAgICAgIGJhZC5wdXNoKG1heCArIDEpO1xuICAgICAgaWYgKG9wdHMuaW50ZWdlcikge1xuICAgICAgICBnb29kLnB1c2gobWF4IC0gMSk7XG4gICAgICAgIGJhZC5wdXNoKG1heCAtIDEuMDAwMDAwMDAwMDAxKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGdvb2QucHVzaChtYXggLSAxLjAwMDAwMDAwMDAwMSk7XG4gICAgICB9XG5cbiAgICB9IGVsc2UgaWYgKG1pbiAhPT0gZmFsc2UpIHtcbiAgICAgIGdvb2QucHVzaChtaW4pO1xuICAgICAgYmFkLnB1c2gobWluIC0gMSk7XG4gICAgICBpZiAob3B0cy5pbnRlZ2VyKSB7XG4gICAgICAgIGdvb2QucHVzaChtaW4gKyAxKTtcbiAgICAgICAgYmFkLnB1c2gobWluICsgMC4wMDAwMDAwMDEpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZ29vZC5wdXNoKG1pbiArIDAuMDAwMDAwMDAxKTtcbiAgICAgIH1cblxuICAgIH1cblxuICAgIFRlc3RzLmdvb2RBbmRCYWQoZ29vZCwgYmFkLCB0ZXN0Rm4sIG9wdHMpO1xuICB9XG5cbiAgc3RhdGljIGZpZWxkSXNBTnVtYmVySW5SYW5nZShpbnB1dCwgZmllbGROYW1lLCB0ZXN0Rm4sIG9wdHM9e30pIHtcbiAgICBUZXN0cy5pc0FOdW1iZXJJblJhbmdlKGFzc2lnbkFuZFRlc3QoaW5wdXQsIGZpZWxkTmFtZSwgdGVzdEZuKSwgb3B0cyk7XG4gIH1cblxuICBzdGF0aWMgbWF0Y2hlc1RoZUNvbnRyYWN0KGZ1bmN0aW9ucywgdGVzdEZuLCBvcHRzPXt9KSB7XG4gICAgbGV0IGdvb2QgPSBbXTtcbiAgICBsZXQgYmFkID0gW3RydWUsMSwtMSwnc3RyaW5nJyxbXSwoKT0+e30sIHt9XTtcbiAgICAoe2dvb2QsIGJhZH0gPSBhbGxvd0ZhbHN5KGdvb2QsIGJhZCwgb3B0cy5hbGxvd0ZhbHN5KSk7XG5cbiAgICBsZXQgZ29vZE9iaiA9IHt9O1xuICAgIGlmIChBcnJheS5pc0FycmF5KGZ1bmN0aW9ucykpIHtcbiAgICAgIGZ1bmN0aW9ucy5mb3JFYWNoKGZuID0+IHtcbiAgICAgICAgZ29vZE9ialtmbl0gPSAoKSA9PiB7fTtcbiAgICAgIH0pO1xuICAgICAgbGV0IGZuO1xuICAgICAgd2hpbGUgKGZuID0gZnVuY3Rpb25zLnBvcCgpKSB7XG4gICAgICAgIGJhZC5wdXNoKG9taXQoZ29vZE9iaiwgZm4pKTtcbiAgICAgIH1cblxuICAgIH0gZWxzZSBpZiAodHlwZW9mIGZ1bmN0aW9ucyA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGdvb2RPYmpbZnVuY3Rpb25zXSA9ICgpID0+IHt9XG5cbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBmdW5jdGlvbnMgPT09ICdvYmplY3QnKSB7XG4gICAgICBjb25zdCBrZXlzID0gT2JqZWN0LmtleXMoZnVuY3Rpb25zKTtcbiAgICAgIGtleXMuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgICBnb29kT2JqW2tleV0gPSBmdW5jdGlvbnNba2V5XTtcbiAgICAgIH0pO1xuICAgICAgbGV0IGtleTtcbiAgICAgIHdoaWxlIChrZXkgPSBrZXlzLnBvcCgpKSB7XG4gICAgICAgIGJhZC5wdXNoKG9taXQoZ29vZE9iaiwga2V5KSk7XG4gICAgICB9XG5cbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgRXJyb3IoJ2JhZCBmdW5jdGlvbnMgZGVmaW5pdGlvbicsIGZ1bmN0aW9ucyk7XG4gICAgfVxuICAgIGdvb2QucHVzaChnb29kT2JqKTtcblxuICAgIFRlc3RzLmdvb2RBbmRCYWQoZ29vZCwgYmFkLCB0ZXN0Rm4sIG9wdHMpO1xuICB9XG5cbiAgc3RhdGljIGZpZWxkTWF0Y2hlc1RoZUNvbnRyYWN0KGlucHV0LCBmaWVsZCwgZnVuY3Rpb25zLCB0ZXN0Rm4sIG9wdHM9e30pIHtcbiAgICBUZXN0cy5tYXRjaGVzVGhlQ29udHJhY3QoZnVuY3Rpb25zLCBhc3NpZ25BbmRUZXN0KGlucHV0LCBmaWVsZCwgdGVzdEZuKSwgb3B0cyk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBUZXN0czsiXX0=