'use strict';
import 'babel-polyfill';
const chai = require("chai");
const expect = chai.expect;
chai.use(require('chai-as-promised'));

import Joi from 'joi';
import {Tests} from "../src/index";


describe('Tests', () => {

  let input;
  let field;

  beforeEach(() => {
    input = {};
    field = 'field';
  });

  it('tests goodAndBad() array inputs', () => {
    const good = ['a','b','c'];
    const bad = ['d', 'e', 'f'];
    const testFn = (input) => Joi.attempt(input, Joi.any().only(good).required());

    Tests.goodAndBad(good, bad, testFn);
  });

  it('tests goodAndBad() with single inputs', () => {
    const good = 'a';
    const bad = 'd';
    const testFn = (input) => Joi.attempt(input, Joi.any().only(good).required());

    Tests.goodAndBad(good, bad, testFn);
  });

  it('requires the opts.async to be a function (done)', () => {
    Tests.isAFunction((async) => Tests.goodAndBad([],[],()=>{},{async}));
  });

  it('tests for good and bad with async test fn', (done) => {
    const good = [1, 2];
    const bad = [3, 4];
    const testFn = async (val) => (val < 3) ? Promise.resolve(val) : Promise.reject(`bad ${val}`);
    Tests.goodAndBad(good, bad, testFn, {async: done});
  });

  it('tests goodAndBadField() array inputs', () => {
    const good = ['a', 'b', 'c'];
    const bad = ['d', 'e', 'f'];
    const test = (input) => Joi.attempt(input, Joi.object({field: Joi.any().only(good).required()}).required());
    Tests.goodAndBadField(input, field, good, bad, test);
  });

  it('tests goodAndBadField() with single inputs', () => {
    const good = 'a';
    const bad = 'd';
    const test = (input) => Joi.attempt(input, Joi.object({field: Joi.any().only(good).required()}).required());
    Tests.goodAndBadField(input, field, good, bad, test);
  });

  it('tests goodAndBadFields with dot notation', () => {
    const good = 'a';
    const bad = 'b';
    const test = (input) => Joi.attempt(input, Joi.object({field: Joi.object({field:Joi.any().only(good).required()}).required()}).required());
    Tests.goodAndBadField(input, 'field.field', good, bad, test);
  });


  it('tests for required fields', () => {
    const good = 'good';
    const testFn = (input) => Joi.attempt(input, Joi.object({field: Joi.only(good).required()}).required());

    Tests.requiresField(input, field, good, testFn);
  });

  it('tests for required fields using dot notation', () => {
    const good = 'good';
    const testFn = (input) => Joi.attempt(input, Joi.object({field: Joi.object({field: Joi.only(good).required()}).required()}).required());
    Tests.requiresField(input, 'field.field', good, testFn);
  });

  it('tests for allowing additional fields', () => {
    const testFn = (input) => Joi.attempt(input, Joi.object().unknown(true).required());
    Tests.allowsAdditionalFields(input, testFn);
  });
  
  it('tests for allowing additional fields with dot notation', () => {
    const testFn = (input) => Joi.attempt(input, Joi.object({field: Joi.object({field: Joi.object().unknown(true).required()}).required()}).required());
    Tests.allowsAdditionalFields(input, testFn, {root: 'field.field'});
  });

  it('test for booleans', () => {
    const testFn = (input) => {if (typeof input !== 'boolean') { throw new Error(); };}
    Tests.isABoolean(testFn);
  });

  it('tests for booleans, allowing strings', () => {
    const testFn = input => Joi.attempt(input, Joi.boolean().required());
    Tests.isABoolean(testFn, {allowStrings: true});
  });

  describe('strings', () => {

    let testString;
    beforeEach(() => {
      testString = 'testtesttest';
    });

    it('tests for strings, required by default', () => {
      const test = (input) => Joi.attempt(input, Joi.string().required());
      Tests.isAString(test);
    });
    it('tests for required strings', () => {
      const test = (input) => Joi.attempt(input, Joi.string().required());
      Tests.isAString(test, {required: true});
    });
    it('tests for optional strings', () => {
      const test = (input) => Joi.attempt(input, Joi.string().optional());
      Tests.isAString(test, {required: false});
    });
    it('tests for strings allowing falsies', () => {
      const test = (input) => Joi.attempt(input || 'string', Joi.string().optional());
      Tests.isAString(test, {allowFalsy: true});
    });
    it('tests for strings including empty string', () => {
      const test = (input) => { if (typeof input !== 'string') { throw new Error() } };
      Tests.isAString(test, {emptyString: true});
    });

    it('tests for constrained strings, required by default', () => {
      const test = (input) => Joi.attempt(input, Joi.string().only(testString).required());
      Tests.isAString(test, {testString});
    });
    it('tests for constrained required strings', () => {
      const test = (input) => Joi.attempt(input, Joi.string().only(testString).required());
      Tests.isAString(test, {required: true, testString});
    });
    it('tests for constrained optional strings', () => {
      const test = (input) => Joi.attempt(input, Joi.string().only(testString).optional());
      Tests.isAString(test, {required: false, testString});
    });

    it('tests fields for strings, required by default', () => {
      const test = (input) => Joi.attempt(input, Joi.object({field: Joi.string().required()}).required());
      Tests.fieldIsAString(input, field, test);
    });
    it('tests fields for required strings', () => {
      const test = (input) => Joi.attempt(input, Joi.object({field: Joi.string().required()}).required());
      Tests.fieldIsAString(input, field, test, {required: true});
    });
    it('tests fields for optional strings', () => {
      const test = (input) => Joi.attempt(input, Joi.object({field: Joi.string().optional()}).required());
      Tests.fieldIsAString(input, field, test, {required: false});
    });

    it('tests fields for constrained strings, required by default', () => {
      const test = (input) => Joi.attempt(input, Joi.object({field: Joi.string().only(testString).required()}).required());
      Tests.fieldIsAString(input, field, test, {testString});
    });
    it('tests fields for constrained requires strings', () => {
      const test = (input) => Joi.attempt(input, Joi.object({field: Joi.string().only(testString).required()}).required());
      Tests.fieldIsAString(input, field, test, {required: true, testString});
    });
    it('tests fields for constrained optional strings', () => {
      const test = (input) => Joi.attempt(input, Joi.object({field: Joi.string().only(testString).optional()}).required());
      Tests.fieldIsAString(input, field, test, {required: false, testString});
    });

    it('tests fieldIsAString with dot notation', () => {
      const test = (input) => Joi.attempt(input, Joi.object({field: Joi.object({field: Joi.string().required()}).required()}).required());
      Tests.fieldIsAString(input, 'field.field', test);
    });

    it('tests for strings or string arrays inc. empty array', () => {
      const test = (input) => Joi.attempt(input, Joi.alternatives().try(Joi.string().required(), Joi.array().items(Joi.string()).required()).required());
      Tests.isAStringOrStringArray(test, {emptyArray: true});
    });
    it('tests for strings or string arrays, exc. empty array', () => {
      const test = (input) => Joi.attempt(input, Joi.alternatives().try(Joi.string().required(), Joi.array().items(Joi.string().required()).required()).required());
      Tests.isAStringOrStringArray(test, {emptyArray: false});
    });
    it('tests for strings or string arrays allowing empty strings', () => {
      const test = (input) => Joi.attempt(input, Joi.alternatives().try(Joi.string().required().allow(''), Joi.array().items(Joi.string().allow('').required()).required()).required());
      Tests.isAStringOrStringArray(test, {emptyString: true});
    });



    it('tests isThisString', () => {
      const allowed = ['a', 'b', 'c'];
      const test = (input) => Joi.attempt(input, Joi.string().only(allowed).required());
      Tests.isThisString(allowed, test);
    });
    it('tests isThisString allowing falsies', () => {
      const allowed = ['a', 'b', 'c'];
      const test = (input) => Joi.attempt(input || 'a', Joi.string().only(allowed).required());
      Tests.isThisString(allowed, test, {allowFalsy: true});
    });

    it('tests fieldIsThisString', () => {
      const allowed = ['a', 'b', 'c'];
      const test = (input) => Joi.attempt(input, Joi.object({field: Joi.string().only(allowed).required()}).required());
      Tests.fieldIsThisString(input, field, allowed, test);
    });

    it('tests fieldIsThisString with dot notation', () => {
      const allowed = ['a', 'b', 'c'];
      const test = (input) => Joi.attempt(input, Joi.object({field: Joi.object({field: Joi.string().only(allowed).required()}).required()}).required());
      Tests.fieldIsThisString(input, 'field.field', allowed, test);
    });
  });

  describe('dates', () => {
    it('tests for date strings, required by default', () => {
      const test = (input) => Joi.attempt(input, Joi.string().isoDate().required());
      Tests.isADateString(test);
    });
    it('tests for required date strings', () => {
      const test = (input) => Joi.attempt(input, Joi.string().isoDate().required());
      Tests.isADateString(test, {required: true});
    });
    it('tests for optional date strings', () => {
      const test = (input) => Joi.attempt(input, Joi.string().isoDate().optional());
      Tests.isADateString(test, {required: false});
    });
    it('tests for date strings, allowing empty string', () => {
      const test = (input) => Joi.attempt(input, Joi.string().isoDate().required().allow(''));
      Tests.isADateString(test, {emptyString: true});
    });

    it('tests field for date string, required by default', () => {
      const test = (input) => Joi.attempt(input, Joi.object({field: Joi.string().isoDate().required()}).required());
      Tests.fieldIsADateString(input, field, test);
    });
    it('tests field for required date string', () => {
      const test = (input) => Joi.attempt(input, Joi.object({field: Joi.string().isoDate().required()}).required());
      Tests.fieldIsADateString(input, field, test);
    });
    it('tests field for optional date string', () => {
      const test = (input) => Joi.attempt(input, Joi.object({field: Joi.string().isoDate().optional()}).required());
      Tests.fieldIsADateString(input, field, test, {required: false});
    });
  });

  describe('numbers', () => {
    it('tests for numbers, required, including zero and any sign by default', () => {
      const test = (input) => Joi.attempt(input, Joi.number().required());
      Tests.isANumber(test);
    });

    it('tests for required numbers, including zero and any sign by default', () => {
      const test = (input) => Joi.attempt(input, Joi.number().required());
      Tests.isANumber(test, {required: true});
    });
    it('tests for optional numbers, including zero and any sign by default', () => {
      const test = (input) => Joi.attempt(input, Joi.number().optional());
      Tests.isANumber(test, {required: false});
    });

    it('tests for integer numbers', () => {
      const test = (input) => Joi.attempt(input, Joi.number().integer().required());
      Tests.isANumber(test, {integer: true});
    });
    it('tests for integer numbers', () => {
      const test = (input) => Joi.attempt(input, Joi.number().integer().required());
      Tests.isANumber(test, {integer: true});
    });
    it('tests for positive numbers, include zero by default', () => {
      const test = (input) => Joi.attempt(input, Joi.number().min(0).required());
      Tests.isANumber(test, {positive: true});
    });
    it('tests for positive numbers, include zero', () => {
      const test = (input) => Joi.attempt(input, Joi.number().min(0).required());
      Tests.isANumber(test, {positive: true, nonzero: false});
    });
    it('tests for positive numbers, excluding zero', () => {
      const test = (input) => Joi.attempt(input, Joi.number().positive().required());
      Tests.isANumber(test, {positive: true, nonzero: true});
    });

    it('tests for positive integer numbers, including zero by default', () => {
      const test = (input) => Joi.attempt(input, Joi.number().integer().min(0).required());
      Tests.isANumber(test, {positive: true, integer: true});
    });
    it('tests for positive integer numbers, including zero', () => {
      const test = (input) => Joi.attempt(input, Joi.number().integer().min(0).required());
      Tests.isANumber(test, {positive: true, integer: true, nonzero: false});
    });
    it('tests for positive integer numbers, excluding zero', () => {
      const test = (input) => Joi.attempt(input, Joi.number().integer().min(1).required());
      Tests.isANumber(test, {positive: true, integer: true, nonzero: true});
    });


    it('tests fields for numbers, required, including zero and any sign by default', () => {
      const test = (input) => Joi.attempt(input, Joi.object({field: Joi.number().required()}).required());
      Tests.fieldIsANumber(input, field, test);
    });

    it('tests fields for required numbers, including zero and any sign by default', () => {
      const test = (input) => Joi.attempt(input, Joi.object({field: Joi.number().required()}).required());
      Tests.fieldIsANumber(input, field, test, {required: true});
    });
    it('tests fields for optional numbers, including zero and any sign by default', () => {
      const test = (input) => Joi.attempt(input, Joi.object({field: Joi.number().optional()}).required());
      Tests.fieldIsANumber(input, field, test, {required: false});
    });

    it('tests fields for integer numbers', () => {
      const test = (input) => Joi.attempt(input, Joi.object({field: Joi.number().integer().required()}).required());
      Tests.fieldIsANumber(input, field, test, {integer: true});
    });
    it('tests fields for positive numbers, include zero by default', () => {
      const test = (input) => Joi.attempt(input, Joi.object({field: Joi.number().min(0).required()}).required());
      Tests.fieldIsANumber(input, field, test, {positive: true});
    });
    it('tests fields for positive numbers, include zero', () => {
      const test = (input) => Joi.attempt(input, Joi.object({field: Joi.number().min(0).required()}).required());
      Tests.fieldIsANumber(input, field, test, {positive: true, nonzero: false});
    });
    it('tests fields for positive numbers, excluding zero', () => {
      const test = (input) => Joi.attempt(input, Joi.object({field: Joi.number().positive().required()}).required());
      Tests.fieldIsANumber(input, field, test, {positive: true, nonzero: true});
    });

    it('tests fields for positive integer numbers, including zero by default', () => {
      const test = (input) => Joi.attempt(input, Joi.object({field: Joi.number().integer().min(0).required()}).required());
      Tests.fieldIsANumber(input, field, test, {positive: true, integer: true});
    });
    it('tests fields for positive integer numbers, including zero', () => {
      const test = (input) => Joi.attempt(input, Joi.object({field: Joi.number().integer().min(0).required()}).required());
      Tests.fieldIsANumber(input, field, test, {positive: true, integer: true, nonzero: false});
    });
    it('tests fields for positive integer numbers, excluding zero', () => {
      const test = (input) => Joi.attempt(input, Joi.object({field: Joi.number().integer().min(1).required()}).required());
      Tests.fieldIsANumber(input, field, test, {positive: true, integer: true, nonzero: true});
    });
  });
  
  it('should default the field', () => {
    const test = (input) => Joi.attempt(input, Joi.object({field: Joi.any().default('def')}));
    Tests.defaultsField(input, field, 'def', test);
  });

  it('should default the field with dot notation', () => {
    const test = (input) => Joi.attempt(input, Joi.object({field: Joi.object({field: Joi.object({field: Joi.any().default('def')})}).required()}).required());
    Tests.defaultsField(input, 'field.field.field', 'def', test);
  });

  it('defaults fields, accepting functions as the expected value, resolving at check time', () => {
    const test = (input) => Joi.attempt(input, Joi.object({field: Joi.any().default('def')}));
    Tests.defaultsField(input, field, (result) => result == 'def', test);
  });

  it('defaults fields, accepting functions as the expected value, resolving at check time with dot notation', () => {
    const test = (input) => Joi.attempt(input, Joi.object({field: Joi.object({field: Joi.object({field: Joi.any().default('def')})}).required()}).required());
    Tests.defaultsField(input, 'field.field.field', (result) => result == 'def', test);
  });

  it('should test for objects', () => {
    const test = (input) => Joi.attempt(input, Joi.object().required());
    Tests.isAnObject(test);
  });
  it('should test for field objects', () => {
    const test = (input) => Joi.attempt(input, Joi.object({field: Joi.object().required()}).required());
    Tests.fieldIsAnObject(input, field, test);
  });

  it('should allow falsies for objects', () => {
    const test = (input) => Joi.attempt(input || {}, Joi.object().required());
    Tests.isAnObject(test, {allowFalsy: true});
  });

  it('should test for functions', () => {
    const test = (input) => Joi.attempt(input, Joi.func().required());
    Tests.isAFunction(test);
  });
  it('should test for field functions', () => {
    const test = (input) => Joi.attempt(input, Joi.object({field: Joi.func().required()}).required());
    Tests.fieldIsAFunction(input, field, test);
  });

  it('should check for contract matches by array', () => {
    const test = (input) => Joi.attempt(input, Joi.object({
      test: Joi.func().required(),
      test2: Joi.func().required(),
    }).required());
    Tests.matchesTheContract(['test', 'test2'], test, {required: true});
  });
  it('should check for contract matches by array, allowing falsies', () => {
    const test = (input) => {
      if (input) {
        Joi.attempt(input, Joi.object({
          test: Joi.func().required(),
          test2: Joi.func().required(),
        }).required());
      }
    };
    Tests.matchesTheContract(['test', 'test2'], test, {allowFalsy: true});
  });

  it('should check field matches the contract by array', () => {
    const test = (input) => Joi.attempt(input, Joi.object({field: Joi.object({
      test: Joi.func().required(),
      test2: Joi.func().required()
    }).required()}).required());
    Tests.fieldMatchesTheContract(input, field, ['test', 'test2'], test, {required: true});
  });

  it('should check for contract matches by string', () => {
    const test = (input) => Joi.attempt(input, Joi.object({
      test: Joi.func().required()
    }).required());
    Tests.matchesTheContract('test', test, {required: true});
  });
  it('should check for contract matches by string, allowing falsies', () => {
    const test = (input) => {
      if (input) {
        Joi.attempt(input, Joi.object({
          test: Joi.func().required()
        }).required());
      }
    }
    Tests.matchesTheContract('test', test, {allowFalsy: true});
  });


  it('should check field matches the contract by string', () => {
    const test = (input) => Joi.attempt(input, Joi.object({field: Joi.object({
      test: Joi.func().required()
    }).required()}).required());
    Tests.fieldMatchesTheContract(input, field, 'test', test, {required: true});
  });

  it('should check field matches the contract by string, allowing falsies', () => {
    const test = (input) => {
      if (input.field) {
        Joi.attempt(input, Joi.object({field: Joi.object({
          test: Joi.func().required()
        }).required()}).required());
      }
    };
    Tests.fieldMatchesTheContract(input, field, 'test', test, {allowFalsy: true});
  });

  it('should check for contract matches by object', () => {
    const fn = () => {};
    const test = (input) => {
      const output = Joi.attempt(input, Joi.object({
        test: Joi.func().required()
      }).required());
      if (input.test !== fn) {
        throw Error('Contract fail');
      }
      return output;
    };
    Tests.matchesTheContract({'test': fn}, test, {required: true});
  });

  it('should check for contract matches by object, allowing falsies', () => {
    const fn = () => {};
    const test = (input) => {
      if (input) {
        const output = Joi.attempt(input, Joi.object({
          test: Joi.func().required()
        }).required());
        if (input.test !== fn) {
          throw Error('Contract fail');
        }
        return output;
      }
      return input;
    };
    Tests.matchesTheContract({'test': fn}, test, {allowFalsy: true});
  });

  it('should check field matches the contract by object', () => {
    const fn = (x) => {};
    const test = (input) => {
      const output = Joi.attempt(input, Joi.object({field: Joi.object({
        test: Joi.func().required()
      }).required()}).required());
      if (input.field.test !== fn) {
        throw Error('Contract fail');
      }
      return output;
    };
    Tests.fieldMatchesTheContract(input, field, {'test': fn}, test, {required: true});
  });
  
});