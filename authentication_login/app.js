const express = require('express')
const path = require('path')
const app = express();
const bodyParser = require("body-parser");
const bcrypt = require('bcryptjs');
const mysql = require("mysql2");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const port = 8765;

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.set("view engine", "ejs");
app.use(cookieParser());

app.use(express.static('public'));
app.use(express.static(path.join(__dirname, '/public')))

//connection
const conn = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "root",
  database: "authentication"
})

conn.getConnection((err, conn) => {
  console.log("connected")
})

app.get('/', (req, res) => {
  const jwtToken = req.cookies.jwtToken;
  if (jwtToken) {
    return res.redirect("/home");
  }
  res.render("register")
});



//user registration
app.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  var hashPass = await bcrypt.hash(password, 10);
  console.log("hash " + hashPass);


  // var varifyUser = `select * from authentication.register_table where email = '${email}'`;
  // var result = await conn.execute(varifyUser);
  // if (result[0].length != 0) {
  //     return res.send("user exist use another email")
  // }



  const activation_token = Math.random().toString(36).substring(2, 15);
  const activationLink = `http://localhost:8765/activate?token=${activation_token}`;
  var sql = `insert into authentication.register_table(name,password,email,activation_token) values('${name}','${hashPass}','${email}','${activation_token}')`;
  var result = await conn.execute(sql);
  console.log(result[0])

  //activation


  res.send(`user register successfully!  <a href="${activationLink}"> Activate Account </a>`)


});

app.get("/activate?", async (req, res) => {
  const actKey = req.query.token;
  sql = `update authentication.register_table set activate_status = 1 where activation_token = "${actKey}"`;
  var result = await conn.execute(sql);
  var json = JSON.stringify(result);
  console.log("activate result " + json)
  var arr = JSON.parse(json);
  if (arr[0].affectedRows == 0) {
    res.send("invalid activation link");
  } else {
    res.redirect("/login");
  }
});

//user login
app.get('/login', (req, res) => {
  const jwtToken = req.cookies.jwtToken;
  if (jwtToken) {
    return res.redirect("/home");
  }
  res.render("login");
})

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  //for check email exist at database before register
  var varifyUser = `select * from authentication.register_table where email = '${email}'`;
  var result = await getdata(varifyUser);
  if (result.length == 0) {
    return res.send("user not found")
  }
  console.log(result[0]);
  const data = result[0];
  //compair  password at login with hashed password
  let bpass = result[0].password;
  console.log("bpass", bpass)
  var match = await bcrypt.compare(password, bpass);
  console.log(match);
  if (!match) {
    return res.send("user not found")
  }
  const activationLink = `http://localhost:8765/activate?token=${result[0].activation_token}`;
  if (result[0].activate_status == 0) {
    return res.render("link", { activationLink });
  }
  //generating jwt token and 
  const jwtToken = jwt.sign(result[0], "kartik");
  res.cookie("jwtToken", jwtToken);
  const tokenData = jwt.verify(jwtToken, "kartik");
  console.log(tokenData);
  res.render("home", { tokenData });

  // res.redirect("/home",{tokenData})
})


app.get("/home", (req, res) => {

  const jwtToken = req.cookies.jwtToken;
  if (!jwtToken) {
    return res.send(`register your self first <a href="/">register</a>`);
  }
  const tokenData = jwt.verify(jwtToken, "kartik");
  res.render("home", { tokenData });

})


app.get('/', (req, res) => {
  const jwtToken = req.cookies.jwtToken;
  if (jwtToken) {
    return res.redirect("/home");
  }
  res.render("registration");
});

app.get("/logout", (req, res) => {
  res.clearCookie("jwtToken");
  res.redirect("/")

})


async function getdata(sql) {
  return new Promise((res, rej) => {
    conn.query(sql, (err, data) => {
      if (err) throw err;
      res(data);
    })
  })
}
app.get("/finduserlogin?", async (req, res) => {
  const email = req.query.email;




  var sql = `select email from authentication.register_table  where email = '${email}' `;
  var result = await getdata(sql);
  if (result.length > 0) {
    res.json({ exists: true });
  } else {
    res.json({ exists: false });
  }

})

app.get('/findpassword?', async (req, res) => {
  const password = req.query.password;
  const email = req.query.email;
  // console.log(email)
  // console.log(password)

  var varifyUser = `select * from authentication.register_table where email = '${email}'`;
  var result = await conn.execute(varifyUser);
  const data = result[0][0];

  if (result[0][0].length > 0) {

    let bpass = data[0][0].password;
    // console.log("bpass", bpass)
    var match = await bcrypt.compare(password, bpass);
    // console.log(match);
    if (!match) {

      res.json({ exists: true });
    } else {
      res.json({ exists: false });
    }

  }

})


