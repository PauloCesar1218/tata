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

app.listen(port, () => console.log(`Server running on port ${port}`));
