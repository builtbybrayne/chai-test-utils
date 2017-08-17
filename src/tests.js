'use strict';
const chai = require("chai");
const expect = chai.expect;
const isAFunction = require('lodash.isfunction');
const setProp = require('lodash.set');
const getProp = require('lodash.get');
const unset = require('lodash.unset');
const omit = require('lodash.omit');
const moment = require('moment');

const {asyncThrows} = require('./functions');

function resolve(input) {
  return (isAFunction(input)) ? input() : input;
}
function resolveArray(input) {
  return (Array.isArray(resolve(input))) ? input : [input];
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
  return value => {
    setProp(input, fieldName, value);
    testFn(input);
  }
}

function allowFalsy(good, bad, allow, options={}) {
  const falsies = [];
  if (!options.noZero)
    falsies.push(0);
  if (!options.noFalse)
    falsies.push(false);
  if (!options.noNull)
    falsies.push(null);
  if (!options.noEmptyString)
    falsies.push('');
  if (!options.noNaN)
    falsies.push(NaN);

  if (allow) {
    good = [...good, ...falsies];
  } else {
    bad = [...bad, ...falsies];
  }
  return {good, bad};
}

function testGood(good, testFn) {
  good.forEach(good => {
    expect(() => testFn(good)).not.to.throw();
  });
}
function testBad(bad, testFn) {
  bad.forEach(bad => {
    expect(() => testFn(bad)).to.throw();
  });
}

function testGoodAsync(good, testFn) {
  return Promise.all(good.map(async good => {
    return await asyncThrows(async () => await testFn(good), true);
  }))
}
function testBadAsync(bad, testFn) {
  return Promise.all(bad.map(async bad => {
    return await asyncThrows(async () => await testFn(bad));
  }));
}



class Tests {

  static defaultsField(input, fieldName, expected, test) {
    let check;
    if (typeof expected == 'function') {
      check = (input) => expect(expected(getProp(test(input), fieldName))).to.be.true;
    } else {
      check = (input) => expect(getProp(test(input), fieldName)).eql(expected);
    }

    setProp(input, fieldName, undefined);
    check(input);

    unset(input, fieldName);
    check(input);
  }

  static goodAndBad(good, bad, testFn, opts={}) {
    opts = Object.assign({required: true}, opts);
    ([good, bad] = assignUndefined(good, bad, opts));

    if (opts.async) {
      if (typeof opts.async !== 'function')
        throw Error('opts.async must be a function');
      Promise.all([
        testGoodAsync(good, testFn),
        testBadAsync(bad, testFn)
      ]).then(() => opts.async()).catch(e => opts.async(e));
    } else {
      testGood(good, testFn);
      testBad(bad, testFn);
    }
  }

  static goodAndBadField(input, fieldName, good, bad, testFn, opts={}) {
    opts = Object.assign({required: true}, opts);
    ([good, bad] = assignUndefined(good, bad, opts));
    Tests.goodAndBad(good, bad, assignAndTest(input, fieldName, testFn), opts);
  }

  static requiresField(input, fieldName, good, testFn) {
    input = resolve(input);
    setProp(input, fieldName, good);
    expect(() => testFn(input)).not.to.throw();
    setProp(input, fieldName, undefined);
    expect(() => testFn(input)).to.throw();
    unset(input, fieldName);
    expect(() => testFn(input)).to.throw();
  }

  static allowsAdditionalFields(input, testFn, opts={}) {
    opts = Object.assign({root: '', value: true}, opts);
    const field = (opts.root.length) ? `${opts.root}.askdhaskdhasdakshdkjashdkjashdkjasdh` : 'askdhaskdhasdakshdkjashdkjashdkjasdh';
    setProp(input, field, opts.value);
    expect(() => testFn(input)).not.to.throw();
  }

  static isAnObject(testFn, opts={}) {
    let good = [{}];
    let bad = [true,1,-1,'string',[],()=>{}];
    ({good, bad} = allowFalsy(good, bad, opts.allowFalsy));

    Tests.goodAndBad(good, bad, testFn, opts);
  }
  
  static fieldIsAnObject(input, fieldName, testFn, opts={}) {
    Tests.isAnObject(assignAndTest(input, fieldName, testFn), opts);
  }

  static isAnArray(testFn, opts={}) {
    let good =[[]];
    let bad = [true,1,-1,'string',{},()=>{}];

    Tests.goodAndBad(good, bad, testFn, opts);
  }

  static fieldIsAnArray(input, field, testFn, opts={}) {
    Tests.isAnArray(assignAndTest(input, field, testFn), opts);
  }

  static isAFunction(testFn, opts={}) {
    let good = [()=>{}];
    let bad = [true,false,0,1,-1,'','string',NaN,null,[],{}];

    Tests.goodAndBad(good, bad, testFn, opts);
  }

  static fieldIsAFunction(input, field, testFn, opts={}) {
    Tests.isAFunction(assignAndTest(input, field, testFn), opts);
  }

  static isABoolean(test, opts={}) {
    opts = Object.assign({required: true, allowStrings: false}, opts);

    let good = [true, false];
    let bad = [0,1,-1,'','string',NaN,null,[],()=>{},{}];
    if (opts.allowStrings) {
      good = [...good, 'true', 'false'];
    } else {
      bad = [...bad, 'true', 'false'];
    }

    Tests.goodAndBad(good, bad, test, opts);
  }

