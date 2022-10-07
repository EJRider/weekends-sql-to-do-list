const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const toDoRouter = require('./routes/toDo.router.js');


app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('server/public'));

app.listen(5000, ()=>{
    console.log('listening on port 5000');
});

app.use('/to-do', toDoRouter);
