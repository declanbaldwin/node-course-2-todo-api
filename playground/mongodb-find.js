// const MongoClient = require('mongodb').MongoClient;
// const assert = require('assert');

const {MongoClient, ObjectID} = require('mongodb');

const url = 'mongodb://localhost:27017/TodoApp';

MongoClient.connect(url, (error, client) => {
    if(error) {
        console.log('Unable to connect to mongodb server');
    }
    console.log('Connected to mongodb server');

    const db = client.db('TodoApp');

    // db.collection('Todos').find({
    //     _id: new ObjectID('5b9a12e680962e20703aca1c')
    // }).toArray().then((docs) => {
    //     console.log('Todos');
    //     console.log(JSON.stringify(docs, undefined, 2));
    // }, (error) => {
    //     console.log('Unable to fetch todos', error)
    // });

    // db.collection('Todos').find().count().then((count) => {
    //     console.log('Todos');
    //     console.log(`Todos count: ${count}`);
    // }, (error) => {
    //     console.log('Unable to fetch todos', error)
    // });

    db.collection('Users').find({
        name: 'DB4'
    }).toArray().then((docs) => {
        console.log('Users');
        console.log(docs);/
        console.log(JSON.stringify(docs, undefined, 2));
    }, (error) => {
        console.log('Unable to fetch todos', error)
    });

   



    // client.close();
});