const expect = require('expect');
const request = require('supertest');

const { ObjectID } = require('mongodb');
const { app } = require("../server.js");
const { Todo } = require("../models/todo.js");

const todos = [{
    _id: new ObjectID(),
    text: 'First test  todo',
    id: 1,
    completed: false,
    filepath: null
}];

// afterEach((done) => {
//     Todo.remove({text: todos.text}).then(() => {
//         return;
//     }).then(() => {
//         done();
//     });
// });

describe('GET /', () => {
    it('should render the index page', (done) => {
        request(app)
            .get('/')
            .expect(200)
            .end(done);
    });
});

describe('POST /file/:id', () => {
    it('should update todo', (done) => {
        Todo.insertMany(todos).then(() => {
            console.log(JSON.stringify(todos));
            var hexID = todos[0]._id.toHexString();
            request(app)
                .post(`/file/${hexID}`)
                .field('id', hexID)
                .attach('file-to-upload', './testImage/image.jpg')
                .expect(302)
                .end(done);
        });
    });
});
