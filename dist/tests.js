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
    key: 'isAnArray',
    value: function isAnArray(testFn) {
      var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      var good = [[]];
      var bad = [true, 1, -1, 'string', {}, function () {}];

      Tests.goodAndBad(good, bad, testFn, opts);
    }
  }, {
    key: 'fieldIsAnArray',
    value: function fieldIsAnArray(input, field, testFn) {
      var opts = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

      Tests.isAnArray(assignAndTest(input, field, testFn), opts);
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

      if (opts.integer) {
        min = min !== false ? Math.ceil(min) : min;
        max = max !== false ? Math.floor(max) : max;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy90ZXN0cy5qcyJdLCJuYW1lcyI6WyJjaGFpIiwicmVxdWlyZSIsImV4cGVjdCIsImlzQUZ1bmN0aW9uIiwic2V0UHJvcCIsImdldFByb3AiLCJ1bnNldCIsIm9taXQiLCJtb21lbnQiLCJhc3luY1Rocm93cyIsInJlc29sdmUiLCJpbnB1dCIsInJlc29sdmVBcnJheSIsIkFycmF5IiwiaXNBcnJheSIsImFzc2lnblVuZGVmaW5lZCIsImdvb2QiLCJiYWQiLCJvcHRzIiwiYWxsb3dGYWxzeSIsInB1c2giLCJ1bmRlZmluZWQiLCJyZXF1aXJlZCIsImFzc2lnbkFuZFRlc3QiLCJmaWVsZE5hbWUiLCJ0ZXN0Rm4iLCJ2YWx1ZSIsImFsbG93Iiwib3B0aW9ucyIsImZhbHNpZXMiLCJub1plcm8iLCJub0ZhbHNlIiwibm9OdWxsIiwibm9FbXB0eVN0cmluZyIsIm5vTmFOIiwiTmFOIiwidGVzdEdvb2QiLCJmb3JFYWNoIiwibm90IiwidG8iLCJ0aHJvdyIsInRlc3RCYWQiLCJ0ZXN0R29vZEFzeW5jIiwiUHJvbWlzZSIsImFsbCIsIm1hcCIsInRlc3RCYWRBc3luYyIsIlRlc3RzIiwiZXhwZWN0ZWQiLCJ0ZXN0IiwiY2hlY2siLCJiZSIsInRydWUiLCJlcWwiLCJPYmplY3QiLCJhc3NpZ24iLCJhc3luYyIsIkVycm9yIiwidGhlbiIsImNhdGNoIiwiZSIsImdvb2RBbmRCYWQiLCJyb290IiwiZmllbGQiLCJsZW5ndGgiLCJpc0FuT2JqZWN0IiwiaXNBbkFycmF5IiwiYWxsb3dTdHJpbmdzIiwiaXNBQm9vbGVhbiIsInRlc3RTdHJpbmciLCJlbXB0eVN0cmluZyIsImlzQVN0cmluZyIsImVtcHR5QXJyYXkiLCJhbGxvd2VkIiwiRGF0ZSIsImlzVGhpc1N0cmluZyIsInRvSVNPU3RyaW5nIiwiaXNBRGF0ZVN0cmluZyIsImludGVnZXIiLCJwb3NpdGl2ZSIsIm5vbnplcm8iLCJtaW4iLCJtYXgiLCJpc0FOdW1iZXIiLCJNYXRoIiwiY2VpbCIsImZsb29yIiwiaXNBTnVtYmVySW5SYW5nZSIsImZ1bmN0aW9ucyIsImdvb2RPYmoiLCJmbiIsInBvcCIsImtleXMiLCJrZXkiLCJtYXRjaGVzVGhlQ29udHJhY3QiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7QUFDQSxJQUFNQSxPQUFPQyxRQUFRLE1BQVIsQ0FBYjtBQUNBLElBQU1DLFNBQVNGLEtBQUtFLE1BQXBCO0FBQ0EsSUFBTUMsY0FBY0YsUUFBUSxtQkFBUixDQUFwQjtBQUNBLElBQU1HLFVBQVVILFFBQVEsWUFBUixDQUFoQjtBQUNBLElBQU1JLFVBQVVKLFFBQVEsWUFBUixDQUFoQjtBQUNBLElBQU1LLFFBQVFMLFFBQVEsY0FBUixDQUFkO0FBQ0EsSUFBTU0sT0FBT04sUUFBUSxhQUFSLENBQWI7QUFDQSxJQUFNTyxTQUFTUCxRQUFRLFFBQVIsQ0FBZjs7ZUFFc0JBLFFBQVEsYUFBUixDO0lBQWZRLFcsWUFBQUEsVzs7QUFFUCxTQUFTQyxPQUFULENBQWlCQyxLQUFqQixFQUF3QjtBQUN0QixTQUFRUixZQUFZUSxLQUFaLENBQUQsR0FBdUJBLE9BQXZCLEdBQWlDQSxLQUF4QztBQUNEO0FBQ0QsU0FBU0MsWUFBVCxDQUFzQkQsS0FBdEIsRUFBNkI7QUFDM0IsU0FBUUUsTUFBTUMsT0FBTixDQUFjSixRQUFRQyxLQUFSLENBQWQsQ0FBRCxHQUFrQ0EsS0FBbEMsR0FBMEMsQ0FBQ0EsS0FBRCxDQUFqRDtBQUNEOztBQUVELFNBQVNJLGVBQVQsQ0FBeUJDLElBQXpCLEVBQStCQyxHQUEvQixFQUFvQ0MsSUFBcEMsRUFBMEM7QUFDeENGLFNBQU9KLGFBQWFJLElBQWIsQ0FBUDtBQUNBQyxRQUFNTCxhQUFhSyxHQUFiLENBQU47QUFDQSxNQUFJQyxLQUFLQyxVQUFULEVBQXFCO0FBQ25CSCxTQUFLSSxJQUFMLENBQVVDLFNBQVY7QUFDRCxHQUZELE1BRU8sSUFBSUgsS0FBS0ksUUFBVCxFQUFtQjtBQUN4QkwsUUFBSUcsSUFBSixDQUFTQyxTQUFUO0FBQ0Qs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TCxFQUFiLEVBQXlCO0FBQ3ZCMUUsY0FBSUcsSUFBSixDQUFTYixLQUFLa0YsT0FBTCxFQUFjSSxHQUFkLENBQVQ7QUFDRDtBQUVGLE9BVk0sTUFVQTtBQUNMLGNBQU1wQyxNQUFNLDBCQUFOLEVBQWtDK0IsU0FBbEMsQ0FBTjtBQUNEO0FBQ0R4RSxXQUFLSSxJQUFMLENBQVVxRSxPQUFWOztBQUVBMUMsWUFBTWMsVUFBTixDQUFpQjdDLElBQWpCLEVBQXVCQyxHQUF2QixFQUE0QlEsTUFBNUIsRUFBb0NQLElBQXBDO0FBQ0Q7Ozs0Q0FFOEJQLEssRUFBT29ELEssRUFBT3lCLFMsRUFBVy9ELE0sRUFBaUI7QUFBQSxVQUFUUCxJQUFTLHVFQUFKLEVBQUk7O0FBQ3ZFNkIsWUFBTStDLGtCQUFOLENBQXlCTixTQUF6QixFQUFvQ2pFLGNBQWNaLEtBQWQsRUFBcUJvRCxLQUFyQixFQUE0QnRDLE1BQTVCLENBQXBDLEVBQXlFUCxJQUF6RTtBQUNEOzs7Ozs7QUFHSDZFLE9BQU9DLE9BQVAsR0FBaUJqRCxLQUFqQiIsImZpbGUiOiJ0ZXN0cy5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcbmNvbnN0IGNoYWkgPSByZXF1aXJlKFwiY2hhaVwiKTtcbmNvbnN0IGV4cGVjdCA9IGNoYWkuZXhwZWN0O1xuY29uc3QgaXNBRnVuY3Rpb24gPSByZXF1aXJlKCdsb2Rhc2guaXNmdW5jdGlvbicpO1xuY29uc3Qgc2V0UHJvcCA9IHJlcXVpcmUoJ2xvZGFzaC5zZXQnKTtcbmNvbnN0IGdldFByb3AgPSByZXF1aXJlKCdsb2Rhc2guZ2V0Jyk7XG5jb25zdCB1bnNldCA9IHJlcXVpcmUoJ2xvZGFzaC51bnNldCcpO1xuY29uc3Qgb21pdCA9IHJlcXVpcmUoJ2xvZGFzaC5vbWl0Jyk7XG5jb25zdCBtb21lbnQgPSByZXF1aXJlKCdtb21lbnQnKTtcblxuY29uc3Qge2FzeW5jVGhyb3dzfSA9IHJlcXVpcmUoJy4vZnVuY3Rpb25zJyk7XG5cbmZ1bmN0aW9uIHJlc29sdmUoaW5wdXQpIHtcbiAgcmV0dXJuIChpc0FGdW5jdGlvbihpbnB1dCkpID8gaW5wdXQoKSA6IGlucHV0O1xufVxuZnVuY3Rpb24gcmVzb2x2ZUFycmF5KGlucHV0KSB7XG4gIHJldHVybiAoQXJyYXkuaXNBcnJheShyZXNvbHZlKGlucHV0KSkpID8gaW5wdXQgOiBbaW5wdXRdO1xufVxuXG5mdW5jdGlvbiBhc3NpZ25VbmRlZmluZWQoZ29vZCwgYmFkLCBvcHRzKSB7XG4gIGdvb2QgPSByZXNvbHZlQXJyYXkoZ29vZCk7XG4gIGJhZCA9IHJlc29sdmVBcnJheShiYWQpO1xuICBpZiAob3B0cy5hbGxvd0ZhbHN5KSB7XG4gICAgZ29vZC5wdXNoKHVuZGVmaW5lZCk7XG4gIH0gZWxzZSBpZiAob3B0cy5yZXF1aXJlZCkge1xuICAgIGJhZC5wdXNoKHVuZGVmaW5lZCk7XG4gIH0gZWxzZSB7XG4gICAgZ29vZC5wdXNoKHVuZGVmaW5lZCk7XG4gIH1cbiAgcmV0dXJuIFtnb29kLCBiYWRdO1xufVxuXG5mdW5jdGlvbiBhc3NpZ25BbmRUZXN0KGlucHV0LCBmaWVsZE5hbWUsIHRlc3RGbikge1xuICByZXR1cm4gdmFsdWUgPT4ge1xuICAgIHNldFByb3AoaW5wdXQsIGZpZWxkTmFtZSwgdmFsdWUpO1xuICAgIHRlc3RGbihpbnB1dCk7XG4gIH1cbn1cblxuZnVuY3Rpb24gYWxsb3dGYWxzeShnb29kLCBiYWQsIGFsbG93LCBvcHRpb25zPXt9KSB7XG4gIGNvbnN0IGZhbHNpZXMgPSBbXTtcbiAgaWYgKCFvcHRpb25zLm5vWmVybylcbiAgICBmYWxzaWVzLnB1c2goMCk7XG4gIGlmICghb3B0aW9ucy5ub0ZhbHNlKVxuICAgIGZhbHNpZXMucHVzaChmYWxzZSk7XG4gIGlmICghb3B0aW9ucy5ub051bGwpXG4gICAgZmFsc2llcy5wdXNoKG51bGwpO1xuICBpZiAoIW9wdGlvbnMubm9FbXB0eVN0cmluZylcbiAgICBmYWxzaWVzLnB1c2goJycpO1xuICBpZiAoIW9wdGlvbnMubm9OYU4pXG4gICAgZmFsc2llcy5wdXNoKE5hTik7XG5cbiAgaWYgKGFsbG93KSB7XG4gICAgZ29vZCA9IFsuLi5nb29kLCAuLi5mYWxzaWVzXTtcbiAgfSBlbHNlIHtcbiAgICBiYWQgPSBbLi4uYmFkLCAuLi5mYWxzaWVzXTtcbiAgfVxuICByZXR1cm4ge2dvb2QsIGJhZH07XG59XG5cbmZ1bmN0aW9uIHRlc3RHb29kKGdvb2QsIHRlc3RGbikge1xuICBnb29kLmZvckVhY2goZ29vZCA9PiB7XG4gICAgZXhwZWN0KCgpID0+IHRlc3RGbihnb29kKSkubm90LnRvLnRocm93KCk7XG4gIH0pO1xufVxuZnVuY3Rpb24gdGVzdEJhZChiYWQsIHRlc3RGbikge1xuICBiYWQuZm9yRWFjaChiYWQgPT4ge1xuICAgIGV4cGVjdCgoKSA9PiB0ZXN0Rm4oYmFkKSkudG8udGhyb3coKTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIHRlc3RHb29kQXN5bmMoZ29vZCwgdGVzdEZuKSB7XG4gIHJldHVybiBQcm9taXNlLmFsbChnb29kLm1hcChhc3luYyBnb29kID0+IHtcbiAgICByZXR1cm4gYXdhaXQgYXN5bmNUaHJvd3MoYXN5bmMgKCkgPT4gYXdhaXQgdGVzdEZuKGdvb2QpLCB0cnVlKTtcbiAgfSkpXG59XG5mdW5jdGlvbiB0ZXN0QmFkQXN5bmMoYmFkLCB0ZXN0Rm4pIHtcbiAgcmV0dXJuIFByb21pc2UuYWxsKGJhZC5tYXAoYXN5bmMgYmFkID0+IHtcbiAgICByZXR1cm4gYXdhaXQgYXN5bmNUaHJvd3MoYXN5bmMgKCkgPT4gYXdhaXQgdGVzdEZuKGJhZCkpO1xuICB9KSk7XG59XG5cblxuXG5jbGFzcyBUZXN0cyB7XG5cbiAgc3RhdGljIGRlZmF1bHRzRmllbGQoaW5wdXQsIGZpZWxkTmFtZSwgZXhwZWN0ZWQsIHRlc3QpIHtcbiAgICBsZXQgY2hlY2s7XG4gICAgaWYgKHR5cGVvZiBleHBlY3RlZCA9PSAnZnVuY3Rpb24nKSB7XG4gICAgICBjaGVjayA9IChpbnB1dCkgPT4gZXhwZWN0KGV4cGVjdGVkKGdldFByb3AodGVzdChpbnB1dCksIGZpZWxkTmFtZSkpKS50by5iZS50cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICBjaGVjayA9IChpbnB1dCkgPT4gZXhwZWN0KGdldFByb3AodGVzdChpbnB1dCksIGZpZWxkTmFtZSkpLmVxbChleHBlY3RlZCk7XG4gICAgfVxuXG4gICAgc2V0UHJvcChpbnB1dCwgZmllbGROYW1lLCB1bmRlZmluZWQpO1xuICAgIGNoZWNrKGlucHV0KTtcblxuICAgIHVuc2V0KGlucHV0LCBmaWVsZE5hbWUpO1xuICAgIGNoZWNrKGlucHV0KTtcbiAgfVxuXG4gIHN0YXRpYyBnb29kQW5kQmFkKGdvb2QsIGJhZCwgdGVzdEZuLCBvcHRzPXt9KSB7XG4gICAgb3B0cyA9IE9iamVjdC5hc3NpZ24oe3JlcXVpcmVkOiB0cnVlfSwgb3B0cyk7XG4gICAgKFtnb29kLCBiYWRdID0gYXNzaWduVW5kZWZpbmVkKGdvb2QsIGJhZCwgb3B0cykpO1xuXG4gICAgaWYgKG9wdHMuYXN5bmMpIHtcbiAgICAgIGlmICh0eXBlb2Ygb3B0cy5hc3luYyAhPT0gJ2Z1bmN0aW9uJylcbiAgICAgICAgdGhyb3cgRXJyb3IoJ29wdHMuYXN5bmMgbXVzdCBiZSBhIGZ1bmN0aW9uJyk7XG4gICAgICBQcm9taXNlLmFsbChbXG4gICAgICAgIHRlc3RHb29kQXN5bmMoZ29vZCwgdGVzdEZuKSxcbiAgICAgICAgdGVzdEJhZEFzeW5jKGJhZCwgdGVzdEZuKVxuICAgICAgXSkudGhlbigoKSA9PiBvcHRzLmFzeW5jKCkpLmNhdGNoKGUgPT4gb3B0cy5hc3luYyhlKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRlc3RHb29kKGdvb2QsIHRlc3RGbik7XG4gICAgICB0ZXN0QmFkKGJhZCwgdGVzdEZuKTtcbiAgICB9XG4gIH1cblxuICBzdGF0aWMgZ29vZEFuZEJhZEZpZWxkKGlucHV0LCBmaWVsZE5hbWUsIGdvb2QsIGJhZCwgdGVzdEZuLCBvcHRzPXt9KSB7XG4gICAgb3B0cyA9IE9iamVjdC5hc3NpZ24oe3JlcXVpcmVkOiB0cnVlfSwgb3B0cyk7XG4gICAgKFtnb29kLCBiYWRdID0gYXNzaWduVW5kZWZpbmVkKGdvb2QsIGJhZCwgb3B0cykpO1xuICAgIFRlc3RzLmdvb2RBbmRCYWQoZ29vZCwgYmFkLCBhc3NpZ25BbmRUZXN0KGlucHV0LCBmaWVsZE5hbWUsIHRlc3RGbiksIG9wdHMpO1xuICB9XG5cbiAgc3RhdGljIHJlcXVpcmVzRmllbGQoaW5wdXQsIGZpZWxkTmFtZSwgZ29vZCwgdGVzdEZuKSB7XG4gICAgaW5wdXQgPSByZXNvbHZlKGlucHV0KTtcbiAgICBzZXRQcm9wKGlucHV0LCBmaWVsZE5hbWUsIGdvb2QpO1xuICAgIGV4cGVjdCgoKSA9PiB0ZXN0Rm4oaW5wdXQpKS5ub3QudG8udGhyb3coKTtcbiAgICBzZXRQcm9wKGlucHV0LCBmaWVsZE5hbWUsIHVuZGVmaW5lZCk7XG4gICAgZXhwZWN0KCgpID0+IHRlc3RGbihpbnB1dCkpLnRvLnRocm93KCk7XG4gICAgdW5zZXQoaW5wdXQsIGZpZWxkTmFtZSk7XG4gICAgZXhwZWN0KCgpID0+IHRlc3RGbihpbnB1dCkpLnRvLnRocm93KCk7XG4gIH1cblxuICBzdGF0aWMgYWxsb3dzQWRkaXRpb25hbEZpZWxkcyhpbnB1dCwgdGVzdEZuLCBvcHRzPXt9KSB7XG4gICAgb3B0cyA9IE9iamVjdC5hc3NpZ24oe3Jvb3Q6ICcnLCB2YWx1ZTogdHJ1ZX0sIG9wdHMpO1xuICAgIGNvbnN0IGZpZWxkID0gKG9wdHMucm9vdC5sZW5ndGgpID8gYCR7b3B0cy5yb290fS5hc2tkaGFza2RoYXNkYWtzaGRramFzaGRramFzaGRramFzZGhgIDogJ2Fza2RoYXNrZGhhc2Rha3NoZGtqYXNoZGtqYXNoZGtqYXNkaCc7XG4gICAgc2V0UHJvcChpbnB1dCwgZmllbGQsIG9wdHMudmFsdWUpO1xuICAgIGV4cGVjdCgoKSA9PiB0ZXN0Rm4oaW5wdXQpKS5ub3QudG8udGhyb3coKTtcbiAgfVxuXG4gIHN0YXRpYyBpc0FuT2JqZWN0KHRlc3RGbiwgb3B0cz17fSkge1xuICAgIGxldCBnb29kID0gW3t9XTtcbiAgICBsZXQgYmFkID0gW3RydWUsMSwtMSwnc3RyaW5nJyxbXSwoKT0+e31dO1xuICAgICh7Z29vZCwgYmFkfSA9IGFsbG93RmFsc3koZ29vZCwgYmFkLCBvcHRzLmFsbG93RmFsc3kpKTtcblxuICAgIFRlc3RzLmdvb2RBbmRCYWQoZ29vZCwgYmFkLCB0ZXN0Rm4sIG9wdHMpO1xuICB9XG4gIFxuICBzdGF0aWMgZmllbGRJc0FuT2JqZWN0KGlucHV0LCBmaWVsZE5hbWUsIHRlc3RGbiwgb3B0cz17fSkge1xuICAgIFRlc3RzLmlzQW5PYmplY3QoYXNzaWduQW5kVGVzdChpbnB1dCwgZmllbGROYW1lLCB0ZXN0Rm4pLCBvcHRzKTtcbiAgfVxuXG4gIHN0YXRpYyBpc0FuQXJyYXkodGVzdEZuLCBvcHRzPXt9KSB7XG4gICAgbGV0IGdvb2QgPVtbXV07XG4gICAgbGV0IGJhZCA9IFt0cnVlLDEsLTEsJ3N0cmluZycse30sKCk9Pnt9XTtcblxuICAgIFRlc3RzLmdvb2RBbmRCYWQoZ29vZCwgYmFkLCB0ZXN0Rm4sIG9wdHMpO1xuICB9XG5cbiAgc3RhdGljIGZpZWxkSXNBbkFycmF5KGlucHV0LCBmaWVsZCwgdGVzdEZuLCBvcHRzPXt9KSB7XG4gICAgVGVzdHMuaXNBbkFycmF5KGFzc2lnbkFuZFRlc3QoaW5wdXQsIGZpZWxkLCB0ZXN0Rm4pLCBvcHRzKTtcbiAgfVxuXG4gIHN0YXRpYyBpc0FGdW5jdGlvbih0ZXN0Rm4sIG9wdHM9e30pIHtcbiAgICBsZXQgZ29vZCA9IFsoKT0+e31dO1xuICAgIGxldCBiYWQgPSBbdHJ1ZSxmYWxzZSwwLDEsLTEsJycsJ3N0cmluZycsTmFOLG51bGwsW10se31dO1xuXG4gICAgVGVzdHMuZ29vZEFuZEJhZChnb29kLCBiYWQsIHRlc3RGbiwgb3B0cyk7XG4gIH1cblxuICBzdGF0aWMgZmllbGRJc0FGdW5jdGlvbihpbnB1dCwgZmllbGQsIHRlc3RGbiwgb3B0cz17fSkge1xuICAgIFRlc3RzLmlzQUZ1bmN0aW9uKGFzc2lnbkFuZFRlc3QoaW5wdXQsIGZpZWxkLCB0ZXN0Rm4pLCBvcHRzKTtcbiAgfVxuXG4gIHN0YXRpYyBpc0FCb29sZWFuKHRlc3QsIG9wdHM9e30pIHtcbiAgICBvcHRzID0gT2JqZWN0LmFzc2lnbih7cmVxdWlyZWQ6IHRydWUsIGFsbG93U3RyaW5nczogZmFsc2V9LCBvcHRzKTtcblxuICAgIGxldCBnb29kID0gW3RydWUsIGZhbHNlXTtcbiAgICBsZXQgYmFkID0gWzAsMSwtMSwnJywnc3RyaW5nJyxOYU4sbnVsbCxbXSwoKT0+e30se31dO1xuICAgIGlmIChvcHRzLmFsbG93U3RyaW5ncykge1xuICAgICAgZ29vZCA9IFsuLi5nb29kLCAndHJ1ZScsICdmYWxzZSddO1xuICAgIH0gZWxzZSB7XG4gICAgICBiYWQgPSBbLi4uYmFkLCAndHJ1ZScsICdmYWxzZSddO1xuICAgIH1cblxuICAgIFRlc3RzLmdvb2RBbmRCYWQoZ29vZCwgYmFkLCB0ZXN0LCBvcHRzKTtcbiAgfVxuXG4gIHN0YXRpYyBmaWVsZElzQUJvb2xlYW4oaW5wdXQsIGZpZWxkTmFtZSwgdGVzdEZuLCBvcHRzPXt9KSB7XG4gICAgVGVzdHMuaXNBQm9vbGVhbihhc3NpZ25BbmRUZXN0KGlucHV0LCBmaWVsZE5hbWUsIHRlc3RGbiksIG9wdHMpO1xuICB9XG5cbiAgc3RhdGljIGlzQVN0cmluZyh0ZXN0Rm4sIG9wdHM9e30pIHtcbiAgICBvcHRzID0gT2JqZWN0LmFzc2lnbih7cmVxdWlyZWQ6IHRydWUsIHRlc3RTdHJpbmc6ICdzdHJpbmcnLCBlbXB0eVN0cmluZzogZmFsc2V9LCBvcHRzKTtcblxuICAgIGxldCBnb29kID0gW29wdHMudGVzdFN0cmluZ107XG4gICAgbGV0IGJhZCA9IFsxLHRydWUsW10sKCk9Pnt9LHt9XTtcbiAgICAoe2dvb2QsIGJhZH0gPSBhbGxvd0ZhbHN5KGdvb2QsIGJhZCwgb3B0cy5hbGxvd0ZhbHN5LCB7bm9FbXB0eVN0cmluZzogdHJ1ZX0pKTtcbiAgICBpZiAob3B0cy5lbXB0eVN0cmluZyB8fCBvcHRzLmFsbG93RmFsc3kpIHtcbiAgICAgIGdvb2QucHVzaCgnJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGJhZC5wdXNoKCcnKTtcbiAgICB9XG5cbiAgICBUZXN0cy5nb29kQW5kQmFkKGdvb2QsIGJhZCwgdGVzdEZuLCBvcHRzKTtcbiAgfVxuXG4gIHN0YXRpYyBmaWVsZElzQVN0cmluZyhpbnB1dCwgZmllbGROYW1lLCB0ZXN0Rm4sIG9wdHM9e30pIHtcbiAgICBUZXN0cy5pc0FTdHJpbmcoYXNzaWduQW5kVGVzdChpbnB1dCwgZmllbGROYW1lLCB0ZXN0Rm4pLCBvcHRzKTtcbiAgfVxuXG4gIHN0YXRpYyBpc0FTdHJpbmdPclN0cmluZ0FycmF5KHRlc3RGbiwgb3B0cz17fSkge1xuICAgIG9wdHMgPSBPYmplY3QuYXNzaWduKHtyZXF1aXJlZDogdHJ1ZSwgdGVzdFN0cmluZzogJ3N0cmluZycsIGVtcHR5QXJyYXk6IGZhbHNlLCBlbXB0eVN0cmluZzogZmFsc2V9LCBvcHRzKTtcblxuICAgIGxldCBnb29kID0gW29wdHMudGVzdFN0cmluZywgW29wdHMudGVzdFN0cmluZ11dO1xuICAgIGxldCBiYWQgPSBbMSx0cnVlLCgpPT57fSx7fV07XG4gICAgaWYgKG9wdHMuZW1wdHlBcnJheSkge1xuICAgICAgZ29vZC5wdXNoKFtdKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYmFkLnB1c2goW10pO1xuICAgIH1cbiAgICAoe2dvb2QsIGJhZH0gPSBhbGxvd0ZhbHN5KGdvb2QsIGJhZCwgb3B0cy5hbGxvd0ZhbHN5LCB7bm9FbXB0eVN0cmluZzogdHJ1ZX0pKTtcbiAgICBpZiAob3B0cy5lbXB0eVN0cmluZyB8fCBvcHRzLmFsbG93RmFsc3kpIHtcbiAgICAgIGdvb2QucHVzaCgnJyk7XG4gICAgICBnb29kLnB1c2goWycnXSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGJhZC5wdXNoKCcnKTtcbiAgICAgIGJhZC5wdXNoKFsnJ10pO1xuICAgIH1cblxuICAgIFRlc3RzLmdvb2RBbmRCYWQoZ29vZCwgYmFkLCB0ZXN0Rm4sIG9wdHMpO1xuICB9XG5cbiAgc3RhdGljIGZpZWxkSXNBU3RyaW5nT3JTdHJpbmdBcnJheShpbnB1dCwgZmllbGROYW1lLCB0ZXN0Rm4sIG9wdHM9e30pIHtcbiAgICBUZXN0cy5pc0FTdHJpbmcoYXNzaWduQW5kVGVzdChpbnB1dCwgZmllbGROYW1lLCB0ZXN0Rm4pLCBvcHRzKTtcbiAgfVxuXG5cbiAgc3RhdGljIGlzVGhpc1N0cmluZyhhbGxvd2VkLCB0ZXN0Rm4sIG9wdHM9e30pIHtcbiAgICBsZXQgZ29vZCA9IHJlc29sdmVBcnJheShhbGxvd2VkKTtcbiAgICBvcHRzID0gT2JqZWN0LmFzc2lnbih7cmVxdWlyZWQ6IHRydWV9LCBvcHRzKTtcbiAgICBsZXQgYmFkID0gWzEsJ3N0cmluZycsdHJ1ZSxbXSwoKT0+e30se30sbmV3IERhdGUoKV07XG4gICAgKHtnb29kLCBiYWR9ID0gYWxsb3dGYWxzeShnb29kLCBiYWQsIG9wdHMuYWxsb3dGYWxzeSkpO1xuICAgIFRlc3RzLmdvb2RBbmRCYWQoZ29vZCwgYmFkLCB0ZXN0Rm4sIG9wdHMpO1xuICB9XG5cbiAgc3RhdGljIGZpZWxkSXNUaGlzU3RyaW5nKGlucHV0LCBmaWVsZE5hbWUsIGFsbG93ZWQsIHRlc3RGbiwgb3B0cz17fSkge1xuICAgIFRlc3RzLmlzVGhpc1N0cmluZyhhbGxvd2VkLCBhc3NpZ25BbmRUZXN0KGlucHV0LCBmaWVsZE5hbWUsIHRlc3RGbiksIG9wdHMpO1xuICB9XG5cbiAgc3RhdGljIGlzQURhdGVTdHJpbmcodGVzdEZuLCBvcHRzPXt9KSB7XG4gICAgb3B0cyA9IE9iamVjdC5hc3NpZ24oe3JlcXVpcmVkOiB0cnVlLCBlbXB0eVN0cmluZzogZmFsc2V9LCBvcHRzKTtcbiAgICBsZXQgZ29vZCA9IFttb21lbnQoKS50b0lTT1N0cmluZygpXTtcbiAgICBsZXQgYmFkID0gWzEsJ3N0cmluZycsdHJ1ZSxbXSwoKT0+e30se30sbmV3IERhdGUoKSxtb21lbnQoKV07XG4gICAgKHtnb29kLCBiYWR9ID0gYWxsb3dGYWxzeShnb29kLCBiYWQsIG9wdHMuYWxsb3dGYWxzeSwge25vRW1wdHlTdHJpbmc6IHRydWV9KSk7XG4gICAgaWYgKG9wdHMuZW1wdHlTdHJpbmcgfHwgb3B0cy5hbGxvd0ZhbHN5KSB7XG4gICAgICBnb29kLnB1c2goJycpO1xuICAgIH0gZWxzZSB7XG4gICAgICBiYWQucHVzaCgnJyk7XG4gICAgfVxuICAgIFRlc3RzLmdvb2RBbmRCYWQoZ29vZCwgYmFkLCB0ZXN0Rm4sIG9wdHMpO1xuICB9XG5cbiAgc3RhdGljIGZpZWxkSXNBRGF0ZVN0cmluZyhpbnB1dCwgZmllbGROYW1lLCB0ZXN0Rm4sIG9wdHM9e30pIHtcbiAgICBUZXN0cy5pc0FEYXRlU3RyaW5nKGFzc2lnbkFuZFRlc3QoaW5wdXQsIGZpZWxkTmFtZSwgdGVzdEZuKSwgb3B0cyk7XG4gIH1cblxuXG4gIHN0YXRpYyBpc0FOdW1iZXIodGVzdEZuLCBvcHRzPXt9KSB7XG4gICAgb3B0cyA9IE9iamVjdC5hc3NpZ24oe3JlcXVpcmVkOiB0cnVlLCBpbnRlZ2VyOiBmYWxzZSwgcG9zaXRpdmU6IGZhbHNlLCBub256ZXJvOiBmYWxzZSwgbWluOiBmYWxzZSwgbWF4OiBmYWxzZX0sIG9wdHMpO1xuXG4gICAgbGV0IGdvb2QgPSBbXTtcbiAgICBsZXQgYmFkID0gW3RydWUsZmFsc2UsJycsJ3N0cmluZycsTmFOLG51bGwsW10sKCk9Pnt9LHt9XTtcblxuXG4gICAgZ29vZC5wdXNoKDEpO1xuICAgIGdvb2QucHVzaCgnMScpO1xuXG4gICAgaWYgKG9wdHMubm9uemVybykge1xuICAgICAgYmFkLnB1c2goMCk7XG4gICAgICBiYWQucHVzaCgnMCcpO1xuICAgIH0gZWxzZSB7XG4gICAgICBnb29kLnB1c2goMCk7XG4gICAgICBnb29kLnB1c2goJzAnKTtcbiAgICB9XG5cbiAgICBpZiAob3B0cy5pbnRlZ2VyKSB7XG4gICAgICBiYWQucHVzaCgxLjEpO1xuICAgICAgYmFkLnB1c2goJzEuMScpO1xuICAgIH0gZWxzZSB7XG4gICAgICBnb29kLnB1c2goMS4xKTtcbiAgICAgIGdvb2QucHVzaCgnMS4xJyk7XG4gICAgfVxuXG4gICAgaWYgKG9wdHMucG9zaXRpdmUpIHtcbiAgICAgIGJhZC5wdXNoKC0xKTtcbiAgICAgIGJhZC5wdXNoKCctMScpO1xuICAgIH0gZWxzZSB7XG4gICAgICBnb29kLnB1c2goLTEpO1xuICAgICAgZ29vZC5wdXNoKCctMScpO1xuICAgIH1cblxuICAgIFRlc3RzLmdvb2RBbmRCYWQoZ29vZCwgYmFkLCB0ZXN0Rm4sIG9wdHMpO1xuICB9XG5cbiAgc3RhdGljIGZpZWxkSXNBTnVtYmVyKGlucHV0LCBmaWVsZE5hbWUsIHRlc3RGbiwgb3B0cz17fSkge1xuICAgIFRlc3RzLmlzQU51bWJlcihhc3NpZ25BbmRUZXN0KGlucHV0LCBmaWVsZE5hbWUsIHRlc3RGbiksIG9wdHMpO1xuICB9XG5cblxuXG4gIHN0YXRpYyBpc0FOdW1iZXJJblJhbmdlKHRlc3RGbiwgb3B0cz17fSkge1xuICAgIG9wdHMgPSBPYmplY3QuYXNzaWduKHtyZXF1aXJlZDogdHJ1ZSwgaW50ZWdlcjogZmFsc2UsIG1pbjogZmFsc2UsIG1heDogZmFsc2V9LCBvcHRzKTtcbiAgICBsZXQgZ29vZCA9IFtdO1xuICAgIGxldCBiYWQgPSBbdHJ1ZSxmYWxzZSwnJywnc3RyaW5nJyxOYU4sbnVsbCxbXSwoKT0+e30se31dO1xuICAgIGxldCB7bWluLCBtYXh9ID0gb3B0cztcblxuICAgIGlmIChtYXggPT09IGZhbHNlICYmIG1pbiA9PT0gZmFsc2UpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignQ2Fubm90IHRlc3QgZm9yIGEgbnVtYmVyIGluIHJhbmdlIHdpdGhvdXQgZWl0aGVyIGEgbWluIG9yIG1heCBvcHRpb24nKTtcbiAgICB9XG5cbiAgICBpZiAob3B0cy5pbnRlZ2VyKSB7XG4gICAgICBtaW4gPSAobWluICE9PSBmYWxzZSkgPyBNYXRoLmNlaWwobWluKSA6IG1pbjtcbiAgICAgIG1heCA9IChtYXggIT09IGZhbHNlKSA/IE1hdGguZmxvb3IobWF4KSA6IG1heDtcbiAgICB9XG5cbiAgICBpZiAobWluICE9PSBmYWxzZSAmJiBtYXggIT09IGZhbHNlKSB7XG4gICAgICBpZiAobWluID4gbWF4KSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignQ2Fubm90IHRlc3QgZm9yIGEgbnVtYmVyIGluIHJhbmdlIHdoZW4gbWluID4gbWF4Jyk7XG4gICAgICB9XG4gICAgICBnb29kLnB1c2gobWluKTtcbiAgICAgIGdvb2QucHVzaChtYXgpO1xuICAgICAgYmFkLnB1c2gobWluIC0gMSk7XG4gICAgICBiYWQucHVzaChtYXggKyAxKTtcbiAgICAgIGlmIChvcHRzLmludGVnZXIpIHtcbiAgICAgICAgZ29vZC5wdXNoKE1hdGguZmxvb3IoKG1pbiArIG1heCkgLyAyKSk7XG4gICAgICAgIGJhZC5wdXNoKCgobWluICsgbWF4KSAvIDIpICsgMC4wMDAwMDAwMDAwMDEpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZ29vZC5wdXNoKCgobWluICsgbWF4KSAvIDIpICsgMC4wMDAwMDAwMDAwMSk7XG4gICAgICB9XG5cbiAgICB9IGVsc2UgIGlmIChtYXggIT09IGZhbHNlKSB7XG4gICAgICBnb29kLnB1c2gobWF4KTtcbiAgICAgIGJhZC5wdXNoKG1heCArIDEpO1xuICAgICAgaWYgKG9wdHMuaW50ZWdlcikge1xuICAgICAgICBnb29kLnB1c2gobWF4IC0gMSk7XG4gICAgICAgIGJhZC5wdXNoKG1heCAtIDEuMDAwMDAwMDAwMDAxKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGdvb2QucHVzaChtYXggLSAxLjAwMDAwMDAwMDAwMSk7XG4gICAgICB9XG5cbiAgICB9IGVsc2UgaWYgKG1pbiAhPT0gZmFsc2UpIHtcbiAgICAgIGdvb2QucHVzaChtaW4pO1xuICAgICAgYmFkLnB1c2gobWluIC0gMSk7XG4gICAgICBpZiAob3B0cy5pbnRlZ2VyKSB7XG4gICAgICAgIGdvb2QucHVzaChtaW4gKyAxKTtcbiAgICAgICAgYmFkLnB1c2gobWluICsgMC4wMDAwMDAwMDEpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZ29vZC5wdXNoKG1pbiArIDAuMDAwMDAwMDAxKTtcbiAgICAgIH1cblxuICAgIH1cblxuICAgIFRlc3RzLmdvb2RBbmRCYWQoZ29vZCwgYmFkLCB0ZXN0Rm4sIG9wdHMpO1xuICB9XG5cbiAgc3RhdGljIGZpZWxkSXNBTnVtYmVySW5SYW5nZShpbnB1dCwgZmllbGROYW1lLCB0ZXN0Rm4sIG9wdHM9e30pIHtcbiAgICBUZXN0cy5pc0FOdW1iZXJJblJhbmdlKGFzc2lnbkFuZFRlc3QoaW5wdXQsIGZpZWxkTmFtZSwgdGVzdEZuKSwgb3B0cyk7XG4gIH1cblxuICBzdGF0aWMgbWF0Y2hlc1RoZUNvbnRyYWN0KGZ1bmN0aW9ucywgdGVzdEZuLCBvcHRzPXt9KSB7XG4gICAgbGV0IGdvb2QgPSBbXTtcbiAgICBsZXQgYmFkID0gW3RydWUsMSwtMSwnc3RyaW5nJyxbXSwoKT0+e30sIHt9XTtcbiAgICAoe2dvb2QsIGJhZH0gPSBhbGxvd0ZhbHN5KGdvb2QsIGJhZCwgb3B0cy5hbGxvd0ZhbHN5KSk7XG5cbiAgICBsZXQgZ29vZE9iaiA9IHt9O1xuICAgIGlmIChBcnJheS5pc0FycmF5KGZ1bmN0aW9ucykpIHtcbiAgICAgIGZ1bmN0aW9ucy5mb3JFYWNoKGZuID0+IHtcbiAgICAgICAgZ29vZE9ialtmbl0gPSAoKSA9PiB7fTtcbiAgICAgIH0pO1xuICAgICAgbGV0IGZuO1xuICAgICAgd2hpbGUgKGZuID0gZnVuY3Rpb25zLnBvcCgpKSB7XG4gICAgICAgIGJhZC5wdXNoKG9taXQoZ29vZE9iaiwgZm4pKTtcbiAgICAgIH1cblxuICAgIH0gZWxzZSBpZiAodHlwZW9mIGZ1bmN0aW9ucyA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGdvb2RPYmpbZnVuY3Rpb25zXSA9ICgpID0+IHt9XG5cbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBmdW5jdGlvbnMgPT09ICdvYmplY3QnKSB7XG4gICAgICBjb25zdCBrZXlzID0gT2JqZWN0LmtleXMoZnVuY3Rpb25zKTtcbiAgICAgIGtleXMuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgICBnb29kT2JqW2tleV0gPSBmdW5jdGlvbnNba2V5XTtcbiAgICAgIH0pO1xuICAgICAgbGV0IGtleTtcbiAgICAgIHdoaWxlIChrZXkgPSBrZXlzLnBvcCgpKSB7XG4gICAgICAgIGJhZC5wdXNoKG9taXQoZ29vZE9iaiwga2V5KSk7XG4gICAgICB9XG5cbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgRXJyb3IoJ2JhZCBmdW5jdGlvbnMgZGVmaW5pdGlvbicsIGZ1bmN0aW9ucyk7XG4gICAgfVxuICAgIGdvb2QucHVzaChnb29kT2JqKTtcblxuICAgIFRlc3RzLmdvb2RBbmRCYWQoZ29vZCwgYmFkLCB0ZXN0Rm4sIG9wdHMpO1xuICB9XG5cbiAgc3RhdGljIGZpZWxkTWF0Y2hlc1RoZUNvbnRyYWN0KGlucHV0LCBmaWVsZCwgZnVuY3Rpb25zLCB0ZXN0Rm4sIG9wdHM9e30pIHtcbiAgICBUZXN0cy5tYXRjaGVzVGhlQ29udHJhY3QoZnVuY3Rpb25zLCBhc3NpZ25BbmRUZXN0KGlucHV0LCBmaWVsZCwgdGVzdEZuKSwgb3B0cyk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBUZXN0czsiXX0=