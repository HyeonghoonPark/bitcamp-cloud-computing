
const mysql = require('mysql');

var con = mysql.createConnection({
    host : '13.125.254.147', 
    database : 'studydb',
    user : 'study',
    password : '1111'
})

var user = 'user001'

con.connect(function(err){
    
    if(err)throw err;
    
    con.query('delete from pms2_team where name = ?',[user],function(err){
      if(err)throw err;  
    })
    
    con.end(function(err){
        if(err)throw err;
    })
    
})