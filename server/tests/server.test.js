const expect = require('expect');
const request = require('supertest');
const fs = require('fs');
const path = require('path');

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

// beforeEach((done) => {
//     Todo.remove({}).then(() => {
//         return Todo.insertMany(todos);
//     }).then(() => {
//         done();
//     });
// });
// beforeEach((done) => {
//     Todo.remove({}).then(() => {
//         return Todo.insertMany(todos);
//     }).then(() => {
//         done();
//     });
// });


afterEach(function (done) {
    Todo.remove({"text": 'First test  todo'}).then(() => {
        const directory = './uploads';

        fs.readdir(directory, (error, files) => {
            if (error) return response.status(404).send();
            for (const file of files) {
                fs.unlink(path.join(directory, file));
            }
        });
    }).then(() => {
        done();
    });
});

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
            var hexID = todos[0]._id.toHexString();
            request(app)
                .post(`/file/${hexID}`)
                .field('id', hexID)
                .attach('file-to-upload', './testImage/image.jpg')
                .expect(302)
                .end((error, response) => {
                    console.log('in end');
                    Todo.find({ "text": 'First test  todo' }).then((todos) => {
                        console.log(JSON.stringify(todos));
                        expect(todos.length).toBe(1);
                        done();
                    }).catch((error) => {
                        done(error);
                    });
                });
        });
    });
});


// describe('POST /todos', () => {
//     it('should create a new todo', (done) => {
//         let text = 'Test todo text';

//         request(app)
//             .post('/todos')
//             .send({
//                 text: text
//             })
//             .expect(200)
//             .expect((response) => {
//                 expect(response.body.text).toBe(text);
//             })
//             .end((error, response) => {
//                 if (error) {
//                     return done(error);
//                 }

//                 Todo.find({ text }).then((todos) => {
//                     expect(todos.length).toBe(1);
//                     expect(todos[0].text).toBe(text);
//                     done();
//                 }).catch((error) => {
//                     done(error);
//                 });
//             });
//     });

//     it('should not create a todo with invalid body data', (done) => {
//         request(app)
//             .post('/todos')
//             .send({})
//             .expect(400)
//             .end((error, response) => {
//                 if (error) {
//                     return done(error);
//                 }

//                 Todo.find().then((todos) => {
//                     expect(todos.length).toBe(2);
//                     done();
//                 }).catch(error => {
//                     done(error);
//                 });
//             });
//     });

// });



// describe('GET /todos', () => {
//     it('should get all todos', (done) => {
//         request(app)
//             .get('/todos')
//             .expect(200)
//             .expect((response) => {
//                 expect(response.body.todos.length).toBe(2);
//             })
//             .end(done);
//     });
// });

// describe('GET /todos/:id', () => {
//     it('should return todo document', (done) => {
//         request(app)
//             .get(`/todos/${todos[0]._id.toHexString()}`)
//             .expect(200)
//             .expect((response) => {
//                 expect(response.body.todo.text).toBe(todos[0].text);
//             })
//             .end(done);
//     });

//     it('should return a 404 if todo not found', (done) => {
//         var hexID = new ObjectID().toHexString();
//         request(app)
//             .get(`/todos/${hexID}`)
//             .expect(404)
//             .end(done);
//     });

//     it('should return a 404 for a non Object id', (done) => {
//         request(app)
//             .get('/todos/123')
//             .expect(404)
//             .end(done);
//     });
// });

// describe('DELETE /todos/:id', () => {
//     it('should remove a todo document', (done) => {
//        var hexID = todos[1]._id.toHexString();
//        request(app)
//         .delete(`/todos/${hexID}`)
//         .expect(200)
//         .expect((response) => {
//             expect(response.body.todo._id).toBe(hexID);
//         })
//         .end((error, response) => {
//             if(error) {
//                 return done(error);
//             }

//             Todo.findById(hexID).then((todo) => {
//                 expect(todo).toNotExist();
//                 done();
//             }).catch((error) => {
//                 done(error);
//             });
//         });
//     });

//     it('should return a 404 if todo not found', (done) => {
//         var hexID = new ObjectID().toHexString();
//         request(app)
//             .delete(`/todos/${hexID}`)
//             .expect(404)
//             .end(done);
//     });

//     it('should return a 404 for a non Object id', (done) => {
//         request(app)
//             .delete('/todos/123')
//             .expect(404)
//             .end(done);
//     });
// });

// describe('PATCH /todos/:id', () => {
//     it('should update the todo document', (done) => {
//        var hexID = todos[0]._id.toHexString();
//        request(app)
//         .patch(`/todos/${hexID}`)
//         .send({
//             text: 'update todo',
//             completed: true
//         })
//         .expect(200)
//         .expect((response) => {
//             expect(response.body.todo.text).toBe('update todo');
//             expect(response.body.todo.completed).toBe(true);
//             expect(response.body.todo.completedAt).toBeA('number');
//         })
//         .end(done);
//     });

//     it('should update the todo document', (done) => {
//        var hexID = todos[1]._id.toHexString();
//        request(app)
//         .patch(`/todos/${hexID}`)
//         .send({
//             text: 'different todo text',
//             completed: false
//         })
//         .expect(200)
//         .expect((response) => {
//             expect(response.body.todo.text).toBe('different todo text');
//             expect(response.body.todo.completed).toBe(false);
//             expect(response.body.todo.completedAt).toNotExist();
//         })
//         .end(done);
//     });
// });