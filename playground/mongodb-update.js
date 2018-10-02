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

    db.collection('Users').findOneAndUpdate({
        _id: new ObjectID('5b5586e53187b9843caccd77')
    }, {
        $set: {
            name: 'Declan'
        }
    }, {
        returnOriginal: false
    }).then((result) => {
        console.log(result);
    });

    // client.close();
});