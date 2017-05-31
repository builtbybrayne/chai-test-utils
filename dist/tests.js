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

      opts = Object.assign({ required: true, integer: false, positive: false, nonzero: false }, opts);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy90ZXN0cy5qcyJdLCJuYW1lcyI6WyJjaGFpIiwicmVxdWlyZSIsImV4cGVjdCIsImlzQUZ1bmN0aW9uIiwic2V0UHJvcCIsImdldFByb3AiLCJ1bnNldCIsIm9taXQiLCJtb21lbnQiLCJhc3luY1Rocm93cyIsInJlc29sdmUiLCJpbnB1dCIsInJlc29sdmVBcnJheSIsIkFycmF5IiwiaXNBcnJheSIsImFzc2lnblVuZGVmaW5lZCIsImdvb2QiLCJiYWQiLCJvcHRzIiwiYWxsb3dGYWxzeSIsInB1c2giLCJ1bmRlZmluZWQiLCJyZXF1aXJlZCIsImFzc2lnbkFuZFRlc3QiLCJmaWVsZE5hbWUiLCJ0ZXN0Rm4iLCJ2YWx1ZSIsImFsbG93Iiwib3B0aW9ucyIsImZhbHNpZXMiLCJub1plcm8iLCJub0ZhbHNlIiwibm9OdWxsIiwibm9FbXB0eVN0cmluZyIsIm5vTmFOIiwiTmFOIiwidGVzdEdvb2QiLCJmb3JFYWNoIiwibm90IiwidG8iLCJ0aHJvdyIsInRlc3RCYWQiLCJ0ZXN0R29vZEFzeW5jIiwiUHJvbWlzZSIsImFsbCIsIm1hcCIsInRlc3RCYWRBc3luYyIsIlRlc3RzIiwiZXhwZWN0ZWQiLCJ0ZXN0IiwiY2hlY2siLCJiZSIsInRydWUiLCJlcWwiLCJPYmplY3QiLCJhc3NpZ24iLCJhc3luYyIsIkVycm9yIiwidGhlbiIsImNhdGNoIiwiZSIsImdvb2RBbmRCYWQiLCJyb290IiwiZmllbGQiLCJsZW5ndGgiLCJpc0FuT2JqZWN0IiwiYWxsb3dTdHJpbmdzIiwiaXNBQm9vbGVhbiIsInRlc3RTdHJpbmciLCJlbXB0eVN0cmluZyIsImlzQVN0cmluZyIsImVtcHR5QXJyYXkiLCJhbGxvd2VkIiwiRGF0ZSIsImlzVGhpc1N0cmluZyIsInRvSVNPU3RyaW5nIiwiaXNBRGF0ZVN0cmluZyIsImludGVnZXIiLCJwb3NpdGl2ZSIsIm5vbnplcm8iLCJpc0FOdW1iZXIiLCJmdW5jdGlvbnMiLCJnb29kT2JqIiwiZm4iLCJwb3AiLCJrZXlzIiwia2V5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UixJQUFxQixZQUFNLENBQUUsQ0FBN0I7QUFFRCxPQUhNLE1BR0EsSUFBSSxRQUFPQSxTQUFQLHlDQUFPQSxTQUFQLE9BQXFCLFFBQXpCLEVBQW1DO0FBQ3hDLFlBQU1JLE9BQU8vQixPQUFPK0IsSUFBUCxDQUFZSixTQUFaLENBQWI7QUFDQUksYUFBS2hELE9BQUwsQ0FBYSxlQUFPO0FBQ2xCNkMsa0JBQVFJLEdBQVIsSUFBZUwsVUFBVUssR0FBVixDQUFmO0FBQ0QsU0FGRDtBQUdBLFlBQUlBLFlBQUo7QUFDQSxlQUFPQSxNQUFNRCxLQUFLRCxHQUFMLEVBQWIsRUFBeUI7QUFDdkJuRSxjQUFJRyxJQUFKLENBQVNiLEtBQUsyRSxPQUFMLEVBQWNJLEdBQWQsQ0FBVDtBQUNEO0FBRUYsT0FWTSxNQVVBO0FBQ0wsY0FBTTdCLE1BQU0sMEJBQU4sRUFBa0N3QixTQUFsQyxDQUFOO0FBQ0Q7QUFDRGpFLFdBQUtJLElBQUwsQ0FBVThELE9BQVY7O0FBRUFuQyxZQUFNYyxVQUFOLENBQWlCN0MsSUFBakIsRUFBdUJDLEdBQXZCLEVBQTRCUSxNQUE1QixFQUFvQ1AsSUFBcEM7QUFDRDs7OzRDQUU4QlAsSyxFQUFPb0QsSyxFQUFPa0IsUyxFQUFXeEQsTSxFQUFpQjtBQUFBLFVBQVRQLElBQVMsdUVBQUosRUFBSTs7QUFDdkU2QixZQUFNd0Msa0JBQU4sQ0FBeUJOLFNBQXpCLEVBQW9DMUQsY0FBY1osS0FBZCxFQUFxQm9ELEtBQXJCLEVBQTRCdEMsTUFBNUIsQ0FBcEMsRUFBeUVQLElBQXpFO0FBQ0Q7Ozs7OztBQUdIc0UsT0FBT0MsT0FBUCxHQUFpQjFDLEtBQWpCIiwiZmlsZSI6InRlc3RzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuY29uc3QgY2hhaSA9IHJlcXVpcmUoXCJjaGFpXCIpO1xuY29uc3QgZXhwZWN0ID0gY2hhaS5leHBlY3Q7XG5jb25zdCBpc0FGdW5jdGlvbiA9IHJlcXVpcmUoJ2xvZGFzaC5pc2Z1bmN0aW9uJyk7XG5jb25zdCBzZXRQcm9wID0gcmVxdWlyZSgnbG9kYXNoLnNldCcpO1xuY29uc3QgZ2V0UHJvcCA9IHJlcXVpcmUoJ2xvZGFzaC5nZXQnKTtcbmNvbnN0IHVuc2V0ID0gcmVxdWlyZSgnbG9kYXNoLnVuc2V0Jyk7XG5jb25zdCBvbWl0ID0gcmVxdWlyZSgnbG9kYXNoLm9taXQnKTtcbmNvbnN0IG1vbWVudCA9IHJlcXVpcmUoJ21vbWVudCcpO1xuXG5jb25zdCB7YXN5bmNUaHJvd3N9ID0gcmVxdWlyZSgnLi9mdW5jdGlvbnMnKTtcblxuZnVuY3Rpb24gcmVzb2x2ZShpbnB1dCkge1xuICByZXR1cm4gKGlzQUZ1bmN0aW9uKGlucHV0KSkgPyBpbnB1dCgpIDogaW5wdXQ7XG59XG5mdW5jdGlvbiByZXNvbHZlQXJyYXkoaW5wdXQpIHtcbiAgcmV0dXJuIChBcnJheS5pc0FycmF5KHJlc29sdmUoaW5wdXQpKSkgPyBpbnB1dCA6IFtpbnB1dF07XG59XG5cbmZ1bmN0aW9uIGFzc2lnblVuZGVmaW5lZChnb29kLCBiYWQsIG9wdHMpIHtcbiAgZ29vZCA9IHJlc29sdmVBcnJheShnb29kKTtcbiAgYmFkID0gcmVzb2x2ZUFycmF5KGJhZCk7XG4gIGlmIChvcHRzLmFsbG93RmFsc3kpIHtcbiAgICBnb29kLnB1c2godW5kZWZpbmVkKTtcbiAgfSBlbHNlIGlmIChvcHRzLnJlcXVpcmVkKSB7XG4gICAgYmFkLnB1c2godW5kZWZpbmVkKTtcbiAgfSBlbHNlIHtcbiAgICBnb29kLnB1c2godW5kZWZpbmVkKTtcbiAgfVxuICByZXR1cm4gW2dvb2QsIGJhZF07XG59XG5cbmZ1bmN0aW9uIGFzc2lnbkFuZFRlc3QoaW5wdXQsIGZpZWxkTmFtZSwgdGVzdEZuKSB7XG4gIHJldHVybiB2YWx1ZSA9PiB7XG4gICAgc2V0UHJvcChpbnB1dCwgZmllbGROYW1lLCB2YWx1ZSk7XG4gICAgdGVzdEZuKGlucHV0KTtcbiAgfVxufVxuXG5mdW5jdGlvbiBhbGxvd0ZhbHN5KGdvb2QsIGJhZCwgYWxsb3csIG9wdGlvbnM9e30pIHtcbiAgY29uc3QgZmFsc2llcyA9IFtdO1xuICBpZiAoIW9wdGlvbnMubm9aZXJvKVxuICAgIGZhbHNpZXMucHVzaCgwKTtcbiAgaWYgKCFvcHRpb25zLm5vRmFsc2UpXG4gICAgZmFsc2llcy5wdXNoKGZhbHNlKTtcbiAgaWYgKCFvcHRpb25zLm5vTnVsbClcbiAgICBmYWxzaWVzLnB1c2gobnVsbCk7XG4gIGlmICghb3B0aW9ucy5ub0VtcHR5U3RyaW5nKVxuICAgIGZhbHNpZXMucHVzaCgnJyk7XG4gIGlmICghb3B0aW9ucy5ub05hTilcbiAgICBmYWxzaWVzLnB1c2goTmFOKTtcblxuICBpZiAoYWxsb3cpIHtcbiAgICBnb29kID0gWy4uLmdvb2QsIC4uLmZhbHNpZXNdO1xuICB9IGVsc2Uge1xuICAgIGJhZCA9IFsuLi5iYWQsIC4uLmZhbHNpZXNdO1xuICB9XG4gIHJldHVybiB7Z29vZCwgYmFkfTtcbn1cblxuZnVuY3Rpb24gdGVzdEdvb2QoZ29vZCwgdGVzdEZuKSB7XG4gIGdvb2QuZm9yRWFjaChnb29kID0+IHtcbiAgICBleHBlY3QoKCkgPT4gdGVzdEZuKGdvb2QpKS5ub3QudG8udGhyb3coKTtcbiAgfSk7XG59XG5mdW5jdGlvbiB0ZXN0QmFkKGJhZCwgdGVzdEZuKSB7XG4gIGJhZC5mb3JFYWNoKGJhZCA9PiB7XG4gICAgZXhwZWN0KCgpID0+IHRlc3RGbihiYWQpKS50by50aHJvdygpO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gdGVzdEdvb2RBc3luYyhnb29kLCB0ZXN0Rm4pIHtcbiAgcmV0dXJuIFByb21pc2UuYWxsKGdvb2QubWFwKGFzeW5jIGdvb2QgPT4ge1xuICAgIHJldHVybiBhd2FpdCBhc3luY1Rocm93cyhhc3luYyAoKSA9PiBhd2FpdCB0ZXN0Rm4oZ29vZCksIHRydWUpO1xuICB9KSlcbn1cbmZ1bmN0aW9uIHRlc3RCYWRBc3luYyhiYWQsIHRlc3RGbikge1xuICByZXR1cm4gUHJvbWlzZS5hbGwoYmFkLm1hcChhc3luYyBiYWQgPT4ge1xuICAgIHJldHVybiBhd2FpdCBhc3luY1Rocm93cyhhc3luYyAoKSA9PiBhd2FpdCB0ZXN0Rm4oYmFkKSk7XG4gIH0pKTtcbn1cblxuXG5cbmNsYXNzIFRlc3RzIHtcblxuICBzdGF0aWMgZGVmYXVsdHNGaWVsZChpbnB1dCwgZmllbGROYW1lLCBleHBlY3RlZCwgdGVzdCkge1xuICAgIGxldCBjaGVjaztcbiAgICBpZiAodHlwZW9mIGV4cGVjdGVkID09ICdmdW5jdGlvbicpIHtcbiAgICAgIGNoZWNrID0gKGlucHV0KSA9PiBleHBlY3QoZXhwZWN0ZWQoZ2V0UHJvcCh0ZXN0KGlucHV0KSwgZmllbGROYW1lKSkpLnRvLmJlLnRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNoZWNrID0gKGlucHV0KSA9PiBleHBlY3QoZ2V0UHJvcCh0ZXN0KGlucHV0KSwgZmllbGROYW1lKSkuZXFsKGV4cGVjdGVkKTtcbiAgICB9XG5cbiAgICBzZXRQcm9wKGlucHV0LCBmaWVsZE5hbWUsIHVuZGVmaW5lZCk7XG4gICAgY2hlY2soaW5wdXQpO1xuXG4gICAgdW5zZXQoaW5wdXQsIGZpZWxkTmFtZSk7XG4gICAgY2hlY2soaW5wdXQpO1xuICB9XG5cbiAgc3RhdGljIGdvb2RBbmRCYWQoZ29vZCwgYmFkLCB0ZXN0Rm4sIG9wdHM9e30pIHtcbiAgICBvcHRzID0gT2JqZWN0LmFzc2lnbih7cmVxdWlyZWQ6IHRydWV9LCBvcHRzKTtcbiAgICAoW2dvb2QsIGJhZF0gPSBhc3NpZ25VbmRlZmluZWQoZ29vZCwgYmFkLCBvcHRzKSk7XG5cbiAgICBpZiAob3B0cy5hc3luYykge1xuICAgICAgaWYgKHR5cGVvZiBvcHRzLmFzeW5jICE9PSAnZnVuY3Rpb24nKVxuICAgICAgICB0aHJvdyBFcnJvcignb3B0cy5hc3luYyBtdXN0IGJlIGEgZnVuY3Rpb24nKTtcbiAgICAgIFByb21pc2UuYWxsKFtcbiAgICAgICAgdGVzdEdvb2RBc3luYyhnb29kLCB0ZXN0Rm4pLFxuICAgICAgICB0ZXN0QmFkQXN5bmMoYmFkLCB0ZXN0Rm4pXG4gICAgICBdKS50aGVuKCgpID0+IG9wdHMuYXN5bmMoKSkuY2F0Y2goZSA9PiBvcHRzLmFzeW5jKGUpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGVzdEdvb2QoZ29vZCwgdGVzdEZuKTtcbiAgICAgIHRlc3RCYWQoYmFkLCB0ZXN0Rm4pO1xuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyBnb29kQW5kQmFkRmllbGQoaW5wdXQsIGZpZWxkTmFtZSwgZ29vZCwgYmFkLCB0ZXN0Rm4sIG9wdHM9e30pIHtcbiAgICBvcHRzID0gT2JqZWN0LmFzc2lnbih7cmVxdWlyZWQ6IHRydWV9LCBvcHRzKTtcbiAgICAoW2dvb2QsIGJhZF0gPSBhc3NpZ25VbmRlZmluZWQoZ29vZCwgYmFkLCBvcHRzKSk7XG4gICAgVGVzdHMuZ29vZEFuZEJhZChnb29kLCBiYWQsIGFzc2lnbkFuZFRlc3QoaW5wdXQsIGZpZWxkTmFtZSwgdGVzdEZuKSwgb3B0cyk7XG4gIH1cblxuICBzdGF0aWMgcmVxdWlyZXNGaWVsZChpbnB1dCwgZmllbGROYW1lLCBnb29kLCB0ZXN0Rm4pIHtcbiAgICBpbnB1dCA9IHJlc29sdmUoaW5wdXQpO1xuICAgIHNldFByb3AoaW5wdXQsIGZpZWxkTmFtZSwgZ29vZCk7XG4gICAgZXhwZWN0KCgpID0+IHRlc3RGbihpbnB1dCkpLm5vdC50by50aHJvdygpO1xuICAgIHNldFByb3AoaW5wdXQsIGZpZWxkTmFtZSwgdW5kZWZpbmVkKTtcbiAgICBleHBlY3QoKCkgPT4gdGVzdEZuKGlucHV0KSkudG8udGhyb3coKTtcbiAgICB1bnNldChpbnB1dCwgZmllbGROYW1lKTtcbiAgICBleHBlY3QoKCkgPT4gdGVzdEZuKGlucHV0KSkudG8udGhyb3coKTtcbiAgfVxuXG4gIHN0YXRpYyBhbGxvd3NBZGRpdGlvbmFsRmllbGRzKGlucHV0LCB0ZXN0Rm4sIG9wdHM9e30pIHtcbiAgICBvcHRzID0gT2JqZWN0LmFzc2lnbih7cm9vdDogJycsIHZhbHVlOiB0cnVlfSwgb3B0cyk7XG4gICAgY29uc3QgZmllbGQgPSAob3B0cy5yb290Lmxlbmd0aCkgPyBgJHtvcHRzLnJvb3R9LmFza2RoYXNrZGhhc2Rha3NoZGtqYXNoZGtqYXNoZGtqYXNkaGAgOiAnYXNrZGhhc2tkaGFzZGFrc2hka2phc2hka2phc2hka2phc2RoJztcbiAgICBzZXRQcm9wKGlucHV0LCBmaWVsZCwgb3B0cy52YWx1ZSk7XG4gICAgZXhwZWN0KCgpID0+IHRlc3RGbihpbnB1dCkpLm5vdC50by50aHJvdygpO1xuICB9XG5cbiAgc3RhdGljIGlzQW5PYmplY3QodGVzdEZuLCBvcHRzPXt9KSB7XG4gICAgbGV0IGdvb2QgPSBbe31dO1xuICAgIGxldCBiYWQgPSBbdHJ1ZSwxLC0xLCdzdHJpbmcnLFtdLCgpPT57fV07XG4gICAgKHtnb29kLCBiYWR9ID0gYWxsb3dGYWxzeShnb29kLCBiYWQsIG9wdHMuYWxsb3dGYWxzeSkpO1xuXG4gICAgVGVzdHMuZ29vZEFuZEJhZChnb29kLCBiYWQsIHRlc3RGbiwgb3B0cyk7XG4gIH1cbiAgXG4gIHN0YXRpYyBmaWVsZElzQW5PYmplY3QoaW5wdXQsIGZpZWxkTmFtZSwgdGVzdEZuLCBvcHRzPXt9KSB7XG4gICAgVGVzdHMuaXNBbk9iamVjdChhc3NpZ25BbmRUZXN0KGlucHV0LCBmaWVsZE5hbWUsIHRlc3RGbiksIG9wdHMpO1xuICB9XG5cbiAgc3RhdGljIGlzQUZ1bmN0aW9uKHRlc3RGbiwgb3B0cz17fSkge1xuICAgIGxldCBnb29kID0gWygpPT57fV07XG4gICAgbGV0IGJhZCA9IFt0cnVlLGZhbHNlLDAsMSwtMSwnJywnc3RyaW5nJyxOYU4sbnVsbCxbXSx7fV07XG5cbiAgICBUZXN0cy5nb29kQW5kQmFkKGdvb2QsIGJhZCwgdGVzdEZuLCBvcHRzKTtcbiAgfVxuXG4gIHN0YXRpYyBmaWVsZElzQUZ1bmN0aW9uKGlucHV0LCBmaWVsZCwgdGVzdEZuLCBvcHRzPXt9KSB7XG4gICAgVGVzdHMuaXNBRnVuY3Rpb24oYXNzaWduQW5kVGVzdChpbnB1dCwgZmllbGQsIHRlc3RGbiksIG9wdHMpO1xuICB9XG5cbiAgc3RhdGljIGlzQUJvb2xlYW4odGVzdCwgb3B0cz17fSkge1xuICAgIG9wdHMgPSBPYmplY3QuYXNzaWduKHtyZXF1aXJlZDogdHJ1ZSwgYWxsb3dTdHJpbmdzOiBmYWxzZX0sIG9wdHMpO1xuXG4gICAgbGV0IGdvb2QgPSBbdHJ1ZSwgZmFsc2VdO1xuICAgIGxldCBiYWQgPSBbMCwxLC0xLCcnLCdzdHJpbmcnLE5hTixudWxsLFtdLCgpPT57fSx7fV07XG4gICAgaWYgKG9wdHMuYWxsb3dTdHJpbmdzKSB7XG4gICAgICBnb29kID0gWy4uLmdvb2QsICd0cnVlJywgJ2ZhbHNlJ107XG4gICAgfSBlbHNlIHtcbiAgICAgIGJhZCA9IFsuLi5iYWQsICd0cnVlJywgJ2ZhbHNlJ107XG4gICAgfVxuXG4gICAgVGVzdHMuZ29vZEFuZEJhZChnb29kLCBiYWQsIHRlc3QsIG9wdHMpO1xuICB9XG5cbiAgc3RhdGljIGZpZWxkSXNBQm9vbGVhbihpbnB1dCwgZmllbGROYW1lLCB0ZXN0Rm4sIG9wdHM9e30pIHtcbiAgICBUZXN0cy5pc0FCb29sZWFuKGFzc2lnbkFuZFRlc3QoaW5wdXQsIGZpZWxkTmFtZSwgdGVzdEZuKSwgb3B0cyk7XG4gIH1cblxuICBzdGF0aWMgaXNBU3RyaW5nKHRlc3RGbiwgb3B0cz17fSkge1xuICAgIG9wdHMgPSBPYmplY3QuYXNzaWduKHtyZXF1aXJlZDogdHJ1ZSwgdGVzdFN0cmluZzogJ3N0cmluZycsIGVtcHR5U3RyaW5nOiBmYWxzZX0sIG9wdHMpO1xuXG4gICAgbGV0IGdvb2QgPSBbb3B0cy50ZXN0U3RyaW5nXTtcbiAgICBsZXQgYmFkID0gWzEsdHJ1ZSxbXSwoKT0+e30se31dO1xuICAgICh7Z29vZCwgYmFkfSA9IGFsbG93RmFsc3koZ29vZCwgYmFkLCBvcHRzLmFsbG93RmFsc3ksIHtub0VtcHR5U3RyaW5nOiB0cnVlfSkpO1xuICAgIGlmIChvcHRzLmVtcHR5U3RyaW5nIHx8IG9wdHMuYWxsb3dGYWxzeSkge1xuICAgICAgZ29vZC5wdXNoKCcnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYmFkLnB1c2goJycpO1xuICAgIH1cblxuICAgIFRlc3RzLmdvb2RBbmRCYWQoZ29vZCwgYmFkLCB0ZXN0Rm4sIG9wdHMpO1xuICB9XG5cbiAgc3RhdGljIGZpZWxkSXNBU3RyaW5nKGlucHV0LCBmaWVsZE5hbWUsIHRlc3RGbiwgb3B0cz17fSkge1xuICAgIFRlc3RzLmlzQVN0cmluZyhhc3NpZ25BbmRUZXN0KGlucHV0LCBmaWVsZE5hbWUsIHRlc3RGbiksIG9wdHMpO1xuICB9XG5cbiAgc3RhdGljIGlzQVN0cmluZ09yU3RyaW5nQXJyYXkodGVzdEZuLCBvcHRzPXt9KSB7XG4gICAgb3B0cyA9IE9iamVjdC5hc3NpZ24oe3JlcXVpcmVkOiB0cnVlLCB0ZXN0U3RyaW5nOiAnc3RyaW5nJywgZW1wdHlBcnJheTogZmFsc2UsIGVtcHR5U3RyaW5nOiBmYWxzZX0sIG9wdHMpO1xuXG4gICAgbGV0IGdvb2QgPSBbb3B0cy50ZXN0U3RyaW5nLCBbb3B0cy50ZXN0U3RyaW5nXV07XG4gICAgbGV0IGJhZCA9IFsxLHRydWUsKCk9Pnt9LHt9XTtcbiAgICBpZiAob3B0cy5lbXB0eUFycmF5KSB7XG4gICAgICBnb29kLnB1c2goW10pO1xuICAgIH0gZWxzZSB7XG4gICAgICBiYWQucHVzaChbXSk7XG4gICAgfVxuICAgICh7Z29vZCwgYmFkfSA9IGFsbG93RmFsc3koZ29vZCwgYmFkLCBvcHRzLmFsbG93RmFsc3ksIHtub0VtcHR5U3RyaW5nOiB0cnVlfSkpO1xuICAgIGlmIChvcHRzLmVtcHR5U3RyaW5nIHx8IG9wdHMuYWxsb3dGYWxzeSkge1xuICAgICAgZ29vZC5wdXNoKCcnKTtcbiAgICAgIGdvb2QucHVzaChbJyddKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYmFkLnB1c2goJycpO1xuICAgICAgYmFkLnB1c2goWycnXSk7XG4gICAgfVxuXG4gICAgVGVzdHMuZ29vZEFuZEJhZChnb29kLCBiYWQsIHRlc3RGbiwgb3B0cyk7XG4gIH1cblxuICBzdGF0aWMgZmllbGRJc0FTdHJpbmdPclN0cmluZ0FycmF5KGlucHV0LCBmaWVsZE5hbWUsIHRlc3RGbiwgb3B0cz17fSkge1xuICAgIFRlc3RzLmlzQVN0cmluZyhhc3NpZ25BbmRUZXN0KGlucHV0LCBmaWVsZE5hbWUsIHRlc3RGbiksIG9wdHMpO1xuICB9XG5cblxuICBzdGF0aWMgaXNUaGlzU3RyaW5nKGFsbG93ZWQsIHRlc3RGbiwgb3B0cz17fSkge1xuICAgIGxldCBnb29kID0gcmVzb2x2ZUFycmF5KGFsbG93ZWQpO1xuICAgIG9wdHMgPSBPYmplY3QuYXNzaWduKHtyZXF1aXJlZDogdHJ1ZX0sIG9wdHMpO1xuICAgIGxldCBiYWQgPSBbMSwnc3RyaW5nJyx0cnVlLFtdLCgpPT57fSx7fSxuZXcgRGF0ZSgpXTtcbiAgICAoe2dvb2QsIGJhZH0gPSBhbGxvd0ZhbHN5KGdvb2QsIGJhZCwgb3B0cy5hbGxvd0ZhbHN5KSk7XG4gICAgVGVzdHMuZ29vZEFuZEJhZChnb29kLCBiYWQsIHRlc3RGbiwgb3B0cyk7XG4gIH1cblxuICBzdGF0aWMgZmllbGRJc1RoaXNTdHJpbmcoaW5wdXQsIGZpZWxkTmFtZSwgYWxsb3dlZCwgdGVzdEZuLCBvcHRzPXt9KSB7XG4gICAgVGVzdHMuaXNUaGlzU3RyaW5nKGFsbG93ZWQsIGFzc2lnbkFuZFRlc3QoaW5wdXQsIGZpZWxkTmFtZSwgdGVzdEZuKSwgb3B0cyk7XG4gIH1cblxuICBzdGF0aWMgaXNBRGF0ZVN0cmluZyh0ZXN0Rm4sIG9wdHM9e30pIHtcbiAgICBvcHRzID0gT2JqZWN0LmFzc2lnbih7cmVxdWlyZWQ6IHRydWUsIGVtcHR5U3RyaW5nOiBmYWxzZX0sIG9wdHMpO1xuICAgIGxldCBnb29kID0gW21vbWVudCgpLnRvSVNPU3RyaW5nKCldO1xuICAgIGxldCBiYWQgPSBbMSwnc3RyaW5nJyx0cnVlLFtdLCgpPT57fSx7fSxuZXcgRGF0ZSgpLG1vbWVudCgpXTtcbiAgICAoe2dvb2QsIGJhZH0gPSBhbGxvd0ZhbHN5KGdvb2QsIGJhZCwgb3B0cy5hbGxvd0ZhbHN5LCB7bm9FbXB0eVN0cmluZzogdHJ1ZX0pKTtcbiAgICBpZiAob3B0cy5lbXB0eVN0cmluZyB8fCBvcHRzLmFsbG93RmFsc3kpIHtcbiAgICAgIGdvb2QucHVzaCgnJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGJhZC5wdXNoKCcnKTtcbiAgICB9XG4gICAgVGVzdHMuZ29vZEFuZEJhZChnb29kLCBiYWQsIHRlc3RGbiwgb3B0cyk7XG4gIH1cblxuICBzdGF0aWMgZmllbGRJc0FEYXRlU3RyaW5nKGlucHV0LCBmaWVsZE5hbWUsIHRlc3RGbiwgb3B0cz17fSkge1xuICAgIFRlc3RzLmlzQURhdGVTdHJpbmcoYXNzaWduQW5kVGVzdChpbnB1dCwgZmllbGROYW1lLCB0ZXN0Rm4pLCBvcHRzKTtcbiAgfVxuXG4gIHN0YXRpYyBpc0FOdW1iZXIodGVzdEZuLCBvcHRzPXt9KSB7XG4gICAgb3B0cyA9IE9iamVjdC5hc3NpZ24oe3JlcXVpcmVkOiB0cnVlLCBpbnRlZ2VyOiBmYWxzZSwgcG9zaXRpdmU6IGZhbHNlLCBub256ZXJvOiBmYWxzZX0sIG9wdHMpO1xuXG4gICAgbGV0IGdvb2QgPSBbXTtcbiAgICBsZXQgYmFkID0gW3RydWUsZmFsc2UsJycsJ3N0cmluZycsTmFOLG51bGwsW10sKCk9Pnt9LHt9XTtcblxuICAgIGdvb2QucHVzaCgxKTtcbiAgICBnb29kLnB1c2goJzEnKTtcblxuICAgIGlmIChvcHRzLm5vbnplcm8pIHtcbiAgICAgIGJhZC5wdXNoKDApO1xuICAgICAgYmFkLnB1c2goJzAnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZ29vZC5wdXNoKDApO1xuICAgICAgZ29vZC5wdXNoKCcwJyk7XG4gICAgfVxuXG4gICAgaWYgKG9wdHMuaW50ZWdlcikge1xuICAgICAgYmFkLnB1c2goMS4xKTtcbiAgICAgIGJhZC5wdXNoKCcxLjEnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZ29vZC5wdXNoKDEuMSk7XG4gICAgICBnb29kLnB1c2goJzEuMScpO1xuICAgIH1cblxuICAgIGlmIChvcHRzLnBvc2l0aXZlKSB7XG4gICAgICBiYWQucHVzaCgtMSk7XG4gICAgICBiYWQucHVzaCgnLTEnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZ29vZC5wdXNoKC0xKTtcbiAgICAgIGdvb2QucHVzaCgnLTEnKTtcbiAgICB9XG4gICAgVGVzdHMuZ29vZEFuZEJhZChnb29kLCBiYWQsIHRlc3RGbiwgb3B0cyk7XG4gIH1cblxuICBzdGF0aWMgZmllbGRJc0FOdW1iZXIoaW5wdXQsIGZpZWxkTmFtZSwgdGVzdEZuLCBvcHRzPXt9KSB7XG4gICAgVGVzdHMuaXNBTnVtYmVyKGFzc2lnbkFuZFRlc3QoaW5wdXQsIGZpZWxkTmFtZSwgdGVzdEZuKSwgb3B0cyk7XG4gIH1cblxuICBzdGF0aWMgbWF0Y2hlc1RoZUNvbnRyYWN0KGZ1bmN0aW9ucywgdGVzdEZuLCBvcHRzPXt9KSB7XG4gICAgbGV0IGdvb2QgPSBbXTtcbiAgICBsZXQgYmFkID0gW3RydWUsMSwtMSwnc3RyaW5nJyxbXSwoKT0+e30sIHt9XTtcbiAgICAoe2dvb2QsIGJhZH0gPSBhbGxvd0ZhbHN5KGdvb2QsIGJhZCwgb3B0cy5hbGxvd0ZhbHN5KSk7XG5cbiAgICBsZXQgZ29vZE9iaiA9IHt9O1xuICAgIGlmIChBcnJheS5pc0FycmF5KGZ1bmN0aW9ucykpIHtcbiAgICAgIGZ1bmN0aW9ucy5mb3JFYWNoKGZuID0+IHtcbiAgICAgICAgZ29vZE9ialtmbl0gPSAoKSA9PiB7fTtcbiAgICAgIH0pO1xuICAgICAgbGV0IGZuO1xuICAgICAgd2hpbGUgKGZuID0gZnVuY3Rpb25zLnBvcCgpKSB7XG4gICAgICAgIGJhZC5wdXNoKG9taXQoZ29vZE9iaiwgZm4pKTtcbiAgICAgIH1cblxuICAgIH0gZWxzZSBpZiAodHlwZW9mIGZ1bmN0aW9ucyA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGdvb2RPYmpbZnVuY3Rpb25zXSA9ICgpID0+IHt9XG5cbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBmdW5jdGlvbnMgPT09ICdvYmplY3QnKSB7XG4gICAgICBjb25zdCBrZXlzID0gT2JqZWN0LmtleXMoZnVuY3Rpb25zKTtcbiAgICAgIGtleXMuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgICBnb29kT2JqW2tleV0gPSBmdW5jdGlvbnNba2V5XTtcbiAgICAgIH0pO1xuICAgICAgbGV0IGtleTtcbiAgICAgIHdoaWxlIChrZXkgPSBrZXlzLnBvcCgpKSB7XG4gICAgICAgIGJhZC5wdXNoKG9taXQoZ29vZE9iaiwga2V5KSk7XG4gICAgICB9XG5cbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgRXJyb3IoJ2JhZCBmdW5jdGlvbnMgZGVmaW5pdGlvbicsIGZ1bmN0aW9ucyk7XG4gICAgfVxuICAgIGdvb2QucHVzaChnb29kT2JqKTtcblxuICAgIFRlc3RzLmdvb2RBbmRCYWQoZ29vZCwgYmFkLCB0ZXN0Rm4sIG9wdHMpO1xuICB9XG5cbiAgc3RhdGljIGZpZWxkTWF0Y2hlc1RoZUNvbnRyYWN0KGlucHV0LCBmaWVsZCwgZnVuY3Rpb25zLCB0ZXN0Rm4sIG9wdHM9e30pIHtcbiAgICBUZXN0cy5tYXRjaGVzVGhlQ29udHJhY3QoZnVuY3Rpb25zLCBhc3NpZ25BbmRUZXN0KGlucHV0LCBmaWVsZCwgdGVzdEZuKSwgb3B0cyk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBUZXN0czsiXX0=