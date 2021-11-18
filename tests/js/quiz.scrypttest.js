const { expect } = require('chai');//js单元测试
const { buildContractClass } = require('scryptlib');//scrypt单元测试包，js与scrypt
const { compileContract } = require('../../helper');

describe('Test sCrypt contract quiz In Javascript', () => {
  let quiz, result;

  before(() => {
    const Quiz = buildContractClass(compileContract('quiz.scrypt'));
    quiz = new Quiz(4,-1,10,2,1,8);
  });

  it('should return true', () => {
    result = quiz.submitAnswer(3,2).verify()
    expect(result.success, result.error).to.be.true
  });

  it('should throw error', () => {
    result = quiz.submitAnswer(2,1).verify()
    expect(result.success, result.error).to.be.false
  });
});