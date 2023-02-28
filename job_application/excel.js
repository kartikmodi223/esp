const express = require('express');
const mysql = require('mysql2');
const app = express();
app.set("view engine", "ejs");
const bodyParser = require("body-parser");
const e = require('express');
app.listen(8050);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "job_form",
});

// Connect to the database
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("Connected to database");
});

app.get('/data', (req, res) => {
  db.query("select * from excel", (err, excel) => {
    if (err) throw err;

    res.render("excel.ejs", { excel });




    app.get('/insert', (req, res) => {
      const id = req.query.id;
      const fname = req.query.fname;
      const lname = req.query.lname;
      const department = req.query.department;
      const email = req.query.email;
    

      db.query('UPDATE excel SET fname = ?, lname=?, department=?,email=? WHERE id = ?', [fname, lname, department, email, id], (error, results) => {
        if (error) throw error;
        console.log("saved")

      });
    })
    const nid = excel.insertId;

    app.get('/add', (req, res) => {
      const fname = req.query.fname;
      const lname = req.query.lname;
      const department = req.query.department;
      const email = req.query.email;


      db.query("insert into excel(fname,lname,department,email) value(?,?,?,?)", [fname, lname, department, email], (err, result) => {
        if (err) throw err;
        console.log("saved")

        res.redirect("excel")
      })
    })

  });
})

app.post('/saveAll',(req,res)=>{
  const fid = req.body.userid;
  const fname = req.body.fname;
  const lname = req.body.lname;
  const department=req.body.department;
  const email = req.body.email;
  console.log(req.body)
  


  for(let i=0; i<fid.length; i++){
    let sql = `update excel set fname='${fname[i]}',lname='${lname[i]}',email='${email[i]}',department='${department[i]}' where id=${fid[i]}`;
    db.query(sql,(err,result)=>{
      if(err) throw err;
      console.log("updated all");
      
    })
  } 

  const nfname = req.body.new_fname;
  const nlname = req.body.new_lname;
  const ndepartment=req.body.new_department;
  const nemail = req.body.new_email;

  if(typeof(nfname) == "string"){
    db.query('insert into excel(f  name,lname,email,department) value(?,?,?,?)',[nfname,nlname,ndepartment,nemail],(err,result)=>{
      if(err) throw err;
      console.log("inserted one")
    })
  }else if(typeof(nfname) == "object"){
    for(let j=0; j<nfname.length; j++){
      db.query('insert into excel(fname,lname,email,department) value(?,?,?,?)',[nfname[j],nlname[j],ndepartment[j],nemail[j]],(err,result)=>{
        if(err) throw err;
        console.log("inserted all")
      })
    }res.send("all data inserted")
  }
  
})

