const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;
const { ObjectID } = require('mongodb');
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (request, file, callback) {
        callback(null, 'uploads/');
    },
    filename: function (request, file, callback) {
        callback(null, file.originalname + '-' + Date.now());
    }
});
const upload = multer({ storage: storage });
const { mongoose } = require('./db/mongoose');
const { Todo } = require('./models/todo');
const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.json());
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

app.post('/delete', (request, response) => {
    console.log('delete');
    response.redirect('/');
    Todo.updateMany({},
        {
            $set:
            {
                "completed": false,
                "filepath": null
            }
        }).then(() => {
            console.log('reset');
            const directory = './uploads';

            fs.readdir(directory, (error, files) => {
                if (error) return response.status(404).send();
                for (const file of files) {
                    fs.unlink(path.join(directory, file));
                }
            });
            console.log('deleted files');
        });
});

app.post('/file/:id', upload.single('file-to-upload'), (request, response) => {
    console.log(JSON.stringify(request.file));
    let filepath = request.file.path;
    let id = request.body.id;

    if (!ObjectID.isValid(id)) {
        console.log('id is not an object');
        return response.status(404).send();
    }

    if (!filepath) {
        console.log('Filepath not found');
        return response.status(404).send();
    }

    let update = {
        filepath: filepath,
        completed: true
    };

    Todo.findByIdAndUpdate(id, update).then((todo) => {
        if (!todo) {
            console.log('Unable to find todo');
            return response.status(404).send();
        }

        response.send({ todo });
    }).catch((error) => {
        response.status(400).send();
    });
    response.redirect('/');
});

app.listen(port, () => {
    console.log(`Started on port ${port}`);
});

module.exports = {
    app: app
};

