// const MongoClient = require('mongodb').MongoClient;
// const assert = require('assert');

const {MongoClient, ObjectID} = require('mongodb');

// var obj = new ObjectID();
// console.log(obj);

const url = 'mongodb://localhost:27017/TodoApp';

MongoClient.connect(url, (error, client) => {
    if(error) {
        console.log('Unable to connect to mongodb server');
    }
    console.log('Connected to mongodb server');

    const db = client.db('TodoApp');

    // db.collection('Todos').insertOne({
    //     text: 'Insert Text',
    //     completed: false
    // }, (error, result) => {
    //     if(error) {
    //         return console.log('Unable to insert todo', error);
    //     }

    //     console.log(JSON.stringify(result.ops, undefined, 2));
    // });

    db.collection('Users').insertOne({
        name: 'DB4',
        age: 24,
        location: 'London'
    }, (error, result) => {
        if(error) {
            return console.log('Unable to insert todo', error);
        }

        console.log(JSON.stringify(result.ops, undefined, 2));
        console.log(result.ops[0]._id.getTimestamp());
    });

    client.close();
});