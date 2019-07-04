const assert = require("assert");
const User = require("../src/user.js");

describe("Creating records", () => {
  it("saves a user", done => {
    const joe = new User({
      name: "Joe"
    });
    joe.save().then(() => {
      //isNew is a flag. If it model instance is saved then isNew will be false
      //if model is still not saved to the mongo then isNew will be true
      assert(!joe.isNew);
      done();
    });
  });
});
