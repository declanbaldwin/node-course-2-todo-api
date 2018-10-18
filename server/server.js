const express = require('express');
const bodyParser = require('body-parser');
const _ = require('lodash');
const port = process.env.PORT || 3000;
const { ObjectID } = require('mongodb');

var { mongoose } = require('./db/mongoose');
var { Todo } = require('./models/todo');
var { User } = require('./models/user');
var app = express();

app.set('view engine', 'ejs');

// app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (request, response) => {
    Todo.find().then((todos) => {
        response.render("index.ejs", {
            todos: todos
        });
    }, (error) => {
        response.status(400).send(error);
    });
});

app.post('/update/:id', (request, response) => {
    console.log(JSON.stringify(request.body));
    let id = request.body.id;

    if (!ObjectID.isValid(id)) {
        console.log('id is not an object');
        return response.status(404).send();
    }
    console.log('id is an object');

    let update = {
        text: request.body.newText,
        completed: true
    }

    Todo.findByIdAndUpdate(id, update).then((todo) => {
        if(!todo) {
            return response.status(404).send();
        }

        response.send({todo});
    }).catch((error) => {
        response.status(400).send();
    });
    response.redirect("/");
});

app.post("/update", (request, response) => {
    console.log(JSON.stringify(request.body));
    let query = {"text": request.body.text};
    let update = {"text": request.body.newText};
    Todo.findOneAndUpdate(query, update).then((todo) => {
        if(!todo) {
            return response.status(404).send();
        }

        response.send({todo});
        response.redirect("/");
    }).catch((error) => {
        response.status(400).send();
    });
});

app.post('/todos', (request, response) => {
    console.log(request.body);
    var todo = new Todo({
        text: request.body.text,
        completed: request.body.completed,
        completedAt: request.body.completedAt
    });

    todo.save().then((document) => {
        response.send(document);
    }, (error) => {
        response.status(400).send(error);
    });
});

app.post('/users', (request, response) => {
    console.log(request.body);
    var user = new User({
        email: request.body.email,
        firstName: request.body.firstName,
        lastName: request.body.lastName
    });

    user.save().then((document) => {
        response.send(document);
    }, (error) => {
        response.status(400).send(error);
    });
});

app.get('/todos', (request, response) => {
    Todo.find().then((todos) => {
        response.send({ todos });
    }, (error) => {
        response.status(400).send(error);
    });
});

app.get('/todos/:id', (request, response) => {
    let id = request.params.id;
    if (!ObjectID.isValid(id)) {
        return response.status(404).send();
    }
    Todo.findById(id).then((todo) => {
        if (!todo) {
            return response.status(404).send();
        }
        response.send({todo});
    }).catch((error) => {
        response.status(400).send();
    });

});

app.delete('/todos/:id', (request, response) => {
    let id = request.params.id;
    if (!ObjectID.isValid(id)) {
        return response.status(404).send();
    }
    Todo.findByIdAndRemove(id).then((todo) => {
        if(!todo) {
            return response.status(404).send();
        }
        response.send({todo});
    }).catch((error) => {
        response.status(400).send();
    });
});

app.patch('/todos/:id', (request, response) => {
    let id = request.params.id;
    //Creates object from request with only the text and completed properties
    let body = _.pick(request.body, ['text', 'completed']);

    if (!ObjectID.isValid(id)) {
        return response.status(404).send();
    }

    if(_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime();
    } else {
        body.completed = false;
        body.completedAt = null;
    }

    Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
        if(!todo) {
            return response.status(404).send();
        }

        response.send({todo});
    }).catch((error) => {
        response.status(400).send();
    });
});

app.listen(port, () => {
    console.log(`Started on port ${port}`);
});

module.exports = {
    app: app
}