const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "job_form",
});

// Connect to the database


app.get('/excel', (req, res) => {
  const jwtToken = req.cookies.jwtToken;
  if (!jwtToken) {
    return res.redirect("/login");
  }
  db.query("select * from excel", (err, excel) => {
    if (err) throw err;
   
    res.render("excel.ejs", { excel });




    app.get('/insert', (req, res) => {

      const jwtToken = req.cookies.jwtToken;
      if (!jwtToken) {
        return res.redirect("/login");
      }
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

      const jwtToken = req.cookies.jwtToken;
      if (!jwtToken) {
        return res.redirect("/login");
      }
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

app.post('/saveAll', (req, res) => {
  const jwtToken = req.cookies.jwtToken;
  if (!jwtToken) {
    return res.redirect("/login");
  }

  const fid = req.body.userid;
  const fname = req.body.fname;
  const lname = req.body.lname;
  const department = req.body.department;
  const email = req.body.email;
  console.log(req.body)



  for (let i = 0; i < fid.length; i++) {
    let sql = `update excel set fname='${fname[i]}',lname='${lname[i]}',email='${email[i]}',department='${department[i]}' where id=${fid[i]}`;
    db.query(sql, (err, result) => {
      if (err) throw err;
      console.log("updated all");

    })
  }

  const nfname = req.body.new_fname;
  const nlname = req.body.new_lname;
  const ndepartment = req.body.new_department;
  const nemail = req.body.new_email;

  if (typeof (nfname) == "string") {
    db.query('insert into excel(f  name,lname,email,department) value(?,?,?,?)', [nfname, nlname, ndepartment, nemail], (err, result) => {
      if (err) throw err;
      console.log("inserted one")
    })
  } else if (typeof (nfname) == "object") {
    for (let j = 0; j < nfname.length; j++) {
      db.query('insert into excel(fname,lname,email,department) value(?,?,?,?)', [nfname[j], nlname[j], ndepartment[j], nemail[j]], (err, result) => {
        if (err) throw err;
        console.log("inserted all")
      })
    } res.send("all data inserted")
  }

})

app.get('/form', (req, res) => {

  const jwtToken = req.cookies.jwtToken;
  if (!jwtToken) {
    return res.redirect("/login");
  }

  db.query('SELECT *from state_master', (err, results) => {
    if (err) {
      throw err;
    }

    db.query('SELECT option_name FROM option_master where select_id = 6', (err, rel) => {
      if (err) {
        throw err;
      }
      db.query('SELECT option_name FROM option_master where select_id = 2', (err, location) => {
        if (err) {
          throw err;
        }

        db.query('SELECT option_name FROM option_master where select_id = 7', (err, department) => {
          if (err) {
            throw err;
          }
          db.query('SELECT option_name FROM option_master where select_id = 3', (err, courses) => {
            if (err) {
              throw err;
            }
            db.query('SELECT option_name FROM option_master where select_id = 4', (err, languages) => {
              if (err) {
                throw err;
              }
              db.query('SELECT option_name FROM option_master where select_id = 5', (err, technologies) => {
                if (err) {
                  throw err;
                }

                // Render the job application form and pass the data for the select boxes to the template
                res.render('home2', { state_master: results, relation: rel, location: location, dep: department, course: courses, language: languages, tec: technologies });
              });
            });

          });
        });
      });
    });
  });
});


// Set up the route to handle form submissions
app.post('/table', (req, res) => {
  // Retrieve the form data and insert it into the database
 
  const data = req.body;
  const course = req.body.course;
  const board = req.body.board;
  const passingyear = req.body.passingYear;
  const pr = req.body.percentage;
  console.log(course);
  console.log(board);
  console.log(passingyear);
  console.log(pr);


  const basicSql = `INSERT INTO basic_info (first_name,last_name,gender,dob,job_designation,address1,email,phone,city,state,zip,relation_status)
     VALUES (?,?,?,?,?,?,?,?,?,?,?,?)`;
  const basicValue = [data.first_name, data.last_name, data.gender, data.dob,
  data.job_designation, data.address1, data.email, data.phone, data.city, data.state, data.zip,
  data.relation_status];
  db.query(basicSql, basicValue, (err, result) => {
    if (err) {
      throw err;
    }
    const applicantId = result.insertId;



    if (typeof (course, board, passingyear, pr) == "string") {
      eduSql = `insert into acadamics(applicant_id,course,board,passingYear,percentage) values
        ('${applicantId}','${course}','${board}','${passingyear}','${pr}')`;

      db.query(eduSql, (err, result) => {
        if (err) throw err;
        console.log('edu inserted');
      })
    } else {
      for (i = 0; i < course.length; i++) {
        eduSql = `insert into acadamics(applicant_id,course,board,passingYear,percentage) values
        ('${applicantId}','${course[i]}','${board[i]}','${passingyear[i]}','${pr[i]}')`;

        db.query(eduSql, (err, result) => {
          if (err) throw err;
          console.log('education inserted')
        })
      }
    }


    const c_name = req.body.company_name;
    const desig = req.body.jobtitle;
    const start = req.body.start_date;
    const end = req.body.end_date;
    console.log(c_name);
    console.log(desig);
    console.log(start);
    console.log(end);
    if (typeof (c_name, desig, start, end) == "string") {
      expSql = `insert into work_experience(applicant_id,company_name,jobtitle,start_date,end_date) values
        ('${applicantId}','${c_name}','${desig}','${start}','${end}')`;

      db.query(expSql, (err, result) => {
        if (err) throw err;
        console.log('experiance inserted');
      })
    } else {
      for (i = 0; i < c_name.length; i++) {
        expSql = `insert into work_experience(applicant_id,company_name,jobtitle,start_date,end_date) values
        ('${applicantId}','${c_name[i]}','${desig[i]}','${start[i]}','${end[i]}')`;

        db.query(expSql, (err, result) => {
          if (err) throw err;
          console.log('expperiance inserted')
        })
      }
    }

    //languages insert
    var lang = req.body.Language;
    var r = req.body[lang + "read"];
    var w = req.body[lang + "write"];
    var s = req.body[lang + "speak"];
    console.log(lang);
    console.log(r);
    if (typeof (lang) == "string") {
      var query_lan = "INSERT INTO LanguagesKnown(applicant_id,Language,`read`,`write`,`speak`) VALUES (?, ?, ?, ?, ?)";
      db.query(query_lan, [applicantId, lang, r, w, s], (err, ans) => {
        if (err) return console.log(err.message);
        console.log("languages inserted")
      })
    } else {

      lang.forEach((language) => {
        const read2 = req.body[language + "read"] ? 'yes' : 'no';
        const write2 = req.body[language + "write"] ? 'yes' : 'no';
        const speak2 = req.body[language + "speak"] ? 'yes' : 'no';

        db.query("INSERT INTO LanguagesKnown(applicant_id,Language,`read`,`write`,`speak`) VALUES (?, ?, ?, ?, ?)",
          [applicantId, language, read2, write2, speak2], (err, result) => {
            if (err) {
              throw err;
            }


            console.log('language inserted');
          });
      });
    }


    //getting technology
    const skills = req.body.technology;
    const lavel = req.body[skills + "a"];
    console.log('skills ' + skills);
    if (typeof (skills) == "string") {
      db.query("insert into skills(applicant_id,technology,lavel) values(?,?,?)", [applicantId, skills, lavel], (err, result) => {
        if (err) throw err;
        console.log('skills one inserted');
      });

    } else {
      skills.forEach((tec) => {
        const lavel = req.body[tec + "a"];
        console.log('lavel ' + lavel)
        db.query("insert into skills(applicant_id,technology,lavel) values(?,?,?)", [applicantId, tec, lavel], (err, result) => {
          if (err) throw err;
          console.log('skills inserted');
        });

      });
    }


    //getting references
    const rname = data.rname;
    const rcontact = data.rcontact;
    const relation = data.relation;
    console.log(rname);
    console.log(rcontact);
    console.log(relation);
    for (let i = 0; i < rname.length; i++) {
      db.query(`insert into reference(applicant_id,rname,rcontact,relation) 
        values('${applicantId}','${rname[i]}','${rcontact[i]}','${relation[i]}')`, (err, result) => {
        if (err) throw err;
        console.log('rferences inserted');
      })
    }

    //preferences
    const plocation = data.location;
    const noticeperiod = data.notice;
    const ectc = data.expected_ctc;
    const pdepartment = data.department;
    db.query(`insert into preference(applicant_id,location,notice,expected_ctc,department) values
        ('${applicantId}','${plocation}','${noticeperiod}','${ectc}','${pdepartment}')`, (err, result) => {
      if (err) throw err;
      console.log('preferences inserted sucusessfully!')
    })


    res.send('Data inserted')



  });
});


app.get('/search', (req, res) => {

  
  const jwtToken = req.cookies.jwtToken;
  if (!jwtToken) {
    return res.redirect("/login");
  }

  var searchValue = req.query.search
  var multi = req.query.multi
  var data = [];
  console.log("multi :- " + multi)
  var arr = [], arr2 = [], symbol = []
  var column = ['first_name', 'last_name', 'email', 'dob']
  var first_name, last_name, email, dob

  for (var i = 0; i < searchValue.length; i++) {
    if (searchValue[i] == '^' || searchValue[i] == '~' || searchValue[i] == '#' || searchValue[i] == '!'
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

  var sql = `select * from basic_info where `
  console.log(arr2)
  for (var i = 0; i < symbol.length; i++) {
    if (symbol[i] == '^') {
      first_name = arr2[i]

      sql += `first_name="${first_name.trim()}" and `
    }
    else if (symbol[i] == '~') {
      last_name = arr2[i]
      sql += `last_name="${last_name.trim()}" and `
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
  db.query(sql, (err, result) => {
    if (err) throw err;

    res.render("table", { data: result });
  })
})


// Route for displaying the table
app.get('/dlt', (req, res) => {

  const jwtToken = req.cookies.jwtToken;
  if (!jwtToken) {
    return res.redirect("/login");
  }
  // Get all rows from the database
  db.query('SELECT * FROM basic_info where is_deleted = 0', (error, results, fields) => {
    if (error) throw error;
    res.render('table', { data: results });
  });
});



app.get('/city_master/:stateId', (req, res) => {
  const stateId = req.params.stateId;
  const jwtToken = req.cookies.jwtToken;
  if (!jwtToken) {
    return res.redirect("/login");
  }
  db.query('SELECT * FROM city_master WHERE state_id = ?', [stateId], (error, results) => {
    if (error) {
      console.log(error);
    } else {
      res.json(results);
    }
  });
});

app.get('/deleteData', (req, res) => {
  const jwtToken = req.cookies.jwtToken;
  if (!jwtToken) {
    return res.redirect("/login");
  }
  var cd_id = req.query.id;
  db.query(`update basic_info set is_deleted = 1 where id in (${cd_id})`, (err, result) => {
    if (err) throw err;

  });
})

app.post('/deleteOne', (req, res) => {
  const jwtToken = req.cookies.jwtToken;
  if (!jwtToken) {
    return res.redirect("/login");
  }
  var id = req.query.id;
  db.query(`update basic_info set is_deleted = 1 where id = ${id}`, (err, result) => {
    if (err) throw err;

  });
  res.json({ ans: "deleted successfully!" })
});




var limit = 10;
app.get('/table', (req, res) => {

  const jwtToken = req.cookies.jwtToken;
  if (!jwtToken) {
    return res.redirect("/login");
  }
  var ajax = req.query.ajax || false;
  let k = (req.query.id - 1) * limit || 0;
  var sql12 = `select * from basic_info where is_deleted=0`;
  db.query(sql12, (err, result2) => {

    data12 = result2;
    console.log(data12)
    var sql13 = `select * from basic_info where is_deleted!=1 limit ${k},${limit}`;
    db.query(sql13, (err, result) => {
      if (err) throw err;

      if (!ajax) {
        res.render("table", { data: result, count_data: data12.length, limit });
      }
      else {
        res.json(result);
      }
    });
  });
});



const con1 = mysql.createConnection({
  host: "localhost",
  database: "kartikdb",
  user: "root",
  password: "root",
});



app.get('/searching', (req, res) => {

  const jwtToken = req.cookies.jwtToken;
  if (!jwtToken) {
    return res.redirect("/login");
  }

  con1.query("select * from student_express", (err, result) => {
    if (err) return;
    res.render("profile", { data: result });
  });

});


app.get('/searcht', (req, res) => {

  const jwtToken = req.cookies.jwtToken;
  if (!jwtToken) {
    return res.redirect("/login");
  }
  var searchValue = req.query.search
  var multi = req.query.multi
  console.log("multi :- " + multi)
  var arr = [], arr2 = [], symbol = []
  var column = ['fname', 'lname', 'email', 'dob']
  var fname, lname, email, dob

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
  con1.query(sql, (err, result) => {
    if (err) throw err;
    res.render("profile", { data: result });
  })

})




app.get('/tictactoe', (req, res) => {
  const jwtToken = req.cookies.jwtToken;
  if (!jwtToken) {
    return res.redirect("/home");
  }
  res.sendFile("/home/kartik-modi/kartik_modi/authentication_login/public/html/tictactoe.html");
});

app.get('/kuku', (req, res) => {
  const jwtToken = req.cookies.jwtToken;
  if (!jwtToken) {
    return res.redirect("/home");
  }
  res.sendFile("/home/kartik-modi/kartik_modi/authentication_login/public/html/color_change_qube.html");
});









app.listen(port, () => console.log(`  port connected to ${port}!`))