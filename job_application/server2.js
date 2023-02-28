const express = require('express');
const app = express();
app.set('view engine', 'ejs');
const mysql = require('mysql2');
const bodyParser = require('body-parser');


app.use(bodyParser.urlencoded({ extended: false }));

// Set up the database connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'job_form'
});
app.listen(8080);
// Connect to the database
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Connected to database');
});



// Set up the route for the job application form
app.get('/', (req, res) => {

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
                res.render('home', { state_master: results, relation: rel, location: location, dep: department, course: courses, language: languages, tec: technologies });
              });
            });

          });
        });
      });
    });
  });
});


// Set up the route to handle form submissions
app.post('/home', (req, res) => {
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
  // Get all rows from the database
  db.query('SELECT * FROM basic_info where is_deleted = 0', (error, results, fields) => {
    if (error) throw error;
    res.render('table', { data: results });
  });
});



app.get('/city_master/:stateId', (req, res) => {
  const stateId = req.params.stateId;

  db.query('SELECT * FROM city_master WHERE state_id = ?', [stateId], (error, results) => {
    if (error) {
      console.log(error);
    } else {
      res.json(results);
    }
  });
});

app.get('/deleteData', (req, res) => {
  var cd_id = req.query.id;
  db.query(`update basic_info set is_deleted = 1 where id in (${cd_id})`, (err, result) => {
    if (err) throw err;

  });
})

app.post('/deleteOne', (req, res) => {
  var id = req.query.id;
  db.query(`update basic_info set is_deleted = 1 where id = ${id}`, (err, result) => {
    if (err) throw err;

  });
  res.json({ ans: "deleted successfully!" })
});




var limit = 10;
app.get('/table', (req, res) => {
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


app.get('/edit', async (req, res) => {
  var id = req.query.id;


  db.query(`SELECT *from basic_info where is_deleted=0 and  id = ${id}`, (err, basic_info) => {
    if (err) {
      throw err;
    }
    db.query(`SELECT *from acadamics where  applicant_id = ${id}`, (err, acadamics) => {
      if (err) {
        throw err;
      }
      db.query(`SELECT *from work_experience where  applicant_id = ${id}`, (err, work_experience) => {
        if (err) {
          throw err;
        }
        db.query(`SELECT *from reference where  applicant_id = ${id}`, (err, reference) => {
          if (err) {
            throw err;
          }
          db.query(`SELECT *from preference where  applicant_id = ${id}`, (err, preference) => {
            if (err) {
              throw err;
            }
            db.query(`SELECT *from LanguagesKnown where  applicant_id = ${id}`, (err, lan) => {
              if (err) {
                throw err;
              }
              db.query(`SELECT *from skills where  applicant_id = ${id}`, (err, skills) => {
                if (err) {
                  throw err;
                }

                db.query('SELECT *from state_master', (err, states) => {
                  if (err) {
                    throw err;
                  }
                  // const stateId = req.params.stateId;
                  // db.query('SELECT * FROM city_master WHERE state_id = ?', [stateId], (error, results) => {
                  //   if (error) {
                  //     console.log(error);
                  //   } else {
                  //     res.json(results);
                  //   }
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
                              db.query(`select * from LanguagesKnown where applicant_id = ${id}`, (err, lang) => {
                                if (err) throw err;
                                var lanjson = JSON.stringify(lang);
                                console.log(lang)
                                console.log("lang" + lanjson);




                                // Render the job application form and pass the data for the select boxes to the template
                                res.render('edit', { basic_info, reference, lanjson, lang, preference, acadamics, work_experience, skills, states, relation: rel, location: location, department: department, course: courses, language: languages, tec: technologies });
                                console.log(basic_info)
                                console.log(acadamics)
                                console.log(work_experience)
                                console.log(reference)
                                console.log(preference)
                                // console.log(results)
                              });
                            });
                          });
                        });
                      });
                    });
                  });
                });
              });
            });
          });
        });
      });
    });
  });
});
// });


