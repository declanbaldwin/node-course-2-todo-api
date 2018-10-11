const {ObjectID} = require('mongodb');

const {mongoose} = require("../server/db/mongoose.js");
const {Todo} = require("../server/models/todo.js");
const {User} = require("../server/models/user.js");

// let id = '5bbe3311da8fdb2298222c47';
// let id = '5bbe3311da8fdb2298222c4y11';
let id = '5bbefbc6ecf631289023d3b9';

if(!ObjectID.isValid(id)) {
    console.log('ID not valid');
}

// returns object found or null
User.findById(id).then((user) => {
    if(!user) {
        return console.log('Id not found');
    }
    console.log('User By Id', user);    
}).catch((error) => {
    console.log(error);
});


//returns array or empty array
// Todo.find({
//     _id: id
// }).then((todos) => {
//     console.log('Todos', todos);
// });

// //returns first object found or null
// Todo.findOne({
//     _id: id
// }).then((todo) => {
//     console.log('Todo', todo);    
// });

//returns object found or null
// Todo.findById(id).then((todo) => {
//     if(!todo) {
//         return console.log('Id not found');
//     }
//     console.log('Todo By Id', todo);    
// }).catch((error) => {
//     console.log(error);
// });