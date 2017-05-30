'use strict';
import 'babel-polyfill';
const chai = require("chai");
const expect = chai.expect;
chai.use(require('chai-as-promised'));

const {asyncTest, asyncThrows} = require("../src/index");

describe('Async', function(){
  it('should correctly run async tests', asyncTest(async () => {
    let result = false;
    const fn = async () => {
      result = true
    };
    await fn();
    expect(result).to.be.true;
  }));

  it('should correctly throw asyncThrows', asyncTest(async () => {
    const error = new Error();
    const result = await asyncThrows(async () => {throw error;});
    expect(result).to.eql(error);

    expect(async () => await asyncThrows(async () => {})).to.reject;
  }));

  it('should correctly not throw asyncThrows', asyncTest(async () => {
    const result = await asyncThrows(async () => {}, true);
    expect(result).not.to.exist;

    expect(async () => await asyncThrows(async () => {})).to.resolve;
  }));
  
});
