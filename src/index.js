'use strict';
const functions = require('./functions');
const tests = require('./tests');

module.exports = Object.assign({}, functions, {Tests: tests});