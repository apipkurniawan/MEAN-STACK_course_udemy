const mongoose = require('mongoose');

// connect to local
mongoose.connect('mongodb://localhost:27017/node-angular')
    .then(() => {
        console.log('connect to database')
    })
    .catch(() => {
        console.log('not connect to database')
    });

// connect to atlas mongodb
// mongoose.connect('mongodb+srv://apipkurniawan:LqAQfnBP93r2Hnvr@cluster0.cotew.mongodb.net/node-angular?retryWrites=true&w=majority')
//     .then(() => {
//         console.log('connect to database')
//     })
//     .catch(() => {
//         console.log('not connect to database')
//     });


// db access
// user : apipkurniawan
// pass: LqAQfnBP93r2Hnvr