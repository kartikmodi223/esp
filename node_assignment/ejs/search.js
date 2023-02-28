var express = require("express");
var app = express();
var mysql = require("mysql2");
var http = require('http');
var url = require('url');
var querystring = require('querystring');
app.set("view engine", "ejs");

const conn = mysql.createConnection({
    host: "localhost",
    database: "kartikdb",
    user: "root",
    password: "root",
});
conn.connect(function (err) {
    if (err) throw err;
    else console.log("connected!");
});


app.get('/', (req, res) => {
    conn.query("select * from student_express", (err, result) => {
        if (err) return;
        res.render("table3", { data: result });
    });

});


app.get('/search', (req, res) => {
//     const search = req.query.search;
//     let arr = search.split(/[,\.\s]+/);

    
//         let firstname = arr[0];
//         let lastname = arr[1];
//         let email = arr[2];

//         const query = `
//   SELECT * FROM student_express
//   WHERE fname LIKE '%${firstname}%'
//   AND lname LIKE '%${lastname}%'
//   AND email LIKE '%${email}'
//   `;



var searchValue = req.query.search
    var multi = req.query.multi
    console.log("multi :- " + multi)
    var arr = [], arr2 = [], symbol = []
    var column = ['fname', 'lname', 'email', 'dob']
    var fname,lname,email,dob

    for (var i = 0; i < searchValue.length; i++) {
        if (searchValue[i] == '^' || searchValue[i] == '~' || searchValue[i] == '' || searchValue[i] == '!'
        ) {
            arr.push(i)
            symbol.push(searchValue[i])
        }
    }
    console.log("String :- " + searchValue)
    console.log("array :- " + arr)

    for (var i = 0; i < arr.length; i++) {
        arr2.push(searchValue.substring(arr[i] + 1, arr[i + 1]))
    }

    var sql = `select * from student_express where `
    console.log(arr2)
    for (var i = 0; i < symbol.length; i++) {
        if (symbol[i] == '^') {
            fname = arr2[i]

            sql += `fname="${fname.trim()}" and `
        }
        else if (symbol[i] == '~') {
            lname = arr2[i]
            sql += `lname="${lname.trim()}" and `
        }
        else if (symbol[i] == '!') {
            email = arr2[i]
            sql += `email="${email.trim()}" and `
        }

        else if (symbol[i] == '#') {
            dob = arr2[i]
            sql += `dob="${dob.trim()}" `
        }
    }
    sql = sql.slice(0, (sql.length - 4))
  
  ;
        conn.query(sql, (err, result) => {
            if (err) throw err;
            res.render("table3", { data: result });
        })
    
})

app.listen(8888);
console.log("server")




