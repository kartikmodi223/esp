

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

con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
});

var first_name = ['vijay', 'pooja', 'kartik', 'manthan', 'milan', 'jaini',
    'isha', 'harmil', 'bharti', 'harsh', 'khushi', 'om', 'path', 'thushar', 'rajesh',
    'jay', 'ajay', 'jaydip', 'vaishvi', 'vrusha', 'dixita', 'pranav', 'akshay', 'priya', 'tulsi',
    'drashti', 'prachi', 'mayuri', 'anushka', 'dipika', 'janvi', 'salman', 'hritik', 'tiger', 'sidharth',
    'varun', 'abhishekh', 'ranbir', 'jack', 'ronaldo', 'messi', 'neymar', 'virat', 'angela', 'elizabeth',
    'alexgender', 'william', 'dominic', 'thore', 'natasha', 'jessica', 'strange', 'pitter'];

var last_name = ['rathod', 'modi', 'dave', 'vadher', 'patel', 'deep', 'sharma', 'kapoor'
    , 'parker', 'torento', 'kohli', 'singh', 'parekh', 'sangvi', 'rupani', 'modi', 'malhotra',
    'naydu', 'datt', 'gada', 'sodhi', ' Smith', 'Johnson', 'Williams', ' Brown', 'Jones',
    'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez', 'Hernandez', ' Anderson',
    'Thomas', 'Martin', 'Lewis', 'Walker', ' King', 'Torres', 'Flores', 'Carter', 'developer', 'engineer'];



app.post('/post', (req, res) => {

    for (let i = 0; i < 1500; i++) {
        var fname = Math.floor(Math.random() * first_name.length);
        var lname = Math.floor(Math.random() * last_name.length);

        var email = first_name[fname] + last_name[lname] + '@gmail.com';

        // const maxDate = Date.now();
        //   const dob = Math.floor(Math.random() * maxDate.lenght);
        const start = new Date(1970, 0, 1);
        const end = new Date();
        const randomtimestamp = start.getTime() + Math.random() * (end.getTime() - start.getTime());
        const randomdate = new Date(randomtimestamp);
        var dob = randomdate.toISOString().split('T')[0];


        const query = `insert into student_express(fname,lname,email,dob) values('${first_name[fname]}','${last_name[lname]}','${email}','${dob}')`;

        con.query(query, (err, res) => {
            if (err) throw err;

        });

        console.log('succesfully inserted');

    }


}

);
