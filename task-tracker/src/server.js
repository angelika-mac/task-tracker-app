import express from 'express';
import cors from 'cors';
import mysql from 'mysql';

const app = express();
const port = 5173;

// Enable CORS for all routes
app.use(cors());
app.use(express.json());

// Create a connection pool to MySQL
const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'time_tracker'
});

con.connect((err) => {
  if(err) {
    console.log('not connected');
  } else {
    console.log('connected')
  }
});

/**
 * Check username if existing
 */
app.post('/api/check-username', (req, res) => {
  const { username } = req.body;
  var query = `SELECT * from t_member WHERE username = ?`;
  con.query(query, [username], (error, result) => {
    if (error) {
      res.status(500).send();
    } else {
      res.status(200).send(result)
    }
  });
});

/**
 * Add new member
 */
app.post('/api/new-member', (req, res) => {
  const { first_name, last_name, username, password } = req.body;
  const query = `INSERT INTO t_member (first_name, last_name, username, password) VALUES (UPPER(?), UPPER(?), ?, ?)`;
  const values = [first_name, last_name, username, password];
  con.query(query, values, (error, result) => {
    if (error) {
      res.status(500).send();
    } else {
      res.status(200).send({
        'message': 'success',
        'data': result
      })
    }
  });
});

/**
 * Get member details
 */
app.post('/api/get-member', (req, res) => {
  const { username , password} = req.body;
  var query = `SELECT * from t_member WHERE username = ? AND password = ?`;
  var values = [username, password];

  con.query(query, values, (error, result) => {
    if (error) {
      res.status(500).send();
    } else {
      res.status(200).send({
        'message': 'success',
        'data': result
      })
    }
  });
});

app.get('/api/all', (req, res) => {
  var query = `SELECT * from ${TABLE_NAME}`;
  con.query(query, (error, result) => {
    if (error) {
      res.status(500).send();
    } else {
      res.status(200).send(result)
    }
  });
});

app.post('/api/insert', (req, res) => {
  const { name, age, email } = req.body;
  const query = `INSERT INTO ${TABLE_NAME} (name, age, email) VALUES (?, ?, ?)`;
  const values = [name, age, email];

  con.query(query, values, (error, result) => {
    if (error) {
      res.status(500).send();
    } else {
      res.status(200).send({result})
    }
  });
});

app.put('/api/update', (req, res) => {
  const { user_id, name, age, email } = req.body;
  const query = `UPDATE ${TABLE_NAME} SET name = ?, age = ?, email = ? WHERE user_id = ?;`;
  const values = [name, age, email, user_id];

  con.query(query, values, (error, result) => {
    if (error) {
      res.status(500).send();
    } else {
      res.status(200).send(result)
    }
  });
});

app.delete('/api/delete/:user_ids', (req, res) => {
  var user_id = req.params.user_ids;
  var user_id_array = user_id.split(',');

  const query = `DELETE FROM ${TABLE_NAME} WHERE user_id IN (?)`;

  con.query(query, [user_id_array], (error, result) => {
    if (error) {
      res.status(500).send();
    } else {
      res.status(200).send(result)
    }
  });
});

app.listen(port, (err) => {
  if(err) {
    console.log(err)
  } else {
    console.log(`Server started on port ${port}`);
  }
});
