'use strict';
const chai = require('chai');
const expect = chai.expect;
chai.use(require('chai-as-promised'));

const Index = require('../src/index');

describe('Index', function(){
  it('should expose the functions', () => {
    expect(typeof Index.asyncThrows).to.eql('function');
    expect(typeof Index.resolveAndTick).to.eql('function');
    expect(typeof Index.asyncTest).to.eql('function');
  });

  it('exposes the Test object', () => {
    expect(Index.Tests).to.exist;
    expect(Index.Tests.goodAndBad).to.be.a('function');
  });
  
});
