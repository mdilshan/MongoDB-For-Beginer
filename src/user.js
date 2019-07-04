const mongoose = require("mongoose");
const PostSchema = require('./Post');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    validate:{
      validator: (name) => name.length > 2,
      message: 'Name must be longer than two characters'
    },
    required: [true, 'Name is required']
  },
  likes: Number,
  posts: [PostSchema],
  blogPosts: [{type: Schema.Types.ObjectId, ref:'blogPost'}]
});

//These are not included in mongoDB. They are exist in only mongoose 
UserSchema.virtual('postCount').get(function(){
  return this.posts.length 
});

UserSchema.pre('remove', function(next){
  const BlogPost = mongoose.model('blogPost')
  //'this' is refer to model instance
  BlogPost.remove({_id : { $in: this.blogPosts }})
    .then(() => next());
});

const User = mongoose.model("user", UserSchema);

module.exports = User;
