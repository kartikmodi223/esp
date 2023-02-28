const express = require('express');
const app = express();
app.set('view engine', 'ejs');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

// Set up the middleware
app.use(bodyParser.urlencoded({ extended: false }));

// Set up the database connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'job_form'
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Connected to database');
});
app.get('/',async (req,res)=>{

      
    var combo0 = await generateCombo('technologies');      
    var combo1 = await generateCombo('languages');      
    var combo2 = await generateCombo('courses');    
    var combo3 = await generateCombo('department');
    var combo4 = await generateCombo('relation');      
    var combo5 = await generateCombo('state');      
    var combo6 = await generateCombo('location');    
    var combo7 = await generateCombo('gender');   

    res.render('combobox',{technologies: combo0,languages:combo1,courses:combo2,department:combo3,relation:combo4,state:combo5,location:combo6,gender:combo7});

});

    async function generateCombo(combo){

        var comboname =  combo;
     
     var query2 = `select option_name,option_master.option_id from option_master join select_master on option_master.select_id = select_master.select_id where select_master.select_name ='${comboname}';`
     var data = await getdata(query2);
     
     console.log(data);
     
     
     var comboStr = "";
     comboStr += `<lable for='${comboname}'>${comboname}</lable><select id='${comboname}' name='${comboname}'>`;
     
     for(let i=0;i<data.length;i++){
      comboStr+=`<option value='${data[i].id}' >${data[i].option_name}</option>`;
     }
     
     comboStr += `</select>`;
      return comboStr;
     
     }
     
     function getdata(query){
         return new Promise((resolve,reject)=>{
             db.query(query,(err,result)=>{
                 if(err) throw err;
                 resolve(result);
             });
         });
     }
     app.listen(8070);
          
          


            