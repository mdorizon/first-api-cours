const express = require('express')
const mysql = require('mysql');
const app = express()
const port = 8000
const cors = require('cors');

app.use(cors({
    origin:['*'],
}))

app.use(express.json())

const connect_mysql = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "admin",
    database: "env_tech"
});

connect_mysql.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});

app.get('/users', (req, res) => {
    connect_mysql.query('SELECT * FROM user', (err, rows, fields) => {
        if (err) throw err
        res.json(rows)
    })
})

app.post('/users', (req, res) => {
    const data = req.body
    connect_mysql.query(`INSERT INTO user (username, password) VALUES ('${data.username}', '${data.password}')`, (error, rows, fields) => {
        if (error){
            res.send('Error during insertion : ', error)
        } else {
            res.send('Datas inserted !')
        }
    })
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})