const assert = require("assert");
const User = require("../src/user.js");

describe("Reading Users out of the database", () => {
  let joe, maria, alex, zach;
  beforeEach(done => {
    alex = new User({name : 'Alex'});
    maria = new User({name: 'Maria'});
    zach = new User({name: 'Zach'});
    joe = new User({name: "Joe"});

    Promise.all([alex.save(), joe.save(), maria.save(), zach.save()])
      .then(() => done());
  });

  it("finds all users with a name of joe", done => {
    User.find({name: "Joe"}).then(users => {
      assert(users[0]._id.toString() === joe._id.toString());
      done();
    });
  });

  it("find a user with particular id", done => {
    User.findOne({_id: joe._id}).then(user => {
      assert(user.name === "Joe");
      done();
    });
  });

  it('can skip and limit the result set', done => {
    User.find({})
      .sort({ name: 1 }) // sort name from A to Z
      .skip(1)
      .limit(2)
      .then(users => {
        console.log(users)
        assert(users.length === 2)
        assert(users[0].name === 'Joe');
        assert(users[1].name === 'Maria');
        done();
      })
  });
});
