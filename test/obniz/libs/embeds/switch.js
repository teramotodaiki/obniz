let chai = require('chai');
let expect = chai.expect;
let sinon = require('sinon');

let testUtil = require(global.appRoot + '/test/testUtil.js');
chai.use(require('chai-like'));
chai.use(testUtil.obnizAssert);

describe('obniz.libs.switch', function() {
  beforeEach(function(done) {
    return testUtil.setupObnizPromise(this, done);
  });

  afterEach(function(done) {
    return testUtil.releaseObnizePromise(this, done);
  });

  it('onchange', function() {
    let stub = sinon.stub();
    this.obniz.switch.onchange = stub;
    expect(this.obniz).to.be.obniz;
    sinon.assert.callCount(stub, 0);

    testUtil.receiveJson(this.obniz, [{ switch: { state: 'none' } }]);

    sinon.assert.callCount(stub, 1);
    expect(stub.getCall(0).args[0]).to.be.equal('none');

    expect(this.obniz).to.be.finished;
  });

  it.skip('onchange changeしてないのにaction:getに反応しちゃってる', function() {
    let stub = sinon.stub();
    this.obniz.switch.onchange = stub;
    expect(this.obniz).to.be.obniz;
    sinon.assert.callCount(stub, 0);

    testUtil.receiveJson(this.obniz, [
      { switch: { state: 'push', action: 'get' } },
    ]);

    sinon.assert.callCount(stub, 0);

    expect(this.obniz).to.be.finished;
  });

  it('inputWaitLeft', function() {
    return new Promise(
      function(resolve, reject) {
        this.obniz.switch.getWait().then(function(result) {
          expect(result).to.be.equal('left');
          resolve();
        });

        expect(this.obniz).to.be.obniz;
        expect(this.obniz).send([{ switch: 'get' }]);
        expect(this.obniz).to.be.finished;

        setTimeout(
          function() {
            testUtil.receiveJson(this.obniz, [
              { switch: { state: 'left', action: 'get' } },
            ]);
          }.bind(this),
          10
        );
      }.bind(this)
    );
  });
});
