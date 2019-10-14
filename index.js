const express = require('express');
const app = express();
var parser = require("body-parser");
var cors = require("cors");
var mysql = require('mysql');
app.use(cors());

app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "mydb"
  });
  
  con.connect(function(err) {
    if (err) throw err;
  });

  app.get("/getData", function(req, res) {   
      con.query('SELECT timesheet.date,timesheet.task,timesheet.hours,timesheet.userid FROM timesheet INNER JOIN username ON timesheet.userid = username.userid;', (err, result, fields) => {
          if(err) console.log(err);
          res.send (JSON.stringify(result));
      });
   
  });
  app.get("/getData1/", function(req, res) {
      let searchString = req.query.q;
      console.log(searchString)
      con.query(`SELECT * FROM timesheet WHERE project LIKE ${searchString}`,(err, result, fields) => {
          if(err) console.log(err);
          res.send (JSON.stringify(result));
      });
  });
app.post("/posts",function(req, res) {
    let data = req.body;
    console.log(data)
    let sql = "INSERT INTO timesheet (date,project,hours,task) VALUES (?,?,?,?)";
    let values = [data.date,data.project,data.hours,data.task]
    console.log(values)
    
    con.query(sql,values,(err,result, fields) => {
            if(err) console.log(err);
            console.log(result.affectedRows);    
        })
        

});
app.listen(1300); 