app.post('/update', function (req, res, next) {

  const data = req.body;
  const id =data.id;
  var query = `
	UPDATE basic_info 
	SET first_name ="${data.first_name}", 
	last_name ="${data.last_name}", 
	email ="${data.email}", 
	gender ="${data.gender}" ,
  address1 ="${data.address1}",
  job_designation ="${data.job_designation}",
  phone ="${data.phone}" ,
  zip ="${data.zip}",
  relation_status ="${data.relation_status}"
	WHERE id = ${data.id}
	`;

  const basicValue = [data.first_name, data.last_name, data.gender, data.dob,
  data.job_designation, data.address1, data.email, data.phone, data.city, data.states, data.zip,
  data.relation_status];
  console.log(query)
  db.query(query, function (error, data) {
    if (error) {
      throw error;
    }
    else {
      res.send("ok")
    }

    const course = req.body.course;
    const board = req.body.board;
    const passingyear = req.body.passingYear;
    const pr = req.body.percentage;

    db.query(`delete from acadamics where applicant_id=${id}`,(err,result)=>{
      if(err) throw err;
      console.log("edu deleted");
    });
    applicantId = id;

    if (typeof (course, board, passingyear, pr) == "string") {
      eduSql = `insert into acadamics(applicant_id,course,board,passingYear,percentage) values
    ('${applicantId}','${course}','${board}','${passingyear}','${pr}')`;

      db.query(eduSql, (err, result) => {
        if (err) throw err;
        console.log("edu inserted");
      });
    } else {
      for (i = 0; i < course.length; i++) {
        eduSql = `insert into acadamics(applicant_id,course,board,passingYear,percentage) values
    ('${applicantId}','${course[i]}','${board[i]}','${passingyear[i]}','${pr[i]}')`;

        db.query(eduSql, (err, result) => {
          if (err) throw err;
          console.log("edu inserted");
        });
      }
    }
    



    db.query(`delete from work_experience where applicant_id = ${id}`,(err,result)=>{
      if(err) throw err;
      console.log("work experience deleted!");
     })
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
        console.log("exp inserted");
      });
    } else {
      for (i = 0; i < c_name.length; i++) {
        expSql = `insert into work_experience(applicant_id,company_name,jobtitle,start_date,end_date) values
    ('${applicantId}','${c_name[i]}','${desig[i]}','${start[i]}','${end[i]}')`;

        db.query(expSql, (err, result) => {
          if (err) throw err;
          console.log("exp inserted");
        });
      }
    }
    db.query(`delete from work_experience where applicant_id = ${id}`,(err,result)=>{
      if(err) throw err;
      console.log("work experience deleted!");
     })
  
    console.log(desig);
    console.log(start);
    console.log(end);
    if (typeof (c_name, desig, start, end) == "string") {
      expSql = `insert into work_experience(applicant_id,company_name,jobtitle,start_date,end_date) values
    ('${applicantId}','${c_name}','${desig}','${start}','${end}')`;

      db.query(expSql, (err, result) => {
        if (err) throw err;
        console.log("exp inserted");
      });
    } else {
      for (i = 0; i < c_name.length; i++) {
        expSql = `insert into work_experience(applicant_id,company_name,jobtitle,start_date,end_date) values
    ('${applicantId}','${c_name[i]}','${desig[i]}','${start[i]}','${end[i]}')`;

        db.query(expSql, (err, result) => {
          if (err) throw err;
          console.log("exp inserted");
        });
      }
    }

    db.query(`delete from LanguagesKnown where applicant_id=${id}`,(err,result)=>{
      if(err) throw err;
    });
    var applicantId = id;
    var lang = req.body.Language;
    var r = req.body[lang + "read"] ? "yes" : "no";
    var w = req.body[lang + "write"] ? "yes" : "no";
    var s = req.body[lang + "speak"] ? "yes" : "no";
    console.log(lang);
    console.log(r);
    if (typeof lang == "string") {
      var query_lan =
        "INSERT INTO LanguagesKnown(applicant_id,Language,`read`,`write`,`speak`) VALUES (?, ?, ?, ?, ?)";
      db.query(query_lan, [applicantId, lang, r, w, s], (err, ans) => {
        if (err) return console.log(err.message);
        console.log("languages inserted");
      });
    } else {
      lang.forEach((language) => {
        const read2 = req.body[language + "read"] ? "yes" : "no";
        const write2 = req.body[language + "write"] ? "yes" : "no";
        const speak2 = req.body[language + "speak"] ? "yes" : "no";

        db.query(
          "INSERT INTO LanguagesKnown(applicant_id,Language,`read`,`write`,`speak`) VALUES (?, ?, ?, ?, ?)",
          [applicantId, language, read2, write2, speak2],
          (err, result) => {
            if (err) {
              throw err;
            }

            console.log("language inserted");
          }
        );
      });
    }

    //getting technology
  db.query(`delete from skills where applicant_id = ${id}`,(err,result)=>{
    if(err) throw err;
  });
    const skills = req.body.technology;
    const lavel = req.body[skills + "a"];
    console.log("skills " + skills);
    if (typeof skills == "string") {
      db.query(
        "insert into skills(applicant_id,technology,lavel) values(?,?,?)",
        [applicantId, skills, lavel],
        (err, result) => {
          if (err) throw err;
          console.log("skills one inserted");
        }
      );
    } else {
      skills.forEach((tec) => {
        const lavel = req.body[tec + "a"];
        console.log("lavel " + lavel);
        db.query(
          "insert into skills(applicant_id,technology,lavel) values(?,?,?)",
          [applicantId, tec, lavel],
          (err, result) => {
            if (err) throw err;
            console.log("skills inserted");
          }
        );
      });
    }
  });
});
