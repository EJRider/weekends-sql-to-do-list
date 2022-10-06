const express = require('express');
const router = express.Router();

const pool = require('../modules/pool.js');


router.get('/', (req,res)=>{
    console.log('in toDoGET');
    const sqlText = `SELECT * FROM "toDo" ORDER BY "id";`;
    pool.query(sqlText)
        .then(dbRes=>{
            res.send(dbRes.rows);
        })
        .catch(err=>{
            console.log('error in toDoGET', error);
            res.sendStatus(500);
        });
})

router.post('/', (req, res)=>{
    console.log('in toDoPOST');
    const sqlText = `
        INSERT INTO "toDo" 
            ("taskName","task","taskDone")
        VALUES
            ($1,$2,$3);
    `;
    const sqlParams = [
        req.body.taskName,
        req.body.task,
        req.body.taskDone
    ]
    pool.query(sqlText,sqlParams)
        .then(dbRes=>{
            res.sendStatus(201);
        })
        .catch(err=>{
            console.log('error in toDoPOST', err);
            res.sendStatus(500);
        });
});

router.delete('/:id', (req,res)=>{
    console.log('in toDoDELETE');
    const taskId = req.params.id;
    
    const sqlText = `
        DELETE FROM "toDo"
        WHERE "id" = $1;
    `;
    const sqlParams = [taskId];
    pool.query(sqlText, sqlParams)
    .then(dbRes=>{
        res.sendStatus(200);
    })
    .catch(err=>{
        console.log('error in toDoDELETE', err);
        res.sendStatus(500);
    });
});

router.put('/:id',(req,res)=>{
    console.log('in toDoPUT');
    const taskId = req.params.id;
    const sqlText = `
        UPDATE "toDo"
        SET "taskDone" = NOT "taskDone"
        WHERE "id" = $1;
    `;
    const sqlParams = [taskId];
    pool.query(sqlText, sqlParams)
        .then(dbRes=>{
            res.sendStatus(201);
        })
        .catch(err=>{
            console.log('error in toDoPUT', err);
            res.sendStatus(500);
        });
});

module.exports = router;