# chai-test-utils 

> Test utils for chai


## Install

```
$ npm install --save chai-test-utils
```

or 

```
$ yarn add chai-test-utils
```

### Dependencies

This package depends on [Joi](https://github.com/hapijs/joi) because I think it's awesome.


## Usage

### Tests

These tests create sets of inputs that you can pass to a test function to check how it responds. They are particularly useful when you want to assert behaviour with different input types or check that input types are handled or rejected as expected.

#### How They Work

The tests create arrays of 'good' and 'bad' args. It calls a `testFn(arg)` that you provide with each of these args in turn. It expects that your function will fail for all the bad args and succeed for all the good args.

So you can think of these more like test harnesses that do the work of generating and applying multiple different inputs to your test functions.

For example, if you have function that requires an argument to be a positive integer, you can create your test as follows:

```js
const requiresAPositiveInt = (arg) => {...}

describe('requiresAPositiveInt()', () => {
    it('requires the first arg to be a positive int', () => {
        Tests.isANumber(arg => requiresAPositiveInt(arg), {required: true, integer: true, positive: true});
        // That's it, your test is complete
    });
});
```

This will generate a set of good args ('Good') that are positive integers and a set of bad args that include a bunch of other types (strings, arrays, functions, NaN, undefined etc) as well as negative ints, non-integer numbers etc. It will call your function with each of these values and expect it to fail for all but the positive integers... just as you requested. It calls the chai `expect()` function itself, so you don't need to.


#### Options

Some tests expose an `opts` parameter. The following options are common to all these tests. Tests may also specify additional per-test parameters which you can find in the documentation for that particular test.

##### boolean required

Default: true

```js
Tests.isAString(testFn, {required: true});
// Will expect testFn(undefined) to throw an error

Tests.isAString(testFn, {required: false});
// Will expect testFn(undefined) to succeed
```

##### function async

You can pass the `done` function in as the async parameter if your function returns a promise/is async. You can also pass in any other function you want, as long as it eventually calls the `done` function too.

```js
it('allows only strings as the first arg for the async function', (done) => {
    Tests.isAString(asyncTestFn, {async: done});
});
```

##### boolean allowFalsy

Default: false

This only applies to `isAnObject`, `isAString`, `isThisString`, `isAStringOrStringArray`, `isADateString`, `matchesTheContract` (and the associated `isField...` tests).

This is useful if you have a check in your function like `arg = arg || somethingElse`, where the internal test itself is based on truthiness.

```js
it('expects the arg to be a string or falsy', () => {
    Tests.isAString(testFn, {allowFalsy: true});
});
```

#### Direct tests

##### goodAndBad(good, bad, testFn, opts)

This is the root test where you can set the expected good and bad inputs manually.

```js
const test = arg => if (arg !== 'a' && arg !== 'b') { throw new Error(); };

const good = ['a', 'b'];
const bad = ['c', 'd'];
Tests.goodAndBad(good, bad, test);
```

##### isAnObject(testFn, opts)

```js
const test = arg => { if (typeof arg !== 'object') { throw new Error(); } };

Tests.isAnObject(test);
```

##### isAFunction(testFn, opts)

```js
const test = arg => { if (typeof arg !== 'function') { throw new Error(); } };

Tests.isAnObject(test);
```

##### isABoolean(testFn, opts)

Additional opts: 

* `allowStrings: false`

```js
const test = arg => { if (arg !== true && arg !== false) { throw new Error(); } };

Tests.isABoolean(test);
```

or if strings are allowed

```js
const test = arg => Joi.attempt(arg, Joi.boolean().required());

Tests.isABoolean(test, {allowStrings: true});
```

##### isAString(testFn, opts);

Additional opts: 

* `testString: 'string'`
* `emptyString: false`

```js
const test = arg => Joi.attempt(arg, Joi.string().required());

Tests.isAString(test);
```

If only certain strings are allowed (e.g. they have to be formatted as IP addresses):

```js
const test = arg => Joi.attempt(arg, Joi.string().ip().required());

Tests.isAString(test, {testString: '0.0.0.0'});
```

Empty strings are by default considered 'bad' arguments. If you wish to allow the empty string:

```js
const test = arg => { if (typeof arg !== 'string') { throw new Error(); } }

Tests.isAString(test, {emptyString: true});
```


##### isAStringOrStringArray(testFn, opts)

This is useful where inputs can be strings or array of strings

Additional opts:

* Same as `isAString`
* `emptyArrays: false` 

```js
const test = arg => ...error if not a string or array of strings...

Tests.isAStringOrStringArray(test);
```

If the empty array is allowed

```js
Tests.isAStringOrStringArray(test, {emptyArray: true});
```

##### isThisString(allowed, test, opts)

Good for enums

```js
const enum = ['a', 'b', 'c']

const test = arg => { if (!enum.includes(arg) { throw new Error(); } }

Tests.isThisString(enum, test);
```

##### isADateString(test, opts)

This is based on the `Joi.string().isoDate()` check. This will match for `moment().toISOString()`, which is the use-case I built this for.

```js
const test = arg => Joi.attempt(arg, Joi.string().isoDate().required());

Tests.isADateString(test);
```

Empty strings are by default considered 'bad' arguments. If you wish to allow the empty string:

```js
const test = arg => Joi.attempt(arg, Joi.alternatives().try(Joi.only('').required(), Joi.string().isoDate().required()));

Tests.isADateString(test);
```


##### isANumber(test, opts)

Additional Opts:

* `integer: false`
* `positive: false`
* `nonzero: false`

By default this will allow any number

```js
const test = arg => { if (isNaN(arg) { throw new Error(); } }

Tests.isANumber(test);
```

You can specify that it must be a non-zero, positive integer

```js
const test = arg { if (isNaN(arg) || !Number.isInteger(arg) || arg < 1) { throw new Error(); } }

Tests.isANumber(test, {positive: true, integer: true, nonzero: true});
```

And if zero is allowed:

```js
const test = arg { if (isNaN(arg) || !Number.isInteger(arg) || arg < 0) { throw new Error(); } }

Tests.isANumber(test, {positive: true, integer: true});
```


##### isANumberInRange(test, opts)

Additional Opts:

* `min: false`
* `max: false`
* `integer: false`

This will throw an error if neither `min` nor `max` are defined or `min < max`.

Limits are treated as inclusive.

```
const test = n => Joi.assert(n, Joi.number().integer().min(0).max(10));

Tests.isANumberInRange(test, {integer: true, min: 0, max: 10});
```


##### matchesTheContract(functions, test, opts)

This checks if the argument is an object which matches a specific contract. 

The contract is defined as the functions argument and can be one of the following:

* an array of strings containing method names
* a string matching just one method name
* an object with methods

The latter is most useful when you need to pass in mocks, as the first two options will only pass in an empty function `()=>{}`

###### Contract defined via array

```js
const test = (arg) => Joi.attempt(arg, Joi.object({myMethod: Joi.func().required()}

Tests.matchesTheContract(['myMethod'], test);
```

###### Contract defined via string

```js
const test = (arg) => Joi.attempt(arg, Joi.object({myMethod: Joi.func().required()}

Tests.matchesTheContract('myMethod', test);
```

###### Contract defined via object

```js
const test = (arg) => {
    Joi.attempt(arg, Joi.object({myMethod: Joi.func().required()}
    const result = arg.myMethod();
    ... do something with result...
}

const mock = {
    myMethod: sinon.stub().returns(...); 
}

Tests.matchesTheContract({myMethod: mock, test);
```



#### Field-based tests for objects

All the following direct tests have an associated object-field test with identical functionality:

* `goodAndBad(...) -> goodAndBadField(object, fieldName, ...)`
* `isAnObject(...) -> fieldIsAnObject(object, fieldName, ...)`
* `isAFunction(...) -> fieldIsAFunction(object, fieldName, ...)`
* `isABoolean(...) -> fieldIsABoolean(object, fieldName, ...)`
* `isAString(...) -> fieldIsAString(object, fieldName, ...)` 
* `isAStringOrStringArray(...) -> fieldIsAStringOrStringArray(object, fieldName, ....)`
* `isThisString(...) -> fieldIsThisString(object, fieldName, ...)`
* `isADateString(...) -> fieldIsADateString(object, fieldName, ...)`
* `isANumber(...) -> fieldIsANumber(object, fieldName, ...)`
* `matchesTheContract(...) -> fieldMatchesTheContract(object, fieldName, ...)`


e.g.

```js
const test = obj => { if (isNaN(obj.field)) { throw new Error(); } }

Tests.fieldIsANumber(obj, 'field', test);
```


##### defaultsField(object, fieldName, expectedValue, testFn)

```js
it('expects the field to default if unset', () => {
    function test(object) {
        object.field = object.field || 1;
        if (object.field != 1) {
            throw new Error();
    }
    Tests.DefaultsField({}, 'field', 1, test);    
});
```

*NB: This will try two tests: one where the field is set to undefined and the other where the field is unset. So it does not matter what state the object is before the test runs*

##### requiresField(object, fieldName, good, testFn)

`good` here is for you to set an example of a good field, as this test does not check types etc.

```js
const test = arg => { if (!arg.myField) { throw new Error(); } }

Tests.requiresField({}, 'myField', 'somestring', test);
```

*NB This is one of the few functions without an `opts` parameter.*



### Functions

#### asyncTest(fn)

Syntactic sugar for handling `done()` and errors in async functions.

```js
it('should do something', asyncTest(async () => {
    ... some async functionality
}));
```

#### asyncThrows(fn, not=false)

Syntactic sugar for asserting expectations for throws in async functions

```js
it('should throw asynchronously', asyncTest(async () => {
    await asyncThrows(async () => {
        throw new Error();
    });
}));
```

or, if you want to assert that an error is not thrown

```js
it('should not throw asynchronously', asyncTest(async () => {
    await asyncThrows(async () => {
        throw new Error();
    }, true);
}));
```


#### resolveAndTick(fn)

This allows you to ensure that your checking code is run after async code like promises etc have definitely had a chance to run. Very useful if you trigger functions that have deep promise structures or multistep promise-based workflows with mocks. 

```js
it('should check for deep promise resolution', (done) => {
    const promise = someInitialisingCode(someDeepMockFn);
    ... potentially additional steps which create promises or trigger async functionality
    resolveAndTick(() => {
        expect(someDeepMockFn).to.have.been.called;
        done();
    });
});
```

## License

UNLICENSED © [Alastair Brayne](builtbybrayne.com)
