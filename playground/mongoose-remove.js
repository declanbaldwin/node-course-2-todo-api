const {ObjectID} = require('mongodb');
const {mongoose} = require("../server/db/mongoose.js");
const {Todo} = require("../server/models/todo.js");
const {User} = require("../server/models/user.js");

// Todo.remove({}).then((result) => {
//     console.log(result);
// });

// Todo.findOneAndRemove({})
// Todo.findByIdAndRemove()

// Todo.findOneAndRemove({
//     _id: '5bc6d91dbb990e7139531ede'
// }).then((document) => {
//     console.log(document);
// });

Todo.findByIdAndRemove('5bc6d91dbb990e7139531ede').then((document) => {
    console.log(document);
});
