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

    // db.collection('Users').find({
    //     name: 'DB4'
    // }).toArray().then((docs) => {
    //     console.log('Users');
    //     console.log(docs);/
    //     console.log(JSON.stringify(docs, undefined, 2));
    // }, (error) => {
    //     console.log('Unable to fetch todos', error)
    // });

    // db.collection('Todos').deleteMany({
    //     text: 'Another insert Text'
    // }). then((result) => {
    //     console.log(result);
    // });

    // db.collection('Todos').deleteOne({
    //     text: 'Another insert Text'
    // }). then((result) => {
    //     console.log(result);
    // });

    db.collection('Todos').findOneAndDelete({
        text: 'Something to do'
    }). then((result) => {
        console.log(result);
    });



    // client.close();
});