import chai from "chai";
import chaiAsPromised from "chai-as-promised";

class Assertions {
  expect: Chai.ExpectStatic;
  assert: Chai.AssertStatic;
  should: Chai.Should;

  constructor() {
    this.expect = chai.expect;
    this.assert = chai.assert;
    this.should = chai.should();
    chai.use(chaiAsPromised);
  }
}

export default Assertions;
