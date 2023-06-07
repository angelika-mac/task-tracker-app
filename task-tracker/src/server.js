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

/**
 * Get projects
 */
app.get('/api/get-projects', (req, res) => {
  var query = `SELECT * from t_project`;
  con.query(query, (error, result) => {
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
 * insert a task
 */
app.post('/api/add-task', (req, res) => {
  const { member_id, project_id, log_datetime, hours, task_name, task_description } = req.body;
  const query = `INSERT INTO t_task (member_id, project_id, log_datetime, hours, task_name, task_description) VALUES (?, ?, ?, ?, ?, ?)`;
  const values = [member_id, project_id, log_datetime, hours, task_name, task_description];

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
 * update a task
 */
app.put('/api/update-task', (req, res) => {
  const {project_id, log_datetime, hours, task_name, task_description, task_id} = req.body;
  const query = `UPDATE t_task SET project_id = ?, log_datetime = ?, hours = ?, task_name = ?, task_description = ? WHERE task_id = ?`;
  const values = [project_id, log_datetime, hours, task_name, task_description, task_id];

  con.query(query, values, (error, result) => {
    if (error) {
      res.status(500).send();
    } else {
		console.log(result)
      res.status(200).send({
        'message': 'success',
        'data': result
      })
    }
  });
});

/**
 * get daily tasks
 */
app.get('/api/get-tasks/daily/:member_id', (req, res) => {
  var member_id = req.params.member_id;
  var query = `SELECT * from t_task JOIN t_project ON t_task.project_id = t_project.project_id 
  WHERE member_id = ? AND DATE(t_task.log_datetime) = CURDATE() ORDER BY t_task.created_at ASC;`;
  var value = [member_id];
  con.query(query, value,(error, result) => {
    if (error) {
      console.log(error);
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
 * get weekly tasks
 */
app.get('/api/get-tasks/weekly/:member_id', (req, res) => {
	var member_id = req.params.member_id;
	var query = `SELECT * from t_task JOIN t_project ON t_task.project_id = t_project.project_id 
	WHERE member_id = ? AND YEAR(t_task.log_datetime) = YEAR(CURDATE()) AND WEEK(t_task.log_datetime) = WEEK(CURDATE()) ORDER BY t_task.created_at ASC`;
	
	con.query(query, [member_id],(error, result) => {
	  if (error) {
		console.log(error);
		res.status(500).send();
	  } else {
		res.status(200).send({
		  'message': 'success',
		  'data': result
		})
	  }
	});
  });

app.delete('/api/delete-task/:task_id', (req, res) => {
  var task_id = req.params.task_id;
  const query = `DELETE FROM t_task WHERE task_id = ?`;

  con.query(query, [task_id], (error, result) => {
    if (error) {
		console.log()
      res.status(500).send();
    } else {
		res.status(200).send({
			'message': 'success',
			'data': result
		})
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
