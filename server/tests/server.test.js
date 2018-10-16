const expect = require('expect');
const request = require('supertest');

const { ObjectID } = require('mongodb');
const {app} = require("../server.js");
const {Todo} = require("../models/todo.js");

const todos = [{
    _id: new ObjectID(),
    text: 'First test  todo'
}, {
    _id: new ObjectID(),
    text: 'Second test todo'
}];

beforeEach((done) => {
    Todo.remove({}).then(() => {
        return Todo.insertMany(todos);
    }).then(() => {
        done();
    });
});

describe('POST /todos', () => {
    it('should create a new todo', (done) => {
        let text = 'Test todo text';

        request(app)
            .post('/todos')
            .send({
                text: text
            })
            .expect(200)
            .expect((response) => {
                expect(response.body.text).toBe(text);
            })
            .end((error, response) => {
                if(error) {
                    return done(error);
                }

                Todo.find({text}).then((todos) => {
                    expect(todos.length).toBe(1);
                    expect(todos[0].text).toBe(text);
                    done();
                }).catch(error => {
                    done(error);
                });
            });
    });

    it('should not create a todo with invalid body data', (done) => {
        request(app)
            .post('/todos')
            .send({})
            .expect(400)
            .end((error, response) => {
                if(error) {
                    return done(error);
                }

                Todo.find().then((todos) => {
                    expect(todos.length).toBe(2);
                    done();
                }).catch(error => {
                    done(error);
                });
            });
    });

    describe('Get /todos', () => {
        it('should get all todos', (done) => {
            request(app)
                .get('/todos')
                .expect(200)
                .expect((response) => {
                    expect(response.body.todos.length).toBe(2);
                })
                .end(done);
        })
    });

    describe('GET /todos/:id', () => {
        it('should return todo document', (done) => {
            request(app)
                .get(`/todos/${todos[0]._id.toHexString()}`)
                .expect(200)
                .expect((response) => {
                    expect(response.body.todo.text).toBe(todos[0].text);
                })
                .end(done);
        });

        it('should return a 404 if todo not found', (done) => {
            var hexID = new ObjectID().toHexString;
            request(app)
                .get(`/todos/${hexID}`)
                .expect(404)
                .end(done);
        });

        it('should return a 404 for a non Object id', (done) => {
            request(app)
                .get('/todos/123')
                .expect(404)
                .end(done);
        });
    });
});