var mysql = require('mysql2');
var express = require("express");
var app = express();
app.set('view engine', 'ejs');

var con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'kartikdb'
});
con.connect(function (err) {
    if (err) throw err;
    console.log('Database is connected successfully !');
});

app.get('/first', (req, res) => {

    var data =[];

    con.query(`select * from student_express LIMIT 0,10`, (err, student_data_1) => {
        if (err) throw err;
        data[0] = student_data_1;
    });
    con.query(`select * from student_express LIMIT 10,10`, (err, student_data_2) => {
        if (err) throw err;
        data[1] = student_data_2;
        // res.render('first',{data});
    });
    con.query(`select * from student_express LIMIT 20,10`, (err, student_data_3) => {
        if (err) throw err;
        data[2] = student_data_3;
        // res.render('first',{data});
    });
    con.query(`select * from student_express LIMIT 30,10`, (err, student_data_4) => {
        if (err) throw err;
        data[3] = student_data_4;
        res.render('first',{data});
    });
    con.query(`select * from student_express LIMIT 40,10`, (err, student_data_5) => {
        if (err) throw err;
        data[4] = student_data_5;
    });
        // res.render('first',{data});
        con.query(`select * from student_express LIMIT 50,10`, (err, student_data_6) => {
            if (err) throw err;
            data[5] = student_data_6;
            // res.render('first',{data});

    });
    con.query(`select * from student_express LIMIT 60,10`, (err, student_data_7) => {
        if (err) throw err;
        data[6] = student_data_7;
        // res.render('first',{data});
});
con.query(`select * from student_express LIMIT 70,10`, (err, student_data_8) => {
    if (err) throw err;
    data[7] = student_data_8;
    // res.render('first',{data});
});
con.query(`select * from student_express LIMIT 80,10`, (err, student_data_9) => {
    if (err) throw err;
    data[8] = student_data_9;
    // res.render('first',{data});
});
con.query(`select * from student_express LIMIT 80,10`, (err, student_data_10) => {
    if (err) throw err;
    data[9] = student_data_10;
    res.render('first',{data});
});
});
app.listen(8081);
console.log("server is listning on port");