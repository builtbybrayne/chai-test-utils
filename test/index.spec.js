'use strict';
import 'babel-polyfill';
const chai = require('chai');
const expect = chai.expect;
chai.use(require('chai-as-promised'));

import * as Index from '../src/index';

describe('Index', function(){
  it('should expose the functions', () => {
    expect(Index.asyncThrows).to.be.a('function');
    expect(Index.resolveAndTick).to.be.a('function');
    expect(Index.asyncTest).to.be.a('function');
  });

  it('exposes the Test object', () => {
    expect(Index.Tests).to.exist;
    expect(Index.Tests.goodAndBad).to.be.a('function');
  });
  
});
