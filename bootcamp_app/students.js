// Connect to bootcampx database
const { Pool } = require('pg');
const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'bootcampx'
});

const process = require('process');

// Make pool query selecting some student data
// pool.query is a function that accepts an SQL query as a JS string
//  `` lets us write multi lines and lets code look nicer
// Function returns a promise that contains our result when the query is successful

const cohortName = process.argv[2];
const limit = process.argv[3] || 5;
const values = [`%${cohortName}%`, limit];
  
const queryString = `
  SELECT students.id AS student_id, students.name AS name, cohorts.name AS cohort
  FROM students
  JOIN cohorts ON cohorts.id = cohort_id
  WHERE cohorts.name LIKE $1 
  LIMIT $2 
  `;
pool
  .query(queryString, values)
  .then(res => {
    res.rows.forEach(user => {
      console.log(`${user.name} has an id of ${user.student_id} and was in the ${user.cohort} cohort`);
    })
  })
  .catch(err => console.error('query error', err.stack));
 