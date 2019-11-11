const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const port = 3000;

const conn = mysql.createConnection({
   host: 'localhost',
   user: 'root',
   password: '',
   database: 'tata'
});

conn.connect((err) => {
   if (err)
      console.error('error', err);
   console.log('DataBase connected');
});

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
   res.send('Hello World');
});

app.post('/add/user', (req, res) => {
    const userData = req.body;
    conn.query('INSERT INTO user (nome, email, senha) values (?, ?, ?)', [userData.nome, userData.email, userData.senha], (err, results) => {
        if (err) {
            res.status(500).json(results);
            return;
        }

        res.status(200).json(results);
    });
});

app.post('/login/user', (req, res) => {
    const userData = req.body;
    conn.query('SELECT * FROM user WHERE email = ? AND senha = ?', [userData.email, userData.senha], (err, results) => {
        if (err) {
            res.status(500).json(results);
            return;
        }

        if (!results.length) {
            res.status(404).json('Email ou senha incorretos');
            return;
        }

        res.status(200).json(results);
    });
});

app.listen(port, () => console.log(`Server running on port ${port}`));