  static fieldIsABoolean(input, fieldName, testFn, opts={}) {
    Tests.isABoolean(assignAndTest(input, fieldName, testFn), opts);
  }

  static isAString(testFn, opts={}) {
    opts = Object.assign({required: true, testString: 'string', emptyString: false}, opts);

    let good = [opts.testString];
    let bad = [1,true,[],()=>{},{}];
    ({good, bad} = allowFalsy(good, bad, opts.allowFalsy, {noEmptyString: true}));
    if (opts.emptyString || opts.allowFalsy) {
      good.push('');
    } else {
      bad.push('');
    }

    Tests.goodAndBad(good, bad, testFn, opts);
  }

  static fieldIsAString(input, fieldName, testFn, opts={}) {
    Tests.isAString(assignAndTest(input, fieldName, testFn), opts);
  }

  static isAStringOrStringArray(testFn, opts={}) {
    opts = Object.assign({required: true, testString: 'string', emptyArray: false, emptyString: false}, opts);

    let good = [opts.testString, [opts.testString]];
    let bad = [1,true,()=>{},{}];
    if (opts.emptyArray) {
      good.push([]);
    } else {
      bad.push([]);
    }
    ({good, bad} = allowFalsy(good, bad, opts.allowFalsy, {noEmptyString: true}));
    if (opts.emptyString || opts.allowFalsy) {
      good.push('');
      good.push(['']);
    } else {
      bad.push('');
      bad.push(['']);
    }

    Tests.goodAndBad(good, bad, testFn, opts);
  }

  static fieldIsAStringOrStringArray(input, fieldName, testFn, opts={}) {
    Tests.isAString(assignAndTest(input, fieldName, testFn), opts);
  }


  static isThisString(allowed, testFn, opts={}) {
    let good = resolveArray(allowed);
    opts = Object.assign({required: true}, opts);
    let bad = [1,'string',true,[],()=>{},{},new Date()];
    ({good, bad} = allowFalsy(good, bad, opts.allowFalsy));
    Tests.goodAndBad(good, bad, testFn, opts);
  }

  static fieldIsThisString(input, fieldName, allowed, testFn, opts={}) {
    Tests.isThisString(allowed, assignAndTest(input, fieldName, testFn), opts);
  }

  static isADateString(testFn, opts={}) {
    opts = Object.assign({required: true, emptyString: false}, opts);
    let good = [moment().toISOString()];
    let bad = [1,'string',true,[],()=>{},{},new Date(),moment()];
    ({good, bad} = allowFalsy(good, bad, opts.allowFalsy, {noEmptyString: true}));
    if (opts.emptyString || opts.allowFalsy) {
      good.push('');
    } else {
      bad.push('');
    }
    Tests.goodAndBad(good, bad, testFn, opts);
  }

  static fieldIsADateString(input, fieldName, testFn, opts={}) {
    Tests.isADateString(assignAndTest(input, fieldName, testFn), opts);
  }


  static isANumber(testFn, opts={}) {
    opts = Object.assign({required: true, integer: false, positive: false, nonzero: false, min: false, max: false}, opts);

    let good = [];
    let bad = [true,false,'','string',NaN,null,[],()=>{},{}];


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

  static fieldIsANumber(input, fieldName, testFn, opts={}) {
    Tests.isANumber(assignAndTest(input, fieldName, testFn), opts);
  }



  static isANumberInRange(testFn, opts={}) {
    opts = Object.assign({required: true, integer: false, min: false, max: false}, opts);
    let good = [];
    let bad = [true,false,'','string',NaN,null,[],()=>{},{}];
    let {min, max} = opts;

    if (max === false && min === false) {
      throw new Error('Cannot test for a number in range without either a min or max option');
    }

    if (opts.integer) {
      min = (min !== false) ? Math.ceil(min) : min;
      max = (max !== false) ? Math.floor(max) : max;
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
        bad.push(((min + max) / 2) + 0.000000000001);
      } else {
        good.push(((min + max) / 2) + 0.00000000001);
      }

    } else  if (max !== false) {
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

  static fieldIsANumberInRange(input, fieldName, testFn, opts={}) {
    Tests.isANumberInRange(assignAndTest(input, fieldName, testFn), opts);
  }

  static matchesTheContract(functions, testFn, opts={}) {
    let good = [];
    let bad = [true,1,-1,'string',[],()=>{}, {}];
    ({good, bad} = allowFalsy(good, bad, opts.allowFalsy));

    let goodObj = {};
    if (Array.isArray(functions)) {
      functions.forEach(fn => {
        goodObj[fn] = () => {};
      });
      let fn;
      while (fn = functions.pop()) {
        bad.push(omit(goodObj, fn));
      }

    } else if (typeof functions === 'string') {
      goodObj[functions] = () => {}

    } else if (typeof functions === 'object') {
      const keys = Object.keys(functions);
      keys.forEach(key => {
        goodObj[key] = functions[key];
      });
      let key;
      while (key = keys.pop()) {
        bad.push(omit(goodObj, key));
      }

    } else {
      throw Error('bad functions definition', functions);
    }
    good.push(goodObj);

    Tests.goodAndBad(good, bad, testFn, opts);
  }

  static fieldMatchesTheContract(input, field, functions, testFn, opts={}) {
    Tests.matchesTheContract(functions, assignAndTest(input, field, testFn), opts);
  }
}

module.exports = Tests;