var mongoose = require('mongoose');

var Todo = mongoose.model('Todo', {
    text: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    filepath: {
        type: String,
        minlength: 1,
        trim: true,
        default: null
    },
    id: {
        required: true,
        type: Number
    }
});

module.exports = {
    Todo: Todo
};