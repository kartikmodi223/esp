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
        res.render("list", { data: result });
    });

});
app.listen(8888);



// router.get('/edit/:id', function(request, response, next){

// 	var id = request.params.id;

// 	var query = `SELECT * FROM sample_data WHERE id = "${id}"`;

// 	database.query(query, function(error, data){

// 		response.render('sample_data', {title: 'Edit MySQL Table Data', action:'edit', sampleData:data[0]});

// 	});

// });

router.post('/edit/:id', function(request, response, next){

	var id = request.params.id;

	var first_name = request.body.first_name;

	var last_name = request.body.last_name;

	var age = request.body.age;

	var gender = request.body.gender;

	var query = `
	UPDATE sample_data 
	SET first_name = "${first_name}", 
	last_name = "${last_name}", 
	age = "${age}", 
	gender = "${gender}" 
	WHERE id = "${id}"
	`;

	database.query(query, function(error, data){

		if(error)
		{
			throw error;
		}
		else
		{
			response.redirect('/sample_data');
		}

	});

});
