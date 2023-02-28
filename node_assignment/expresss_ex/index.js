var mysql2 = require('mysql2');
const express = require("express");
const bodyparser = require('body-parser');
const app = express();

app.use(bodyparser.json());
const port = process.env.PORT || 8080;
app.listen(port, () => console.log("listerninig on port"));

var con = mysql2.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "kartikdb"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

// app.get('/get', (req, res) => {
//   const query = con.query('select * from student', (err, value) => {
//     if (err) throw err;
//     res.json(value);
//   })
// });
// app.delete('/delete', (req, res) => {
//   const query = con.query('delete from student where firstname="kartik"', (err, value) => {
//     if (err) throw err;
//     res.json(value);
//     res.send("success");
//   })
// });


app.post('/post', (req, res) => {
  const query = con.query('insert into student_express(id,fname,lname,email,dob)values("1","kartik","modi","kartik123@gmail.com","22-03-2002")', 
  (err, value) => {
    if (err) throw err;
    res.json(value);
    res.send("success");
  })
});



