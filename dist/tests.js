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

      var good = [opts.example || {}];
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

      var good = [opts.example || []];
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

      var good = [opts.example || function () {}];
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy90ZXN0cy5qcyJdLCJuYW1lcyI6WyJjaGFpIiwicmVxdWlyZSIsImV4cGVjdCIsImlzQUZ1bmN0aW9uIiwic2V0UHJvcCIsImdldFByb3AiLCJ1bnNldCIsIm9taXQiLCJtb21lbnQiLCJhc3luY1Rocm93cyIsInJlc29sdmUiLCJpbnB1dCIsInJlc29sdmVBcnJheSIsIkFycmF5IiwiaXNBcnJheSIsImFzc2lnblVuZGVmaW5lZCIsImdvb2QiLCJiYWQiLCJvcHRzIiwiYWxsb3dGYWxzeSIsInB1c2giLCJ1bmRlZmluZWQiLCJyZXF1aXJlZCIsImFzc2lnbkFuZFRlc3QiLCJmaWVsZE5hbWUiLCJ0ZXN0Rm4iLCJ2YWx1ZSIsImFsbG93Iiwib3B0aW9ucyIsImZhbHNpZXMiLCJub1plcm8iLCJub0ZhbHNlIiwibm9OdWxsIiwibm9FbXB0eVN0cmluZyIsIm5vTmFOIiwiTmFOIiwidGVzdEdvb2QiLCJmb3JFYWNoIiwibm90IiwidG8iLCJ0aHJvdyIsInRlc3RCYWQiLCJ0ZXN0R29vZEFzeW5jIiwiUHJvbWlzZSIsImFsbCIsIm1hcCIsInRlc3RCYWRBc3luYyIsIlRlc3RzIiwiZXhwZWN0ZWQiLCJ0ZXN0IiwiY2hlY2siLCJiZSIsInRydWUiLCJlcWwiLCJPYmplY3QiLCJhc3NpZ24iLCJhc3luYyIsIkVycm9yIiwidGhlbiIsImNhdGNoIiwiZSIsImdvb2RBbmRCYWQiLCJyb290IiwiZmllbGQiLCJsZW5ndGgiLCJleGFtcGxlIiwiaXNBbk9iamVjdCIsImlzQW5BcnJheSIsImFsbG93U3RyaW5ncyIsImlzQUJvb2xlYW4iLCJ0ZXN0U3RyaW5nIiwiZW1wdHlTdHJpbmciLCJpc0FTdHJpbmciLCJlbXB0eUFycmF5IiwiYWxsb3dlZCIsIkRhdGUiLCJpc1RoaXNTdHJpbmciLCJ0b0lTT1N0cmluZyIsImlzQURhdGVTdHJpbmciLCJpbnRlZ2VyIiwicG9zaXRpdmUiLCJub256ZXJvIiwibWluIiwibWF4IiwiaXNBTnVtYmVyIiwiTWF0aCIsImNlaWwiLCJmbG9vciIsImlzQU51bWJlckluUmFuZ2UiLCJmdW5jdGlvbnMiLCJnb29kT2JqIiwiZm4iLCJwb3AiLCJrZXlzIiwia2V5IiwibWF0Y2hlc1RoZUNvbnRyYWN0IiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7O0FBQ0EsSUFBTUEsT0FBT0MsUUFBUSxNQUFSLENBQWI7QUFDQSxJQUFNQyxTQUFTRixLQUFLRSxNQUFwQjtBQUNBLElBQU1DLGNBQWNGLFFBQVEsbUJBQVIsQ0FBcEI7QUFDQSxJQUFNRyxVQUFVSCxRQUFRLFlBQVIsQ0FBaEI7QUFDQSxJQUFNSSxVQUFVSixRQUFRLFlBQVIsQ0FBaEI7QUFDQSxJQUFNSyxRQUFRTCxRQUFRLGNBQVIsQ0FBZDtBQUNBLElBQU1NLE9BQU9OLFFBQVEsYUFBUixDQUFiO0FBQ0EsSUFBTU8sU0FBU1AsUUFBUSxRQUFSLENBQWY7O2VBRXNCQSxRQUFRLGFBQVIsQztJQUFmUSxXLFlBQUFBLFc7O0FBRVAsU0FBU0MsT0FBVCxDQUFpQkMsS0FBakIsRUFBd0I7QUFDdEIsU0FBUVIsWUFBWVEsS0FBWixDQUFELEdBQXVCQSxPQUF2QixHQUFpQ0EsS0FBeEM7QUFDRDtBQUNELFNBQVNDLFlBQVQsQ0FBc0JELEtBQXRCLEVBQTZCO0FBQzNCLFNBQVFFLE1BQU1DLE9BQU4sQ0FBY0osUUFBUUMsS0FBUixDQUFkLENBQUQsR0FBa0NBLEtBQWxDLEdBQTBDLENBQUNBLEtBQUQsQ0FBakQ7QUFDRDs7QUFFRCxTQUFTSSxlQUFULENBQXlCQyxJQUF6QixFQUErQkMsR0FBL0IsRUFBb0NDLElBQXBDLEVBQTBDO0FBQ3hDRixTQUFPSixhQUFhSSxJQUFiLENBQVA7QUFDQUMsUUFBTUwsYUFBYUssR0FBYixDQUFOO0FBQ0EsTUFBSUMsS0FBS0MsVUFBVCxFQUFxQjtBQUNuQkgsU0FBS0ksSUFBTCxDQUFVQyxTQUFWO0FBQ0QsR0FGRCxNQUVPLElBQUlILEtBQUtJLFFBQVQsRUFBbUI7QUFDeEJMLFFBQUlHLElBQUosQ0FBU0Ms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QUFlTCxVQUFVSyxHQUFWLENBQWY7QUFDRCxTQUZEO0FBR0EsWUFBSUEsWUFBSjtBQUNBLGVBQU9BLE1BQU1ELEtBQUtELEdBQUwsRUFBYixFQUF5QjtBQUN2QjNFLGNBQUlHLElBQUosQ0FBU2IsS0FBS21GLE9BQUwsRUFBY0ksR0FBZCxDQUFUO0FBQ0Q7QUFFRixPQVZNLE1BVUE7QUFDTCxjQUFNckMsTUFBTSwwQkFBTixFQUFrQ2dDLFNBQWxDLENBQU47QUFDRDtBQUNEekUsV0FBS0ksSUFBTCxDQUFVc0UsT0FBVjs7QUFFQTNDLFlBQU1jLFVBQU4sQ0FBaUI3QyxJQUFqQixFQUF1QkMsR0FBdkIsRUFBNEJRLE1BQTVCLEVBQW9DUCxJQUFwQztBQUNEOzs7NENBRThCUCxLLEVBQU9vRCxLLEVBQU8wQixTLEVBQVdoRSxNLEVBQWlCO0FBQUEsVUFBVFAsSUFBUyx1RUFBSixFQUFJOztBQUN2RTZCLFlBQU1nRCxrQkFBTixDQUF5Qk4sU0FBekIsRUFBb0NsRSxjQUFjWixLQUFkLEVBQXFCb0QsS0FBckIsRUFBNEJ0QyxNQUE1QixDQUFwQyxFQUF5RVAsSUFBekU7QUFDRDs7Ozs7O0FBR0g4RSxPQUFPQyxPQUFQLEdBQWlCbEQsS0FBakIiLCJmaWxlIjoidGVzdHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5jb25zdCBjaGFpID0gcmVxdWlyZShcImNoYWlcIik7XG5jb25zdCBleHBlY3QgPSBjaGFpLmV4cGVjdDtcbmNvbnN0IGlzQUZ1bmN0aW9uID0gcmVxdWlyZSgnbG9kYXNoLmlzZnVuY3Rpb24nKTtcbmNvbnN0IHNldFByb3AgPSByZXF1aXJlKCdsb2Rhc2guc2V0Jyk7XG5jb25zdCBnZXRQcm9wID0gcmVxdWlyZSgnbG9kYXNoLmdldCcpO1xuY29uc3QgdW5zZXQgPSByZXF1aXJlKCdsb2Rhc2gudW5zZXQnKTtcbmNvbnN0IG9taXQgPSByZXF1aXJlKCdsb2Rhc2gub21pdCcpO1xuY29uc3QgbW9tZW50ID0gcmVxdWlyZSgnbW9tZW50Jyk7XG5cbmNvbnN0IHthc3luY1Rocm93c30gPSByZXF1aXJlKCcuL2Z1bmN0aW9ucycpO1xuXG5mdW5jdGlvbiByZXNvbHZlKGlucHV0KSB7XG4gIHJldHVybiAoaXNBRnVuY3Rpb24oaW5wdXQpKSA/IGlucHV0KCkgOiBpbnB1dDtcbn1cbmZ1bmN0aW9uIHJlc29sdmVBcnJheShpbnB1dCkge1xuICByZXR1cm4gKEFycmF5LmlzQXJyYXkocmVzb2x2ZShpbnB1dCkpKSA/IGlucHV0IDogW2lucHV0XTtcbn1cblxuZnVuY3Rpb24gYXNzaWduVW5kZWZpbmVkKGdvb2QsIGJhZCwgb3B0cykge1xuICBnb29kID0gcmVzb2x2ZUFycmF5KGdvb2QpO1xuICBiYWQgPSByZXNvbHZlQXJyYXkoYmFkKTtcbiAgaWYgKG9wdHMuYWxsb3dGYWxzeSkge1xuICAgIGdvb2QucHVzaCh1bmRlZmluZWQpO1xuICB9IGVsc2UgaWYgKG9wdHMucmVxdWlyZWQpIHtcbiAgICBiYWQucHVzaCh1bmRlZmluZWQpO1xuICB9IGVsc2Uge1xuICAgIGdvb2QucHVzaCh1bmRlZmluZWQpO1xuICB9XG4gIHJldHVybiBbZ29vZCwgYmFkXTtcbn1cblxuZnVuY3Rpb24gYXNzaWduQW5kVGVzdChpbnB1dCwgZmllbGROYW1lLCB0ZXN0Rm4pIHtcbiAgcmV0dXJuIHZhbHVlID0+IHtcbiAgICBzZXRQcm9wKGlucHV0LCBmaWVsZE5hbWUsIHZhbHVlKTtcbiAgICB0ZXN0Rm4oaW5wdXQpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGFsbG93RmFsc3koZ29vZCwgYmFkLCBhbGxvdywgb3B0aW9ucz17fSkge1xuICBjb25zdCBmYWxzaWVzID0gW107XG4gIGlmICghb3B0aW9ucy5ub1plcm8pXG4gICAgZmFsc2llcy5wdXNoKDApO1xuICBpZiAoIW9wdGlvbnMubm9GYWxzZSlcbiAgICBmYWxzaWVzLnB1c2goZmFsc2UpO1xuICBpZiAoIW9wdGlvbnMubm9OdWxsKVxuICAgIGZhbHNpZXMucHVzaChudWxsKTtcbiAgaWYgKCFvcHRpb25zLm5vRW1wdHlTdHJpbmcpXG4gICAgZmFsc2llcy5wdXNoKCcnKTtcbiAgaWYgKCFvcHRpb25zLm5vTmFOKVxuICAgIGZhbHNpZXMucHVzaChOYU4pO1xuXG4gIGlmIChhbGxvdykge1xuICAgIGdvb2QgPSBbLi4uZ29vZCwgLi4uZmFsc2llc107XG4gIH0gZWxzZSB7XG4gICAgYmFkID0gWy4uLmJhZCwgLi4uZmFsc2llc107XG4gIH1cbiAgcmV0dXJuIHtnb29kLCBiYWR9O1xufVxuXG5mdW5jdGlvbiB0ZXN0R29vZChnb29kLCB0ZXN0Rm4pIHtcbiAgZ29vZC5mb3JFYWNoKGdvb2QgPT4ge1xuICAgIGV4cGVjdCgoKSA9PiB0ZXN0Rm4oZ29vZCkpLm5vdC50by50aHJvdygpO1xuICB9KTtcbn1cbmZ1bmN0aW9uIHRlc3RCYWQoYmFkLCB0ZXN0Rm4pIHtcbiAgYmFkLmZvckVhY2goYmFkID0+IHtcbiAgICBleHBlY3QoKCkgPT4gdGVzdEZuKGJhZCkpLnRvLnRocm93KCk7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiB0ZXN0R29vZEFzeW5jKGdvb2QsIHRlc3RGbikge1xuICByZXR1cm4gUHJvbWlzZS5hbGwoZ29vZC5tYXAoYXN5bmMgZ29vZCA9PiB7XG4gICAgcmV0dXJuIGF3YWl0IGFzeW5jVGhyb3dzKGFzeW5jICgpID0+IGF3YWl0IHRlc3RGbihnb29kKSwgdHJ1ZSk7XG4gIH0pKVxufVxuZnVuY3Rpb24gdGVzdEJhZEFzeW5jKGJhZCwgdGVzdEZuKSB7XG4gIHJldHVybiBQcm9taXNlLmFsbChiYWQubWFwKGFzeW5jIGJhZCA9PiB7XG4gICAgcmV0dXJuIGF3YWl0IGFzeW5jVGhyb3dzKGFzeW5jICgpID0+IGF3YWl0IHRlc3RGbihiYWQpKTtcbiAgfSkpO1xufVxuXG5cblxuY2xhc3MgVGVzdHMge1xuXG4gIHN0YXRpYyBkZWZhdWx0c0ZpZWxkKGlucHV0LCBmaWVsZE5hbWUsIGV4cGVjdGVkLCB0ZXN0KSB7XG4gICAgbGV0IGNoZWNrO1xuICAgIGlmICh0eXBlb2YgZXhwZWN0ZWQgPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgY2hlY2sgPSAoaW5wdXQpID0+IGV4cGVjdChleHBlY3RlZChnZXRQcm9wKHRlc3QoaW5wdXQpLCBmaWVsZE5hbWUpKSkudG8uYmUudHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgY2hlY2sgPSAoaW5wdXQpID0+IGV4cGVjdChnZXRQcm9wKHRlc3QoaW5wdXQpLCBmaWVsZE5hbWUpKS5lcWwoZXhwZWN0ZWQpO1xuICAgIH1cblxuICAgIHNldFByb3AoaW5wdXQsIGZpZWxkTmFtZSwgdW5kZWZpbmVkKTtcbiAgICBjaGVjayhpbnB1dCk7XG5cbiAgICB1bnNldChpbnB1dCwgZmllbGROYW1lKTtcbiAgICBjaGVjayhpbnB1dCk7XG4gIH1cblxuICBzdGF0aWMgZ29vZEFuZEJhZChnb29kLCBiYWQsIHRlc3RGbiwgb3B0cz17fSkge1xuICAgIG9wdHMgPSBPYmplY3QuYXNzaWduKHtyZXF1aXJlZDogdHJ1ZX0sIG9wdHMpO1xuICAgIChbZ29vZCwgYmFkXSA9IGFzc2lnblVuZGVmaW5lZChnb29kLCBiYWQsIG9wdHMpKTtcblxuICAgIGlmIChvcHRzLmFzeW5jKSB7XG4gICAgICBpZiAodHlwZW9mIG9wdHMuYXN5bmMgIT09ICdmdW5jdGlvbicpXG4gICAgICAgIHRocm93IEVycm9yKCdvcHRzLmFzeW5jIG11c3QgYmUgYSBmdW5jdGlvbicpO1xuICAgICAgUHJvbWlzZS5hbGwoW1xuICAgICAgICB0ZXN0R29vZEFzeW5jKGdvb2QsIHRlc3RGbiksXG4gICAgICAgIHRlc3RCYWRBc3luYyhiYWQsIHRlc3RGbilcbiAgICAgIF0pLnRoZW4oKCkgPT4gb3B0cy5hc3luYygpKS5jYXRjaChlID0+IG9wdHMuYXN5bmMoZSkpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0ZXN0R29vZChnb29kLCB0ZXN0Rm4pO1xuICAgICAgdGVzdEJhZChiYWQsIHRlc3RGbik7XG4gICAgfVxuICB9XG5cbiAgc3RhdGljIGdvb2RBbmRCYWRGaWVsZChpbnB1dCwgZmllbGROYW1lLCBnb29kLCBiYWQsIHRlc3RGbiwgb3B0cz17fSkge1xuICAgIG9wdHMgPSBPYmplY3QuYXNzaWduKHtyZXF1aXJlZDogdHJ1ZX0sIG9wdHMpO1xuICAgIChbZ29vZCwgYmFkXSA9IGFzc2lnblVuZGVmaW5lZChnb29kLCBiYWQsIG9wdHMpKTtcbiAgICBUZXN0cy5nb29kQW5kQmFkKGdvb2QsIGJhZCwgYXNzaWduQW5kVGVzdChpbnB1dCwgZmllbGROYW1lLCB0ZXN0Rm4pLCBvcHRzKTtcbiAgfVxuXG4gIHN0YXRpYyByZXF1aXJlc0ZpZWxkKGlucHV0LCBmaWVsZE5hbWUsIGdvb2QsIHRlc3RGbikge1xuICAgIGlucHV0ID0gcmVzb2x2ZShpbnB1dCk7XG4gICAgc2V0UHJvcChpbnB1dCwgZmllbGROYW1lLCBnb29kKTtcbiAgICBleHBlY3QoKCkgPT4gdGVzdEZuKGlucHV0KSkubm90LnRvLnRocm93KCk7XG4gICAgc2V0UHJvcChpbnB1dCwgZmllbGROYW1lLCB1bmRlZmluZWQpO1xuICAgIGV4cGVjdCgoKSA9PiB0ZXN0Rm4oaW5wdXQpKS50by50aHJvdygpO1xuICAgIHVuc2V0KGlucHV0LCBmaWVsZE5hbWUpO1xuICAgIGV4cGVjdCgoKSA9PiB0ZXN0Rm4oaW5wdXQpKS50by50aHJvdygpO1xuICB9XG5cbiAgc3RhdGljIGFsbG93c0FkZGl0aW9uYWxGaWVsZHMoaW5wdXQsIHRlc3RGbiwgb3B0cz17fSkge1xuICAgIG9wdHMgPSBPYmplY3QuYXNzaWduKHtyb290OiAnJywgdmFsdWU6IHRydWV9LCBvcHRzKTtcbiAgICBjb25zdCBmaWVsZCA9IChvcHRzLnJvb3QubGVuZ3RoKSA/IGAke29wdHMucm9vdH0uYXNrZGhhc2tkaGFzZGFrc2hka2phc2hka2phc2hka2phc2RoYCA6ICdhc2tkaGFza2RoYXNkYWtzaGRramFzaGRramFzaGRramFzZGgnO1xuICAgIHNldFByb3AoaW5wdXQsIGZpZWxkLCBvcHRzLnZhbHVlKTtcbiAgICBleHBlY3QoKCkgPT4gdGVzdEZuKGlucHV0KSkubm90LnRvLnRocm93KCk7XG4gIH1cblxuICBzdGF0aWMgaXNBbk9iamVjdCh0ZXN0Rm4sIG9wdHM9e30pIHtcbiAgICBsZXQgZ29vZCA9IFtvcHRzLmV4YW1wbGUgfHwge31dO1xuICAgIGxldCBiYWQgPSBbdHJ1ZSwxLC0xLCdzdHJpbmcnLFtdLCgpPT57fV07XG4gICAgKHtnb29kLCBiYWR9ID0gYWxsb3dGYWxzeShnb29kLCBiYWQsIG9wdHMuYWxsb3dGYWxzeSkpO1xuXG4gICAgVGVzdHMuZ29vZEFuZEJhZChnb29kLCBiYWQsIHRlc3RGbiwgb3B0cyk7XG4gIH1cbiAgXG4gIHN0YXRpYyBmaWVsZElzQW5PYmplY3QoaW5wdXQsIGZpZWxkTmFtZSwgdGVzdEZuLCBvcHRzPXt9KSB7XG4gICAgVGVzdHMuaXNBbk9iamVjdChhc3NpZ25BbmRUZXN0KGlucHV0LCBmaWVsZE5hbWUsIHRlc3RGbiksIG9wdHMpO1xuICB9XG5cbiAgc3RhdGljIGlzQW5BcnJheSh0ZXN0Rm4sIG9wdHM9e30pIHtcbiAgICBsZXQgZ29vZCA9W29wdHMuZXhhbXBsZSB8fCBbXV07XG4gICAgbGV0IGJhZCA9IFt0cnVlLDEsLTEsJ3N0cmluZycse30sKCk9Pnt9XTtcblxuICAgIFRlc3RzLmdvb2RBbmRCYWQoZ29vZCwgYmFkLCB0ZXN0Rm4sIG9wdHMpO1xuICB9XG5cbiAgc3RhdGljIGZpZWxkSXNBbkFycmF5KGlucHV0LCBmaWVsZCwgdGVzdEZuLCBvcHRzPXt9KSB7XG4gICAgVGVzdHMuaXNBbkFycmF5KGFzc2lnbkFuZFRlc3QoaW5wdXQsIGZpZWxkLCB0ZXN0Rm4pLCBvcHRzKTtcbiAgfVxuXG4gIHN0YXRpYyBpc0FGdW5jdGlvbih0ZXN0Rm4sIG9wdHM9e30pIHtcbiAgICBsZXQgZ29vZCA9IFtvcHRzLmV4YW1wbGUgfHwgKCgpPT57fSldO1xuICAgIGxldCBiYWQgPSBbdHJ1ZSxmYWxzZSwwLDEsLTEsJycsJ3N0cmluZycsTmFOLG51bGwsW10se31dO1xuXG4gICAgVGVzdHMuZ29vZEFuZEJhZChnb29kLCBiYWQsIHRlc3RGbiwgb3B0cyk7XG4gIH1cblxuICBzdGF0aWMgZmllbGRJc0FGdW5jdGlvbihpbnB1dCwgZmllbGQsIHRlc3RGbiwgb3B0cz17fSkge1xuICAgIFRlc3RzLmlzQUZ1bmN0aW9uKGFzc2lnbkFuZFRlc3QoaW5wdXQsIGZpZWxkLCB0ZXN0Rm4pLCBvcHRzKTtcbiAgfVxuXG4gIHN0YXRpYyBpc0FCb29sZWFuKHRlc3QsIG9wdHM9e30pIHtcbiAgICBvcHRzID0gT2JqZWN0LmFzc2lnbih7cmVxdWlyZWQ6IHRydWUsIGFsbG93U3RyaW5nczogZmFsc2V9LCBvcHRzKTtcblxuICAgIGxldCBnb29kID0gW3RydWUsIGZhbHNlXTtcbiAgICBsZXQgYmFkID0gWzAsMSwtMSwnJywnc3RyaW5nJyxOYU4sbnVsbCxbXSwoKT0+e30se31dO1xuICAgIGlmIChvcHRzLmFsbG93U3RyaW5ncykge1xuICAgICAgZ29vZCA9IFsuLi5nb29kLCAndHJ1ZScsICdmYWxzZSddO1xuICAgIH0gZWxzZSB7XG4gICAgICBiYWQgPSBbLi4uYmFkLCAndHJ1ZScsICdmYWxzZSddO1xuICAgIH1cblxuICAgIFRlc3RzLmdvb2RBbmRCYWQoZ29vZCwgYmFkLCB0ZXN0LCBvcHRzKTtcbiAgfVxuXG4gIHN0YXRpYyBmaWVsZElzQUJvb2xlYW4oaW5wdXQsIGZpZWxkTmFtZSwgdGVzdEZuLCBvcHRzPXt9KSB7XG4gICAgVGVzdHMuaXNBQm9vbGVhbihhc3NpZ25BbmRUZXN0KGlucHV0LCBmaWVsZE5hbWUsIHRlc3RGbiksIG9wdHMpO1xuICB9XG5cbiAgc3RhdGljIGlzQVN0cmluZyh0ZXN0Rm4sIG9wdHM9e30pIHtcbiAgICBvcHRzID0gT2JqZWN0LmFzc2lnbih7cmVxdWlyZWQ6IHRydWUsIHRlc3RTdHJpbmc6ICdzdHJpbmcnLCBlbXB0eVN0cmluZzogZmFsc2V9LCBvcHRzKTtcblxuICAgIGxldCBnb29kID0gW29wdHMudGVzdFN0cmluZ107XG4gICAgbGV0IGJhZCA9IFsxLHRydWUsW10sKCk9Pnt9LHt9XTtcbiAgICAoe2dvb2QsIGJhZH0gPSBhbGxvd0ZhbHN5KGdvb2QsIGJhZCwgb3B0cy5hbGxvd0ZhbHN5LCB7bm9FbXB0eVN0cmluZzogdHJ1ZX0pKTtcbiAgICBpZiAob3B0cy5lbXB0eVN0cmluZyB8fCBvcHRzLmFsbG93RmFsc3kpIHtcbiAgICAgIGdvb2QucHVzaCgnJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGJhZC5wdXNoKCcnKTtcbiAgICB9XG5cbiAgICBUZXN0cy5nb29kQW5kQmFkKGdvb2QsIGJhZCwgdGVzdEZuLCBvcHRzKTtcbiAgfVxuXG4gIHN0YXRpYyBmaWVsZElzQVN0cmluZyhpbnB1dCwgZmllbGROYW1lLCB0ZXN0Rm4sIG9wdHM9e30pIHtcbiAgICBUZXN0cy5pc0FTdHJpbmcoYXNzaWduQW5kVGVzdChpbnB1dCwgZmllbGROYW1lLCB0ZXN0Rm4pLCBvcHRzKTtcbiAgfVxuXG4gIHN0YXRpYyBpc0FTdHJpbmdPclN0cmluZ0FycmF5KHRlc3RGbiwgb3B0cz17fSkge1xuICAgIG9wdHMgPSBPYmplY3QuYXNzaWduKHtyZXF1aXJlZDogdHJ1ZSwgdGVzdFN0cmluZzogJ3N0cmluZycsIGVtcHR5QXJyYXk6IGZhbHNlLCBlbXB0eVN0cmluZzogZmFsc2V9LCBvcHRzKTtcblxuICAgIGxldCBnb29kID0gW29wdHMudGVzdFN0cmluZywgW29wdHMudGVzdFN0cmluZ11dO1xuICAgIGxldCBiYWQgPSBbMSx0cnVlLCgpPT57fSx7fV07XG4gICAgaWYgKG9wdHMuZW1wdHlBcnJheSkge1xuICAgICAgZ29vZC5wdXNoKFtdKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYmFkLnB1c2goW10pO1xuICAgIH1cbiAgICAoe2dvb2QsIGJhZH0gPSBhbGxvd0ZhbHN5KGdvb2QsIGJhZCwgb3B0cy5hbGxvd0ZhbHN5LCB7bm9FbXB0eVN0cmluZzogdHJ1ZX0pKTtcbiAgICBpZiAob3B0cy5lbXB0eVN0cmluZyB8fCBvcHRzLmFsbG93RmFsc3kpIHtcbiAgICAgIGdvb2QucHVzaCgnJyk7XG4gICAgICBnb29kLnB1c2goWycnXSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGJhZC5wdXNoKCcnKTtcbiAgICAgIGJhZC5wdXNoKFsnJ10pO1xuICAgIH1cblxuICAgIFRlc3RzLmdvb2RBbmRCYWQoZ29vZCwgYmFkLCB0ZXN0Rm4sIG9wdHMpO1xuICB9XG5cbiAgc3RhdGljIGZpZWxkSXNBU3RyaW5nT3JTdHJpbmdBcnJheShpbnB1dCwgZmllbGROYW1lLCB0ZXN0Rm4sIG9wdHM9e30pIHtcbiAgICBUZXN0cy5pc0FTdHJpbmcoYXNzaWduQW5kVGVzdChpbnB1dCwgZmllbGROYW1lLCB0ZXN0Rm4pLCBvcHRzKTtcbiAgfVxuXG5cbiAgc3RhdGljIGlzVGhpc1N0cmluZyhhbGxvd2VkLCB0ZXN0Rm4sIG9wdHM9e30pIHtcbiAgICBsZXQgZ29vZCA9IHJlc29sdmVBcnJheShhbGxvd2VkKTtcbiAgICBvcHRzID0gT2JqZWN0LmFzc2lnbih7cmVxdWlyZWQ6IHRydWV9LCBvcHRzKTtcbiAgICBsZXQgYmFkID0gWzEsJ3N0cmluZycsdHJ1ZSxbXSwoKT0+e30se30sbmV3IERhdGUoKV07XG4gICAgKHtnb29kLCBiYWR9ID0gYWxsb3dGYWxzeShnb29kLCBiYWQsIG9wdHMuYWxsb3dGYWxzeSkpO1xuICAgIFRlc3RzLmdvb2RBbmRCYWQoZ29vZCwgYmFkLCB0ZXN0Rm4sIG9wdHMpO1xuICB9XG5cbiAgc3RhdGljIGZpZWxkSXNUaGlzU3RyaW5nKGlucHV0LCBmaWVsZE5hbWUsIGFsbG93ZWQsIHRlc3RGbiwgb3B0cz17fSkge1xuICAgIFRlc3RzLmlzVGhpc1N0cmluZyhhbGxvd2VkLCBhc3NpZ25BbmRUZXN0KGlucHV0LCBmaWVsZE5hbWUsIHRlc3RGbiksIG9wdHMpO1xuICB9XG5cbiAgc3RhdGljIGlzQURhdGVTdHJpbmcodGVzdEZuLCBvcHRzPXt9KSB7XG4gICAgb3B0cyA9IE9iamVjdC5hc3NpZ24oe3JlcXVpcmVkOiB0cnVlLCBlbXB0eVN0cmluZzogZmFsc2V9LCBvcHRzKTtcbiAgICBsZXQgZ29vZCA9IFttb21lbnQoKS50b0lTT1N0cmluZygpXTtcbiAgICBsZXQgYmFkID0gWzEsJ3N0cmluZycsdHJ1ZSxbXSwoKT0+e30se30sbmV3IERhdGUoKSxtb21lbnQoKV07XG4gICAgKHtnb29kLCBiYWR9ID0gYWxsb3dGYWxzeShnb29kLCBiYWQsIG9wdHMuYWxsb3dGYWxzeSwge25vRW1wdHlTdHJpbmc6IHRydWV9KSk7XG4gICAgaWYgKG9wdHMuZW1wdHlTdHJpbmcgfHwgb3B0cy5hbGxvd0ZhbHN5KSB7XG4gICAgICBnb29kLnB1c2goJycpO1xuICAgIH0gZWxzZSB7XG4gICAgICBiYWQucHVzaCgnJyk7XG4gICAgfVxuICAgIFRlc3RzLmdvb2RBbmRCYWQoZ29vZCwgYmFkLCB0ZXN0Rm4sIG9wdHMpO1xuICB9XG5cbiAgc3RhdGljIGZpZWxkSXNBRGF0ZVN0cmluZyhpbnB1dCwgZmllbGROYW1lLCB0ZXN0Rm4sIG9wdHM9e30pIHtcbiAgICBUZXN0cy5pc0FEYXRlU3RyaW5nKGFzc2lnbkFuZFRlc3QoaW5wdXQsIGZpZWxkTmFtZSwgdGVzdEZuKSwgb3B0cyk7XG4gIH1cblxuXG4gIHN0YXRpYyBpc0FOdW1iZXIodGVzdEZuLCBvcHRzPXt9KSB7XG4gICAgb3B0cyA9IE9iamVjdC5hc3NpZ24oe3JlcXVpcmVkOiB0cnVlLCBpbnRlZ2VyOiBmYWxzZSwgcG9zaXRpdmU6IGZhbHNlLCBub256ZXJvOiBmYWxzZSwgbWluOiBmYWxzZSwgbWF4OiBmYWxzZX0sIG9wdHMpO1xuXG4gICAgbGV0IGdvb2QgPSBbXTtcbiAgICBsZXQgYmFkID0gW3RydWUsZmFsc2UsJycsJ3N0cmluZycsTmFOLG51bGwsW10sKCk9Pnt9LHt9XTtcblxuXG4gICAgZ29vZC5wdXNoKDEpO1xuICAgIGdvb2QucHVzaCgnMScpO1xuXG4gICAgaWYgKG9wdHMubm9uemVybykge1xuICAgICAgYmFkLnB1c2goMCk7XG4gICAgICBiYWQucHVzaCgnMCcpO1xuICAgIH0gZWxzZSB7XG4gICAgICBnb29kLnB1c2goMCk7XG4gICAgICBnb29kLnB1c2goJzAnKTtcbiAgICB9XG5cbiAgICBpZiAob3B0cy5pbnRlZ2VyKSB7XG4gICAgICBiYWQucHVzaCgxLjEpO1xuICAgICAgYmFkLnB1c2goJzEuMScpO1xuICAgIH0gZWxzZSB7XG4gICAgICBnb29kLnB1c2goMS4xKTtcbiAgICAgIGdvb2QucHVzaCgnMS4xJyk7XG4gICAgfVxuXG4gICAgaWYgKG9wdHMucG9zaXRpdmUpIHtcbiAgICAgIGJhZC5wdXNoKC0xKTtcbiAgICAgIGJhZC5wdXNoKCctMScpO1xuICAgIH0gZWxzZSB7XG4gICAgICBnb29kLnB1c2goLTEpO1xuICAgICAgZ29vZC5wdXNoKCctMScpO1xuICAgIH1cblxuICAgIFRlc3RzLmdvb2RBbmRCYWQoZ29vZCwgYmFkLCB0ZXN0Rm4sIG9wdHMpO1xuICB9XG5cbiAgc3RhdGljIGZpZWxkSXNBTnVtYmVyKGlucHV0LCBmaWVsZE5hbWUsIHRlc3RGbiwgb3B0cz17fSkge1xuICAgIFRlc3RzLmlzQU51bWJlcihhc3NpZ25BbmRUZXN0KGlucHV0LCBmaWVsZE5hbWUsIHRlc3RGbiksIG9wdHMpO1xuICB9XG5cblxuXG4gIHN0YXRpYyBpc0FOdW1iZXJJblJhbmdlKHRlc3RGbiwgb3B0cz17fSkge1xuICAgIG9wdHMgPSBPYmplY3QuYXNzaWduKHtyZXF1aXJlZDogdHJ1ZSwgaW50ZWdlcjogZmFsc2UsIG1pbjogZmFsc2UsIG1heDogZmFsc2V9LCBvcHRzKTtcbiAgICBsZXQgZ29vZCA9IFtdO1xuICAgIGxldCBiYWQgPSBbdHJ1ZSxmYWxzZSwnJywnc3RyaW5nJyxOYU4sbnVsbCxbXSwoKT0+e30se31dO1xuICAgIGxldCB7bWluLCBtYXh9ID0gb3B0cztcblxuICAgIGlmIChtYXggPT09IGZhbHNlICYmIG1pbiA9PT0gZmFsc2UpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignQ2Fubm90IHRlc3QgZm9yIGEgbnVtYmVyIGluIHJhbmdlIHdpdGhvdXQgZWl0aGVyIGEgbWluIG9yIG1heCBvcHRpb24nKTtcbiAgICB9XG5cbiAgICBpZiAob3B0cy5pbnRlZ2VyKSB7XG4gICAgICBtaW4gPSAobWluICE9PSBmYWxzZSkgPyBNYXRoLmNlaWwobWluKSA6IG1pbjtcbiAgICAgIG1heCA9IChtYXggIT09IGZhbHNlKSA/IE1hdGguZmxvb3IobWF4KSA6IG1heDtcbiAgICB9XG5cbiAgICBpZiAobWluICE9PSBmYWxzZSAmJiBtYXggIT09IGZhbHNlKSB7XG4gICAgICBpZiAobWluID4gbWF4KSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignQ2Fubm90IHRlc3QgZm9yIGEgbnVtYmVyIGluIHJhbmdlIHdoZW4gbWluID4gbWF4Jyk7XG4gICAgICB9XG4gICAgICBnb29kLnB1c2gobWluKTtcbiAgICAgIGdvb2QucHVzaChtYXgpO1xuICAgICAgYmFkLnB1c2gobWluIC0gMSk7XG4gICAgICBiYWQucHVzaChtYXggKyAxKTtcbiAgICAgIGlmIChvcHRzLmludGVnZXIpIHtcbiAgICAgICAgZ29vZC5wdXNoKE1hdGguZmxvb3IoKG1pbiArIG1heCkgLyAyKSk7XG4gICAgICAgIGJhZC5wdXNoKCgobWluICsgbWF4KSAvIDIpICsgMC4wMDAwMDAwMDAwMDEpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZ29vZC5wdXNoKCgobWluICsgbWF4KSAvIDIpICsgMC4wMDAwMDAwMDAwMSk7XG4gICAgICB9XG5cbiAgICB9IGVsc2UgIGlmIChtYXggIT09IGZhbHNlKSB7XG4gICAgICBnb29kLnB1c2gobWF4KTtcbiAgICAgIGJhZC5wdXNoKG1heCArIDEpO1xuICAgICAgaWYgKG9wdHMuaW50ZWdlcikge1xuICAgICAgICBnb29kLnB1c2gobWF4IC0gMSk7XG4gICAgICAgIGJhZC5wdXNoKG1heCAtIDEuMDAwMDAwMDAwMDAxKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGdvb2QucHVzaChtYXggLSAxLjAwMDAwMDAwMDAwMSk7XG4gICAgICB9XG5cbiAgICB9IGVsc2UgaWYgKG1pbiAhPT0gZmFsc2UpIHtcbiAgICAgIGdvb2QucHVzaChtaW4pO1xuICAgICAgYmFkLnB1c2gobWluIC0gMSk7XG4gICAgICBpZiAob3B0cy5pbnRlZ2VyKSB7XG4gICAgICAgIGdvb2QucHVzaChtaW4gKyAxKTtcbiAgICAgICAgYmFkLnB1c2gobWluICsgMC4wMDAwMDAwMDEpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZ29vZC5wdXNoKG1pbiArIDAuMDAwMDAwMDAxKTtcbiAgICAgIH1cblxuICAgIH1cblxuICAgIFRlc3RzLmdvb2RBbmRCYWQoZ29vZCwgYmFkLCB0ZXN0Rm4sIG9wdHMpO1xuICB9XG5cbiAgc3RhdGljIGZpZWxkSXNBTnVtYmVySW5SYW5nZShpbnB1dCwgZmllbGROYW1lLCB0ZXN0Rm4sIG9wdHM9e30pIHtcbiAgICBUZXN0cy5pc0FOdW1iZXJJblJhbmdlKGFzc2lnbkFuZFRlc3QoaW5wdXQsIGZpZWxkTmFtZSwgdGVzdEZuKSwgb3B0cyk7XG4gIH1cblxuICBzdGF0aWMgbWF0Y2hlc1RoZUNvbnRyYWN0KGZ1bmN0aW9ucywgdGVzdEZuLCBvcHRzPXt9KSB7XG4gICAgbGV0IGdvb2QgPSBbXTtcbiAgICBsZXQgYmFkID0gW3RydWUsMSwtMSwnc3RyaW5nJyxbXSwoKT0+e30sIHt9XTtcbiAgICAoe2dvb2QsIGJhZH0gPSBhbGxvd0ZhbHN5KGdvb2QsIGJhZCwgb3B0cy5hbGxvd0ZhbHN5KSk7XG5cbiAgICBsZXQgZ29vZE9iaiA9IHt9O1xuICAgIGlmIChBcnJheS5pc0FycmF5KGZ1bmN0aW9ucykpIHtcbiAgICAgIGZ1bmN0aW9ucy5mb3JFYWNoKGZuID0+IHtcbiAgICAgICAgZ29vZE9ialtmbl0gPSAoKSA9PiB7fTtcbiAgICAgIH0pO1xuICAgICAgbGV0IGZuO1xuICAgICAgd2hpbGUgKGZuID0gZnVuY3Rpb25zLnBvcCgpKSB7XG4gICAgICAgIGJhZC5wdXNoKG9taXQoZ29vZE9iaiwgZm4pKTtcbiAgICAgIH1cblxuICAgIH0gZWxzZSBpZiAodHlwZW9mIGZ1bmN0aW9ucyA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGdvb2RPYmpbZnVuY3Rpb25zXSA9ICgpID0+IHt9XG5cbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBmdW5jdGlvbnMgPT09ICdvYmplY3QnKSB7XG4gICAgICBjb25zdCBrZXlzID0gT2JqZWN0LmtleXMoZnVuY3Rpb25zKTtcbiAgICAgIGtleXMuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgICBnb29kT2JqW2tleV0gPSBmdW5jdGlvbnNba2V5XTtcbiAgICAgIH0pO1xuICAgICAgbGV0IGtleTtcbiAgICAgIHdoaWxlIChrZXkgPSBrZXlzLnBvcCgpKSB7XG4gICAgICAgIGJhZC5wdXNoKG9taXQoZ29vZE9iaiwga2V5KSk7XG4gICAgICB9XG5cbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgRXJyb3IoJ2JhZCBmdW5jdGlvbnMgZGVmaW5pdGlvbicsIGZ1bmN0aW9ucyk7XG4gICAgfVxuICAgIGdvb2QucHVzaChnb29kT2JqKTtcblxuICAgIFRlc3RzLmdvb2RBbmRCYWQoZ29vZCwgYmFkLCB0ZXN0Rm4sIG9wdHMpO1xuICB9XG5cbiAgc3RhdGljIGZpZWxkTWF0Y2hlc1RoZUNvbnRyYWN0KGlucHV0LCBmaWVsZCwgZnVuY3Rpb25zLCB0ZXN0Rm4sIG9wdHM9e30pIHtcbiAgICBUZXN0cy5tYXRjaGVzVGhlQ29udHJhY3QoZnVuY3Rpb25zLCBhc3NpZ25BbmRUZXN0KGlucHV0LCBmaWVsZCwgdGVzdEZuKSwgb3B0cyk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBUZXN0czsiXX0=