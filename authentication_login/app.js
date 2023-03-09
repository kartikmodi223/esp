const express = require('express')
const path = require('path')
const app = express();
const bodyParser = require("body-parser");
const bcrypt = require('bcryptjs');
const mysql = require("mysql2/promise");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const port =8765;

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.set("view engine","ejs");
app.use(cookieParser());

app.use(express.static('public'));
app.use(express.static(path.join(__dirname,'/public')))

//connection
const conn = mysql.createPool({
    host:"localhost",
    user:"root",
    password:"root",
    database:"authentication"
})

// conn.getConnection((err,conn)=>{
//     console.log("connected")
// })

app.get('/', (req, res) => {
    const jwtToken = req.cookies.jwtToken;
    if(jwtToken){
        return res.redirect("/home");
    }
    res.render("register")
});



//user registration
app.post('/register',async (req,res)=>{
    const{name,email,password} = req.body;
    
    var hashPass = await bcrypt.hash(password,10);
    console.log("hash "+hashPass);


    var varifyUser = `select * from authentication.register_table where email = '${email}'`;
    var result = await conn.execute(varifyUser);
    if(result[0].length != 0){
        return res.send("user exist use another email")
    }
    const activation_token = Math.random().toString(36).substring(2, 15);
    var sql = `insert into authentication.register_table(name,email,password,activation_token) values('${name}','${email}','${hashPass}','${activation_token}')`;
    var result =  await conn.execute(sql);
    console.log(result[0])
    res.redirect("/login")
    res.render("link");
});

app.get("/activate?", (req,res)=>{
    const actKey = req.query.token;
    sql = `update user set aactivate_status = 1 where activation_token = "${actKey}"`;
    var result =  conn.execute(sql);
  
    console.log("activate result "+ json)
    res.render("link");
    
});


//user login
app.get('/login',(req,res) =>{
    const jwtToken = req.cookies.jwtToken;
    if(jwtToken){
        return res.redirect("/home");
    }
    res.render("login");
})

app.post("/login",async (req,res)=>{
    const {email,password} = req.body;

    //for check email exist at database before register
    var varifyUser = `select * from authentication.register_table where email = '${email}'`;
    var result = await conn.execute(varifyUser);
    if(result[0].length == 0){
        return res.send("user not found")
    }
    console.log(result[0]);
    const data = result[0];
    //compair  password at login with hashed password
    let bpass = data[0].password;
    console.log("bpass",bpass)
    var match = await bcrypt.compare(password,bpass);
    console.log(match);
    if(!match){
        return res.send("user not found")
    }

    //generating jwt token and 
    const jwtToken = jwt.sign(data[0],"kartik");
    res.cookie("jwtToken",jwtToken);
    const tokenData = jwt.verify(jwtToken,"kartik");
    console.log(tokenData);
    res.render("home",{tokenData});

    // res.redirect("/home",{tokenData})
})


app.get("/home", (req, res) => {

    const jwtToken = req.cookies.jwtToken;
    if (!jwtToken) {
        return res.send(`register your self first <a href="/">register</a>`);
    }
    const tokenData = jwt.verify(jwtToken, "kartik");
    res.render("home",{tokenData});

})


app.get('/', (req, res) => {
    const jwtToken = req.cookies.jwtToken;
    if(jwtToken){
        return res.redirect("/home");
    }
    res.render("registration");
});

app.get("/logout",(req,res)=>{
    res.clearCookie("jwtToken");
    res.redirect("/")

})



app.listen(port, () => console.log(`  port connected to ${port}!`))