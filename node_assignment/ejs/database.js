var mysql = require('mysql2');
var express= require("express");
var app =express();
app.set('view engine','ejs');

var con = mysql.createConnection({
  host: 'localhost', 
  user: 'root',      
  password: 'root',     
  database: 'kartikdb' 
}); 
con.connect(function(err) {
  if (err) throw err;
  console.log('Database is connected successfully !');
});
app.get('/:page',(req,res)=>{

let page =parseInt(req.params.page) || 1;
let limit =100;
let offset=(page - 1)*limit;


// let button = document.querySelector("button");
// button.addEventListener("click", () => {
//   document.getElementsByTagName().style.color = "blue";
// });
 

// if(isNaN(offset)){
// offset=0;
// }
    con.query(`select * from student_express  LIMIT ${offset}, ${limit} `,(err,result)=>{
        if (err) throw err;
        // res.render('table',{data:result})

 con.query(`select count(*) as count  from student_express`,(err,outcome)=>{
        if (err) throw err;

   let totalpages = Math.ceil(outcome[0].count/limit);
   let pages =[];
   for(let i=1; i<=totalpages;i++){
    pages.push(i);
   }
        res.render('table',{data:result,page:page,pages:pages});
    });
  });
});
app.listen(8000);
console.log("sever listning on port");
