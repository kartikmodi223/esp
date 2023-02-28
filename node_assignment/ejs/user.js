
var express = require('express');
var app = express();
app.set('view engine', 'ejs'); 
var mysql = require('mysql2');

var con = mysql.createConnection({
    host: "localhost",
    user: 'root',
    password: 'root',
    database: 'kartikdb'
});

con.connect((err) => {
    if (err) throw err;
    console.log('database connected')

});
app.get("/", (req, res) => {
    var data = [];
   let count;
    let page = req.query.num || 1;
    let currentpage = parseInt(req.query.num);
    let limit = 100;
    let offset = (page - 1) * limit;


    let sort_order = req.query.sortorder;
    let order_type = req.query.order_type;

    if (req.query.sortorder){
        sort_order = req.query.sortorder;
        order_type = req.query.order_type;
    }
    else{
        sort_order='id'
        currentpage =1;
        order_type='asc';
    }


    if (isNaN(offset)) {
        offset = 0;
    }

    con.query(`select count(*) as countdata from student_express;`, function (err, res) {
        if (err) throw err;
        data[0] = res[0].countdata;
        count = Math.ceil(data[0]/limit);

    });
    con.query(`select * from student_express order by ${sort_order} limit ${offset},${limit};`, function (err, result1) {
        if (err) throw err;
        data[1] = result1;
        res.render('table3', {data:data});


    });

}); app.listen(8998);

console.log("sever listning on port");