const express = require('express');
const router = express.Router();

const pool = require('../modules/pool.js');


router.get('/', (req,res)=>{
    console.log('in toDoGET');
    res.sendStatus(200);
})

router.post('/', (req, res)=>{
    console.log('in toDoPOST');
    res.sendStatus(200);
});

router.delete('/:id', (req,res)=>{
    console.log('in toDoDELETE');
    res.sendStatus(200);
});

router.put('/:id',(req,res)=>{
    console.log('in toDoPUT');
    res.sendStatus(201);
});

module.exports = router;