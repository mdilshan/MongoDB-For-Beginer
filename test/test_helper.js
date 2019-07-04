const mongoose = require("mongoose");

// connect mongo only one time. This will tell to mocha to do not restart the connection for each testings
before(done => {
  mongoose.connect("mongodb://localhost/users_test", {useNewUrlParser: true});
  mongoose.connection
    .once("open", () => done())
    .on("error", error => console.warn("Error", error));
});

// clean db before each testings
beforeEach(done => {
  const { users, comments, blogposts } = mongoose.connection.collections
  users.drop(() => {
    comments.drop(() => {
      blogposts.drop(() => {
        done();
      });
    });
  });
});
